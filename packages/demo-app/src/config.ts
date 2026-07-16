// Demo-app runtime configuration.
//
// Credentials and environment URLs are read from environment variables so that
// nothing sensitive is committed. Copy `.env.example` to `.env.local` and fill
// in your own values (see the file for how to obtain a practitioner token).
//
// To create the credentials below:
// 1. Go to https://cockpit.icure.dev/ — the management platform for Cardinal.
// 2. Register and log in.
// 3. Create a solution, then a database, and then a healthcare professional (HCP).
// 4. For this HCP, generate an Active Authentication Token.
// 5. Use the HCP's email address as the username, and the token as the password.

const required = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing required environment variable ${name}. Copy .env.example to .env.local and fill it in.`)
  }
  return value
}

export const practitionerCredentials = {
  username: required('VITE_ICURE_USERNAME', import.meta.env.VITE_ICURE_USERNAME),
  password: required('VITE_ICURE_PASSWORD', import.meta.env.VITE_ICURE_PASSWORD),
}

export const ICURE_URL = import.meta.env.VITE_ICURE_URL ?? 'https://nightly.icure.cloud'
export const FHC_URL = import.meta.env.VITE_FHC_URL ?? 'https://fhcacc.icure.cloud'
export const CARDINAL_PRESCRIPTION_LANGUAGE = (import.meta.env.VITE_CARDINAL_LANGUAGE ?? 'fr') as 'fr' | 'nl' | 'de' | 'en'
