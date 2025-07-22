import React, { useEffect, useState } from 'react'
import { openCertificatesDatabase, uploadAndEncrypt } from '../../../services/fhc'
import Button from '../../form-elements/Button'
import TextInput from '../../form-elements/TextInput'
import './index.scss'

interface CertificateUploadProps {
  handleSave: (id: string, passphrase: string) => void
}

const CertificateUpload: React.FC<CertificateUploadProps> = ({ handleSave }) => {
  const [password, setPassword] = useState('')
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [db, setDb] = useState<IDBDatabase | undefined>()

  useEffect(() => {
    openCertificatesDatabase().then((database) => setDb(database))
  }, [])

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!db) {
      alert('Database not initialized')
      return
    }
    if (!certificateFile || !password) {
      alert('Please upload a certificate and set a password.')
      return
    }
    const certificateData = await readFileAsArrayBuffer(certificateFile)
    const id = await uploadAndEncrypt(db, certificateFile.name.split('=')[1]?.split(' ')[0], password, certificateData)
    handleSave(id, password)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateFile(event.target.files ? event.target.files[0] : null)
  }

  function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })
  }

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%', minWidth: 700 }}>
      <div>
        <TextInput label="Upload Certificate" type="file" id="certificate" accept=".p12,.acc-p12" onChange={handleFileChange} required />
      </div>
      <div>
        <TextInput label="Certificate Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button title="Encrypt & Upload" type="submit" view="primary" />
    </form>
  )
}

export default CertificateUpload
