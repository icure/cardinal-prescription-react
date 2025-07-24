import { Amp, Ampp, Dmpp, Nmp, VmpGroup } from '@icure/api'
import { MedicationType } from '../../types'
import { getSamTextTranslation } from '../i18n'
import { capitalize } from '../../utils/string-helpers'

export const nmpToMedicationTypes = (nmp: Nmp): MedicationType[] => {
  const now = Date.now()

  return nmp.to && nmp.to < now
    ? []
    : [
        {
          nmpId: nmp.id,
          id: nmp.code,
          title: capitalize(getSamTextTranslation(nmp.name)),
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
          title: capitalize(getSamTextTranslation(vmp.name)),
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
            ampp.status == Ampp.StatusEnum.AUTHORIZED &&
            ampp.commercializations?.some((c) => !!c.from && (!c.to || c.to > twoYearsAgo)) &&
            ampp.dmpps?.some((dmpp) => dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() == deliveryEnvironment)
          )
        })
        .map((ampp) => {
          const dmpp = ampp.dmpps?.find(
            (dmpp) =>
              dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() == deliveryEnvironment && dmpp.codeType == Dmpp.CodeTypeEnum.CNK,
          )

          return {
            ampId: amp.id,
            vmpGroupId: amp.vmp?.vmpGroup?.id,
            id: ampp.ctiExtended,
            cnk: dmpp?.code,
            dmppProductId: dmpp?.productId,
            title: getSamTextTranslation(ampp.prescriptionName ?? ampp.abbreviatedName ?? amp.prescriptionName ?? amp.name ?? amp.abbreviatedName),
            vmpTitle: getSamTextTranslation(amp.vmp?.name),
            activeIngredient: getSamTextTranslation(amp.vmp?.vmpGroup?.name),
            price: ampp?.exFactoryPrice ? `€${ampp.exFactoryPrice}` : undefined,
            crmLink: getSamTextTranslation(ampp.crmLink),
            patientInformationLeafletLink: getSamTextTranslation(ampp.leafletLink),
            blackTriangle: amp.blackTriangle,
            speciallyRegulated: ampp.speciallyRegulated,
            genericPrescriptionRequired: ampp.genericPrescriptionRequired,
            intendedName: getSamTextTranslation(ampp.prescriptionName),
            rmaProfessionalLink: getSamTextTranslation(ampp.rmaProfessionalLink),
            spcLink: getSamTextTranslation(ampp.spcLink),
            dhpcLink: getSamTextTranslation(ampp.dhpcLink),
            rmakeyMessages: getSamTextTranslation(ampp.rmaKeyMessages),
            vmp: amp.vmp,
            supplyProblems: ampp.supplyProblems,
            commercializations: ampp?.commercializations,
            deliveryModusCode: ampp.deliveryModusCode,
            deliveryModus: getSamTextTranslation(ampp.deliveryModus),
            deliveryModusSpecificationCode: ampp.deliveryModusSpecificationCode,
            deliveryModusSpecification: getSamTextTranslation(ampp.deliveryModusSpecification),
            reimbursements: dmpp?.reimbursements?.find((dmpp) => dmpp.from && dmpp.from < now && (!dmpp.to || dmpp.to > now)),
          }
        })
}
