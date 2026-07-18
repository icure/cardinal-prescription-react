import { SupplyProblemsContent } from '../../infographic-elements/SupplyProblemsContent'
import React, { FC } from 'react'
import type { MedicationType } from '../../../../../../shared/types'
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
  const be = medication.regulatory?.be
  const medicationCommercialization = be?.commercializations?.[0]
  const medicationSupplyProblem = be?.supplyProblems?.[0]
  const medicationReimbursement = be?.reimbursements

  return (
    <StyledExtension className="StyledExtension">
      {be?.vmp && (
        <div className="vmp">
          {be.vmp.name?.fr && (
            <div className="vmp__item">
              <span>VMP:</span>
              <p>{be.vmp.name.fr}</p>
            </div>
          )}
          {be.vmp.vmpGroup?.name?.fr && (
            <div className="vmp__item">
              <span>VMP-group:</span>
              <p>{be.vmp.vmpGroup.name.fr}</p>
            </div>
          )}
        </div>
      )}
      <div className="divider"></div>
      <div className="links">
        {be?.crmLink && (
          <a href={be.crmLink} target="_blank" rel="noopener noreferrer">
            Commented Medicines Directory (CBIP)
          </a>
        )}
        {be?.patientInformationLeafletLink && (
          <a href={be.patientInformationLeafletLink} target="_blank" rel="noopener noreferrer">
            Patient information leaflet
          </a>
        )}
        {be?.rmaProfessionalLink && (
          <a href={be.rmaProfessionalLink} target="_blank" rel="noopener noreferrer">
            Risk Minimisation Activities (RMA)
          </a>
        )}
        {be?.spcLink && (
          <a href={be.spcLink} target="_blank" rel="noopener noreferrer">
            Summary of Product Characteristics (SPC)
          </a>
        )}
        {be?.dhpcLink && (
          <a href={be.dhpcLink} target="_blank" rel="noopener noreferrer">
            Direct Healthcare Professional Communication (DHPC)
          </a>
        )}
      </div>
      {medicationReimbursement && (
        <>
          <div className="divider"></div>
          <ReimbursementsContent reimbursement={medicationReimbursement} />
        </>
      )}
      <div className="divider"></div>
      <PrescriptionConditionsContent deliveryModusSpecificationCode={be?.deliveryModusSpecificationCode} deliveryModusSpecification={be?.deliveryModusSpecification} />
      <div className="divider"></div>
      <DeliveryConditionsContent deliveryModus={be?.deliveryModus} deliveryModusSpecification={be?.deliveryModusSpecification} deliveryModusCode={be?.deliveryModusCode} />
      {be?.supplyProblems && (
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
