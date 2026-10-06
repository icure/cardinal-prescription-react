import React, { useEffect, useState } from 'react'
import { Alert } from '../../../internal/components/common/Alert'
import { CertificateUploadForm } from '../../../internal/components/certificate-elements/CertificateUploadForm'
import { StyledPractitionerCertificate } from './styles'
import { t } from '../../services/i18n'
import { LIBRARY_ROOT_CLASS } from '../../../styles'

// How long the "certificate uploaded" success alert stays on screen before auto-dismissing.
const SUCCESS_ALERT_DURATION_MS = 5_000

interface PractitionerCertificate {
  certificateValid: boolean
  certificateUploaded: boolean
  errorWhileVerifyingCertificate: string | undefined
  onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void
  onResetCertificate: () => void
  onDecryptCertificate: (passphrase: string) => void
  // When provided, the upload form probes IndexedDB itself at mount to decide between the full
  // upload form and the passphrase-only form (mirroring the angular implementation); otherwise it
  // falls back to the live `certificateUploaded` prop.
  hcpSsin?: string
}

export const PractitionerCertificate: React.FC<PractitionerCertificate> = ({
  certificateValid,
  onUploadCertificate,
  onResetCertificate,
  onDecryptCertificate,
  certificateUploaded,
  errorWhileVerifyingCertificate,
  hcpSsin,
}) => {
  const showSuccessAlert = certificateValid && !errorWhileVerifyingCertificate
  const [successAlertDismissed, setSuccessAlertDismissed] = useState(false)

  // Re-arm the dismiss timer each time the success alert (re)appears — e.g. after a
  // reset-then-revalidate cycle — rather than only once on mount.
  useEffect(() => {
    if (!showSuccessAlert) {
      setSuccessAlertDismissed(false)
      return
    }
    const timer = setTimeout(() => setSuccessAlertDismissed(true), SUCCESS_ALERT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [showSuccessAlert])

  return (
    <>
      <StyledPractitionerCertificate className={`StyledPractitionerCertificate ${LIBRARY_ROOT_CLASS}`}>
        {showSuccessAlert && !successAlertDismissed && (
          <Alert status="success" title={t('practitioner.certificateFeedback.successTitle')} description={t('practitioner.certificateFeedback.successDescription')} />
        )}

        {!certificateValid && !certificateUploaded && (
          <Alert status="error" title={t('practitioner.certificateFeedback.failureTitle')} description={t('practitioner.certificateFeedback.failureDescription')} />
        )}

        {errorWhileVerifyingCertificate && (
          <Alert status="error" title={t('practitioner.certificateFeedback.verificationErrorTitle')} description={errorWhileVerifyingCertificate} />
        )}

        {(!certificateValid || !certificateUploaded) && (
          <CertificateUploadForm
            onUploadCertificate={onUploadCertificate}
            onResetCertificate={onResetCertificate}
            onDecryptCertificate={onDecryptCertificate}
            certificateAlreadyUploaded={certificateUploaded}
            hcpSsin={hcpSsin}
          />
        )}
      </StyledPractitionerCertificate>
    </>
  )
}
