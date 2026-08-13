import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { readFileAsArrayBuffer } from '../../../utils/file-helpers'
import { Button } from '../../form-elements/Button'
import { TextInput } from '../../form-elements/TextInput'
import { StyledCertificateForm, StyledCertificateUpload } from './styles'
import { t } from '../../../../shared/services/i18n'
import { Alert } from '../../common/Alert'
import { loadCertificateInformation } from '../../../../shared/services/certificate'

interface CertificateUploadFormProps {
  onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void
  onResetCertificate: () => void
  onDecryptCertificate: (passphrase: string) => void
  certificateAlreadyUploaded: boolean
  hcpSsin?: string
}

type CertificateFormType = {
  certificate: FileList
  password: string
}

export const CertificateUploadForm: FC<CertificateUploadFormProps> = ({ onUploadCertificate, onResetCertificate, onDecryptCertificate, certificateAlreadyUploaded, hcpSsin }) => {
  // Mirrors the angular certificate-upload component: when the hcp ssin is known, the form probes
  // IndexedDB once at mount and owns its upload/passphrase mode from then on (a fresh upload does
  // not switch the mode mid-session); without an ssin it follows the live prop instead.
  const [storedAtMount, setStoredAtMount] = useState(false)
  useEffect(() => {
    if (!hcpSsin) return
    loadCertificateInformation(hcpSsin)
      .then((stored) => setStoredAtMount(!!stored))
      .catch(() => setStoredAtMount(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const alreadyUploaded = hcpSsin ? storedAtMount : certificateAlreadyUploaded

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: certificateFormError },
  } = useForm<CertificateFormType>()

  const handleFormSubmit = async ({ certificate, password }: CertificateFormType) => {
    if (alreadyUploaded) {
      onDecryptCertificate(password)
    } else {
      const certificateData: ArrayBuffer = await readFileAsArrayBuffer(certificate[0])
      onUploadCertificate(certificateData, password)
    }
  }

  const onUploadedAnotherCertificate = async (): Promise<void> => {
    setStoredAtMount(false)
    onResetCertificate()
    reset()
  }

  return (
    <StyledCertificateUpload className="StyledCertificateUpload">
      {alreadyUploaded && (
        <Alert status="error" title={t('practitioner.certificateUpload.passwordMissingTitle')} description={t('practitioner.certificateUpload.passwordMissingDescription')} />
      )}
      <StyledCertificateForm className="StyledCertificateForm" onSubmit={handleSubmit(handleFormSubmit)} id="uploadCertificateForm">
        <h3>{!alreadyUploaded ? t('practitioner.certificateUpload.titleUpload') : t('practitioner.certificateUpload.titlePassword')}</h3>

        <div className="StyledCertificateUpload__inputs">
          {!alreadyUploaded && (
            <TextInput
              label={t('practitioner.certificateUpload.fileLabel')}
              type="file"
              id="certificate"
              accept=".p12,.acc-p12"
              required
              {...register('certificate', {
                required: t('practitioner.certificateUpload.errorRequired'),
              })}
              errorMessage={certificateFormError['certificate']?.message}
            />
          )}
          <TextInput
            label={t('practitioner.certificateUpload.passwordLabel')}
            type="password"
            id="password"
            required
            {...register('password', {
              required: t('practitioner.certificateUpload.errorRequired'),
            })}
            errorMessage={certificateFormError['password']?.message}
          />
        </div>

        <Button
          title={!alreadyUploaded ? t('practitioner.certificateUpload.submitButtonUpload') : t('practitioner.certificateUpload.submitButtonPassword')}
          type="submit"
          form="uploadCertificateForm"
        />
      </StyledCertificateForm>
      {alreadyUploaded && (
        <Button title={t('practitioner.certificateUpload.resetButton')} type="reset" view="outlined" form="uploadCertificateForm" handleClick={onUploadedAnotherCertificate} />
      )}
    </StyledCertificateUpload>
  )
}
