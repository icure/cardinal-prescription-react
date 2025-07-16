import { css } from 'styled-components'

export const displayResolution = {
  xs: 420,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
  xxl: 1400,
}

export const responsiveMediaQueries = {
  up:
    (size: number) =>
    (first: TemplateStringsArray, ...args: { [key: string]: string }[]) => css`
      @media (min-width: ${size}px) {
        ${css(first, ...args)}
      }
    `,
  down:
    (size: number) =>
    (first: TemplateStringsArray, ...args: { [key: string]: string }[]) => css`
      @media (max-width: ${size}px) {
        ${css(first, ...args)}
      }
    `,
  between:
    (min: number, max: number) =>
    (first: TemplateStringsArray, ...args: { [key: string]: string }[]) => css`
      @media (min-width: ${displayResolution[min]}px) and (max-width: ${displayResolution[max]}px) {
        ${css(first, ...args)}
      }
    `,
}
