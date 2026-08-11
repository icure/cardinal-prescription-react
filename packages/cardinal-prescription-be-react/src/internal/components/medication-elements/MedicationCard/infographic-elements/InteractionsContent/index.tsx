import React, { FC } from 'react'
import { t } from '../../../../../../shared/services/i18n'
import { Tooltip } from '../../../../common/Tooltip'
import type { RegulatoryBadgeComponent } from '../../../../../../shared/services/regulatory-badges'
import type { ChInteractionType } from '../../../../../../shared/types'
import { StyledTextToIcon } from '../../medication-card-elements/Header/styles'
import { StyledInteractions } from './styles'

// A product can reference dozens of interactions (30 for a common benzodiazepine); the tooltip
// stays digestible by listing the first entries in source order — no severity re-ranking, since
// medINDEX's `relevance` scale is source-defined and not re-interpreted here — with a "+N" line
// for the rest.
const MAX_DISPLAYED_INTERACTIONS = 8

// Tooltip body listing the known drug interactions involving the product's composition. Entries
// an old medINDEX server couldn't resolve (no /interaction endpoint) degrade to their relevance
// code alone.
export const InteractionsContent: FC<{ interactions: ChInteractionType[] }> = ({ interactions }) => {
  const displayed = interactions.slice(0, MAX_DISPLAYED_INTERACTIONS)
  const remaining = interactions.length - displayed.length

  return (
    <StyledInteractions className="StyledInteractions">
      <h6>{t('medication.chInteractions.title')}</h6>
      <div className="content">
        {displayed.map((interaction, index) => (
          <div key={interaction.id ?? index}>
            <span>{interaction.relevance ? `${t('medication.chInteractions.relevance')} ${interaction.relevance}` : ''}</span>
            <p>{interaction.title ?? interaction.id}</p>
            {interaction.effect && <p className="effect">{interaction.effect}</p>}
          </div>
        ))}
        {remaining > 0 && <p className="more">{`+ ${remaining} ${t('medication.chInteractions.more')}`}</p>}
      </div>
    </StyledInteractions>
  )
}

// Registered `ch` detail badge — the interaction count in an orange box; hover/click to see the
// interactions themselves.
export const InteractionsBadge: RegulatoryBadgeComponent = ({ medication, boundaryBox }) => {
  const interactions = medication.regulatory?.ch?.interactions
  if (!interactions?.length) return null

  return (
    <Tooltip
      contentSnippet={<InteractionsContent interactions={interactions} />}
      iconSnippet={
        <StyledTextToIcon className="StyledTextToIcon" $color="orange">
          <p>{`${interactions.length} IX`}</p>
        </StyledTextToIcon>
      }
      boundaryBox={boundaryBox}
    />
  )
}
