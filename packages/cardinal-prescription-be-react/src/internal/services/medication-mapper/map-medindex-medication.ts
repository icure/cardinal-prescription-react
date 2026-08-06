import { MedicationPackageDto, MedicationPriceRefDto, MedicationProductDto } from '@icure/medindex-sdk'
import { cardinalLanguage } from '../../../shared/services/i18n'
import { ChPriceType, MedicationType } from '../../../shared/types'

export type MedIndexLanguage = 'de' | 'fr' | 'it'

// medINDEX's own source data is German-first (its raw layer's per-language fields are documented
// German-before-French throughout, e.g. `RawInteractionMechanismDto.textDe`/`textFr`, with several
// DTOs carrying no `it` variant at all) — the least arbitrary default for a language medINDEX has
// no concept of (`en`, `nl`), absent any other convention to anchor on.
const DEFAULT_MEDINDEX_LANGUAGE: MedIndexLanguage = 'de'

/**
 * Resolves this library's active display language (`en`/`fr`/`nl`/`de`, see `cardinalLanguage`)
 * down to one of the three medINDEX actually supports. `fr`/`de` pass straight through; `en`/`nl`
 * have no medINDEX equivalent, so they fall back to `DEFAULT_MEDINDEX_LANGUAGE`.
 */
export function toMedIndexLanguage(language: ReturnType<typeof cardinalLanguage.getLanguage>): MedIndexLanguage {
  return language === 'fr' || language === 'de' ? language : DEFAULT_MEDINDEX_LANGUAGE
}

function resolveLocalized(dict: { [key: string]: string }, language: MedIndexLanguage): string {
  return dict[language] ?? dict[DEFAULT_MEDINDEX_LANGUAGE] ?? ''
}

// Preference order for "the" display price out of a package's several concurrent/historical
// entries. Unlike `be`'s `price` (the ex-factory figure its reimbursement-chapter calculations
// are actually based on), `ch` has no reimbursement concept this phase, so this price is purely
// informational — the public/pharmacy price (what a patient is actually charged) is the more
// meaningful figure to surface than the ex-factory one. Falls back down the chain if a package
// only carries some of these types.
const PRICE_TYPE_PREFERENCE = ['PPUB', 'PPHA', 'PEXF']

function selectDisplayPrice(prices: MedicationPriceRefDto[]): ChPriceType | undefined {
  for (const type of PRICE_TYPE_PREFERENCE) {
    const candidates = prices.filter((price): price is MedicationPriceRefDto & { chf: number } => price.type === type && price.chf != null)
    if (candidates.length === 0) continue
    const latest = candidates.reduce((newest, candidate) => ((candidate.validFrom ?? 0) > (newest.validFrom ?? 0) ? candidate : newest))
    return { amount: latest.chf, currency: 'CHF' }
  }
  return undefined
}

/**
 * Maps one medINDEX product together with one of its packages into this library's normalized
 * `MedicationType`. medINDEX splits product-level facts (composition, ATC, generic group) from
 * package-level facts (pharmacode, price, swissmedic category, narcotic/cold-chain) across two
 * DTOs, exactly mirroring SAM's AMP/AMPP split — this pairs one of each, the same role
 * `mapSamMedication` plays for `amp`+`ampp`. Pure and side-effect free, same as `mapSamMedication`.
 */
export function mapMedIndexMedication(product: MedicationProductDto, pkg: MedicationPackageDto, language: MedIndexLanguage): MedicationType {
  return {
    id: pkg.id,
    kind: 'product',
    title: resolveLocalized(pkg.name, language) || resolveLocalized(product.names, language),
    activeIngredient: product.composition
      .map((line) => (line.substance ? resolveLocalized(line.substance.name, language) : ''))
      .filter((name) => !!name)
      .join(', '),
    regulatory: {
      ch: {
        pharmacode: String(pkg.pharmacode),
        gtin: pkg.gtin,
        swissmedicCategory: pkg.swissmedicCategory ?? undefined,
        narcotic: pkg.narcotic,
        coldChain: pkg.coldChain,
        genericGroup: product.genericGroup ?? undefined,
        price: selectDisplayPrice(pkg.prices),
      },
    },
  }
}

/**
 * Maps a medINDEX product's own localized name into the title used for `MedicationProductType`
 * — pulled out alongside `mapMedIndexMedication` for the same reason `mapSamMedicationProductTitle`
 * is: the product-level container's title is resolved once, independent of any one of its packages.
 */
export function mapMedIndexProductTitle(product: MedicationProductDto, language: MedIndexLanguage): string {
  return resolveLocalized(product.names, language)
}
