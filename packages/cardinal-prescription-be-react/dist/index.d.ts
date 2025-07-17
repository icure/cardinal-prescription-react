import { SamText, SamV2Api, PaginatedListIterator, Amp, VmpGroup, Nmp, SamVersion, VmpStub, SupplyProblem, Commercialization, Reimbursement } from '@icure/cardinal-be-sam-sdk';
import { Medication, Duration, Code, HealthcareParty, Patient, Prescription } from '@icure/be-fhc-lite-api';
import React from 'react';

type AvailableLanguagesType = SamText['fr'] | SamText['en'] | SamText['nl'] | SamText['de'];
declare class CardinalLanguage {
    private language;
    setLanguage(language: string): void;
    getLanguage(): string;
}
declare const cardinalLanguage: CardinalLanguage;
declare const t: (key: string) => string;

/**
 * Search for medications matching the given query and language.
 * @param sdk
 * @param language Language code (e.g., 'en', 'fr', 'nl' or 'de')
 * @param query Medication search query string
 * @returns Paginated lists of AMP, VMPGroup, and NMP matches
 */
declare const findMedicationsByLabel: (sdk: SamV2Api, language: string, query: string) => Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]>;
/**
 * Fetch the current version information for the SAM database.
 */
declare const fetchSamVersion: (sdk: SamV2Api) => Promise<SamVersion | undefined>;

type DeliveryModusSpecificationCodeType = 'Sp' | 'Sp1' | 'Sp/S' | 'Sp1/S' | 'IMP/Sp' | 'IMP/Sp1';
type MedicationType = {
    ampId?: string;
    vmpGroupId?: string;
    nmpId?: string;
    cnk?: string;
    dmppProductId?: string;
    id?: string;
    title: string;
    vmpTitle?: string;
    activeIngredient?: string;
    price?: string;
    crmLink?: string;
    patientInformationLeafletLink?: string;
    blackTriangle?: boolean;
    speciallyRegulated?: number;
    genericPrescriptionRequired?: boolean;
    intendedName?: string;
    rmaProfessionalLink?: string;
    spcLink?: string;
    dhpcLink?: string;
    rmakeyMessages?: string;
    vmp?: VmpStub;
    supplyProblems?: SupplyProblem[];
    commercializations?: Commercialization[];
    deliveryModusCode?: string;
    deliveryModus?: string;
    deliveryModusSpecificationCode?: DeliveryModusSpecificationCodeType;
    deliveryModusSpecification?: string;
    reimbursements?: Reimbursement;
};
type PrescribedMedicationType = {
    uuid: string;
    medication: Medication;
    rid?: string;
    ampId?: string;
    cnk?: string;
    dmppProductId?: string;
    prescriberVisibility?: PractitionerVisibilityType;
    pharmacistVisibility?: PharmacistVisibilityType;
};

type ReimbursementType = null | Medication.InstructionsForReimbursementEnum;

type PractitionerVisibilityType = 'open' | 'locked' | 'gmd_prescriber';
type PharmacistVisibilityType = null | 'locked';

type PrescriptionFormType = {
    medicationTitle?: string;
    dosage?: string;
    duration?: number | Duration;
    durationTimeUnit?: string;
    treatmentStartDate?: string;
    executableUntil?: string;
    prescriptionsNumber?: number;
    periodicityTimeUnit?: string;
    periodicityDaysNumber?: number;
    substitutionAllowed?: boolean;
    recipeInstructionForPatient?: string;
    instructionsForReimbursement?: ReimbursementType;
    prescriberVisibility?: PractitionerVisibilityType;
    pharmacistVisibility?: PharmacistVisibilityType;
};

interface CertificateValidationResultType {
    keystoreUuid?: string;
    stsTokenId?: string;
    status: boolean;
    error?: SamText;
}

interface IconComponentBase {
    color?: string;
}

interface GenericStoreType<T> {
    get: (key: string) => Promise<T>;
    put: (key: string, value: T) => Promise<T>;
    delete: (key: string) => Promise<void>;
}
interface CertificateRecordType {
    id: string;
    salt: number[];
    iv: number[];
    encryptedCertificate: number[];
}

declare const loadCertificateInformation: (hcp_ssin: string) => Promise<{
    salt: ArrayBuffer;
    iv: ArrayBuffer;
    encryptedCertificate: ArrayBuffer;
} | undefined>;
declare const loadAndDecryptCertificate: (hcp_ssin: string, passphrase: string) => Promise<ArrayBuffer | undefined>;
declare const uploadAndEncryptCertificate: (hcp_ssin: string, passphrase: string, certificate: ArrayBuffer) => Promise<CertificateRecordType | undefined>;
declare const deleteCertificate: (hcp_ssin: string) => Promise<boolean>;

interface VendorType {
    vendorName: string;
    vendorEmail: string;
    vendorPhone: string;
}
interface SamPackageType {
    packageName: string;
    packageVersion: string;
}
interface FhcServiceConfig {
    vendor: VendorType;
    samPackage: SamPackageType;
}
declare const createFhcCode: (type: string, code: string, version?: string) => Code;
declare const sendRecipe: (config: FhcServiceConfig, samVersion: string, prescriber: HealthcareParty, patient: Patient, prescribedMedication: PrescribedMedicationType, passphrase: string) => Promise<Prescription[]>;
declare const verifyCertificateWithSts: (keystore: ArrayBuffer, prescriber: HealthcareParty, passphrase: string) => Promise<CertificateValidationResultType>;
declare const validateDecryptedCertificate: (hcp: HealthcareParty, passphrase: string) => Promise<CertificateValidationResultType>;

declare class IndexedDbServiceStore<T> {
    private readonly db;
    private readonly config;
    constructor(config: {
        DB_NAME: string;
        STORE_NAME: string;
        KEY_PATH: string;
    });
    get(key: string): Promise<T>;
    put(key: string, value: T): Promise<T>;
    delete(key: string): Promise<void>;
}

interface PractitionerCertificate {
    certificateValid: boolean;
    certificateUploaded: boolean;
    errorWhileVerifyingCertificate: string | undefined;
    onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void;
    onResetCertificate: () => void;
    onDecryptCertificate: (passphrase: string) => void;
}
declare const PractitionerCertificate: React.FC<PractitionerCertificate>;

export { type AvailableLanguagesType, type CertificateRecordType, type CertificateValidationResultType, type DeliveryModusSpecificationCodeType, type FhcServiceConfig, type GenericStoreType, type IconComponentBase, IndexedDbServiceStore, type MedicationType, type PharmacistVisibilityType, PractitionerCertificate, type PractitionerVisibilityType, type PrescribedMedicationType, type PrescriptionFormType, type ReimbursementType, type SamPackageType, type VendorType, cardinalLanguage, createFhcCode, deleteCertificate, fetchSamVersion, findMedicationsByLabel, loadAndDecryptCertificate, loadCertificateInformation, sendRecipe, t, uploadAndEncryptCertificate, validateDecryptedCertificate, verifyCertificateWithSts };
