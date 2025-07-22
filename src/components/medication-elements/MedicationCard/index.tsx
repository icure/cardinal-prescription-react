import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import Tooltip from '../../common/Tooltip'
import {
  BlackTriangleIcn,
  ChevronIcn,
  EndOfCommercialisationIcn,
  LeafIcn,
  MoleculeIcn,
  PillsBottleIcn,
  PrescriptionIcn,
  SolidPillIcn,
  StartOfCommercialisationIcn,
  SupplyIcn,
} from '../../common/Icons/Icons'
import { formatTimestamp } from '../../../utils/timestampHelpers'
import { deliveryModusSpecificationCodes } from '../../../helpers'
import type { MedicationType } from '../../../types'

interface MedicationCardProps {
  medication: MedicationType
  handleAddPrescription: (medication: MedicationType) => void
  id: string
  focused?: boolean
  disableHover?: boolean
  short?: boolean
}

const getSpecialRegulation = (code?: number) => {
  switch (code) {
    case 1:
      return 'No narcotic, specially regulated drug'
    case 2:
      return 'Narcotic, specially regulated drug'
    default:
      return 'No special regulation'
  }
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, handleAddPrescription, id, focused, disableHover }) => {
  const medicationCardRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const medicationComercialization = medication.commercializations?.[0]
  const medicationSupplyProblem = medication.supplyProblems?.[0]
  const medicationReimbursement = medication.reimbursements

  const showChevron = !!medication.crmLink || !!medication.patientInformationLeafletLink || !!medication.rmaProfessionalLink || !!medication.spcLink || !!medication.dhpcLink

  // --- Tooltip content snippets as React nodes ---
  const orangeTriangleContent = (
    <>
      {!!medication?.rmakeyMessages && <p>{medication?.rmakeyMessages}</p>}
      <a className="snippetLink" href={medication.rmaProfessionalLink}>
        Risk Minimisation Activities (RMA)
      </a>
    </>
  )

  const supplyProblemsContent = medicationSupplyProblem && (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--orange">Temporary supply Problem:</p>
      <div className="supplyProblemsTooltip__content">
        {medicationSupplyProblem.from && (
          <div>
            <span>Limited availability since:</span>
            <p>{formatTimestamp(medicationSupplyProblem.from)}</p>
          </div>
        )}
        {medicationSupplyProblem.expectedEndOn && (
          <div>
            <span>Presumed end date:</span>
            <p>{formatTimestamp(medicationSupplyProblem.expectedEndOn)}</p>
          </div>
        )}
        {medicationSupplyProblem.reason?.fr && (
          <div>
            <span>Reason:</span>
            <p>{medicationSupplyProblem.reason?.fr}</p>
          </div>
        )}
        {medicationSupplyProblem.impact?.fr && (
          <div>
            <span>Impact:</span>
            <p>{medicationSupplyProblem.impact?.fr}</p>
          </div>
        )}
        {medicationSupplyProblem.impact?.fr === 'Importation possible par le pharmacien' && (
          <div>
            <span>Déclaration du prescripteur:</span>
            <a target="_blank" rel="noopener noreferrer" href="https://www.afmps.be/sites/default/files/content/INSP/NARC/declaration-medecin.pdf">
              Télécharger le document en .pdf
            </a>
          </div>
        )}
        {medicationSupplyProblem.additionalInformation?.fr && (
          <div>
            <span>Additional Information:</span>
            {medicationSupplyProblem.additionalInformation.fr.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const endOfCommercialisationContent = medicationComercialization && (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--red">End of Commercialisation:</p>
      <div className="supplyProblemsTooltip__content">
        {medicationComercialization.from && (
          <div>
            <span>Limited availability since:</span>
            <p>{formatTimestamp(medicationComercialization.from)}</p>
          </div>
        )}
        {medicationComercialization.to && (
          <div>
            <span>Unavailable from:</span>
            <p>{formatTimestamp(medicationComercialization.to)}</p>
          </div>
        )}
        {medicationComercialization.endOfComercialization?.fr && (
          <div>
            <span>End of Comercialization:</span>
            <p>{medicationComercialization.endOfComercialization.fr}</p>
          </div>
        )}
        {medicationComercialization.reason?.fr && (
          <div>
            <span>Reason:</span>
            <p>{medicationComercialization.reason?.fr}</p>
          </div>
        )}
        {medicationComercialization.impact?.fr && (
          <div>
            <span>Impact:</span>
            <p>{medicationComercialization.impact?.fr}</p>
          </div>
        )}
        {medicationComercialization.additionalInformation?.fr && (
          <div>
            <span>Additional Information:</span>
            {medicationComercialization.additionalInformation.fr.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const startOfCommercialisationContent = medicationComercialization && (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--green">Start of Commercialisation:</p>
      <div className="supplyProblemsTooltip__content">
        {medicationComercialization.from && (
          <div>
            <span>Availability from:</span>
            <p>{formatTimestamp(medicationComercialization.from)}</p>
          </div>
        )}
        {medicationComercialization.endOfComercialization?.fr && (
          <div>
            <span>End of Comercialization:</span>
            <p>{medicationComercialization.endOfComercialization.fr}</p>
          </div>
        )}
        {medicationComercialization.reason?.fr && (
          <div>
            <span>Reason:</span>
            <p>{medicationComercialization.reason?.fr}</p>
          </div>
        )}
        {medicationComercialization.impact?.fr && (
          <div>
            <span>Impact:</span>
            <p>{medicationComercialization.impact?.fr}</p>
          </div>
        )}
        {medicationComercialization.additionalInformation?.fr && (
          <div>
            <span>Additional Information:</span>
            {medicationComercialization.additionalInformation.fr.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const deliveryConditionsContent = medication.deliveryModusCode ? (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--orange">Conditions de livraison:</p>
      <div className="supplyProblemsTooltip__content">
        {medication.deliveryModusCode && (
          <div>
            <span>Delivery Modus Code:</span>
            <p>{medication.deliveryModusCode}</p>
          </div>
        )}
        {medication.deliveryModus && (
          <div>
            <span>Delivery Modus:</span>
            <p>{medication.deliveryModus}</p>
          </div>
        )}
        {medication.deliveryModusSpecification && (
          <div>
            <span>Delivery Modus Specification:</span>
            <p>{medication.deliveryModusSpecification}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--green">Conditions de livraison:</p>
      <div className="supplyProblemsTooltip__content">
        <div>
          <p>Free of prescription</p>
        </div>
      </div>
    </div>
  )

  const prescriptionConditionsContent =
    medication.deliveryModusSpecificationCode && medication.deliveryModusSpecificationCode in deliveryModusSpecificationCodes ? (
      <div className="supplyProblemsTooltip">
        <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--red">Conditions de prescription:</p>
        <div className="supplyProblemsTooltip__content">
          {medication.deliveryModusSpecificationCode && (
            <div>
              <span>Delivery Modus Code:</span>
              <p>{medication.deliveryModusSpecificationCode}</p>
            </div>
          )}
          {medication.deliveryModusSpecification && (
            <div>
              <span>Delivery Modus Specification:</span>
              <p>{deliveryModusSpecificationCodes[medication.deliveryModusSpecificationCode]?.fr}</p>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="supplyProblemsTooltip">
        <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--green">Conditions de prescription</p>
        <div className="supplyProblemsTooltip__content">
          <div>
            <p>Not applicable</p>
          </div>
        </div>
      </div>
    )

  const reimbursementIcn = medicationReimbursement && (
    <div className="textToIcon textToIcon--green">
      <p>{medicationReimbursement.reimbursementCriterion?.category}</p>
    </div>
  )

  const reimbursementsContent = medicationReimbursement ? (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--green">Remboursement:</p>
      <div className="supplyProblemsTooltip__content">
        {medicationReimbursement.reimbursementCriterion?.category && (
          <div>
            <span>Catégorie de remboursement:</span>
            <p>{medicationReimbursement.reimbursementCriterion.category}</p>
          </div>
        )}
        {medicationReimbursement.copayments &&
          medicationReimbursement.copayments.map((el, idx) => (
            <div key={idx}>
              {el.regimeType === 1 ? (
                <span>
                  Copayment type <strong>Preferential</strong>:
                </span>
              ) : el.regimeType === 2 ? (
                <span>
                  Copayment type <strong>Active</strong>:
                </span>
              ) : null}
              {el.feeAmount && <p className="feeAmount">{Math.round(+el.feeAmount * 100) / 100}€</p>}
            </div>
          ))}
        {medicationReimbursement.temporary && (
          <div>
            <span>Remboursement temporaire (art. 111):</span>
            <p className="textRed">{medicationReimbursement.temporary}</p>
          </div>
        )}
        {medicationReimbursement.reimbursementCriterion?.description?.fr && (
          <div>
            <span>Chapitre:</span>
            <p>{medicationReimbursement.reimbursementCriterion.description.fr}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="supplyProblemsTooltip">
      <p className="supplyProblemsTooltip__title supplyProblemsTooltip__title--green">Conditions de prescription</p>
      <div className="supplyProblemsTooltip__content">
        <div>
          <p>Not applicable</p>
        </div>
      </div>
    </div>
  )

  // --- Render ---
  return (
    <div
      className={['medicationRow', focused ? 'focused' : '', isExpanded ? 'isExpanded' : '', disableHover ? 'disableHover' : ''].filter(Boolean).join(' ')}
      ref={medicationCardRef}
      id={id}
    >
      <div className="header">
        <div
          className="header__medication"
          onClick={() => handleAddPrescription(medication)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleAddPrescription(medication)
          }}
        >
          <div className="header__medication__content">
            <div className="header__medication__content__heading">
              <div className="header__medication__content__heading__title">
                {medication.ampId ? (
                  <Tooltip content="Medication" iconSnippet={<SolidPillIcn pathFill="#3D87C5" size={14} />} boundaryBox={medicationCardRef} />
                ) : medication.nmpId ? (
                  <Tooltip content="Homologation" iconSnippet={<LeafIcn pathFill="#197437" size={14} />} boundaryBox={medicationCardRef} />
                ) : medication.vmpGroupId ? (
                  <Tooltip content="Molecule" iconSnippet={<MoleculeIcn pathFill="#EFAC2F" size={14} />} boundaryBox={medicationCardRef} />
                ) : null}
                <h3>{medication.title}</h3>
                <div className="header__medication__content__heading__infographics">
                  <div className="medicationInfographics">
                    {medication.blackTriangle && (
                      <div className="medicationInfographics__item">
                        <Tooltip content="Black triangle" iconSnippet={<BlackTriangleIcn />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                    {medication.rmaProfessionalLink && (
                      <div className="medicationInfographics__item">
                        <Tooltip contentSnippet={orangeTriangleContent} iconSnippet={<BlackTriangleIcn pathFill="#FF5E00" />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                    {!!medication.speciallyRegulated && (
                      <div className="medicationInfographics__item">
                        <Tooltip content={getSpecialRegulation(medication.speciallyRegulated)} iconSnippet={<PillsBottleIcn />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                    {medication.genericPrescriptionRequired && (
                      <div className="medicationInfographics__item">
                        <Tooltip content="Generic prescription required" iconSnippet={<PrescriptionIcn />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                  </div>
                  <div className="medicationAvailabilityInfographics">
                    {medication.supplyProblems && (
                      <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--orange">
                        <Tooltip contentSnippet={supplyProblemsContent} iconSnippet={<SupplyIcn />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                    {medicationComercialization?.endOfComercialization && (
                      <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--red">
                        <Tooltip contentSnippet={endOfCommercialisationContent} iconSnippet={<EndOfCommercialisationIcn />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                    {medicationComercialization && !medicationComercialization?.endOfComercialization && (
                      <div className="medicationAvailabilityInfographics__item medicationAvailabilityInfographics__item--green">
                        <Tooltip contentSnippet={startOfCommercialisationContent} iconSnippet={<StartOfCommercialisationIcn />} boundaryBox={medicationCardRef} />
                      </div>
                    )}
                  </div>
                  <div className="deliveryPrescriptionConditions">
                    {medicationReimbursement && <Tooltip contentSnippet={reimbursementsContent} iconSnippet={reimbursementIcn} />}
                    {medication.deliveryModusCode && (
                      <Tooltip
                        contentSnippet={deliveryConditionsContent}
                        iconSnippet={
                          <div className="textToIcon textToIcon--orange">
                            <p>{medication.deliveryModusCode}</p>
                          </div>
                        }
                        boundaryBox={medicationCardRef}
                      />
                    )}
                    {medication.deliveryModusCode && (
                      <Tooltip
                        contentSnippet={prescriptionConditionsContent}
                        iconSnippet={
                          medication.deliveryModusSpecificationCode && medication.deliveryModusSpecificationCode in deliveryModusSpecificationCodes ? (
                            <div className="textToIcon textToIcon--red">
                              <p>{medication.deliveryModusSpecificationCode}</p>
                            </div>
                          ) : undefined
                        }
                        boundaryBox={medicationCardRef}
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="header__medication__content__heading__activeIngredient">{medication.activeIngredient}</p>
            </div>
            <div className="header__medication__content__description">
              {medication.price && (
                <>
                  <div className="header__medication__content__description__item price">
                    <span>Prix:</span>
                    <p>{medication.price}</p>
                  </div>
                  <div className="header__medication__content__description__item price">
                    <span>Reimbursement:</span>
                    {medicationReimbursement ? (
                      <div className="textToIcon textToIcon--green">
                        <p>{medicationReimbursement?.reimbursementCriterion?.category || ''}</p>
                      </div>
                    ) : (
                      <div className="textToIcon textToIcon--gray">
                        <p>Non</p>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="header__medication__content__description__item">
                <span>Conditions de livraison:</span>
                {medication.deliveryModusCode ? (
                  <div className="textToIcon textToIcon--orange">
                    <p>{medication.deliveryModusCode}</p>
                  </div>
                ) : (
                  <div className="textToIcon textToIcon--green">
                    <p>Free of prescription</p>
                  </div>
                )}
              </div>
              <div className="header__medication__content__description__item">
                <span>Conditions de prescription:</span>
                {medication.deliveryModusSpecificationCode && medication.deliveryModusSpecificationCode in deliveryModusSpecificationCodes ? (
                  <div className="textToIcon textToIcon--red">
                    <p>{medication.deliveryModusSpecificationCode}</p>
                  </div>
                ) : (
                  <div className="textToIcon textToIcon--green">
                    <p>Not applicable</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showChevron && (
          <button
            className={`header__arrow${isExpanded ? ' isExpanded' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded((v) => !v)
            }}
            type="button"
          >
            <ChevronIcn />
          </button>
        )}
      </div>
      {isExpanded && (
        <div className="content">
          {!!medication.vmp && (
            <div className="content__vmp">
              {!!medication.vmp.name?.fr && (
                <div className="content__vmp__item">
                  <span>VMP:</span>
                  <p>{medication.vmp.name.fr}</p>
                </div>
              )}
              {!!medication.vmp.vmpGroup?.name?.fr && (
                <div className="content__vmp__item">
                  <span>VMP-group:</span>
                  <p>{medication.vmp.vmpGroup.name.fr}</p>
                </div>
              )}
            </div>
          )}
          <div className="content__divider"></div>
          <div className="content__links">
            {!!medication.crmLink && (
              <a href={medication.crmLink} target="_blank" rel="noopener noreferrer">
                Commented Medicines Directory (CBIP)
              </a>
            )}
            {!!medication.patientInformationLeafletLink && (
              <a href={medication.patientInformationLeafletLink} target="_blank" rel="noopener noreferrer">
                Patient information leaflet
              </a>
            )}
            {!!medication.rmaProfessionalLink && (
              <a href={medication.rmaProfessionalLink} target="_blank" rel="noopener noreferrer">
                Risk Minimisation Activities (RMA)
              </a>
            )}
            {!!medication.spcLink && (
              <a href={medication.spcLink} target="_blank" rel="noopener noreferrer">
                Summary of Product Characteristics (SPC)
              </a>
            )}
            {!!medication.dhpcLink && (
              <a href={medication.dhpcLink} target="_blank" rel="noopener noreferrer">
                Direct Healthcare Professional Communication (DHPC)
              </a>
            )}
          </div>
          {medicationReimbursement && (
            <>
              <div className="content__divider"></div>
              {reimbursementsContent}
            </>
          )}
          <div className="content__divider"></div>
          {prescriptionConditionsContent}
          <div className="content__divider"></div>
          {deliveryConditionsContent}
          {medication.supplyProblems && (
            <>
              <div className="content__divider"></div>
              {supplyProblemsContent}
            </>
          )}
          {medicationComercialization?.endOfComercialization && (
            <>
              <div className="content__divider"></div>
              {endOfCommercialisationContent}
            </>
          )}
          {medicationComercialization && !medicationComercialization.endOfComercialization && (
            <>
              <div className="content__divider"></div>
              {startOfCommercialisationContent}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default MedicationCard
