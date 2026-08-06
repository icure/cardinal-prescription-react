import { describe, it, expect } from 'vitest'
import { MedicationPackageDto, MedicationPriceRefDto, MedicationProductDto } from '@icure/medindex-sdk'
import { mapMedIndexMedication, mapMedIndexProductTitle, toMedIndexLanguage } from './map-medindex-medication'

// medINDEX has no `MedicationProductDto`/`MedicationPackageDto` mock factory anywhere in this repo
// (unlike the SAM Amp/Ampp/Dmpp ones in src/testing/test-helpers.ts) — these are small literal
// fixtures satisfying the real DTOs, populating only what each test needs plus the fields the
// types require.
function buildProduct(overrides: Partial<MedicationProductDto> = {}): MedicationProductDto {
  return {
    id: 'medprod:1',
    prdno: 1,
    names: { fr: 'Product FR Name', de: 'Produkt DE Name' },
    brandName: { fr: 'Brand FR', de: 'Marke DE' },
    galenicForm: { fr: 'Comprimé', de: 'Tablette' },
    composition: [],
    interactions: [],
    active: true,
    ...overrides,
  }
}

function buildPackage(overrides: Partial<MedicationPackageDto> = {}): MedicationPackageDto {
  return {
    id: 'medpkg:7680123',
    pharmacode: 7680123,
    name: { fr: 'Package FR Name', de: 'Packung DE Name' },
    gtin: ['7680123456789'],
    prices: [],
    narcotic: false,
    coldChain: false,
    active: true,
    ...overrides,
  }
}

describe('mapMedIndexMedication - core fields', () => {
  it('uses pkg.id as the id and always sets kind to "product"', () => {
    const result = mapMedIndexMedication(buildProduct(), buildPackage({ id: 'medpkg:999', pharmacode: 999 }), 'fr')

    expect(result.id).toBe('medpkg:999')
    expect(result.kind).toBe('product')
  })
})

describe('mapMedIndexMedication - title fallback chain', () => {
  it('prefers the package name over the product name when both exist for the active language', () => {
    const product = buildProduct({ names: { fr: 'Product FR Name' } })
    const pkg = buildPackage({ name: { fr: 'Package FR Name' } })

    const result = mapMedIndexMedication(product, pkg, 'fr')

    expect(result.title).toBe('Package FR Name')
  })

  it('falls back to the product name when the package has no name at all for the active language', () => {
    const product = buildProduct({ names: { fr: 'Product FR Name' } })
    const pkg = buildPackage({ name: {} })

    const result = mapMedIndexMedication(product, pkg, 'fr')

    expect(result.title).toBe('Product FR Name')
  })

  // The mapper's own private default (DEFAULT_MEDINDEX_LANGUAGE) is 'de' — verified from the
  // source comment ("medINDEX's own source data is German-first ... the least arbitrary default").
  it("falls back to the mapper's DEFAULT_MEDINDEX_LANGUAGE ('de') when neither package nor product has the active language", () => {
    const product = buildProduct({ names: { de: 'Produkt DE Name' } })
    const pkg = buildPackage({ name: {} })

    const result = mapMedIndexMedication(product, pkg, 'fr')

    expect(result.title).toBe('Produkt DE Name')
  })
})

describe('mapMedIndexMedication - activeIngredient', () => {
  it('joins localized composition substance names, skipping lines with a missing substance or empty name map', () => {
    const product = buildProduct({
      composition: [
        { substance: { name: { de: 'Paracetamol', fr: 'Paracétamol' } }, quantity: 500, unit: 'mg' },
        { substance: null, quantity: 10, unit: 'mg' },
        { substance: { name: { de: 'Coffein', fr: 'Caféine' } }, quantity: 50, unit: 'mg' },
        { substance: { name: {} }, quantity: 1, unit: 'mg' },
      ],
    })

    const result = mapMedIndexMedication(product, buildPackage(), 'fr')

    expect(result.activeIngredient).toBe('Paracétamol, Caféine')
  })

  it("falls back to the substance's 'de' name when the active language is missing from the map", () => {
    const product = buildProduct({
      composition: [{ substance: { name: { de: 'Ibuprofen', la: 'Ibuprofenum' } }, quantity: 200, unit: 'mg' }],
    })

    const result = mapMedIndexMedication(product, buildPackage(), 'fr')

    expect(result.activeIngredient).toBe('Ibuprofen')
  })
})

describe('mapMedIndexMedication - regulatory.ch', () => {
  it('maps every ChRegulatoryFields value from the package/product and nests it under regulatory.ch', () => {
    const product = buildProduct({ genericGroup: 'GG-1' })
    const pkg = buildPackage({
      pharmacode: 7680123,
      gtin: ['7680123456789', '7680123456790'],
      swissmedicCategory: 'B',
      narcotic: true,
      coldChain: true,
      prices: [],
    })

    const result = mapMedIndexMedication(product, pkg, 'fr')

    expect(result.regulatory?.ch).toEqual({
      pharmacode: '7680123',
      gtin: ['7680123456789', '7680123456790'],
      swissmedicCategory: 'B',
      narcotic: true,
      coldChain: true,
      genericGroup: 'GG-1',
      price: undefined,
    })
  })

  it('stringifies the numeric pharmacode', () => {
    const result = mapMedIndexMedication(buildProduct(), buildPackage({ pharmacode: 12345 }), 'fr')

    expect(result.regulatory?.ch?.pharmacode).toBe('12345')
    expect(typeof result.regulatory?.ch?.pharmacode).toBe('string')
  })

  it('leaks nothing to the top level and never populates regulatory.be', () => {
    const result = mapMedIndexMedication(buildProduct(), buildPackage(), 'fr')

    expect(Object.keys(result).sort()).toEqual(['activeIngredient', 'id', 'kind', 'regulatory', 'title'].sort())
    expect(result.regulatory?.be).toBeUndefined()
  })
})

describe('mapMedIndexMedication - price selection', () => {
  it('prefers PPUB over PPHA and PEXF when multiple types are present', () => {
    const prices: MedicationPriceRefDto[] = [
      { type: 'PEXF', chf: 10, validFrom: 1000 },
      { type: 'PPHA', chf: 12, validFrom: 1000 },
      { type: 'PPUB', chf: 15, validFrom: 1000 },
    ]

    const result = mapMedIndexMedication(buildProduct(), buildPackage({ prices }), 'fr')

    expect(result.regulatory?.ch?.price).toEqual({ amount: 15, currency: 'CHF' })
  })

  it('falls back to a lower-preference type when none of the higher-preference ones are present', () => {
    const prices: MedicationPriceRefDto[] = [{ type: 'PEXF', chf: 8, validFrom: 1000 }]

    const result = mapMedIndexMedication(buildProduct(), buildPackage({ prices }), 'fr')

    expect(result.regulatory?.ch?.price).toEqual({ amount: 8, currency: 'CHF' })
  })

  it('picks the most recent validFrom among several entries of the winning price type', () => {
    const prices: MedicationPriceRefDto[] = [
      { type: 'PPUB', chf: 20, validFrom: 1000 },
      { type: 'PPUB', chf: 25, validFrom: 3000 },
      { type: 'PPUB', chf: 22, validFrom: 2000 },
    ]

    const result = mapMedIndexMedication(buildProduct(), buildPackage({ prices }), 'fr')

    expect(result.regulatory?.ch?.price).toEqual({ amount: 25, currency: 'CHF' })
  })

  it('leaves price undefined when no price entry matches any preferred type', () => {
    const prices: MedicationPriceRefDto[] = [{ type: 'UNKNOWN', chf: 5, validFrom: 1000 }]

    const result = mapMedIndexMedication(buildProduct(), buildPackage({ prices }), 'fr')

    expect(result.regulatory?.ch?.price).toBeUndefined()
  })

  it('leaves price undefined when the package has no prices at all', () => {
    const result = mapMedIndexMedication(buildProduct(), buildPackage({ prices: [] }), 'fr')

    expect(result.regulatory?.ch?.price).toBeUndefined()
  })
})

describe('mapMedIndexProductTitle', () => {
  it('resolves the product name in the active language', () => {
    const product = buildProduct({ names: { fr: 'Product FR', de: 'Produkt DE' } })

    expect(mapMedIndexProductTitle(product, 'fr')).toBe('Product FR')
  })

  it("falls back to DEFAULT_MEDINDEX_LANGUAGE ('de') when the active language is missing", () => {
    const product = buildProduct({ names: { de: 'Produkt DE' } })

    expect(mapMedIndexProductTitle(product, 'fr')).toBe('Produkt DE')
  })

  it('returns an empty string when neither the active language nor the default is present', () => {
    const product = buildProduct({ names: {} })

    expect(mapMedIndexProductTitle(product, 'fr')).toBe('')
  })
})

describe('toMedIndexLanguage', () => {
  it('passes fr and de through unchanged', () => {
    expect(toMedIndexLanguage('fr')).toBe('fr')
    expect(toMedIndexLanguage('de')).toBe('de')
  })

  it("falls back to the documented default ('de') for en and nl, this library's other two supported languages", () => {
    expect(toMedIndexLanguage('en')).toBe('de')
    expect(toMedIndexLanguage('nl')).toBe('de')
  })
})
