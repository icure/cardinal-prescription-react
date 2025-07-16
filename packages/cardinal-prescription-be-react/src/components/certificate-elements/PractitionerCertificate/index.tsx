import React from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '../../common/Alert'
import { CertificateUploadForm } from '../CertificateUploadForm'
import { StyledPractitionerCertificate } from './styles'

interface PractitionerCertificate {
  certificateValid: boolean
  certificateUploaded: boolean
  errorWhileVerifyingCertificate: string | undefined
  onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void
  onResetCertificate: () => void | Promise<void>
}

export const PractitionerCertificate: React.FC<PractitionerCertificate> = ({
  onResetCertificate,
  certificateValid,
  onUploadCertificate,
  certificateUploaded,
  errorWhileVerifyingCertificate,
}) => {
  const { t } = useTranslation()

  return (
    <StyledPractitionerCertificate>
      {certificateValid && !errorWhileVerifyingCertificate && (
        <Alert status="success" title={t('practitioner.certificateFeedback.successTitle')} description={t('practitioner.certificateFeedback.successDescription')} />
      )}

      {!certificateValid && !certificateUploaded && (
        <Alert status="error" title={t('practitioner.certificateFeedback.failureTitle')} description={t('practitioner.certificateFeedback.failureDescription')} />
      )}

      {errorWhileVerifyingCertificate && <Alert status="error" title={t('practitioner.certificateFeedback.verificationErrorTitle')} description={errorWhileVerifyingCertificate} />}

      {certificateUploaded && errorWhileVerifyingCertificate && (
        <Alert status="error" title={t('practitioner.certificateUpload.passwordMissingTitle')} description={t('practitioner.certificateUpload.passwordMissingDescription')} />
      )}

      {(!certificateValid || !certificateUploaded) && (
        <CertificateUploadForm onSubmit={onUploadCertificate} onReset={onResetCertificate} certificateAlreadyUploaded={certificateUploaded} />
      )}
    </StyledPractitionerCertificate>
  )
}
