import { describe, it, expect } from 'vitest'
import { Nmp, Reimbursement } from '@icure/cardinal-be-sam-sdk'
import { mapSamMedication, mapSamMedicationProductTitle, mapSamMolecule, mapSamNonMedicinal } from './map-sam-medication'
import { AmpMockFactory, AmppMockFactory, DmppMockFactory, SamTextMockFactory, VmpGroupMockFactory } from '../../../testing'

// Fixed instant used as the `now` parameter across tests — mapSamMedication takes it in
// rather than reading the clock itself, so a stable value keeps assertions deterministic.
const now = Date.now()

describe('mapSamMedication - core fields', () => {
  it('uses ampp.ctiExtended as the id, sets kind to "product", and passes the index through', () => {
    const amp = AmpMockFactory.create()
    const ampp = AmppMockFactory.create({ ctiExtended: 'cti-999' })
    const dmpp = DmppMockFactory.create()

    const result = mapSamMedication(amp, ampp, dmpp, 2, 'fr', now)

    expect(result.id).toBe('cti-999')
    expect(result.kind).toBe('product')
    expect(result.index).toBe(2)
  })
})

describe('mapSamMedication - regulatory.be nesting', () => {
  it('nests every populated BeRegulatoryFields value under regulatory.be and leaks nothing to the top level', () => {
    const vmpGroup = { id: 'vmp-group-1', code: 'vg-1', name: SamTextMockFactory.createMultiLang('Groupe VMP'), productId: 'prod-vg-1' }
    const amp = AmpMockFactory.create({
      id: 'amp-1',
      vmp: {
        id: 'vmp-1',
        code: 'vmp-code-1',
        name: SamTextMockFactory.createMultiLang('VMP Name FR'),
        vmpGroup,
      } as any,
      blackTriangle: true,
    })
    const ampp = AmppMockFactory.create({
      ctiExtended: 'ampp-1',
      prescriptionName: SamTextMockFactory.create('AMPP Rx'),
      exFactoryPrice: 12.5,
      speciallyRegulated: 2,
      genericPrescriptionRequired: true,
      crmLink: SamTextMockFactory.create('http://crm.example'),
      leafletLink: SamTextMockFactory.create('http://leaflet.example'),
      rmaProfessionalLink: SamTextMockFactory.create('http://rma.example'),
      spcLink: SamTextMockFactory.create('http://spc.example'),
      dhpcLink: SamTextMockFactory.create('http://dhpc.example'),
      rmaKeyMessages: SamTextMockFactory.create('Key message'),
      deliveryModusCode: 'MOD1',
      deliveryModus: SamTextMockFactory.create('Standard'),
      deliveryModusSpecificationCode: 'Sp',
      deliveryModusSpecification: SamTextMockFactory.create('Spec text'),
      supplyProblems: [{ from: now - 1000 } as any],
      commercializations: [{ from: now - 1000, to: undefined } as any],
    })
    const dmpp = DmppMockFactory.create({
      code: '1234567',
      productId: 'dmpp-prod-1',
      cheap: true,
      cheapest: false,
    })

    const result = mapSamMedication(amp, ampp, dmpp, 5, 'fr', now)

    // Nothing from BeRegulatoryFields leaks onto the MedicationType itself.
    expect(Object.keys(result).sort()).toEqual(['activeIngredient', 'id', 'index', 'kind', 'regulatory', 'title'].sort())

    // Every populated field lands under regulatory.be, referencing the actual input objects
    // (rather than re-declaring their shape) so this stays in sync with the fixtures above.
    expect(result.regulatory?.be).toEqual({
      ampId: 'amp-1',
      vmpGroupId: 'vmp-group-1',
      cnk: '1234567',
      dmppProductId: 'dmpp-prod-1',
      vmpTitle: 'VMP Name FR',
      price: '€12.5',
      cheap: true,
      cheapest: false,
      crmLink: 'http://crm.example',
      patientInformationLeafletLink: 'http://leaflet.example',
      blackTriangle: true,
      speciallyRegulated: 2,
      genericPrescriptionRequired: true,
      intendedName: 'AMPP Rx',
      rmaProfessionalLink: 'http://rma.example',
      spcLink: 'http://spc.example',
      dhpcLink: 'http://dhpc.example',
      rmakeyMessages: 'Key message',
      vmp: amp.vmp,
      supplyProblems: ampp.supplyProblems,
      commercializations: ampp.commercializations,
      deliveryModusCode: 'MOD1',
      deliveryModus: 'Standard',
      deliveryModusSpecificationCode: 'Sp',
      deliveryModusSpecification: 'Spec text',
      reimbursements: undefined,
    })
  })
})

describe('mapSamMedication - title fallback chain', () => {
  it('prefers ampp.prescriptionName when it is fully populated', () => {
    const amp = AmpMockFactory.create({ prescriptionName: SamTextMockFactory.create('AMP Should Not Win') })
    const ampp = AmppMockFactory.create({ prescriptionName: SamTextMockFactory.createMultiLang('AMPP FR', 'AMPP NL') })
    const dmpp = DmppMockFactory.create()

    const result = mapSamMedication(amp, ampp, dmpp, 0, 'nl', now)

    expect(result.title).toBe('AMPP NL')
  })

  it('falls back to amp names when ampp has neither a prescriptionName nor an abbreviatedName', () => {
    const amp = AmpMockFactory.create({ prescriptionName: SamTextMockFactory.createMultiLang('AMP FR', 'AMP NL') })
    const ampp = AmppMockFactory.create({ prescriptionName: undefined, abbreviatedName: undefined })
    const dmpp = DmppMockFactory.create()

    const result = mapSamMedication(amp, ampp, dmpp, 0, 'nl', now)

    expect(result.title).toBe('AMP NL')
  })

  it('falls back to the default language (fr) when nothing is populated for the active language', () => {
    const amp = AmpMockFactory.create({
      prescriptionName: SamTextMockFactory.create('AMP FR Only'),
      name: undefined,
      abbreviatedName: undefined,
    })
    const ampp = AmppMockFactory.create({ prescriptionName: undefined, abbreviatedName: undefined })
    const dmpp = DmppMockFactory.create()

    const result = mapSamMedication(amp, ampp, dmpp, 0, 'de', now)

    expect(result.title).toBe('AMP FR Only')
  })
})

describe('mapSamMedication - reimbursement validity window', () => {
  it('selects a reimbursement that is currently within its validity window', () => {
    const valid = { from: now - 5000, to: now + 5000 } as Reimbursement
    const dmpp = DmppMockFactory.create({ reimbursements: [valid] })

    const result = mapSamMedication(AmpMockFactory.create(), AmppMockFactory.create(), dmpp, 0, 'fr', now)

    expect(result.regulatory?.be?.reimbursements).toEqual(valid)
  })

  it('excludes a reimbursement whose "to" date has already passed', () => {
    const expired = { from: now - 20000, to: now - 5000 } as Reimbursement
    const dmpp = DmppMockFactory.create({ reimbursements: [expired] })

    const result = mapSamMedication(AmpMockFactory.create(), AmppMockFactory.create(), dmpp, 0, 'fr', now)

    expect(result.regulatory?.be?.reimbursements).toBeUndefined()
  })

  it('picks the currently valid reimbursement out of an expired one and a valid one', () => {
    const expired = { from: now - 20000, to: now - 5000 } as Reimbursement
    const valid = { from: now - 5000, to: now + 5000 } as Reimbursement
    const dmpp = DmppMockFactory.create({ reimbursements: [expired, valid] })

    const result = mapSamMedication(AmpMockFactory.create(), AmppMockFactory.create(), dmpp, 0, 'fr', now)

    expect(result.regulatory?.be?.reimbursements).toEqual(valid)
  })

  // Surprising behavior, documented rather than silently special-cased: mapSamMedication's window
  // check is `reimbursement.from && (!reimbursement.to || reimbursement.to > now)`. It only requires
  // `from` to be truthy — it never checks `now >= from`. A reimbursement that hasn't started yet (its
  // `from` is in the future) but carries a future/open-ended `to` therefore still passes the filter
  // and is picked as if "currently valid". See this task's final report for this finding.
  it('documents a bug: a reimbursement whose "from" is still in the future is nonetheless selected', () => {
    const notYetStarted = { from: now + 10000, to: now + 20000 } as Reimbursement
    const dmpp = DmppMockFactory.create({ reimbursements: [notYetStarted] })

    const result = mapSamMedication(AmpMockFactory.create(), AmppMockFactory.create(), dmpp, 0, 'fr', now)

    expect(result.regulatory?.be?.reimbursements).toEqual(notYetStarted)
  })
})

describe('mapSamMedicationProductTitle', () => {
  it('prefers amp.prescriptionName in the active language', () => {
    const amp = AmpMockFactory.create({
      prescriptionName: SamTextMockFactory.createMultiLang('Product Name FR', 'Product Name NL'),
      name: SamTextMockFactory.create('Should not be used'),
    })

    expect(mapSamMedicationProductTitle(amp, 'nl')).toBe('Product Name NL')
  })

  it('falls back to amp.name when prescriptionName is missing', () => {
    const amp = AmpMockFactory.create({ prescriptionName: undefined, name: SamTextMockFactory.create('Amp Name FR') })

    expect(mapSamMedicationProductTitle(amp, 'fr')).toBe('Amp Name FR')
  })

  it('falls back to amp.abbreviatedName when prescriptionName and name are both missing', () => {
    const amp = AmpMockFactory.create({ prescriptionName: undefined, name: undefined, abbreviatedName: SamTextMockFactory.create('ABBR') })

    expect(mapSamMedicationProductTitle(amp, 'fr')).toBe('ABBR')
  })
})

describe('mapSamMolecule', () => {
  it('maps id/kind/title and nests SAM-specific fields under regulatory.be', () => {
    const vmpGroup = VmpGroupMockFactory.create({
      id: 'vmpg-1',
      code: 'code-1',
      name: SamTextMockFactory.createMultiLang('paracetamol', 'paracetamol nl'),
    })

    const result = mapSamMolecule(vmpGroup, 'nl')

    expect(result.id).toBe('code-1')
    expect(result.kind).toBe('molecule')
    expect(result.title).toBe('Paracetamol nl')
    expect(result.regulatory?.be).toEqual({ vmpGroupId: 'vmpg-1', vmpGroup })
    expect(Object.keys(result).sort()).toEqual(['id', 'kind', 'regulatory', 'title'].sort())
  })

  it('falls back to the default language (fr) when the active language is missing', () => {
    const vmpGroup = VmpGroupMockFactory.create({ name: SamTextMockFactory.create('paracetamol') })

    const result = mapSamMolecule(vmpGroup, 'de')

    expect(result.title).toBe('Paracetamol')
  })
})

describe('mapSamNonMedicinal', () => {
  it('maps id/kind/title and nests SAM-specific fields under regulatory.be', () => {
    const nmp = {
      id: 'nmp-1',
      code: 'NMP001',
      name: SamTextMockFactory.createMultiLang('compresses', 'kompressen'),
    } as Nmp

    const result = mapSamNonMedicinal(nmp, 'nl')

    expect(result.id).toBe('NMP001')
    expect(result.kind).toBe('nonMedicinal')
    expect(result.title).toBe('Kompressen')
    expect(result.regulatory?.be).toEqual({ nmpId: 'nmp-1' })
    expect(Object.keys(result).sort()).toEqual(['id', 'kind', 'regulatory', 'title'].sort())
  })

  it('falls back to the default language (fr) when the active language is missing', () => {
    const nmp = { id: 'nmp-2', code: 'NMP002', name: SamTextMockFactory.create('compresses') } as Nmp

    const result = mapSamNonMedicinal(nmp, 'de')

    expect(result.title).toBe('Compresses')
  })
})
