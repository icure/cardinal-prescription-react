import React, { FC } from 'react'
import { SupplyProblem } from '@icure/cardinal-be-sam-sdk'
import { formatTimestamp } from '../../../../../utils/date-helpers'
import { getSamTextTranslation, t } from '../../../../../services/i18n'
import { StyledSupplyProblems } from './styles'

interface Props {
  medicationSupplyProblem: SupplyProblem
}

export const SupplyProblemsContent: FC<Props> = ({ medicationSupplyProblem }) => {
  return (
    <StyledSupplyProblems>
      <h6>{t('medication.supply.issueTitle')}</h6>
      <div className="content">
        {medicationSupplyProblem.from && (
          <div>
            <span>{t('medication.supply.startDate')}</span>
            <p>{formatTimestamp(medicationSupplyProblem.from)}</p>
          </div>
        )}
        {medicationSupplyProblem.expectedEndOn && (
          <div>
            <span>{t('medication.supply.expectedEndDate')}</span>
            <p>{formatTimestamp(medicationSupplyProblem.expectedEndOn)}</p>
          </div>
        )}
        {getSamTextTranslation(medicationSupplyProblem.reason) && (
          <div>
            <span>{t('medication.supply.reason')}</span>
            <p>{getSamTextTranslation(medicationSupplyProblem.reason)}</p>
          </div>
        )}
        {getSamTextTranslation(medicationSupplyProblem.impact) && (
          <div>
            <span>{t('medication.supply.impact')}</span>
            <p>{getSamTextTranslation(medicationSupplyProblem.impact)}</p>
          </div>
        )}
        {medicationSupplyProblem.impact?.fr === 'Importation possible par le pharmacien' && (
          <div>
            <span>{t('medication.supply.prescriberNote')}</span>
            <a target="_blank" rel="noopener noreferrer" href="https://www.afmps.be/sites/default/files/content/INSP/NARC/declaration-medecin.pdf">
              {t('medication.supply.downloadPdf')}
            </a>
          </div>
        )}
        {getSamTextTranslation(medicationSupplyProblem.additionalInformation) && (
          <div>
            <span>{t('medication.supply.extraInfo')}</span>
            {getSamTextTranslation(medicationSupplyProblem.additionalInformation)
              .split('\n')
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </div>
        )}
      </div>
    </StyledSupplyProblems>
  )
}
