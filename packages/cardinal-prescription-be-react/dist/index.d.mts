import { SamText, VmpStub, VmpGroup, SupplyProblem, Commercialization, Reimbursement, SamV2Api, PaginatedListIterator, Amp, Nmp, SamVersion } from '@icure/cardinal-be-sam-sdk';
export { PaginatedListIterator } from '@icure/cardinal-be-sam-sdk';
import { MedIndexClient } from '@icure/medindex-sdk';
import { Medication, Code, HealthcareParty, Patient, Prescription } from '@icure/be-fhc-lite-api';
import React, { RefObject, FC } from 'react';

type SamLanguage = keyof SamText;
declare class CardinalLanguage {
    private language;
    setLanguage(language: SamLanguage): void;
    getLanguage(): SamLanguage;
}
declare const cardinalLanguage: CardinalLanguage;
declare const t: (key: string) => string;
declare const getSamTextTranslation: (samText?: SamText) => string | undefined;

type PractitionerVisibilityType = 'open' | 'locked' | 'gmd_prescriber';
type PharmacistVisibilityType = null | 'locked';

type DeliveryModusSpecificationCodeType = 'Sp' | 'Sp1' | 'Sp/S' | 'Sp1/S' | 'IMP/Sp' | 'IMP/Sp1';
type Med = MedicationType | MedicationProductType;
type MedicationKind = 'product' | 'molecule' | 'nonMedicinal';
interface BeRegulatoryFields {
    ampId?: string;
    vmpGroupId?: string;
    nmpId?: string;
    cnk?: string;
    dmppProductId?: string;
    vmpTitle?: string;
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
interface ChPriceType {
    amount: number;
    currency: 'CHF';
}
interface ChRegulatoryFields {
    pharmacode?: string;
    gtin?: string[];
    swissmedicCategory?: string;
    price?: ChPriceType;
    narcotic?: boolean;
    coldChain?: boolean;
    genericGroup?: string;
}
interface MedicationType {
    id?: string;
    kind?: MedicationKind;
    title: string;
    activeIngredient?: string;
    index?: number;
    regulatory?: {
        be?: BeRegulatoryFields;
        ch?: ChRegulatoryFields;
    };
}
interface MedicationProductType {
    id: string;
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

/**
 * Country-agnostic medication lookup contract. Each country's concrete provider
 * (`SamMedicationProvider`, `MedIndexMedicationProvider`, ...) wraps its own backend and its
 * own pagination, but yields a single merged, sorted stream of `Med` — callers never see a
 * source's internal bucketing (e.g. SAM's AMP/VMP-group/NMP split).
 *
 * `enrichForPrescription`/`loadCheapAlternatives` are optional because they're only meaningful
 * for a country with a reimbursement-driven prescription-sending flow (`be`, via VMP groups) —
 * a provider for a country without that concept (e.g. `ch`'s medINDEX) simply omits them, and
 * callers get no enrichment/no alternatives, which is the correct behavior there.
 */
interface MedicationProvider {
    findByLabel(label: string): AsyncIterable<Med>;
    enrichForPrescription?(medication: MedicationType): Promise<MedicationType>;
    loadCheapAlternatives?(medication: MedicationType): Promise<MedicationType[]>;
}
/**
 * Base of this library's own error hierarchy for medication lookup. Concrete providers
 * translate their backend's native errors into one of the subclasses below at the boundary,
 * so callers can handle failures the same way regardless of which country's source is active.
 */
declare class MedicationProviderError extends Error {
    readonly cause?: unknown;
    constructor(message: string, cause?: unknown);
}
/** The requested medication (or lookup target, e.g. a VMP group code) does not exist. */
declare class MedicationNotFoundError extends MedicationProviderError {
}
/** The search input was rejected by the provider as malformed (e.g. a label that's too short). */
declare class MedicationSearchValidationError extends MedicationProviderError {
}
/**
 * The provider could not be reached or failed unexpectedly. Deliberately collapses a
 * backend's server-vs-network distinction (e.g. medINDEX's `MedIndexServerError` /
 * `MedIndexNetworkError`) — callers only need "try again later," not the exact cause.
 */
declare class MedicationProviderUnavailableError extends MedicationProviderError {
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

/**
 * Belgian `MedicationProvider`, wrapping SAM's AMP/VMP-group/NMP search + the existing
 * paginated loaders. `MedicationSearch`'s current three-lane merge (AMP/products,
 * VMP-group/molecules, NMP/non-medicinal via `mergeLazySortedNamedItems`) is an internal
 * concern here — callers of `findByLabel` only ever see one merged, sorted `Med` stream.
 *
 * `findByLabel` is a genuinely lazy async generator: it fetches one merged page (`loadMore`'s
 * `limit`) at a time and only asks for the next page once the consumer's `for await` pulls
 * past what's already been yielded — mirroring the incremental loading `InfiniteScroll`
 * currently drives by hand.
 */
declare class SamMedicationProvider implements MedicationProvider {
    private readonly sdk;
    private readonly deliveryEnvironment;
    constructor(sdk: SamV2Api, deliveryEnvironment: string);
    findByLabel(label: string): AsyncIterable<Med>;
    /**
     * Enriches a selected medication with its full VMP group (incl. standard dosages) ahead of
     * prescribing — moved here verbatim from `MedicationSearch`'s old `handleAddPrescription`,
     * which read `sdk` directly before this provider abstraction existed.
     */
    enrichForPrescription(medication: MedicationType): Promise<MedicationType>;
    /**
     * Loads cheaper alternatives sharing the medication's VMP group — same gating (already-cheap
     * medications have none) and cheap/cheapest filter as the pre-abstraction implementation.
     */
    loadCheapAlternatives(medication: MedicationType): Promise<MedicationType[]>;
    private searchByLabel;
    private loadNextPage;
}

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

/**
 * Swiss `MedicationProvider`, wrapping medINDEX's single product search stream. Unlike SAM's
 * three-lane AMP/VMP-group/NMP merge, medINDEX has only one product-level concept — `findByLabel`
 * adapts one already-ordered source stream instead of merging several, trusting the SDK's own
 * ordering the same way `SamMedicationProvider` trusts each of its three SAM lanes.
 *
 * `enrichForPrescription`/`loadCheapAlternatives` are intentionally left unimplemented: there is
 * no Swiss prescription-transmission or reimbursement-driven cheap-alternatives concept this
 * phase (see docs/plan.md's "ch scope this phase" decision) — the interface already treats both
 * as optional for exactly this reason.
 */
declare class MedIndexMedicationProvider implements MedicationProvider {
    private readonly client;
    constructor(client: MedIndexClient);
    findByLabel(label: string): AsyncIterable<Med>;
    /**
     * Pulls product chunks from the source and maps each surviving one into a `MedicationProductType`,
     * recursing for another chunk whenever filtering (inactive products/packages) leaves fewer
     * qualifying results than `PAGE_SIZE` and the source isn't exhausted yet — mirrors
     * `loadMedicationsPage`'s own recursion for the same "don't dribble out a near-empty page" reason.
     */
    private loadNextPage;
    /** Returns `null` (filtered out) once none of a product's packages are active — mirroring how
     * `loadMedicationsPage` returns `null` for an AMP whose AMPPs are all undeliverable. */
    private toMedicationProductType;
    private pullProducts;
    /** One batched `byProductIds` call per chunk, not one call per product — the whole point of
     * pulling products in chunks in the first place. */
    private fetchPackagesByProduct;
    private translateError;
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

type RegulatoryBadgePlacement = 'summary' | 'detail';
interface RegulatoryBadgeProps {
    medication: MedicationType;
    boundaryBox?: RefObject<HTMLElement>;
}
type RegulatoryBadgeComponent = FC<RegulatoryBadgeProps>;
interface RegisteredRegulatoryBadge {
    key: string;
    Component: RegulatoryBadgeComponent;
}
declare function registerRegulatoryBadge(country: string, key: string, Component: RegulatoryBadgeComponent, placement: RegulatoryBadgePlacement): void;
declare function getRegulatoryBadges(country: string, placement: RegulatoryBadgePlacement): RegisteredRegulatoryBadge[];

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
    medicationProvider: MedicationProvider;
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

export { type BeRegulatoryFields, type CertificateRecordType, type CertificateValidationResultType, type ChPriceType, type ChRegulatoryFields, type DeliveryModusSpecificationCodeType, type FhcServiceConfig, type GenericStoreType, IndexedDbServiceStore, type Med, MedIndexMedicationProvider, type MedicationKind, MedicationNotFoundError, type MedicationProductType, type MedicationProvider, MedicationProviderError, MedicationProviderUnavailableError, MedicationSearch, MedicationSearchValidationError, type MedicationType, type PharmacistVisibilityType, PractitionerCertificate, type PractitionerVisibilityType, type PrescribedMedicationType, PrescriptionList, PrescriptionModal, PrescriptionPrintModal, type RegisteredRegulatoryBadge, type RegulatoryBadgeComponent, type RegulatoryBadgePlacement, type RegulatoryBadgeProps, SamMedicationProvider, type SamPackageType, type StandardDosageContext, type TokenStore, type VendorType, cardinalLanguage, createFhcCode, createIndexedDbTokenStore, deleteCertificate, fetchSamVersion, findMedicationsByLabel, getRegulatoryBadges, getSamTextTranslation, loadAlternativeMedications, loadAndDecryptCertificate, loadCertificateInformation, loadVmpGroup, registerRegulatoryBadge, sendRecipe, t, uploadAndEncryptCertificate, validateDecryptedCertificate, verifyCertificateWithSts };
