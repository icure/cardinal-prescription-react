import React, { useState, ReactNode } from 'react'
import './Tooltip.css'

type Orientation = 'tr' | 'br' | 'tl' | 'bl'

interface TooltipProps {
  content?: string
  contentSnippet?: ReactNode
  iconSnippet: ReactNode
  orientation?: Orientation
}

const Tooltip: React.FC<TooltipProps> = ({ content, contentSnippet, iconSnippet, orientation = 'tr' }) => {
  const [active, setActive] = useState(false)

  return (
    <div className={`tooltip ${orientation}${active ? ' active' : ''}`} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} role="tooltip">
      <div className="icon">{iconSnippet}</div>
      <div className="chevron"></div>
      <div className="popup">
        <div className="popup__iconWrap">
          <div className="popup__icon">{iconSnippet}</div>
        </div>
        {!!content && <p>{content}</p>}
        {!!contentSnippet && contentSnippet}
      </div>
    </div>
  )
}

export default Tooltip
