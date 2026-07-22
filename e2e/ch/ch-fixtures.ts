import * as fs from 'fs'
import * as path from 'path'
import { expect } from '@playwright/test'

// Fixture helpers for the ch (Switzerland) specs. Unlike the Belgium parity fixtures (harvested
// from the angular reference app), these are self-harvested from THIS app by running the suite
// with UPDATE_CH_FIXTURE=1 — they guard against regressions, not cross-framework drift.
export const UPDATE_CH_FIXTURE = !!process.env.UPDATE_CH_FIXTURE

const fixturePath = (file: string) => path.resolve(__dirname, 'fixtures', file)

export const readFixture = (file: string): Record<string, unknown> => (fs.existsSync(fixturePath(file)) ? JSON.parse(fs.readFileSync(fixturePath(file), 'utf8')) : {})

export const compareOrHarvest = (file: string, key: string, actual: unknown): void => {
  if (UPDATE_CH_FIXTURE) {
    const fixture = readFixture(file)
    fixture[key] = actual
    fs.mkdirSync(path.dirname(fixturePath(file)), { recursive: true })
    fs.writeFileSync(fixturePath(file), JSON.stringify(fixture, null, 2) + '\n')
  } else {
    expect(actual).toEqual(readFixture(file)[key])
  }
}

// Masks time-dependent values (start date defaults to today, the ordonnance is dated today) so
// fixtures stay valid across days. Covers ISO, dd/mm/yyyy and the Swiss dd.mm.yyyy formats.
export const maskDates = (value: unknown): unknown =>
  JSON.parse(
    JSON.stringify(value)
      .replace(/\d{4}-\d{2}-\d{2}/g, '«date»')
      .replace(/\d{2}[/.]\d{2}[/.]\d{4}/g, '«date»'),
  )
