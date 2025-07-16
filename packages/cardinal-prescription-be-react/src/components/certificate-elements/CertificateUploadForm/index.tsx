import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { readFileAsArrayBuffer } from '../../../utils/file-helpers'
import { Button } from '../../form-elements/Button'
import { TextInput } from '../../form-elements/TextInput'
import { StyledCertificateForm, StyledCertificateUpload } from './styles'

interface CertificateUploadFormProps {
  onSubmit: (certificateData: ArrayBuffer, passphrase: string) => void
  onReset: () => void | Promise<void>
  certificateAlreadyUploaded: boolean
}

type CertificateFormType = {
  certificate: FileList
  password: string
}

export const CertificateUploadForm: React.FC<CertificateUploadFormProps> = ({ onSubmit, onReset, certificateAlreadyUploaded }) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: certificateFormError },
  } = useForm<CertificateFormType>()

  const handleFormSubmit = async ({ certificate, password }: CertificateFormType) => {
    const certificateData: ArrayBuffer = await readFileAsArrayBuffer(certificate[0])
    onSubmit(certificateData, password)
  }

  const onUploadedAnotherCertificate = async (): Promise<void> => {
    onReset()
    reset()
  }

  return (
    <StyledCertificateUpload>
      <StyledCertificateForm onSubmit={handleSubmit(handleFormSubmit)} id="uploadCertificateForm">
        <h3>{!certificateAlreadyUploaded ? t('practitioner.certificateUpload.titleUpload') : t('practitioner.certificateUpload.titlePassword')}</h3>

        <div className="inputs">
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
