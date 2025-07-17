import React from 'react'
import { Alert } from '../../common/Alert'
import { CertificateUploadForm } from '../CertificateUploadForm'
import { StyledPractitionerCertificate } from './styles'
import { t } from '../../../services/i18n'
import { GlobalStyles } from '../../../styles'

interface PractitionerCertificate {
  certificateValid: boolean
  certificateUploaded: boolean
  errorWhileVerifyingCertificate: string | undefined
  onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void
  onResetCertificate: () => void
  onDecryptCertificate: (passphrase: string) => void
}

export const PractitionerCertificate: React.FC<PractitionerCertificate> = ({
  certificateValid,
  onUploadCertificate,
  onResetCertificate,
  onDecryptCertificate,
  certificateUploaded,
  errorWhileVerifyingCertificate,
}) => {
  return (
    <>
      <GlobalStyles />
      <StyledPractitionerCertificate>
        {certificateValid && certificateUploaded && (
          <Alert status="success" title={t('practitioner.certificateFeedback.successTitle')} description={t('practitioner.certificateFeedback.successDescription')} />
        )}

        {!certificateValid && !certificateUploaded && (
          <Alert status="error" title={t('practitioner.certificateFeedback.failureTitle')} description={t('practitioner.certificateFeedback.failureDescription')} />
        )}

        {errorWhileVerifyingCertificate && (
          <Alert status="error" title={t('practitioner.certificateFeedback.verificationErrorTitle')} description={errorWhileVerifyingCertificate} />
        )}

        {certificateUploaded && !certificateValid && (
          <Alert status="error" title={t('practitioner.certificateUpload.passwordMissingTitle')} description={t('practitioner.certificateUpload.passwordMissingDescription')} />
        )}

        {(!certificateValid || !certificateUploaded) && (
          <CertificateUploadForm
            onUploadCertificate={onUploadCertificate}
            onResetCertificate={onResetCertificate}
            onDecryptCertificate={onDecryptCertificate}
            certificateAlreadyUploaded={certificateUploaded}
          />
        )}
      </StyledPractitionerCertificate>
    </>
  )
}
