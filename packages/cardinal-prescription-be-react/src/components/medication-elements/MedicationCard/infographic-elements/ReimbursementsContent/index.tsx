import React, { FC } from 'react'
import { Reimbursement } from '@icure/api'
import { getSamTextTranslation, t } from '../../../../../services/i18n'
import { getCategoryLabelForReimbursement } from '../../../../../utils/reimbursement-helpers'
import { StyledReimbursement } from './styles'

interface Props {
  reimbursement?: Reimbursement
}

export const ReimbursementsContent: FC<Props> = ({ reimbursement }) => {
  const computeFeeAmount = (fee: string): string => Math.round(+fee * 100) / 100 + '€'

  return reimbursement ? (
    <StyledReimbursement className="StyledReimbursement">
      <h6> {t('medication.reimbursement.title')}</h6>
      <div className="content">
        {reimbursement.reimbursementCriterion?.category && (
          <>
            <div>
              <span>{t('medication.reimbursement.category')}</span>
              <p>{reimbursement.reimbursementCriterion?.category}</p>
            </div>

            <div>
              <span>{t('medication.reimbursement.categoryLabel')}</span>
              <p>{getCategoryLabelForReimbursement(reimbursement.reimbursementCriterion?.category)}</p>
            </div>
          </>
        )}
        {reimbursement.copayments &&
          reimbursement.copayments.map((el, index) => {
            return (
              <div key={index}>
                {el.regimeType === 1 && (
                  <span>
                    {t('medication.reimbursement.copay')}
                    <strong>{t('medication.reimbursement.copayPreferential')}</strong>
                  </span>
                )}

                {el.regimeType === 2 && (
                  <span>
                    {t('medication.reimbursement.copay')} <strong>{t('medication.reimbursement.copayActive')}</strong>
                  </span>
                )}

                {el.feeAmount && <p className="feeAmount">{computeFeeAmount(el.feeAmount)}</p>}
              </div>
            )
          })}
        {reimbursement.temporary && (
          <div>
            <span>{t('medication.reimbursement.temporary')}</span>
            <p className="textRed">{reimbursement.temporary}</p>
          </div>
        )}
        {getSamTextTranslation(reimbursement.reimbursementCriterion?.description) && (
          <div>
            <span>{t('medication.reimbursement.chapter')}</span>
            <p>{getSamTextTranslation(reimbursement.reimbursementCriterion?.description)}</p>
          </div>
        )}
      </div>
    </StyledReimbursement>
  ) : (
    <div className="supplyProblemsTooltip">
      <p className=" title  title--green">Conditions de prescription</p>
      <div className=" content">
        <div>
          <p>Not applicable</p>
        </div>
      </div>
    </div>
  )
}
