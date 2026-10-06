/**
 * Where the library caches the connector's keystore uuid between certificate validation and the
 * Recip-e send. A miss resolves to `undefined` (it must not reject: a cold cache uploads instead).
 */
export interface TokenStore {
  put: (key: string, value: string) => Promise<string>
  get: (key: string) => Promise<string | undefined>
}
