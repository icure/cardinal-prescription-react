import { Amp, AmpStatus, DmppCodeType, Nmp, VmpGroup } from '@icure/cardinal-be-sam-sdk'
import { MedicationType } from '../../types'
import { capitalize } from '../../utils/string-helpers'

export const nmpToMedicationTypes = (nmp: Nmp): MedicationType[] => {
  const now = Date.now()

  return nmp.to && nmp.to < now
    ? []
    : [
        {
          nmpId: nmp.id,
          id: nmp.code,
          title: capitalize(nmp.name?.fr) ?? '',
        },
      ]
}

export const vmpGroupToMedicationTypes = (vmp: VmpGroup): MedicationType[] => {
  const now = Date.now()

  return vmp.to && vmp.to < now
    ? []
    : [
        {
          vmpGroupId: vmp.id,
          id: vmp.code,
          title: capitalize(vmp.name?.fr) ?? '',
          standardDosage: vmp.standardDosage,
        },
      ]
}

export const ampToMedicationTypes = (amp: Amp, deliveryEnvironment: string): MedicationType[] => {
  const now = Date.now()
  const twoYearsAgo = now - 2 * 365 * 24 * 3600 * 1000

  return amp.to && amp.to < now
    ? []
    : amp.ampps
        .filter((ampp) => {
          return (
            ampp.from &&
            ampp.from < now &&
            (!ampp.to || ampp.to > now) &&
            ampp.status == AmpStatus.Authorized &&
            ampp.commercializations?.some((c) => !!c.from && (!c.to || c.to > twoYearsAgo)) &&
            ampp.dmpps?.some((dmpp) => dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() == deliveryEnvironment)
          )
        })
        .map((ampp) => {
          const dmpp = ampp.dmpps?.find(
            (dmpp) =>
              dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() == deliveryEnvironment && dmpp.codeType == DmppCodeType.Cnk,
          )

          return {
            ampId: amp.id,
            vmpGroupId: amp.vmp?.vmpGroup?.id,
            id: ampp.ctiExtended,
            cnk: dmpp?.code,
            dmppProductId: dmpp?.productId,
            title: ampp.prescriptionName?.fr ?? ampp.abbreviatedName?.fr ?? amp.prescriptionName?.fr ?? amp.name?.fr ?? amp.abbreviatedName?.fr ?? '',
            vmpTitle: amp.vmp?.name?.fr ?? '',
            activeIngredient: amp.vmp?.vmpGroup?.name?.fr ?? '',
            price: ampp?.exFactoryPrice ? `€${ampp.exFactoryPrice}` : '',
            crmLink: ampp.crmLink?.fr,
            patientInformationLeafletLink: ampp.leafletLink?.fr,
            blackTriangle: amp.blackTriangle,
            speciallyRegulated: ampp.speciallyRegulated,
            genericPrescriptionRequired: ampp.genericPrescriptionRequired,
            intendedName: ampp.prescriptionName?.fr,
            rmaProfessionalLink: ampp.rmaProfessionalLink?.fr,
            spcLink: ampp.spcLink?.fr,
            dhpcLink: ampp.dhpcLink?.fr,
            rmakeyMessages: ampp.rmaKeyMessages,
            vmp: amp.vmp,
            supplyProblems: ampp.supplyProblems,
            commercializations: ampp?.commercializations,
            deliveryModusCode: ampp.deliveryModusCode,
            deliveryModus: ampp.deliveryModus?.fr,
            deliveryModusSpecificationCode: ampp.deliveryModusSpecificationCode,
            deliveryModusSpecification: ampp.deliveryModusSpecification?.fr,
            reimbursements: dmpp?.reimbursements?.find((dmpp) => dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now)),
          }
        })
}
