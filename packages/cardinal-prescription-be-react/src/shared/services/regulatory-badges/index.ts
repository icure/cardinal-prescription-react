import { FC, RefObject } from 'react'
import type { MedicationType } from '../../types'

export type RegulatoryBadgePlacement = 'summary' | 'detail'

export interface RegulatoryBadgeProps {
  medication: MedicationType
  // Tooltip's positioning context, threaded through so a badge's tooltip can reposition
  // itself against the card it's rendered in.
  boundaryBox?: RefObject<HTMLElement>
}

export type RegulatoryBadgeComponent = FC<RegulatoryBadgeProps>

export interface RegisteredRegulatoryBadge {
  key: string
  Component: RegulatoryBadgeComponent
}

// country -> placement -> key -> Component. Nested `Map`s (not plain objects) so
// registration order is preserved and directly usable as render order, per placement.
const registry = new Map<string, Map<RegulatoryBadgePlacement, Map<string, RegulatoryBadgeComponent>>>()

export function registerRegulatoryBadge(country: string, key: string, Component: RegulatoryBadgeComponent, placement: RegulatoryBadgePlacement): void {
  const byPlacement = registry.get(country) ?? new Map<RegulatoryBadgePlacement, Map<string, RegulatoryBadgeComponent>>()
  registry.set(country, byPlacement)

  const byKey = byPlacement.get(placement) ?? new Map<string, RegulatoryBadgeComponent>()
  byPlacement.set(placement, byKey)

  byKey.set(key, Component)
}

export function getRegulatoryBadges(country: string, placement: RegulatoryBadgePlacement): RegisteredRegulatoryBadge[] {
  const byKey = registry.get(country)?.get(placement)
  return byKey ? Array.from(byKey, ([key, Component]) => ({ key, Component })) : []
}
