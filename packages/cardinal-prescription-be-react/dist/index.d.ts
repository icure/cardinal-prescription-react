import * as i18next_typescript_helpers from 'i18next/typescript/helpers';
import * as i18next from 'i18next';
import { SamText, SamV2Api, PaginatedListIterator, Amp, VmpGroup, Nmp, SamVersion, VmpStub, SupplyProblem, Commercialization, Reimbursement } from '@icure/cardinal-be-sam-sdk';
import { Medication, Duration, HealthcareParty, Patient, Prescription, Code } from '@icure/be-fhc-lite-api';
import React from 'react';

type AvailableLanguagesType = SamText['fr'] | SamText['en'] | SamText['nl'] | SamText['de'];
declare class I18nService {
    private static instance;
    private i18n;
    private constructor();
    static getInstance(): I18nService;
    setLanguage(lang: AvailableLanguagesType): Promise<i18next.TFunction<"translation", undefined>>;
    getCurrentLanguage(): string;
    t(key: string, options?: any): string | i18next_typescript_helpers.$SpecialObject | i18next.TFunctionDetailedResult<string | i18next_typescript_helpers.$SpecialObject, any>;
}

declare class SamSdkService {
    private sdk;
    constructor(sdk: SamV2Api);
    /**
     * Search for medications matching the given query and language.
     * @param language Language code (e.g., 'en', 'fr', 'nl' or 'de')
     * @param query Medication search query string
     * @returns Paginated lists of AMP, VMPGroup, and NMP matches
     */
    findMedicationsByLabel(language: string, query: string): Promise<[PaginatedListIterator<Amp>, PaginatedListIterator<VmpGroup>, PaginatedListIterator<Nmp>]>;
    /**
     * Fetch the current version information for the SAM database.
     */
    fetchSamVersion(): Promise<SamVersion | undefined>;
}

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

declare class CertificateService {
    private indexedDbService;
    private certificateStore;
    constructor();
    /** You MUST call this before using any instance methods. */
    initialize(): Promise<void>;
    loadCertificateInformation(hcp_ssin: string): Promise<{
        salt: ArrayBuffer;
        iv: ArrayBuffer;
        encryptedCertificate: ArrayBuffer;
    } | undefined>;
    loadAndDecryptCertificate(hcp_ssin: string, passphrase: string): Promise<ArrayBuffer | undefined>;
    uploadAndEncryptCertificate(hcp_ssin: string, passphrase: string, certificate: ArrayBuffer): Promise<CertificateRecordType | undefined>;
    deleteCertificate(hcp_ssin: string): Promise<boolean>;
    private saveCertificateInStore;
    private getCertificateFromStore;
    private deleteCertificateFromStore;
}

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
declare class FhcService {
    private tokenStore;
    private certificateService;
    private indexedDbService;
    private vendor;
    private samPackage;
    private constructor();
    static initialize(config: FhcServiceConfig, certificateService: CertificateService): Promise<FhcService>;
    sendRecipe(samVersion: string, prescriber: HealthcareParty, patient: Patient, prescribedMedication: PrescribedMedicationType, passphrase: string): Promise<Prescription[]>;
    verifyCertificateWithSts(prescriber: HealthcareParty, passphrase: string): Promise<CertificateValidationResultType>;
    validateDecryptedCertificate(hcp: HealthcareParty, passphrase: string): Promise<CertificateValidationResultType>;
    createFhcCode(type: string, code: string, version?: string): Code;
    private getTokenFromStore;
    private saveTokenInStore;
    private loadAndDecryptCertificate;
    private buildTokenStorageKeys;
    private makePrescriptionRequest;
}

declare class IndexedDbService {
    private db;
    private readonly config;
    constructor(config: {
        DB_NAME: string;
        STORE_NAME: string;
        KEY_PATH: string;
    });
    initializeIndexedDb(): Promise<void>;
    getIndexedDb(): IDBDatabase;
    getIndexedDbStore<T>(): GenericStoreType<T>;
}

interface PractitionerCertificate {
    certificateValid: boolean;
    certificateUploaded: boolean;
    errorWhileVerifyingCertificate: string | undefined;
    onUploadCertificate: (certificateData: ArrayBuffer, passphrase: string) => void;
    onResetCertificate: () => void | Promise<void>;
}
declare const PractitionerCertificate: React.FC<PractitionerCertificate>;

export { type CertificateRecordType, CertificateService, type CertificateValidationResultType, type DeliveryModusSpecificationCodeType, FhcService, type GenericStoreType, I18nService, type IconComponentBase, IndexedDbService, type MedicationType, type PharmacistVisibilityType, PractitionerCertificate, type PractitionerVisibilityType, type PrescribedMedicationType, type PrescriptionFormType, type ReimbursementType, SamSdkService };
