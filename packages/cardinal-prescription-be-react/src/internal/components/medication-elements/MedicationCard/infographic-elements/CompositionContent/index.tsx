import React, { FC } from 'react'
import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import { MoleculeIcn } from '../../../../common/Icons'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import type { ChCompositionLineType } from '../../../../../../shared/types'
import { StyledComposition } from './styles'

const formatQuantity = (line: ChCompositionLineType): string => (line.quantity != null ? `${line.quantity}${line.unit ? ` ${line.unit}` : ''}` : '')

// Tooltip body listing the product's full composition: active substances first (with their
// quantity per dose unit when known), then the excipients dimmed — the detail view behind the
// summary `activeIngredient` line, which only names the active substances.
export const CompositionContent: FC<{ composition: ChCompositionLineType[] }> = ({ composition }) => {
  const actives = composition.filter((line) => line.isActiveSubstance)
  const excipients = composition.filter((line) => !line.isActiveSubstance)

  return (
    <StyledComposition className="StyledComposition">
      <h6>{t('medication.chComposition.title')}</h6>
      <div className="content">
        {actives.length !== 0 && (
          <div>
            <span>{t('medication.chComposition.activeSubstances')}</span>
            <ul>
              {actives.map((line, index) => (
                <li key={index}>
                  {line.substanceName}
                  {formatQuantity(line) && <span className="quantity">{formatQuantity(line)}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {excipients.length !== 0 && (
          <div>
            <span>{t('medication.chComposition.otherIngredients')}</span>
            <ul>
              {excipients.map((line, index) => (
                <li key={index} className="excipient">
                  {line.substanceName}
                  {formatQuantity(line) && <span className="quantity">{formatQuantity(line)}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </StyledComposition>
  )
}

// Registered `ch` detail badge — hover/click the molecule icon to see the full composition.
export const CompositionBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const composition = medication.regulatory?.ch?.composition
  if (!composition?.length) return null

  return (
    <div className="regulatoryBadgeIcon regulatoryBadgeIcon--outline">
      <Tooltip contentSnippet={<CompositionContent composition={composition} />} iconSnippet={<MoleculeIcn />} boundaryBox={boundaryBox} />
    </div>
  )
}
