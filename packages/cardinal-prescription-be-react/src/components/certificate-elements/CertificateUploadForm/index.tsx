import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { readFileAsArrayBuffer } from '../../../utils/file-helpers'
import { Button } from '../../form-elements/Button'
import { TextInput } from '../../form-elements/TextInput'
import { StyledCertificateForm, StyledCertificateUpload } from './styles'
import { t } from '../../../services/i18n'

interface CertificateUploadFormProps {
  onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void
  onResetCertificate: () => void
  onDecryptCertificate: (passphrase: string) => void
  certificateAlreadyUploaded: boolean
}

type CertificateFormType = {
  certificate: FileList
  password: string
}

export const CertificateUploadForm: FC<CertificateUploadFormProps> = ({ onUploadCertificate, onResetCertificate, onDecryptCertificate, certificateAlreadyUploaded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: certificateFormError },
  } = useForm<CertificateFormType>()

  const handleFormSubmit = async ({ certificate, password }: CertificateFormType) => {
    if (certificateAlreadyUploaded) {
      onDecryptCertificate(password)
    } else {
      const certificateData: ArrayBuffer = await readFileAsArrayBuffer(certificate[0])
      onUploadCertificate(certificateData, password)
    }
  }

  const onUploadedAnotherCertificate = async (): Promise<void> => {
    onResetCertificate()
    reset()
  }

  return (
    <StyledCertificateUpload className="StyledCertificateUpload">
      <StyledCertificateForm className="StyledCertificateForm" onSubmit={handleSubmit(handleFormSubmit)} id="uploadCertificateForm">
        <h3>{!certificateAlreadyUploaded ? t('practitioner.certificateUpload.titleUpload') : t('practitioner.certificateUpload.titlePassword')}</h3>

        <div className="StyledCertificateUpload__inputs">
          {!certificateAlreadyUploaded && (
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
          title={!certificateAlreadyUploaded ? t('practitioner.certificateUpload.submitButtonUpload') : t('practitioner.certificateUpload.submitButtonPassword')}
          type="submit"
          form="uploadCertificateForm"
        />
      </StyledCertificateForm>
      {certificateAlreadyUploaded && (
        <Button title={t('practitioner.certificateUpload.resetButton')} type="reset" view="outlined" form="uploadCertificateForm" handleClick={onUploadedAnotherCertificate} />
      )}
    </StyledCertificateUpload>
  )
}
