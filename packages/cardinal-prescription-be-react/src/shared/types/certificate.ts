import { SamText } from '@icure/api'

export interface CertificateValidationResultType {
  keystoreUuid?: string
  stsTokenId?: string
  status: boolean
  error?: SamText
}
