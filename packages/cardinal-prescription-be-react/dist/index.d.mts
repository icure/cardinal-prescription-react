import { SamText, IccBesamv2Api, Amp, VmpGroup, Nmp, SamVersion, VmpStub, SupplyProblem, Commercialization, Reimbursement } from '@icure/api';
import { Medication, Duration, Code, HealthcareParty, Patient, Prescription } from '@icure/be-fhc-lite-api';
import { StandardDosage } from '@icure/api/icc-api/model/StandardDosage';
import React from 'react';

type SamLanguage = keyof SamText;
declare class CardinalLanguage {
    private language;
    setLanguage(language: SamLanguage): void;
    getLanguage(): SamLanguage;
}
declare const cardinalLanguage: CardinalLanguage;
declare const t: (key: string) => string;
declare const getSamTextTranslation: (samText?: SamText) => string | undefined;

interface PaginatedList<K, T> {
    pageSize?: number;
    totalSize?: number;
    rows?: Array<T>;
    nextKeyPair?: {
        startKey?: K;
        startKeyDocId?: string;
    };
}
declare class PaginatedListIterator<K, T> {
    private loader;
    private limit;
    private hasNextPage;
    private currentList;
    constructor(loader: (limit: number, startKey?: K, startDocumentId?: string) => Promise<PaginatedList<K, T>>);
    hasNext(): Promise<boolean>;
    next(limit: number): Promise<Array<T>>;
}
declare const findMedicationsByLabel: (sdk: IccBesamv2Api, query: string) => Promise<[PaginatedListIterator<string, Amp>, PaginatedListIterator<string, VmpGroup>, PaginatedListIterator<string, Nmp>]>;
/**
 * Fetch the current version information for the SAM database.
 */
declare const fetchSamVersion: (sdk: IccBesamv2Api) => Promise<SamVersion | undefined>;

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
    deliveryModusSpecificationCode?: string;
    deliveryModusSpecification?: string;
    reimbursements?: Reimbursement;
    standardDosage?: StandardDosage[];
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
declare const sendRecipe: (config: FhcServiceConfig, samVersion: string, prescriber: HealthcareParty, patient: Patient, prescribedMedication: PrescribedMedicationType, passphrase: string, fhc_url: string) => Promise<Prescription[]>;
declare const verifyCertificateWithSts: (keystore: ArrayBuffer, prescriber: HealthcareParty, passphrase: string, fhc_url: string) => Promise<CertificateValidationResultType>;
declare const validateDecryptedCertificate: (hcp: HealthcareParty, passphrase: string, fhc_url: string) => Promise<CertificateValidationResultType>;

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

interface MedicationSearchProps {
    sdk: IccBesamv2Api;
    deliveryEnvironment: string;
    onAddPrescription: (medication: MedicationType) => void;
    disableInputEventsTracking: boolean;
    short?: boolean;
}
declare const MedicationSearch: React.FC<MedicationSearchProps>;

interface Props {
    medicationToPrescribe?: MedicationType;
    prescriptionToModify?: PrescribedMedicationType;
    onClose: () => void;
    onSubmit: (meds: PrescribedMedicationType[]) => void;
    modalMood: 'create' | 'modify';
}
declare const PrescriptionModal: React.FC<Props>;

interface PrescriptionListProps {
    handleModifyPrescription: (medication: PrescribedMedicationType) => void;
    handleDeletePrescription: (medication: PrescribedMedicationType) => void;
    prescribedMedications: PrescribedMedicationType[];
    handleSendPrescriptions?: () => Promise<void>;
    handlePrintPrescriptions?: () => Promise<void>;
    hideSectionsTitles?: boolean;
}
declare const PrescriptionList: React.FC<PrescriptionListProps>;

interface PrintPrescriptionModalProps {
    closeModal: () => void;
    prescribedMedications: PrescribedMedicationType[];
    prescriber: HealthcareParty;
    patient: Patient;
}
declare const PrescriptionPrintModal: React.FC<PrintPrescriptionModalProps>;

export { type CertificateRecordType, type CertificateValidationResultType, type FhcServiceConfig, type GenericStoreType, type IconComponentBase, IndexedDbServiceStore, MedicationSearch, type MedicationType, PaginatedListIterator, type PharmacistVisibilityType, PractitionerCertificate, type PractitionerVisibilityType, type PrescribedMedicationType, type PrescriptionFormType, PrescriptionList, PrescriptionModal, PrescriptionPrintModal, type ReimbursementType, type SamPackageType, type VendorType, cardinalLanguage, createFhcCode, deleteCertificate, fetchSamVersion, findMedicationsByLabel, getSamTextTranslation, loadAndDecryptCertificate, loadCertificateInformation, sendRecipe, t, uploadAndEncryptCertificate, validateDecryptedCertificate, verifyCertificateWithSts };
