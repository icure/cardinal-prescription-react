import { SamText, SamV2Api, PaginatedListIterator, Amp, VmpGroup, Nmp, SamVersion, VmpStub, SupplyProblem, Commercialization, Reimbursement } from '@icure/cardinal-be-sam-sdk';
export { PaginatedListIterator } from '@icure/cardinal-be-sam-sdk';
import { Medication, Code, HealthcareParty, Patient, Prescription } from '@icure/be-fhc-lite-api';
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

/**
 * Search for medications matching the given query, using the currently selected language.
 * @param sdk Instance of the SamV2Api sdk
 * @param query Medication search query string
 * @returns Paginated iterators of AMP, VMPGroup, and NMP matches
 */
declare const findMedicationsByLabel: (sdk: SamV2Api, query: string) => Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]>;
/**
 * Load cheaper alternative medications for a given VMP group code.
 */
declare const loadAlternativeMedications: (sdk: SamV2Api, vmpGroupCode: string) => Promise<PaginatedListIterator<Amp>>;
/**
 * Load the full VmpGroup (incl. standard dosages) for a given VMP group code.
 */
declare const loadVmpGroup: (sdk: SamV2Api, vmpGroupCode: string) => Promise<VmpGroup | undefined>;
/**
 * Fetch the current version information for the SAM database.
 */
declare const fetchSamVersion: (sdk: SamV2Api) => Promise<SamVersion | undefined>;

type PractitionerVisibilityType = 'open' | 'locked' | 'gmd_prescriber';
type PharmacistVisibilityType = null | 'locked';

type DeliveryModusSpecificationCodeType = 'Sp' | 'Sp1' | 'Sp/S' | 'Sp1/S' | 'IMP/Sp' | 'IMP/Sp1';
type Med = MedicationType | MedicationProductType;
interface MedicationType {
    ampId?: string;
    vmpGroupId?: string;
    nmpId?: string;
    cnk?: string;
    dmppProductId?: string;
    id?: string;
    index?: number;
    title: string;
    vmpTitle?: string;
    activeIngredient?: string;
    price?: string;
    cheap?: boolean;
    cheapest?: boolean;
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
    vmpGroup?: VmpGroup;
    supplyProblems?: SupplyProblem[];
    commercializations?: Commercialization[];
    deliveryModusCode?: string;
    deliveryModus?: string;
    deliveryModusSpecificationCode?: DeliveryModusSpecificationCodeType;
    deliveryModusSpecification?: string;
    reimbursements?: Reimbursement;
}
interface MedicationProductType {
    ampId: string;
    title: string;
    medications: MedicationType[];
}
interface PrescribedMedicationType {
    uuid: string;
    medication: Medication;
    rid?: string;
    ampId?: string;
    cnk?: string;
    dmppProductId?: string;
    prescriberVisibility?: PractitionerVisibilityType;
    pharmacistVisibility?: PharmacistVisibilityType;
}

interface CertificateValidationResultType {
    status: boolean;
    error?: SamText;
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

interface TokenStore {
    put: (key: string, value: string) => Promise<string>;
    get: (key: string) => Promise<string>;
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
declare const sendRecipe: (config: FhcServiceConfig, samVersion: string, prescriber: HealthcareParty, patient: Patient, prescribedMedication: PrescribedMedicationType, passphrase: string, fhc_url: string, cache: TokenStore) => Promise<Prescription[]>;
declare const verifyCertificateWithSts: (prescriber: HealthcareParty, passphrase: string, cache: TokenStore, fhc_url: string) => Promise<CertificateValidationResultType>;
declare const validateDecryptedCertificate: (hcp: HealthcareParty, passphrase: string, cache: TokenStore, fhc_url: string) => Promise<CertificateValidationResultType>;

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
/**
 * Create a ready-made {@link TokenStore} backed by IndexedDB, used to cache the
 * FHC keystore uuid / STS token between certificate validation and prescription
 * sending. Provided so consumers don't have to wire up their own store.
 */
declare const createIndexedDbTokenStore: () => TokenStore;

interface StandardDosageContext {
    ageInYears?: number;
    weightInKg?: number;
    renalFunctionMlPerMin?: number;
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
    sdk: SamV2Api;
    deliveryEnvironment: string;
    onAddPrescription: (medication: MedicationType, cheapAlternatives: MedicationType[]) => void;
    disableInputEventsTracking: boolean;
    short?: boolean;
}
declare const MedicationSearch: React.FC<MedicationSearchProps>;

interface Props {
    sdk: SamV2Api;
    medicationToPrescribe?: MedicationType;
    prescriptionToModify?: PrescribedMedicationType;
    alternativeCheapMedications?: MedicationType[];
    standardDosageContext?: StandardDosageContext;
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

export { type CertificateRecordType, type CertificateValidationResultType, type DeliveryModusSpecificationCodeType, type FhcServiceConfig, type GenericStoreType, IndexedDbServiceStore, type Med, type MedicationProductType, MedicationSearch, type MedicationType, type PharmacistVisibilityType, PractitionerCertificate, type PractitionerVisibilityType, type PrescribedMedicationType, PrescriptionList, PrescriptionModal, PrescriptionPrintModal, type SamPackageType, type StandardDosageContext, type TokenStore, type VendorType, cardinalLanguage, createFhcCode, createIndexedDbTokenStore, deleteCertificate, fetchSamVersion, findMedicationsByLabel, getSamTextTranslation, loadAlternativeMedications, loadAndDecryptCertificate, loadCertificateInformation, loadVmpGroup, sendRecipe, t, uploadAndEncryptCertificate, validateDecryptedCertificate, verifyCertificateWithSts };
