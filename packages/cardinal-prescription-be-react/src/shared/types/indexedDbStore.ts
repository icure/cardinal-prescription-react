export interface GenericStoreType<T> {
  get: (key: string) => Promise<T>
  put: (key: string, value: T) => Promise<T>
  delete: (key: string) => Promise<void>
}

export interface CertificateRecordType {
  id: string
  salt: number[]
  iv: number[]
  encryptedCertificate: number[]
}
