import { SamText } from '@icure/cardinal-be-sam-sdk'

export interface CertificateValidationResultType {
  keystoreUuid?: string
  stsTokenId?: string
  status: boolean
  error?: SamText
}
