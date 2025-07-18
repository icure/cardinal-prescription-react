import { SupplyProblemsContent } from '../../infographic-elements/SupplyProblemsContent'
import React, { FC } from 'react'
import type { MedicationType } from '../../../../../types'
import { ReimbursementsContent } from '../../infographic-elements/ReimbursementsContent'
import { PrescriptionConditionsContent } from '../../infographic-elements/PrescriptionConditionsContent'
import { DeliveryConditionsContent } from '../../infographic-elements/DeliveryConditionsContent'
import { EndOfCommercialisationContent } from '../../infographic-elements/EndOfCommercialisationContent'
import { StartOfCommercialisationContent } from '../../infographic-elements/StartOfCommercialisationContent'
import { StyledExtension } from './styles'

interface Props {
  medication: MedicationType
}

export const Extension: FC<Props> = ({ medication }) => {
  const medicationCommercialization = medication.commercializations?.[0]
  const medicationSupplyProblem = medication.supplyProblems?.[0]
  const medicationReimbursement = medication.reimbursements

  return (
    <StyledExtension>
      {medication.vmp && (
        <div className="vmp">
          {medication.vmp.name?.fr && (
            <div className="vmp__item">
              <span>VMP:</span>
              <p>{medication.vmp.name.fr}</p>
            </div>
          )}
          {medication.vmp.vmpGroup?.name?.fr && (
            <div className="vmp__item">
              <span>VMP-group:</span>
              <p>{medication.vmp.vmpGroup.name.fr}</p>
            </div>
          )}
        </div>
      )}
      <div className="divider"></div>
      <div className="links">
        {medication.crmLink && (
          <a href={medication.crmLink} target="_blank" rel="noopener noreferrer">
            Commented Medicines Directory (CBIP)
          </a>
        )}
        {medication.patientInformationLeafletLink && (
          <a href={medication.patientInformationLeafletLink} target="_blank" rel="noopener noreferrer">
            Patient information leaflet
          </a>
        )}
        {medication.rmaProfessionalLink && (
          <a href={medication.rmaProfessionalLink} target="_blank" rel="noopener noreferrer">
            Risk Minimisation Activities (RMA)
          </a>
        )}
        {medication.spcLink && (
          <a href={medication.spcLink} target="_blank" rel="noopener noreferrer">
            Summary of Product Characteristics (SPC)
          </a>
        )}
        {medication.dhpcLink && (
          <a href={medication.dhpcLink} target="_blank" rel="noopener noreferrer">
            Direct Healthcare Professional Communication (DHPC)
          </a>
        )}
      </div>
      {medicationReimbursement && (
        <>
          <div className="divider"></div>
          <ReimbursementsContent reimbursement={medication.reimbursements} />
        </>
      )}
      <div className="divider"></div>
      <PrescriptionConditionsContent
        deliveryModusSpecificationCode={medication.deliveryModusSpecificationCode}
        deliveryModusSpecification={medication.deliveryModusSpecification}
      />
      <div className="divider"></div>
      <DeliveryConditionsContent
        deliveryModus={medication.deliveryModus}
        deliveryModusSpecification={medication.deliveryModusSpecification}
        deliveryModusCode={medication.deliveryModusCode}
      />
      {medication.supplyProblems && (
        <>
          <div className="divider"></div>
          <SupplyProblemsContent medicationSupplyProblem={medicationSupplyProblem} />
        </>
      )}
      {medicationCommercialization?.endOfComercialization && (
        <>
          <div className="divider"></div>
          <EndOfCommercialisationContent medicationCommercialization={medicationCommercialization} />
        </>
      )}
      {medicationCommercialization && !medicationCommercialization.endOfComercialization && (
        <>
          <div className="divider"></div>
          <StartOfCommercialisationContent medicationCommercialization={medicationCommercialization} />
        </>
      )}
    </StyledExtension>
  )
}
