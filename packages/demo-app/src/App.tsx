import React, { useState } from 'react'
import { cardinalLanguage } from '@icure/cardinal-prescription-be-react'
import './index.css'
import { CARDINAL_PRESCRIPTION_LANGUAGE } from './config'
import { BelgiumTab } from './tabs/BelgiumTab'
import { SwitzerlandTab } from './tabs/SwitzerlandTab'

type Country = 'be' | 'ch'

export const App = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>('be')

  cardinalLanguage.setLanguage(CARDINAL_PRESCRIPTION_LANGUAGE)

  return (
    <div className="App">
      <div className="tab-bar">
        <button type="button" className={selectedCountry === 'be' ? 'active' : ''} onClick={() => setSelectedCountry('be')}>
          Belgium
        </button>
        <button type="button" className={selectedCountry === 'ch' ? 'active' : ''} onClick={() => setSelectedCountry('ch')}>
          Switzerland
        </button>
      </div>
      <div className="dividerApp"></div>

      {/*
        Both tabs stay mounted across switches (hidden via CSS rather than unmounted) so each
        country's local state — SAM/certificate init, search results, drafted `ch` prescriptions —
        survives switching tabs back and forth, for a nicer demo UX.
      */}
      <div style={{ display: selectedCountry === 'be' ? 'block' : 'none' }}>
        <BelgiumTab />
      </div>
      <div style={{ display: selectedCountry === 'ch' ? 'block' : 'none' }}>
        <SwitzerlandTab />
      </div>
    </div>
  )
}
