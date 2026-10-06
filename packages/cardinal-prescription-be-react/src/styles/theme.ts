import { css } from 'styled-components'

/**
 * The library's theming contract: every visual value used by the public components reads a CSS
 * custom property with the library's own default as its fallback, so a host skins the components
 * by setting `--cp-*` properties on any ancestor (`:root`, a wrapper, ...) without touching the
 * library's class names.
 *
 * Each token resolves as `var(--cp-<name>, <fallback>)`, where the fallback is:
 * - `var(--cp-dark-<name>, <default>)` for tokens with a dark default (the private `--cp-dark-*`
 *   layer is only ever set by the library root when dark mode is active, see `darkModeDefaults`);
 * - otherwise another token (`ref`), so e.g. the primary button follows `--cp-color-primary`;
 * - otherwise the literal light default.
 *
 * A property set by the host therefore always wins, in light and in dark mode.
 *
 * `README.md` ("Theming") lists every token; `theme.test.ts` keeps the two in sync.
 */
export interface ThemeTokenDefinition {
  /** Property name without the `--cp-` prefix. */
  name: string
  /** Default value in light mode (and in dark mode when `dark` is absent). */
  light: string
  /** Default value in dark mode, when it differs from `light`. */
  dark?: string
  /** Another token this one defaults to, so overriding the referenced token also restyles this one. */
  ref?: string
  description: string
}

export const THEME_PREFIX = '--cp-'
const DARK_PREFIX = '--cp-dark-'

const definitions = {
  // Typography
  fontFamily: { name: 'font-family', light: "'Lato', sans-serif", description: 'Font of every library text.' },
  fontFamilyControl: { name: 'font-family-control', light: "'Inter Variable', sans-serif", description: 'Font of text inputs, selects and the posology suggestions.' },
  fontSizeRoot: { name: 'font-size-root', light: '16px', description: 'Base font size of each library root.' },
  fontSize2xs: { name: 'font-size-2xs', light: '11px', description: 'Badges.' },
  fontSizeXs: { name: 'font-size-xs', light: '12px', description: 'Field captions, RID badge, "more" links.' },
  fontSizeSm: { name: 'font-size-sm', light: '13px', description: 'Error messages, cheap alternatives, standard dosages, composition.' },
  fontSizeMd: { name: 'font-size-md', light: '14px', description: 'Body text, labels, inputs, buttons.' },
  fontSizeLg: { name: 'font-size-lg', light: '16px', description: 'Card and modal titles.' },
  fontSizeXl: { name: 'font-size-xl', light: '18px', description: 'Printed prescription title.' },

  // Sizes
  controlHeight: { name: 'control-height', light: '32px', description: 'Height of buttons under a fine pointer (mouse).' },
  inputHeight: { name: 'input-height', light: '32px', ref: 'control-height', description: 'Height of text inputs and selects under a fine pointer.' },
  targetSizeMin: { name: 'target-size-min', light: '24px', description: 'Minimum size of small controls (close buttons, radios, icon buttons) under a fine pointer (WCAG 2.5.8).' },
  targetSizeCoarse: { name: 'target-size-coarse', light: '44px', description: 'Size of every control on a touch screen or whenever the pointer is not a fine, hovering one.' },
  radiusXs: { name: 'radius-xs', light: '4px', description: 'Suggestion items, close buttons, RID badge.' },
  radiusSm: { name: 'radius-sm', light: '5px', description: 'Regulatory badges.' },
  radiusMd: { name: 'radius-md', light: '6px', description: 'Inputs, buttons, medication and prescription cards.' },
  radiusLg: { name: 'radius-lg', light: '8px', description: 'Prescription list and printed document.' },
  radiusXl: { name: 'radius-xl', light: '12px', description: 'Modal sections, alerts, certificate form.' },
  radiusPill: { name: 'radius-pill', light: '999px', description: 'Toggle switch and cheap badges.' },

  // Surfaces
  colorSurface: { name: 'color-surface', light: '#ffffff', dark: '#1b1f27', description: 'Cards, modal header and footer, inputs, popups.' },
  colorSurfaceSunken: { name: 'color-surface-sunken', light: '#f9fbfe', dark: '#12151b', description: 'Modal body, expanded card, prescription rows.' },
  colorSurfaceAccent: { name: 'color-surface-accent', light: '#eef6fe', dark: '#1d2a3a', description: 'Search results panel, focused suggestion.' },
  colorSurfaceAccentSubtle: {
    name: 'color-surface-accent-subtle',
    light: '#f2f8fd',
    dark: '#18212d',
    description: 'Collapsible panel headers (cheap alternatives, standard dosages) and their hovered items.',
  },
  colorSurfaceDisabled: { name: 'color-surface-disabled', light: '#f5f5f5', dark: '#2a2f38', description: 'Disabled inputs and buttons.' },
  colorOverlay: { name: 'color-overlay', light: 'rgba(8, 75, 131, 0.3)', dark: 'rgba(0, 0, 0, 0.6)', description: 'Backdrop behind the modals.' },
  colorPaper: { name: 'color-paper', light: '#ffffff', description: 'Printed prescription background (stays white in dark mode).' },
  colorPaperText: { name: 'color-paper-text', light: '#000000', description: 'Printed prescription text.' },

  // Text
  colorText: { name: 'color-text', light: '#1d2235', dark: '#e6e9ef', description: 'Default text, titles, labels.' },
  colorTextStrong: { name: 'color-text-strong', light: '#000000', dark: '#ffffff', description: 'Field values in the medication card.' },
  colorTextMuted: { name: 'color-text-muted', light: '#4b6682', dark: '#a9b8c9', description: 'Field captions in the medication card.' },
  colorTextSubtle: {
    name: 'color-text-subtle',
    light: '#6b6b69',
    dark: '#a0a4ab',
    description: 'Secondary text: empty results, excipients, extra-fields preview, disabled buttons.',
  },
  colorPlaceholder: { name: 'color-placeholder', light: '#687583', dark: '#8b95a1', description: 'Input placeholders.' },
  colorLink: { name: 'color-link', light: '#2a6fa8', dark: '#8cc3f2', description: 'Links and accent text (panel headers).' },
  colorPrice: { name: 'color-price', light: '#b5470f', dark: '#ffa36b', description: 'Price in the medication card.' },

  // Borders and accents
  colorBorder: { name: 'color-border', light: '#e4e4e7', dark: '#343a45', description: 'Section and list borders, dividers.' },
  colorBorderStrong: { name: 'color-border-strong', light: '#cad0d5', dark: '#4b5360', description: 'Input and secondary button borders.' },
  colorBorderAccent: { name: 'color-border-accent', light: '#dce7f2', dark: '#2c3a4b', description: 'Medication and prescription card borders, collapsible panels.' },
  colorBorderControl: { name: 'color-border-control', light: '#848482', dark: '#8b95a1', description: 'Radio button ring.' },
  colorPrimary: { name: 'color-primary', light: '#084b83', dark: '#7ab6ea', description: 'Primary actions, checked controls, focused borders.' },
  colorOnPrimary: { name: 'color-on-primary', light: '#ffffff', dark: '#0b1a2b', description: 'Text on the primary colour.' },
  colorAccent: { name: 'color-accent', light: '#3d87c5', dark: '#6fa8dc', description: 'Hovered and focused cards, tooltip border, dividers in the expanded card.' },
  colorAccentSoft: { name: 'color-accent-soft', light: '#add5ff', dark: '#2c4a6b', description: 'Outlined regulatory badges, composition title.' },
  colorFocusHalo: {
    name: 'color-focus-halo',
    light: 'rgba(61, 135, 197, 0.2)',
    dark: 'rgba(111, 168, 220, 0.35)',
    description: 'Halo around focused or hovered inputs and controls.',
  },
  colorHoverHalo: { name: 'color-hover-halo', light: 'rgba(61, 135, 197, 0.3)', dark: 'rgba(111, 168, 220, 0.35)', description: 'Halo around hovered or focused cards.' },
  colorFocusRing: { name: 'color-focus-ring', light: '#3d87c5', dark: '#8cc3f2', description: 'Keyboard focus outline (`:focus-visible`).' },

  // States
  colorCritical: { name: 'color-critical', light: '#c40000', dark: '#ff7b72', description: 'Errors: messages, invalid borders, required asterisk, delete hover.' },
  colorCriticalSurface: { name: 'color-critical-surface', light: '#fff1f0', dark: '#3a1d1f', description: 'Error alert background.' },
  colorCriticalSoft: { name: 'color-critical-soft', light: '#ffccc7', dark: '#5a2a2d', description: 'Error alert border, critical regulatory badges and titles.' },
  colorCaution: { name: 'color-caution', light: '#a35f00', description: 'Caution badges (interactions, delivery conditions) and the interactions title, under white text.' },
  colorCautionSoft: { name: 'color-caution-soft', light: '#ffda83', dark: '#4d3d14', description: 'Caution regulatory badges and titles.' },
  colorOk: { name: 'color-ok', light: '#1e7e46', description: 'Reimbursement badge, cheapest badge, under white text.' },
  colorOkStrong: { name: 'color-ok-strong', light: '#237804', description: 'Cheap badge, prescription RID badge, under white text.' },
  colorOkSurface: { name: 'color-ok-surface', light: '#f6ffed', dark: '#1b2e1b', description: 'Success alert background.' },
  colorOkSurfaceAlt: { name: 'color-ok-surface-alt', light: '#e5fae5', dark: '#183222', description: 'Sent prescription row.' },
  colorOkSoft: { name: 'color-ok-soft', light: '#b7eb8f', dark: '#2f5a2f', description: 'Success alert border, ok regulatory badges and titles.' },
  colorOkBorder: { name: 'color-ok-border', light: '#008000', dark: '#3fb873', description: 'Sent prescription row border.' },
  colorNeutral: { name: 'color-neutral', light: '#5f6360', description: 'Neutral badges (cold chain, not reimbursed), under white text.' },
  colorCriticalStrong: { name: 'color-critical-strong', light: '#c40000', description: 'Critical badges (prescription conditions), under white text.' },
  colorOnBadge: { name: 'color-on-badge', light: '#ffffff', description: 'Text on the critical, caution, ok and neutral badges.' },

  shadowPopup: {
    name: 'shadow-popup',
    light: '0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.12)',
    dark: '0 9px 28px 0 rgba(0, 0, 0, 0.4), 0 6px 16px 0 rgba(0, 0, 0, 0.5), 0 3px 6px 0 rgba(0, 0, 0, 0.6)',
    description: 'Shadow of the posology suggestions and the search results panel.',
  },
  shadowSection: { name: 'shadow-section', light: '0 1px 1px 0 rgba(218, 218, 222, 0.25)', dark: 'none', description: 'Shadow of the extra-fields preview.' },

  // Buttons
  buttonPrimaryBackground: { name: 'button-primary-background', light: '#084b83', ref: 'color-primary', description: 'Primary button background and border.' },
  buttonPrimaryText: { name: 'button-primary-text', light: '#ffffff', ref: 'color-on-primary', description: 'Primary button text.' },
  buttonSecondaryBackground: { name: 'button-secondary-background', light: '#fcfcfd', dark: '#1b1f27', description: 'Outlined button background.' },
  buttonSecondaryText: { name: 'button-secondary-text', light: '#084b83', ref: 'color-primary', description: 'Outlined button text.' },
  buttonSecondaryBorder: { name: 'button-secondary-border', light: '#cad0d5', ref: 'color-border-strong', description: 'Outlined button border.' },
  buttonRadius: { name: 'button-radius', light: '6px', ref: 'radius-md', description: 'Button corner radius.' },

  // Icons
  iconInfo: { name: 'icon-info', light: '#3d87c5', dark: '#6fa8dc', description: 'Information icons, chevrons, spinner of the search.' },
  iconCritical: { name: 'icon-critical', light: '#ee1313', dark: '#ff6b63', description: 'End of commercialisation, narcotic.' },
  iconCaution: { name: 'icon-caution', light: '#ff5e00', dark: '#ff8a3d', description: 'Supply problems, orange triangle.' },
  iconCautionAlt: { name: 'icon-caution-alt', light: '#efac2f', description: 'Composition (molecule).' },
  iconOk: { name: 'icon-ok', light: '#09853d', dark: '#3fb873', description: 'Start of commercialisation.' },
  iconOkAlt: { name: 'icon-ok-alt', light: '#197437', dark: '#3fb873', description: 'Generic group (leaf).' },
  iconSuccess: { name: 'icon-success', light: '#52c41a', description: 'Success alert.' },
  iconError: { name: 'icon-error', light: '#ff4d4f', description: 'Error alert.' },
  iconNeutral: { name: 'icon-neutral', light: '#000000', dark: '#e6e9ef', description: 'Black triangle, pill bottle, prescription icon, default spinner.' },
  iconMuted: { name: 'icon-muted', light: '#9ca8b2', dark: '#8b95a1', description: 'Search magnifier.' },
  iconClose: { name: 'icon-close', light: '#4b6682', dark: '#a9b8c9', description: 'Close cross of the modals.' },
  iconAction: { name: 'icon-action', light: '#383a3c', dark: '#c9ced6', description: 'Edit and delete icons of the prescription rows.' },
} satisfies Record<string, ThemeTokenDefinition>

export type ThemeTokenKey = keyof typeof definitions

const byName = new Map<string, ThemeTokenDefinition>(Object.values(definitions).map((d) => [d.name, d]))

const expression = (definition: ThemeTokenDefinition): string => {
  const referenced = 'ref' in definition && definition.ref ? byName.get(definition.ref) : undefined
  const fallback = referenced ? expression(referenced) : 'dark' in definition && definition.dark ? `var(${DARK_PREFIX}${definition.name}, ${definition.light})` : definition.light
  return `var(${THEME_PREFIX}${definition.name}, ${fallback})`
}

/** Every token, as documented in the README: the public list hosts map their own design tokens to. */
export const themeTokens: readonly ThemeTokenDefinition[] = Object.values(definitions)

/** `cp.colorSurface` → `var(--cp-color-surface, var(--cp-dark-color-surface, #ffffff))`. */
export const cp = Object.fromEntries(Object.entries(definitions).map(([key, definition]) => [key, expression(definition)])) as Record<ThemeTokenKey, string>

/** `color-mix` keeps translucent variants of a themed colour themeable. */
export const translucent = (color: string, percent: number) => `color-mix(in srgb, ${color} ${percent}%, transparent)`

/**
 * The relaxation of the touch-size rule: only a fine pointer that can hover (a mouse or a trackpad)
 * gets compact controls. A stylus reports `pointer: fine` without `hover`, and no match at all
 * keeps the safe 44 px.
 */
export const finePointer = '@media (hover: hover) and (pointer: fine)'

/** `property` is 44 px on a coarse pointer and `fineValue` (default 24 px) under a fine, hovering one. */
export const targetSize = (property: string, fineValue: string = cp.targetSizeMin) => css`
  ${property}: ${cp.targetSizeCoarse};

  ${finePointer} {
    ${property}: ${fineValue};
  }
`

const darkDeclarations = themeTokens
  .filter((definition) => definition.dark)
  .map((definition) => `${DARK_PREFIX}${definition.name}: ${definition.dark};`)
  .join('\n')

/**
 * Built-in dark defaults, opt-in so other hosts see no change: `data-cp-theme="dark"` on the
 * library root or on any ancestor forces them; `data-cp-theme="auto"` follows
 * `prefers-color-scheme`. Values set by the host on `--cp-*` still win.
 */
export const darkModeDefaults = css`
  &[data-cp-theme='dark'],
  [data-cp-theme='dark'] & {
    ${darkDeclarations}
    color-scheme: dark;
  }

  @media (prefers-color-scheme: dark) {
    &[data-cp-theme='auto'],
    [data-cp-theme='auto'] & {
      ${darkDeclarations}
      color-scheme: dark;
    }
  }
`

/** Elements rendered by the host inside a library component (e.g. the posology editor slot) carry this attribute and are left out of the scoped reset. */
export const HOST_SLOT_ATTRIBUTE = 'data-cp-slot'

/** Leaves host-rendered slot content out (`:where` keeps it from adding specificity). */
const own = `:where(:not([${HOST_SLOT_ATTRIBUTE}], [${HOST_SLOT_ATTRIBUTE}] *))`

/** `ul, li` → `:where(&) ul:where(...), :where(&) li:where(...)`, i.e. specificity (0,0,1). */
const elements = (...tags: string[]) => tags.map((tag) => `:where(&) ${tag}${own}`).join(', ')

/**
 * What used to be a page-wide `createGlobalStyle`, now confined to the library's own subtree. The
 * root class sits in `:where()`, so each rule keeps the specificity it had as a global rule
 * (`*` → 0, `ul` → 0,0,1): component classes always win over it, and it still wins over a host's
 * own element rules (e.g. `ul { list-style: disc }`) inside the library, as before. Nothing reaches
 * the host page, and elements a host renders in a slot (`data-cp-slot`) are left alone. Focus
 * outlines are kept (and themed), never removed.
 */
export const scopedReset = css`
  :where(&) :where(*)${own}, :where(&) :where(*)${own}::before, :where(&) :where(*)${own}::after {
    box-sizing: border-box;
  }

  :where(&) :where(*)${own} {
    margin: 0;
    padding: 0;
    font-size: 100%;
  }

  ${elements('ul', 'ol', 'li')} {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ${elements('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p')} {
    margin: 0;
    font-size: 100%;
  }

  ${elements('a')} {
    text-decoration: none;
  }

  ${elements('img', 'audio', 'video')} {
    max-width: 100%;
    height: auto;
  }

  ${elements('input', 'textarea', 'select', 'button')} {
    border: none;
    font-family: inherit;
    font-size: 100%;
    color: inherit;
    margin: 0;
  }

  ${elements('button', 'input')} {
    line-height: normal;
  }

  ${elements('textarea')} {
    resize: none;
    overflow: auto;
    vertical-align: top;
  }

  ${elements('table')} {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ${elements('td', 'th')} {
    padding: 0;
    text-align: left;
  }

  :where(&) :where(*)${own}:focus-visible {
    outline: 2px solid ${cp.colorFocusRing};
    outline-offset: 2px;
  }
`

/** Base text styles every library root sets, so nothing is inherited from the host by accident (e.g. light host text on the library's white header). */
export const rootText = css`
  color: ${cp.colorText};
  font-family: ${cp.fontFamily};
  font-size: ${cp.fontSizeRoot};
  line-height: normal;
`

/** Applied to the root element of every public component: dark defaults, base text and the scoped reset. */
export const libraryRoot = css`
  ${darkModeDefaults}
  ${rootText}
  ${scopedReset}
  box-sizing: border-box;
`

/** CSS class every library root carries, for hosts that scope their own rules. */
export const LIBRARY_ROOT_CLASS = 'cp-root'
