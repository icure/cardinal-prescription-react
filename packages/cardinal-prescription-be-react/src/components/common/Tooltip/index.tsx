import React, { ReactNode, RefObject, useState } from 'react'
import { StyleTooltip } from './styles'

export type TooltipOrientationType = 'tr' | 'br' | 'tl' | 'bl'

interface TooltipProps {
  content?: string
  contentSnippet?: ReactNode
  iconSnippet: ReactNode
  orientation?: TooltipOrientationType
  boundaryBox?: RefObject<HTMLElement>
}

export const Tooltip: React.FC<TooltipProps> = ({ content, contentSnippet, iconSnippet, orientation = 'bl', boundaryBox }) => {
  const [active, setActive] = useState(false)
  const [tooltipOrientation, setTooltipOrientation] = useState(orientation)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const repositionTooltip = (boundaryBox: RefObject<HTMLElement> | undefined) => {
    const tooltipElement = tooltipRef?.current
    const boundaryBoxElement = boundaryBox?.current

    if (!tooltipElement || !boundaryBoxElement) return

    const tooltipRect = tooltipElement.getBoundingClientRect()
    const boundaryBoxRect = boundaryBoxElement.getBoundingClientRect()
    const widthOfTooltipPopUp = 300

    // By default, we don't set up top origination, bcs it's not unfriendly
    if (boundaryBoxRect.right - tooltipRect.right > widthOfTooltipPopUp) {
      setTooltipOrientation('bl')
    } else if (boundaryBoxRect.right - tooltipRect.right < widthOfTooltipPopUp || boundaryBoxRect.right - tooltipRect.right === widthOfTooltipPopUp) {
      setTooltipOrientation('br')
    }
  }

  return (
    <StyleTooltip
      ref={tooltipRef}
      $tooltipOrientation={tooltipOrientation}
      $active={active}
      onMouseEnter={() => {
        console.log('enter')
        repositionTooltip(boundaryBox)
        setActive(true)
      }}
      onMouseLeave={() => setActive(false)}
    >
      <div className="icon">{iconSnippet}</div>
      <div className="chevron"></div>
      <div className="popup">
        <div className="popup__iconWrap">
          <div className="popup__icon">{iconSnippet}</div>
        </div>
        {!!content && <p>{content}</p>}
        {!!contentSnippet && contentSnippet}
      </div>
    </StyleTooltip>
  )
}
