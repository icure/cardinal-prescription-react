var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  HOST_SLOT_ATTRIBUTE: () => HOST_SLOT_ATTRIBUTE,
  IndexedDbServiceStore: () => IndexedDbServiceStore,
  LIBRARY_ROOT_CLASS: () => LIBRARY_ROOT_CLASS,
  MedIndexMedicationProvider: () => MedIndexMedicationProvider,
  MedicationCard: () => MedicationCard,
  MedicationNotFoundError: () => MedicationNotFoundError,
  MedicationProviderError: () => MedicationProviderError,
  MedicationProviderUnavailableError: () => MedicationProviderUnavailableError,
  MedicationSearch: () => MedicationSearch,
  MedicationSearchValidationError: () => MedicationSearchValidationError,
  MissingStsTokenError: () => MissingStsTokenError,
  PractitionerCertificate: () => PractitionerCertificate,
  PrescriptionList: () => PrescriptionList,
  PrescriptionModal: () => PrescriptionModal,
  PrescriptionPrintModal: () => PrescriptionPrintModal,
  SamMedicationProvider: () => SamMedicationProvider,
  THEME_PREFIX: () => THEME_PREFIX,
  cardinalLanguage: () => cardinalLanguage,
  createFhcCode: () => createFhcCode,
  createIndexedDbTokenStore: () => createIndexedDbTokenStore,
  createMedicationProvider: () => createMedicationProvider,
  deleteCertificate: () => deleteCertificate,
  fetchSamVersion: () => fetchSamVersion,
  findMedicationsByLabel: () => findMedicationsByLabel,
  getRegulatoryBadges: () => getRegulatoryBadges,
  getSamTextTranslation: () => getSamTextTranslation,
  loadAlternativeMedications: () => loadAlternativeMedications,
  loadAndDecryptCertificate: () => loadAndDecryptCertificate,
  loadCertificateInformation: () => loadCertificateInformation,
  loadVmpGroup: () => loadVmpGroup,
  registerRegulatoryBadge: () => registerRegulatoryBadge,
  sendRecipe: () => sendRecipe,
  t: () => t,
  themeTokens: () => themeTokens,
  uploadAndEncryptCertificate: () => uploadAndEncryptCertificate,
  validateDecryptedCertificate: () => validateDecryptedCertificate,
  verifyCertificateWithSts: () => verifyCertificateWithSts
});
module.exports = __toCommonJS(index_exports);

// src/shared/services/regulatory-badges/index.ts
var registry = /* @__PURE__ */ new Map();
function registerRegulatoryBadge(country, key, Component, placement) {
  const byPlacement = registry.get(country) ?? /* @__PURE__ */ new Map();
  registry.set(country, byPlacement);
  const byKey = byPlacement.get(placement) ?? /* @__PURE__ */ new Map();
  byPlacement.set(placement, byKey);
  byKey.set(key, Component);
}
function getRegulatoryBadges(country, placement) {
  const byKey = registry.get(country)?.get(placement);
  return byKey ? Array.from(byKey, ([key, Component]) => ({ key, Component })) : [];
}

// src/internal/translations/components/home.translations.ts
var homeTranslations = {
  fr: {
    samVersionLabel: "Version Sam :"
  },
  en: {
    samVersionLabel: "Sam version:"
  },
  nl: {
    samVersionLabel: "Sam-versie:"
  },
  de: {
    samVersionLabel: "Sam-version:"
  }
};

// src/internal/translations/components/prescription.translations.ts
var prescriptionTranslations = {
  fr: {
    createTitle: "Cr\xE9er la prescription",
    closeDialog: "Fermer la fen\xEAtre",
    modifyTitle: "Modifier la prescription",
    pdf: {
      title: "PREUVE DE PRESCRIPTION ELECTRONIQUE",
      instructions: "Veuillez pr\xE9senter ce document \xE0 votre pharmacien pour scanner le code-barres et vous d\xE9livrer les m\xE9dicaments prescrits.",
      options: {
        title: "De quelles options disposez-vous pour vous rendre \xE0 la pharmacie si vous avez perdu ce document ?",
        option1: "Via Masant\xE9.be - MyHealthViewer - App MesM\xE9dicaments ou toute autre App, vous pouvez montrer votre prescription au pharmacien, qui lira le code-barres.",
        option2: "Vous pouvez \xE9galement aller chercher les produits prescrits avec votre eID (ou votre num\xE9ro de registre national si votre eID a \xE9t\xE9 lue par le pharmacien qui vous d\xE9livre les produits dans les 15 mois pr\xE9c\xE9dents)."
      },
      prescriber: "Prescripteur",
      patient: "B\xE9n\xE9ficiaire",
      electronicContent: "Contenu de la prescription \xE9lectronique:",
      product: "Produit:",
      dosage: "Posologie:",
      date: "Date:",
      validUntil: "Date de fin pour l'ex\xE9cution:"
    },
    list: {
      sentTitle: "Ordonnances envoy\xE9es:",
      pendingTitle: "Ordonnances en attente:",
      print: "Imprimer",
      send: "Envoyer",
      sendAndPrint: "Envoyer et imprimer",
      modify: "Modifier",
      delete: "Supprimer"
    },
    form: {
      medicationTitle: "Nom du groupe DCI",
      dosage: "Posologie",
      duration: "Dur\xE9e (nombre d\u2019unit\xE9s)",
      durationTimeUnit: "Unit\xE9 de temps",
      treatmentStartDate: "Date d\xE9but du traitement",
      executableUntil: "Ex\xE9cutable jusqu`au",
      prescriptionsNumber: "Nombre de prescriptions",
      periodicityTimeUnit: "P\xE9riodicit\xE9",
      periodicityDaysNumber: "Nombre de jours",
      substitutionAllowed: "Substitution autoris\xE9e",
      substitutionYes: "Oui",
      substitutionNo: "Non",
      toggleExtraFields: "Afficher plus",
      patientInstructions: "Instructions pour le patient",
      reimbursementInstructions: "Instructions remboursement",
      prescriberVisibility: "Visibilit\xE9 prescripteur",
      pharmacistVisibility: "Visibilit\xE9 officine",
      cancel: "Annuler",
      submit: "Soumettre",
      fieldRequired: "Ce champ est requis",
      fieldInvalid: "Champ invalide",
      instructionLabelNone: "Aucun",
      posologySuggestions: "Suggestions de posologie"
    }
  },
  en: {
    createTitle: "Create prescription",
    closeDialog: "Close dialog",
    modifyTitle: "Modify prescription",
    pdf: {
      title: "PROOF OF ELECTRONIC PRESCRIPTION",
      instructions: "Please present this document to your pharmacist to scan the barcode and dispense the prescribed medication.",
      options: {
        title: "What are your options if you lost this document?",
        option1: "Via Masant\xE9.be - MyHealthViewer - MyMeds App or any other app, you can show your prescription to the pharmacist who will scan the barcode.",
        option2: "You can also collect the prescribed products with your eID (or your national register number if your eID was read by the pharmacist who dispenses the products within the last 15 months)."
      },
      prescriber: "Prescriber",
      patient: "Beneficiary",
      electronicContent: "Electronic prescription content:",
      product: "Product:",
      dosage: "Dosage:",
      date: "Date:",
      validUntil: "Valid until:"
    },
    list: {
      sentTitle: "Sent prescriptions:",
      pendingTitle: "Pending prescriptions:",
      print: "Print",
      send: "Send",
      sendAndPrint: "Send and print",
      modify: "Edit",
      delete: "Delete"
    },
    form: {
      medicationTitle: "DCI group name",
      dosage: "Dosage",
      duration: "Duration (number of units)",
      durationTimeUnit: "Time unit",
      treatmentStartDate: "Start date of treatment",
      executableUntil: "Executable until",
      prescriptionsNumber: "Number of prescriptions",
      periodicityTimeUnit: "Periodicity",
      periodicityDaysNumber: "Number of days",
      substitutionAllowed: "Substitution allowed",
      substitutionYes: "Yes",
      substitutionNo: "No",
      toggleExtraFields: "Show more",
      patientInstructions: "Instructions for the patient",
      reimbursementInstructions: "Reimbursement instructions",
      prescriberVisibility: "Prescriber visibility",
      pharmacistVisibility: "Pharmacist visibility",
      cancel: "Cancel",
      submit: "Submit",
      fieldRequired: "This field is required",
      fieldInvalid: "Invalid field",
      instructionLabelNone: "None",
      posologySuggestions: "Posology suggestions"
    }
  },
  nl: {
    createTitle: "Voorschrift aanmaken",
    closeDialog: "Venster sluiten",
    modifyTitle: "Voorschrift bewerken",
    pdf: {
      title: "BEWIJS VAN ELEKTRONISCH VOORSCHRIFT",
      instructions: "Gelieve dit document aan uw apotheker te tonen zodat hij/zij de barcode kan scannen en de voorgeschreven geneesmiddelen kan afleveren.",
      options: {
        title: "Welke opties hebt u om naar de apotheek te gaan als u dit document bent verloren?",
        option1: "Via Masant\xE9.be - MyHealthViewer - MijnGeneesmiddelen-app of een andere app, kunt u uw voorschrift tonen aan de apotheker, die de barcode zal scannen.",
        option2: "U kunt de voorgeschreven producten ook afhalen met uw eID (of uw rijksregisternummer als uw eID werd uitgelezen door de apotheker die de producten aflevert binnen de laatste 15 maanden)."
      },
      prescriber: "Voorschrijver",
      patient: "Begunstigde",
      electronicContent: "Inhoud van het elektronisch voorschrift:",
      product: "Product:",
      dosage: "Dosering:",
      date: "Datum:",
      validUntil: "Uitvoerbaar tot:"
    },
    list: {
      sentTitle: "Verzonden voorschriften:",
      pendingTitle: "Voorschriften in afwachting:",
      print: "Afdrukken",
      send: "Verzenden",
      sendAndPrint: "Verzenden en afdrukken",
      modify: "Wijzigen",
      delete: "Verwijderen"
    },
    form: {
      medicationTitle: "Naam van DCI-groep",
      dosage: "Dosering",
      duration: "Duur (aantal eenheden)",
      durationTimeUnit: "Tijdseenheid",
      treatmentStartDate: "Startdatum van behandeling",
      executableUntil: "Uitvoerbaar tot",
      prescriptionsNumber: "Aantal voorschriften",
      periodicityTimeUnit: "Periodiciteit",
      periodicityDaysNumber: "Aantal dagen",
      substitutionAllowed: "Vervanging toegestaan",
      substitutionYes: "Ja",
      substitutionNo: "Nee",
      toggleExtraFields: "Meer weergeven",
      patientInstructions: "Instructies voor de pati\xEBnt",
      reimbursementInstructions: "Instructies voor terugbetaling",
      prescriberVisibility: "Zichtbaarheid voor de voorschrijver",
      pharmacistVisibility: "Zichtbaarheid voor de apotheker",
      cancel: "Annuleren",
      submit: "Indienen",
      fieldRequired: "Dit veld is verplicht",
      fieldInvalid: "Ongeldig veld",
      instructionLabelNone: "Geen",
      posologySuggestions: "Doseringsvoorstellen"
    }
  },
  de: {
    createTitle: "Rezept erstellen",
    closeDialog: "Fenster schlie\xDFen",
    modifyTitle: "Rezept bearbeiten",
    pdf: {
      title: "NACHWEIS DES ELEKTRONISCHEN REZEPTS",
      instructions: "Bitte legen Sie dieses Dokument Ihrem Apotheker vor, damit er den Barcode scannen und die verschriebenen Medikamente abgeben kann.",
      options: {
        title: "Welche M\xF6glichkeiten haben Sie, wenn Sie dieses Dokument verloren haben?",
        option1: "\xDCber Masant\xE9.be \u2013 MyHealthViewer \u2013 MeineMedikamente-App oder eine andere App k\xF6nnen Sie Ihr Rezept dem Apotheker zeigen, der den Barcode scannt.",
        option2: "Sie k\xF6nnen die verschriebenen Produkte auch mit Ihrem eID (oder Ihrer nationalen Registernummer, falls Ihre eID vom Apotheker, der Ihnen in den letzten 15 Monaten Produkte ausgeh\xE4ndigt hat, gelesen wurde) abholen."
      },
      prescriber: "Verschreiber",
      patient: "Empf\xE4nger",
      electronicContent: "Inhalt des elektronischen Rezepts:",
      product: "Produkt:",
      dosage: "Dosierung:",
      date: "Datum:",
      validUntil: "G\xFCltig bis:"
    },
    list: {
      sentTitle: "Versendete Rezepte:",
      pendingTitle: "Ausstehende Rezepte:",
      print: "Drucken",
      send: "Senden",
      sendAndPrint: "Senden und drucken",
      modify: "Bearbeiten",
      delete: "L\xF6schen"
    },
    form: {
      medicationTitle: "Name der DCI-Gruppe",
      dosage: "Dosierung",
      duration: "Dauer (Anzahl der Einheiten)",
      durationTimeUnit: "Zeiteinheit",
      treatmentStartDate: "Behandlungsbeginn",
      executableUntil: "Ausf\xFChrbar bis",
      prescriptionsNumber: "Anzahl der Rezepte",
      periodicityTimeUnit: "Periodizit\xE4t",
      periodicityDaysNumber: "Anzahl der Tage",
      substitutionAllowed: "Substitution erlaubt",
      substitutionYes: "Ja",
      substitutionNo: "Nein",
      toggleExtraFields: "Mehr anzeigen",
      patientInstructions: "Anweisungen f\xFCr den Patienten",
      reimbursementInstructions: "Anweisungen zur Erstattung",
      prescriberVisibility: "Sichtbarkeit f\xFCr den Verschreiber",
      pharmacistVisibility: "Sichtbarkeit f\xFCr den Apotheker",
      cancel: "Abbrechen",
      submit: "Absenden",
      fieldRequired: "Dieses Feld ist erforderlich",
      fieldInvalid: "Ung\xFCltiges Feld",
      instructionLabelNone: "Keine",
      posologySuggestions: "Dosierungsvorschl\xE4ge"
    }
  }
};

// src/internal/translations/components/medication.translations.ts
var medicationTranslations = {
  fr: {
    yes: "Oui",
    no: "Non",
    drugType: {
      medication: "M\xE9dicament",
      molecule: "Mol\xE9cule",
      homologation: "Homologation"
    },
    drugInfographic: {
      blackTriangle: "Pharmacovigilance renforc\xE9e (Triangle noir)",
      rma: "Activit\xE9s additionnelles de minimisation des risques ou additional RMA (Risk Minimisation Activities) (Source: AFMPS)",
      genericPrescriptionRequired: "Ordonnance g\xE9n\xE9rique requise",
      cheap: "Bon march\xE9 :",
      cheapTitle: 'Cat\xE9gorie des m\xE9dicaments "bon march\xE9" :',
      cheapDescription: "M\xE9dicament class\xE9 dans la cat\xE9gorie des m\xE9dicaments bon march\xE9",
      notCheapDescription: `M\xE9dicament n'appartenant pas \xE0 la cat\xE9gorie des m\xE9dicaments "bon march\xE9"`,
      cheapest: "Le moins cher",
      cheapAlternativesMessage: "Ce m\xE9dicament n'est pas class\xE9 comme bon march\xE9. Souhaitez-vous voir des alternatives moins ch\xE8res ?",
      otherCheapAlternativesMessage: "Voici d'autres alternatives bon march\xE9 pour ce m\xE9dicament :",
      standardDosagesMessage: "Posologie sugg\xE9r\xE9e"
    },
    drugSpecialRegulation: {
      noNarcoticRegulation: "Aucun stup\xE9fiant, m\xE9dicament soumis \xE0 r\xE9glementation particuli\xE8re",
      narcoticRegulation: "Stup\xE9fiant, m\xE9dicament soumis \xE0 r\xE9glementation particuli\xE8re",
      noSpecialRegulation: "Aucune r\xE9glementation particuli\xE8re"
    },
    supply: {
      issueTitle: "Probl\xE8me d'approvisionnement temporaire :",
      startDate: "Disponibilit\xE9 limit\xE9e depuis :",
      expectedEndDate: "Date de fin pr\xE9sum\xE9e :",
      reason: "Raison :",
      impact: "Impact :",
      prescriberNote: "D\xE9claration du prescripteur :",
      downloadPdf: "T\xE9l\xE9charger le document en .pdf",
      extraInfo: "Informations compl\xE9mentaires :"
    },
    commercialization: {
      end: "Fin de commercialisation :",
      limitedAvailabilityFrom: "Disponibilit\xE9 limit\xE9e \xE0 partir de :",
      unavailableFrom: "Indisponible \xE0 partir de :",
      endReason: "Raison :",
      endImpact: "Impact :",
      endAdditionalInformation: "Informations compl\xE9mentaires :",
      start: "D\xE9but de commercialisation :",
      startAvailableFrom: "Disponible depuis :"
    },
    reimbursement: {
      title: "Remboursement :",
      category: "Cat\xE9gorie de remboursement :",
      categoryLabel: "Sp\xE9cification de la cat\xE9gorie de remboursement :",
      copay: "Ticket mod\xE9rateur type",
      copayPreferential: " Pr\xE9f\xE9rentiel :",
      copayActive: " Actif :",
      temporary: "Remboursement temporaire (art. 111) :",
      chapter: "Chapitre :",
      noneTitle: "Conditions de prescription",
      notApplicable: "Non applicable",
      non: "Non"
    },
    delivery: {
      title: "Conditions de livraison :",
      code: "Code de livraison :",
      modus: "Mode de livraison :",
      specification: "Sp\xE9cification de livraison :",
      notApplicable: "Non applicable"
    },
    prescription: {
      title: "Conditions de prescription :",
      code: "Code de prescription :",
      specification: "Sp\xE9cification de prescription :",
      free: "Libre de prescription"
    },
    vmp: {
      label: "VMP :",
      groupLabel: "Groupe VMP :"
    },
    links: {
      cbip: "R\xE9pertoire comment\xE9 des m\xE9dicaments (CBIP)",
      leaflet: "Notice pour le patient",
      rma: "Activit\xE9s de r\xE9duction des risques (RMA)",
      spc: "R\xE9sum\xE9 des caract\xE9ristiques du produit (RCP)",
      dhpc: "Communication directe aux professionnels de sant\xE9 (DHPC)"
    },
    ui: {
      showDetails: "Afficher les d\xE9tails",
      price: "Prix :"
    },
    search: {
      label: "Trouver un m\xE9dicament",
      unifiedLabel: "Trouver un m\xE9dicament \u2014 nom, substance ou code ATC",
      errorMessage: " Entrez au moins 3 lettres du nom du m\xE9dicament",
      noMatchingPlaceholder: "Aucun m\xE9dicament ne correspond \xE0 vos crit\xE8res de recherche."
    },
    swissmedic: {
      category: "Cat\xE9gorie de remise Swissmedic :",
      narcotic: "Stup\xE9fiant",
      coldChain: "N\xE9cessite une cha\xEEne du froid",
      coldChainAbbreviation: "CF",
      gtin: "Codes GTIN :",
      genericGroup: "Groupe g\xE9n\xE9rique :"
    },
    chComposition: {
      title: "Composition",
      activeSubstances: "Principes actifs",
      otherIngredients: "Autres composants"
    },
    chInteractions: {
      title: "Interactions m\xE9dicamenteuses",
      relevance: "Pertinence clinique :",
      more: "autres interactions"
    }
  },
  en: {
    yes: "Yes",
    no: "No",
    drugType: {
      medication: "Medication",
      molecule: "Molecule",
      homologation: "Homologation"
    },
    drugInfographic: {
      blackTriangle: "Enhanced pharmacovigilance (Black triangle)",
      rma: "Additional risk minimisation activities or additional RMA (Risk Minimisation Activities) (Source: FAMHP)",
      genericPrescriptionRequired: "Generic prescription required",
      cheap: "Cheap:",
      cheapTitle: '"Cheap medicine" category:',
      cheapDescription: 'Medicine is classified as a "cheap" medicine',
      notCheapDescription: 'Medicine that is not classified as a "cheap" medicine',
      cheapest: "Cheapest",
      cheapAlternativesMessage: "This medication is not classified as cheap. Would you like to see cheaper alternatives?",
      otherCheapAlternativesMessage: "Here are other cheap alternatives for this medication:",
      standardDosagesMessage: "Suggested dosage"
    },
    drugSpecialRegulation: {
      noNarcoticRegulation: "No narcotic, specially regulated drug",
      narcoticRegulation: "Narcotic, specially regulated drug",
      noSpecialRegulation: "No special regulation"
    },
    supply: {
      issueTitle: "Temporary supply problem:",
      startDate: "Limited availability since:",
      expectedEndDate: "Presumed end date:",
      reason: "Reason:",
      impact: "Impact:",
      prescriberNote: "Prescriber declaration:",
      downloadPdf: "Download the document (.pdf)",
      extraInfo: "Additional information:"
    },
    commercialization: {
      end: "End of commercialisation:",
      limitedAvailabilityFrom: "Limited availability from:",
      unavailableFrom: "Unavailable from:",
      endReason: "Reason:",
      endImpact: "Impact:",
      endAdditionalInformation: "Additional information:",
      start: "Start of commercialisation:",
      startAvailableFrom: "Available from:"
    },
    reimbursement: {
      title: "Reimbursement:",
      category: "Reimbursement category:",
      categoryLabel: "Reimbursement category specification:",
      copay: "Co-payment type",
      copayPreferential: "Preferential:",
      copayActive: "Active:",
      temporary: "Temporary reimbursement (art. 111):",
      chapter: "Chapter:",
      noneTitle: "Prescription conditions",
      notApplicable: "Not applicable",
      non: "No"
    },
    delivery: {
      title: "Delivery conditions:",
      code: "Delivery code:",
      modus: "Delivery method:",
      specification: "Delivery specification:",
      notApplicable: "Not applicable"
    },
    prescription: {
      title: "Prescription conditions:",
      code: "Prescription code:",
      specification: "Prescription specification:",
      free: "Free of prescription"
    },
    vmp: {
      label: "VMP:",
      groupLabel: "VMP-group:"
    },
    links: {
      cbip: "Commented Medicines Directory (CBIP)",
      leaflet: "Patient information leaflet",
      rma: "Risk Minimisation Activities (RMA)",
      spc: "Summary of Product Characteristics (SPC)",
      dhpc: "Direct Healthcare Professional Communication (DHPC)"
    },
    ui: {
      showDetails: "Show details",
      price: "Price:"
    },
    search: {
      label: "Find a medication",
      unifiedLabel: "Find a medication \u2014 name, substance or ATC code",
      errorMessage: "Enter at least 3 letters of the medication name",
      noMatchingPlaceholder: "No medications correspond to your search criteria."
    },
    swissmedic: {
      category: "Swissmedic dispensing category:",
      narcotic: "Narcotic",
      coldChain: "Requires cold-chain transport",
      coldChainAbbreviation: "CC",
      gtin: "GTIN codes:",
      genericGroup: "Generic group:"
    },
    chComposition: {
      title: "Composition",
      activeSubstances: "Active substances",
      otherIngredients: "Other ingredients"
    },
    chInteractions: {
      title: "Drug interactions",
      relevance: "Clinical relevance:",
      more: "more interactions"
    }
  },
  nl: {
    yes: "Ja",
    no: "Nee",
    drugType: {
      medication: "Geneesmiddel",
      molecule: "Molecule",
      homologation: "Homologatie"
    },
    drugInfographic: {
      blackTriangle: "Verhoogde waakzaamheid (Zwarte driehoek)",
      rma: "Aanvullende risicobeperkende maatregelen (RMA) (Bron: FAGG)",
      genericPrescriptionRequired: "Generiek voorschrift vereist",
      cheap: "Goedkoop:",
      cheapTitle: 'Categorie van "goedkope" geneesmiddelen:',
      cheapDescription: "Geneesmiddel dat is ingedeeld in de categorie goedkope geneesmiddelen",
      notCheapDescription: 'Geneesmiddel dat niet behoort tot de "goedkope" geneesmiddelen',
      cheapest: "Goedkoopste",
      cheapAlternativesMessage: "Dit geneesmiddel is niet geclassificeerd als goedkoop. Wilt u goedkopere alternatieven zien?",
      otherCheapAlternativesMessage: "Hier zijn andere goedkope alternatieven voor dit geneesmiddel:",
      standardDosagesMessage: "Voorgestelde dosering"
    },
    drugSpecialRegulation: {
      noNarcoticRegulation: "Geen verdovend middel, geneesmiddel onderworpen aan specifieke regelgeving",
      narcoticRegulation: "Verdovend middel, geneesmiddel onderworpen aan specifieke regelgeving",
      noSpecialRegulation: "Geen specifieke regelgeving"
    },
    supply: {
      issueTitle: "Tijdelijk bevoorradingsprobleem:",
      startDate: "Beperkte beschikbaarheid sinds:",
      expectedEndDate: "Verwachte einddatum:",
      reason: "Reden:",
      impact: "Impact:",
      prescriberNote: "Verklaring van de voorschrijver:",
      downloadPdf: "Download het document (.pdf)",
      extraInfo: "Aanvullende informatie:"
    },
    commercialization: {
      end: "Einde van commercialisering:",
      limitedAvailabilityFrom: "Beperkte beschikbaarheid vanaf:",
      unavailableFrom: "Niet beschikbaar vanaf:",
      endReason: "Reden:",
      endImpact: "Impact:",
      endAdditionalInformation: "Aanvullende informatie:",
      start: "Start van commercialisering:",
      startAvailableFrom: "Beschikbaar sinds:"
    },
    reimbursement: {
      title: "Terugbetaling:",
      category: "Terugbetalingscategorie:",
      categoryLabel: "Specificatie van de terugbetalingscategorie:",
      copay: "Soort remgeld",
      copayPreferential: "Voorkeurtarief:",
      copayActive: "Actief:",
      temporary: "Tijdelijke terugbetaling (art. 111):",
      chapter: "Hoofdstuk:",
      noneTitle: "Voorschrijfvoorwaarden",
      notApplicable: "Niet van toepassing",
      non: "Nee"
    },
    delivery: {
      title: "Aflevervoorwaarden:",
      code: "Aflevercode:",
      modus: "Afleverwijze:",
      specification: "Specificatie van aflevering:",
      notApplicable: "Niet van toepassing"
    },
    prescription: {
      title: "Voorschrijfvoorwaarden:",
      code: "Voorschrijfcode:",
      specification: "Specificatie van voorschrift:",
      free: "Vrij voorschrijfbaar"
    },
    vmp: {
      label: "VMP:",
      groupLabel: "VMP-groep:"
    },
    links: {
      cbip: "Gecommentarieerde geneesmiddelenrepertorium (CBIP)",
      leaflet: "Bijsluiter voor de pati\xEBnt",
      rma: "Maatregelen voor risicobeperking (RMA)",
      spc: "Samenvatting van de productkenmerken (SKP)",
      dhpc: "Rechtstreekse communicatie naar zorgverleners (DHPC)"
    },
    ui: {
      showDetails: "Details tonen",
      price: "Prijs:"
    },
    search: {
      label: "Zoek een geneesmiddel",
      unifiedLabel: "Zoek een geneesmiddel \u2014 naam, stof of ATC-code",
      errorMessage: "Voer minstens 3 letters van de naam in",
      noMatchingPlaceholder: "Er komen geen medicijnen overeen met uw zoekcriteria."
    },
    swissmedic: {
      category: "Swissmedic-afleveringscategorie:",
      narcotic: "Verdovend middel",
      coldChain: "Vereist koelketen transport",
      coldChainAbbreviation: "CC",
      gtin: "GTIN-codes:",
      genericGroup: "Generieke groep:"
    },
    chComposition: {
      title: "Samenstelling",
      activeSubstances: "Werkzame stoffen",
      otherIngredients: "Overige bestanddelen"
    },
    chInteractions: {
      title: "Geneesmiddelinteracties",
      relevance: "Klinische relevantie:",
      more: "meer interacties"
    }
  },
  de: {
    yes: "Ja",
    no: "Nein",
    drugType: {
      medication: "Arzneimittel",
      molecule: "Molek\xFCl",
      homologation: "Zulassung"
    },
    drugInfographic: {
      blackTriangle: "Verst\xE4rkte Pharmakovigilanz (Schwarzes Dreieck)",
      rma: "Zus\xE4tzliche Ma\xDFnahmen zur Risikominimierung (RMA) (Quelle: BfArM)",
      genericPrescriptionRequired: "Generisches Rezept erforderlich",
      cheap: "G\xFCnstig :",
      cheapTitle: 'Kategorie der \u201Eg\xFCnstigen" Medikamente :',
      cheapDescription: 'Das Medikament wird als \u201Eg\xFCnstiges" Medikament eingestuft.',
      notCheapDescription: 'Medikament, das nicht als \u201Eg\xFCnstiges" Medikament eingestuft ist.',
      cheapest: "Am g\xFCnstigsten",
      cheapAlternativesMessage: "Dieses Medikament ist nicht als g\xFCnstig klassifiziert. M\xF6chten Sie g\xFCnstigere Alternativen sehen?",
      otherCheapAlternativesMessage: "Hier sind weitere g\xFCnstige Alternativen f\xFCr dieses Medikament:",
      standardDosagesMessage: "Empfohlene Dosierung"
    },
    drugSpecialRegulation: {
      noNarcoticRegulation: "Kein Bet\xE4ubungsmittel, Arzneimittel mit besonderer Regelung",
      narcoticRegulation: "Bet\xE4ubungsmittel, Arzneimittel mit besonderer Regelung",
      noSpecialRegulation: "Keine besondere Regelung"
    },
    supply: {
      issueTitle: "Vor\xFCbergehendes Lieferproblem :",
      startDate: "Eingeschr\xE4nkte Verf\xFCgbarkeit seit :",
      expectedEndDate: "Voraussichtliches Enddatum :",
      reason: "Grund :",
      impact: "Auswirkung :",
      prescriberNote: "Erkl\xE4rung des Verschreibers :",
      downloadPdf: "Dokument als .pdf herunterladen",
      extraInfo: "Zus\xE4tzliche Informationen :"
    },
    commercialization: {
      end: "Ende der Vermarktung :",
      limitedAvailabilityFrom: "Eingeschr\xE4nkte Verf\xFCgbarkeit ab :",
      unavailableFrom: "Nicht verf\xFCgbar ab :",
      endReason: "Grund :",
      endImpact: "Auswirkung :",
      endAdditionalInformation: "Zus\xE4tzliche Informationen :",
      start: "Beginn der Vermarktung :",
      startAvailableFrom: "Verf\xFCgbar seit :"
    },
    reimbursement: {
      title: "Erstattung :",
      category: "Erstattungskategorie :",
      categoryLabel: "Spezifikation der Erstattungskategorie :",
      copay: "Zuzahlungstyp",
      copayPreferential: " Bevorzugt :",
      copayActive: " Aktiv :",
      temporary: "Vor\xFCbergehende Erstattung (Art. 111) :",
      chapter: "Kapitel :",
      noneTitle: "Verordnungsbedingungen",
      notApplicable: "Nicht zutreffend",
      non: "Nein"
    },
    delivery: {
      title: "Lieferbedingungen :",
      code: "Liefercode :",
      modus: "Liefermethode :",
      specification: "Lieferdetails :",
      notApplicable: "Nicht zutreffend"
    },
    prescription: {
      title: "Verordnungsbedingungen :",
      code: "Verordnungscode :",
      specification: "Verordnungsdetails :",
      free: "Frei verschreibbar"
    },
    vmp: {
      label: "VMP :",
      groupLabel: "VMP-Gruppe :"
    },
    links: {
      cbip: "Kommentiertes Arzneimittelverzeichnis (CBIP)",
      leaflet: "Packungsbeilage f\xFCr Patienten",
      rma: "Ma\xDFnahmen zur Risikominimierung (RMA)",
      spc: "Fachinformation (SPC)",
      dhpc: "Direkte Kommunikation an medizinisches Fachpersonal (DHPC)"
    },
    ui: {
      showDetails: "Details anzeigen",
      price: "Preis :"
    },
    search: {
      label: "Arzneimittel suchen",
      unifiedLabel: "Arzneimittel suchen \u2014 Name, Wirkstoff oder ATC-Code",
      errorMessage: "Geben Sie mindestens 3 Buchstaben des Arzneimittelnamens ein",
      noMatchingPlaceholder: "Keine Medikamente entsprechen Ihren Suchkriterien."
    },
    swissmedic: {
      category: "Swissmedic-Abgabekategorie :",
      narcotic: "Bet\xE4ubungsmittel",
      coldChain: "Erfordert K\xFChlkette",
      coldChainAbbreviation: "KK",
      gtin: "GTIN-Codes:",
      genericGroup: "Generische Gruppe:"
    },
    chComposition: {
      title: "Zusammensetzung",
      activeSubstances: "Wirkstoffe",
      otherIngredients: "Hilfsstoffe"
    },
    chInteractions: {
      title: "Wechselwirkungen",
      relevance: "Klinische Relevanz:",
      more: "weitere Wechselwirkungen"
    }
  }
};

// src/internal/translations/components/practitioner.translations.ts
var practitionerTranslations = {
  fr: {
    certificateUpload: {
      titleUpload: "T\xE9l\xE9charger le certificat",
      titlePassword: "Entrez le mot de passe du certificat",
      fileLabel: "Certificat du praticien",
      passwordLabel: "Mot de passe du certificat",
      submitButtonUpload: "Crypter et t\xE9l\xE9charger",
      submitButtonPassword: "Soumettre",
      resetButton: "T\xE9l\xE9charger un autre certificat",
      errorRequired: "Ce champ est requis",
      errorInvalid: "Champ invalide",
      passwordMissingTitle: "Mot de passe manquant",
      passwordMissingDescription: "Veuillez saisir le mot de passe associ\xE9 au certificat afin de pouvoir le d\xE9chiffrer. Ce mot de passe est requis pour poursuivre la v\xE9rification."
    },
    certificateFeedback: {
      successTitle: "T\xE9l\xE9chargement du certificat r\xE9ussi",
      successDescription: "Le certificat du praticien a \xE9t\xE9 t\xE9l\xE9charg\xE9 avec succ\xE8s et le mot de passe a \xE9t\xE9 enregistr\xE9 en toute s\xE9curit\xE9. Vous pouvez maintenant poursuivre les prochaines \xE9tapes.",
      failureTitle: "\xC9chec du t\xE9l\xE9chargement du certificat",
      failureDescription: "Une erreur est survenue lors du t\xE9l\xE9chargement du certificat du praticien ou de l'enregistrement du mot de passe. Veuillez vous assurer que le certificat est valide et r\xE9essayez. Si le probl\xE8me persiste, contactez le support.",
      verificationErrorTitle: "Erreur de v\xE9rification du certificat"
    },
    printModal: {
      title: "Imprimer la prescription",
      close: "Fermer",
      print: "Imprimer"
    }
  },
  en: {
    certificateUpload: {
      titleUpload: "Upload certificate",
      titlePassword: "Enter certificate password",
      fileLabel: "Practitioner certificate",
      passwordLabel: "Certificate password",
      submitButtonUpload: "Encrypt and upload",
      submitButtonPassword: "Submit",
      resetButton: "Upload another certificate",
      errorRequired: "This field is required",
      errorInvalid: "Invalid field",
      passwordMissingTitle: "Missing password",
      passwordMissingDescription: "Please enter the password associated with the certificate to decrypt it. This password is required to continue verification."
    },
    certificateFeedback: {
      successTitle: "Certificate upload successful",
      successDescription: "The certificate\u2019s certificate was uploaded successfully and the password has been securely saved. You may proceed with the next steps.",
      failureTitle: "Certificate upload failed",
      failureDescription: "An error occurred while uploading the certificate or saving the password. Please ensure the certificate is valid and try again. If the problem persists, contact support.",
      verificationErrorTitle: "Certificate verification error"
    },
    printModal: {
      title: "Print prescription",
      close: "Close",
      print: "Print"
    }
  },
  nl: {
    certificateUpload: {
      titleUpload: "Certificaat uploaden",
      titlePassword: "Voer het certificaatwachtwoord in",
      fileLabel: "Certificaat van de zorgverlener",
      passwordLabel: "Wachtwoord van het certificaat",
      submitButtonUpload: "Versleutelen en uploaden",
      submitButtonPassword: "Verzenden",
      resetButton: "Ander certificaat uploaden",
      errorRequired: "Dit veld is verplicht",
      errorInvalid: "Ongeldig veld",
      passwordMissingTitle: "Wachtwoord ontbreekt",
      passwordMissingDescription: "Voer het wachtwoord in dat aan het certificaat is gekoppeld om het te ontsleutelen. Dit wachtwoord is vereist om de verificatie voort te zetten."
    },
    certificateFeedback: {
      successTitle: "Certificaat succesvol ge\xFCpload",
      successDescription: "Het certificaat van de zorgverlener is succesvol ge\xFCpload en het wachtwoord is veilig opgeslagen. U kunt nu doorgaan met de volgende stappen.",
      failureTitle: "Uploaden van certificaat mislukt",
      failureDescription: "Er is een fout opgetreden bij het uploaden van het certificaat of het opslaan van het wachtwoord. Zorg ervoor dat het certificaat geldig is en probeer het opnieuw. Neem contact op met de ondersteuning als het probleem aanhoudt.",
      verificationErrorTitle: "Fout bij verificatie van certificaat"
    },
    printModal: {
      title: "Voorschrift afdrukken",
      close: "Sluiten",
      print: "Afdrukken"
    }
  },
  de: {
    certificateUpload: {
      titleUpload: "Zertifikat hochladen",
      titlePassword: "Zertifikat-Passwort eingeben",
      fileLabel: "Zertifikat des Arztes",
      passwordLabel: "Passwort des Zertifikats",
      submitButtonUpload: "Verschl\xFCsseln und hochladen",
      submitButtonPassword: "Absenden",
      resetButton: "Anderes Zertifikat hochladen",
      errorRequired: "Dieses Feld ist erforderlich",
      errorInvalid: "Ung\xFCltiges Feld",
      passwordMissingTitle: "Passwort fehlt",
      passwordMissingDescription: "Bitte geben Sie das Passwort ein, das mit dem Zertifikat verkn\xFCpft ist, um es zu entschl\xFCsseln. Dieses Passwort ist f\xFCr die weitere \xDCberpr\xFCfung erforderlich."
    },
    certificateFeedback: {
      successTitle: "Zertifikat erfolgreich hochgeladen",
      successDescription: "Das Zertifikat des Arztes wurde erfolgreich hochgeladen und das Passwort wurde sicher gespeichert. Sie k\xF6nnen nun mit den n\xE4chsten Schritten fortfahren.",
      failureTitle: "Zertifikat-Upload fehlgeschlagen",
      failureDescription: "Beim Hochladen des Zertifikats oder beim Speichern des Passworts ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass das Zertifikat g\xFCltig ist, und versuchen Sie es erneut. Wenn das Problem weiterhin besteht, wenden Sie sich an den Support.",
      verificationErrorTitle: "Fehler bei der Zertifikatspr\xFCfung"
    },
    printModal: {
      title: "Rezept drucken",
      close: "Schlie\xDFen",
      print: "Drucken"
    }
  }
};

// src/internal/translations/utils/visibility-helpers.translations.ts
var prescriptionVisibilityTranslations = {
  fr: {
    practitionerVisibility: {
      open: "Visible pour tous les prescripteurs",
      locked: "Visible uniquement pour moi-m\xEAme",
      gmd_prescriber: "Visible uniquement pour le titulaire du DMG"
    },
    pharmacistVisibility: {
      null: "Le m\xE9dicament est visible par tous les pharmaciens",
      locked: "Le m\xE9dicament n`est pas visible par tous les pharmaciens"
    }
  },
  en: {
    practitionerVisibility: {
      open: "Visible to all prescribers",
      locked: "Visible only to myself",
      gmd_prescriber: "Visible only to the GMD holder"
    },
    pharmacistVisibility: {
      null: "The medication is visible to all pharmacists",
      locked: "The medication is not visible to all pharmacists"
    }
  },
  nl: {
    practitionerVisibility: {
      open: "Zichtbaar voor alle voorschrijvers",
      locked: "Alleen zichtbaar voor mezelf",
      gmd_prescriber: "Alleen zichtbaar voor de GMD-houder"
    },
    pharmacistVisibility: {
      null: "Het geneesmiddel is zichtbaar voor alle apothekers",
      locked: "Het geneesmiddel is niet zichtbaar voor alle apothekers"
    }
  },
  de: {
    practitionerVisibility: {
      open: "Sichtbar f\xFCr alle verschreiber",
      locked: "Nur f\xFCr mich sichtbar",
      gmd_prescriber: "Nur f\xFCr den GMD-inhaber sichtbar"
    },
    pharmacistVisibility: {
      null: "Das medikament ist f\xFCr alle apotheker sichtbar",
      locked: "Das medikament ist nicht f\xFCr alle apotheker sichtbar"
    }
  }
};

// src/internal/translations/utils/reimbursement-helpers.translations.ts
var reimbursementTranslations = {
  fr: {
    practitionerSelectionOptions: {
      none: "Aucun",
      PAYINGTHIRDPARTY: "Tiers Payant",
      FIRSTDOSE: "Premi\xE8re Dose",
      SECONDDOSE: "Deuxi\xE8me Dose",
      THIRDDOSE: "Troisi\xE8me Dose",
      CHRONICKINDEYDISEASE: "Maladie R\xE9nale Chronique",
      DIABETESTREATMENT: "Traitement du Diab\xE8te",
      DIABETESCONVENTION: "Convention Diab\xE8te",
      NOTREIMBURSABLE: "Non Remboursable",
      EXPLAINMEDICATION: "Explication du M\xE9dicament",
      DIABETESSTARTPATH: "Parcours Initial Diab\xE8te"
    },
    categoryOptions: {
      A: "M\xE9dicaments vitaux",
      B: "M\xE9dicaments th\xE9rapeutiquement importants",
      C: "M\xE9dicaments pour traitement symptomatique",
      Cs: "Ex. vaccins, m\xE9dicaments antiallergiques",
      Cx: "Ex. contraceptifs",
      Fa: "M\xE9dicaments vitaux rembours\xE9s sur une base fixe",
      Fb: "M\xE9dicaments th\xE9rapeutiquement importants rembours\xE9s sur une base fixe"
    }
  },
  en: {
    practitionerSelectionOptions: {
      none: "None",
      PAYINGTHIRDPARTY: "Third-party payment",
      FIRSTDOSE: "First dose",
      SECONDDOSE: "Second dose",
      THIRDDOSE: "Third dose",
      CHRONICKINDEYDISEASE: "Chronic kidney disease",
      DIABETESTREATMENT: "Diabetes treatment",
      DIABETESCONVENTION: "Diabetes convention",
      NOTREIMBURSABLE: "Not reimbursable",
      EXPLAINMEDICATION: "Medication explanation",
      DIABETESSTARTPATH: "Diabetes initial care path"
    },
    categoryOptions: {
      A: "Life-saving medicines",
      B: "Therapeutically important medicines",
      C: "Medicines for symptomatic treatment",
      Cs: "e.g. vaccines, allergy medicines",
      Cx: "e.g. contraceptives",
      Fa: "Life-saving medicines with reimbursement based on a fixed amount",
      Fb: "Therapeutically important medicines with reimbursement based on a fixed amount"
    }
  },
  nl: {
    practitionerSelectionOptions: {
      none: "Geen",
      PAYINGTHIRDPARTY: "Derdebetaler",
      FIRSTDOSE: "Eerste Dosis",
      SECONDDOSE: "Tweede Dosis",
      THIRDDOSE: "Derde Dosis",
      CHRONICKINDEYDISEASE: "Chronische Nierziekte",
      DIABETESTREATMENT: "Diabetesbehandeling",
      DIABETESCONVENTION: "Diabetesconventie",
      NOTREIMBURSABLE: "Niet Terugbetaalbaar",
      EXPLAINMEDICATION: "Uitleg over het Geneesmiddel",
      DIABETESSTARTPATH: "Opstarttraject Diabetes"
    },
    categoryOptions: {
      A: "Levensreddende geneesmiddelen",
      B: "Therapeutisch belangrijke geneesmiddelen",
      C: "Geneesmiddelen voor symptomatische behandeling",
      Cs: "bv. vaccins, allergiemedicatie",
      Cx: "bv. anticonceptiva",
      Fa: "Levensreddende geneesmiddelen met terugbetaling op basis van een vast bedrag",
      Fb: "Therapeutisch belangrijke geneesmiddelen met terugbetaling op basis van een vast bedrag"
    }
  },
  de: {
    practitionerSelectionOptions: {
      none: "Keine",
      PAYINGTHIRDPARTY: "Drittzahlerregelung",
      FIRSTDOSE: "Erste Dosis",
      SECONDDOSE: "Zweite Dosis",
      THIRDDOSE: "Dritte Dosis",
      CHRONICKINDEYDISEASE: "Chronische Nierenerkrankung",
      DIABETESTREATMENT: "Diabetesbehandlung",
      DIABETESCONVENTION: "Diabetesvereinbarung",
      NOTREIMBURSABLE: "Nicht Erstattungsf\xE4hig",
      EXPLAINMEDICATION: "Erl\xE4uterung zum Medikament",
      DIABETESSTARTPATH: "Einstiegspfad Diabetes"
    },
    categoryOptions: {
      A: "Lebensrettende Medikamente",
      B: "Therapeutisch wichtige Medikamente",
      C: "Medikamente zur symptomatischen Behandlung",
      Cs: "z. B. Impfstoffe, Allergiemedikamente",
      Cx: "z. B. Verh\xFCtungsmittel",
      Fa: "Lebensrettende Medikamente mit Erstattung auf Basis eines Festbetrags",
      Fb: "Therapeutisch wichtige Medikamente mit Erstattung auf Basis eines Festbetrags"
    }
  }
};

// src/internal/translations/utils/prescription-duration-helpers.translations.ts
var prescriptionDurationTranslations = {
  fr: {
    durationUnits: {
      day: "jour",
      week: "semaine"
    },
    periodicityUnits: {
      none: "aucune",
      week: "semaine",
      twoWeeks: "2 semaines",
      threeWeeks: "3 semaines",
      numberOfDays: "x nombre de jours"
    }
  },
  en: {
    durationUnits: {
      day: "day",
      week: "week"
    },
    periodicityUnits: {
      none: "none",
      week: "week",
      twoWeeks: "2 weeks",
      threeWeeks: "3 weeks",
      numberOfDays: "x number of days"
    }
  },
  nl: {
    durationUnits: {
      day: "dag",
      week: "week"
    },
    periodicityUnits: {
      none: "geen",
      week: "week",
      twoWeeks: "2 weken",
      threeWeeks: "3 weken",
      numberOfDays: "x aantal dagen"
    }
  },
  de: {
    durationUnits: {
      day: "tag",
      week: "woche"
    },
    periodicityUnits: {
      none: "keine",
      week: "woche",
      twoWeeks: "2 wochen",
      threeWeeks: "3 wochen",
      numberOfDays: "x anzahl der tage"
    }
  }
};

// src/internal/translations/utils/delivery-helpers.translations.ts
var deliveryModusTranslations = {
  fr: {
    specifications: {
      Sp: "Prescription par un m\xE9decin-sp\xE9cialiste",
      Sp1: "Premi\xE8re prescription par un m\xE9decin-sp\xE9cialiste, prescription de suivi par un m\xE9decin g\xE9n\xE9raliste",
      "Sp/S": "Prescription par un m\xE9decin-sp\xE9cialiste",
      "Sp1/S": "Premi\xE8re prescription par un m\xE9decin-sp\xE9cialiste, prescription de suivi par un m\xE9decin g\xE9n\xE9raliste",
      "IMP/Sp": "Prescription par un m\xE9decin-sp\xE9cialiste",
      "IMP/Sp1": "Premi\xE8re prescription par un m\xE9decin-sp\xE9cialiste, prescription de suivi par un m\xE9decin g\xE9n\xE9raliste"
    }
  },
  en: {
    specifications: {
      Sp: "Prescription by specialist",
      Sp1: "First prescription by specialist, follow-up prescription by general certificate",
      "Sp/S": "Prescription by specialist",
      "Sp1/S": "First prescription by specialist, follow-up prescription by general certificate",
      "IMP/Sp": "Prescription by specialist",
      "IMP/Sp1": "First prescription by specialist, follow-up prescription by general certificate"
    }
  },
  nl: {
    specifications: {
      Sp: "Voorschrift door een geneesheer-specialist",
      Sp1: "Eerste voorschrift door een geneesheer-specialist, vervolgoorschrift door huisarts",
      "Sp/S": "Voorschrift door een geneesheer-specialist",
      "Sp1/S": "Eerste voorschrift door een geneesheer-specialist, vervolgoorschrift door huisarts",
      "IMP/Sp": "Voorschrift door een geneesheer-specialist",
      "IMP/Sp1": "Eerste voorschrift door een geneesheer-specialist, vervolgoorschrift door huisarts"
    }
  },
  de: {
    specifications: {
      Sp: "Verschreibung von einem Facharzt",
      Sp1: "Erste Verschreibung von einem Facharzt, Folgeverordnung vom Hausarzt",
      "Sp/S": "Verschreibung von einem Facharzt",
      "Sp1/S": "Erste Verschreibung von einem Facharzt, Folgeverordnung vom Hausarzt",
      "IMP/Sp": "Verschreibung von einem Facharzt",
      "IMP/Sp1": "Erste Verschreibung von einem Facharzt, Folgeverordnung vom Hausarzt"
    }
  }
};

// src/internal/translations/index.ts
var appTranslations = {
  fr: {
    home: homeTranslations.fr,
    prescription: prescriptionTranslations.fr,
    medication: medicationTranslations.fr,
    practitioner: practitionerTranslations.fr,
    prescriptionVisibilityHelper: prescriptionVisibilityTranslations.fr,
    reimbursementHelper: reimbursementTranslations.fr,
    prescriptionDurationHelper: prescriptionDurationTranslations.fr,
    deliveryModusHelper: deliveryModusTranslations.fr
  },
  en: {
    home: homeTranslations.en,
    prescription: prescriptionTranslations.en,
    medication: medicationTranslations.en,
    practitioner: practitionerTranslations.en,
    prescriptionVisibilityHelper: prescriptionVisibilityTranslations.en,
    reimbursementHelper: reimbursementTranslations.en,
    prescriptionDurationHelper: prescriptionDurationTranslations.en,
    deliveryModusHelper: deliveryModusTranslations.en
  },
  nl: {
    home: homeTranslations.nl,
    prescription: prescriptionTranslations.nl,
    medication: medicationTranslations.nl,
    practitioner: practitionerTranslations.nl,
    prescriptionVisibilityHelper: prescriptionVisibilityTranslations.nl,
    reimbursementHelper: reimbursementTranslations.nl,
    prescriptionDurationHelper: prescriptionDurationTranslations.nl,
    deliveryModusHelper: deliveryModusTranslations.nl
  },
  de: {
    home: homeTranslations.de,
    prescription: prescriptionTranslations.de,
    medication: medicationTranslations.de,
    practitioner: practitionerTranslations.de,
    prescriptionVisibilityHelper: prescriptionVisibilityTranslations.de,
    reimbursementHelper: reimbursementTranslations.de,
    prescriptionDurationHelper: prescriptionDurationTranslations.de,
    deliveryModusHelper: deliveryModusTranslations.de
  }
};

// src/internal/services/constants.ts
var DEFAULT_APP_LANGULAGE = "fr";
var CERTIFICATE_IDB_CONFIG = {
  DB_NAME: "certificate-store",
  STORE_NAME: "certificates",
  KEY_PATH: "id"
};
var TOKEN_IDB_CONFIG = {
  DB_NAME: "token-store",
  STORE_NAME: "tokens",
  KEY_PATH: "id"
};

// src/shared/services/i18n/index.tsx
var CardinalLanguage = class {
  language = DEFAULT_APP_LANGULAGE;
  setLanguage(language) {
    this.language = language;
  }
  getLanguage() {
    return this.language;
  }
};
var cardinalLanguage = new CardinalLanguage();
var t = (key) => {
  const getKeyValue = (collection, complexKey) => {
    const keys = complexKey.split(".");
    let value = collection;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return void 0;
      }
    }
    return typeof value === "string" ? value : void 0;
  };
  return getKeyValue(appTranslations[cardinalLanguage.getLanguage()], key) ?? key;
};
var getSamTextTranslation = (samText) => {
  if (!samText) {
    return void 0;
  }
  const lang = cardinalLanguage.getLanguage();
  const fallback = DEFAULT_APP_LANGULAGE;
  return samText[lang] ?? samText[fallback];
};

// src/internal/components/medication-elements/MedicationCard/medication-card-elements/Header/styles.ts
var import_styled_components4 = __toESM(require("styled-components"));

// src/styles/theme.ts
var import_styled_components = require("styled-components");
var THEME_PREFIX = "--cp-";
var DARK_PREFIX = "--cp-dark-";
var definitions = {
  // Typography
  fontFamily: { name: "font-family", light: "'Lato', sans-serif", description: "Font of every library text." },
  fontFamilyControl: { name: "font-family-control", light: "'Inter Variable', sans-serif", description: "Font of text inputs, selects and the posology suggestions." },
  fontSizeRoot: { name: "font-size-root", light: "16px", description: "Base font size of each library root." },
  fontSize2xs: { name: "font-size-2xs", light: "11px", description: "Badges." },
  fontSizeXs: { name: "font-size-xs", light: "12px", description: 'Field captions, RID badge, "more" links.' },
  fontSizeSm: { name: "font-size-sm", light: "13px", description: "Error messages, cheap alternatives, standard dosages, composition." },
  fontSizeMd: { name: "font-size-md", light: "14px", description: "Body text, labels, inputs, buttons." },
  fontSizeLg: { name: "font-size-lg", light: "16px", description: "Card and modal titles." },
  fontSizeXl: { name: "font-size-xl", light: "18px", description: "Printed prescription title." },
  // Sizes
  controlHeight: { name: "control-height", light: "32px", description: "Height of buttons under a fine pointer (mouse)." },
  inputHeight: { name: "input-height", light: "32px", ref: "control-height", description: "Height of text inputs and selects under a fine pointer." },
  targetSizeMin: { name: "target-size-min", light: "24px", description: "Minimum size of small controls (close buttons, radios, icon buttons) under a fine pointer (WCAG 2.5.8)." },
  targetSizeCoarse: { name: "target-size-coarse", light: "44px", description: "Size of every control on a touch screen or whenever the pointer is not a fine, hovering one." },
  radiusXs: { name: "radius-xs", light: "4px", description: "Suggestion items, close buttons, RID badge." },
  radiusSm: { name: "radius-sm", light: "5px", description: "Regulatory badges." },
  radiusMd: { name: "radius-md", light: "6px", description: "Inputs, buttons, medication and prescription cards." },
  radiusLg: { name: "radius-lg", light: "8px", description: "Prescription list and printed document." },
  radiusXl: { name: "radius-xl", light: "12px", description: "Modal sections, alerts, certificate form." },
  radiusPill: { name: "radius-pill", light: "999px", description: "Toggle switch and cheap badges." },
  // Surfaces
  colorSurface: { name: "color-surface", light: "#ffffff", dark: "#1b1f27", description: "Cards, modal header and footer, inputs, popups." },
  colorSurfaceSunken: { name: "color-surface-sunken", light: "#f9fbfe", dark: "#12151b", description: "Modal body, expanded card, prescription rows." },
  colorSurfaceAccent: { name: "color-surface-accent", light: "#eef6fe", dark: "#1d2a3a", description: "Search results panel, focused suggestion." },
  colorSurfaceAccentSubtle: {
    name: "color-surface-accent-subtle",
    light: "#f2f8fd",
    dark: "#18212d",
    description: "Collapsible panel headers (cheap alternatives, standard dosages) and their hovered items."
  },
  colorSurfaceDisabled: { name: "color-surface-disabled", light: "#f5f5f5", dark: "#2a2f38", description: "Disabled inputs and buttons." },
  colorOverlay: { name: "color-overlay", light: "rgba(8, 75, 131, 0.3)", dark: "rgba(0, 0, 0, 0.6)", description: "Backdrop behind the modals." },
  colorPaper: { name: "color-paper", light: "#ffffff", description: "Printed prescription background (stays white in dark mode)." },
  colorPaperText: { name: "color-paper-text", light: "#000000", description: "Printed prescription text." },
  // Text
  colorText: { name: "color-text", light: "#1d2235", dark: "#e6e9ef", description: "Default text, titles, labels." },
  colorTextStrong: { name: "color-text-strong", light: "#000000", dark: "#ffffff", description: "Field values in the medication card." },
  colorTextMuted: { name: "color-text-muted", light: "#4b6682", dark: "#a9b8c9", description: "Field captions in the medication card." },
  colorTextSubtle: {
    name: "color-text-subtle",
    light: "#6b6b69",
    dark: "#a0a4ab",
    description: "Secondary text: empty results, excipients, extra-fields preview, disabled buttons."
  },
  colorPlaceholder: { name: "color-placeholder", light: "#687583", dark: "#8b95a1", description: "Input placeholders." },
  colorLink: { name: "color-link", light: "#2a6fa8", dark: "#8cc3f2", description: "Links and accent text (panel headers)." },
  colorPrice: { name: "color-price", light: "#b5470f", dark: "#ffa36b", description: "Price in the medication card." },
  // Borders and accents
  colorBorder: { name: "color-border", light: "#e4e4e7", dark: "#343a45", description: "Section and list borders, dividers." },
  colorBorderStrong: { name: "color-border-strong", light: "#cad0d5", dark: "#4b5360", description: "Input and secondary button borders." },
  colorBorderAccent: { name: "color-border-accent", light: "#dce7f2", dark: "#2c3a4b", description: "Medication and prescription card borders, collapsible panels." },
  colorBorderControl: { name: "color-border-control", light: "#848482", dark: "#8b95a1", description: "Radio button ring." },
  colorPrimary: { name: "color-primary", light: "#084b83", dark: "#7ab6ea", description: "Primary actions, checked controls, focused borders." },
  colorOnPrimary: { name: "color-on-primary", light: "#ffffff", dark: "#0b1a2b", description: "Text on the primary colour." },
  colorAccent: { name: "color-accent", light: "#3d87c5", dark: "#6fa8dc", description: "Hovered and focused cards, tooltip border, dividers in the expanded card." },
  colorAccentSoft: { name: "color-accent-soft", light: "#add5ff", dark: "#2c4a6b", description: "Outlined regulatory badges, composition title." },
  colorFocusHalo: {
    name: "color-focus-halo",
    light: "rgba(61, 135, 197, 0.2)",
    dark: "rgba(111, 168, 220, 0.35)",
    description: "Halo around focused or hovered inputs and controls."
  },
  colorHoverHalo: { name: "color-hover-halo", light: "rgba(61, 135, 197, 0.3)", dark: "rgba(111, 168, 220, 0.35)", description: "Halo around hovered or focused cards." },
  colorFocusRing: { name: "color-focus-ring", light: "#3d87c5", dark: "#8cc3f2", description: "Keyboard focus outline (`:focus-visible`)." },
  // States
  colorCritical: { name: "color-critical", light: "#c40000", dark: "#ff7b72", description: "Errors: messages, invalid borders, required asterisk, delete hover." },
  colorCriticalSurface: { name: "color-critical-surface", light: "#fff1f0", dark: "#3a1d1f", description: "Error alert background." },
  colorCriticalSoft: { name: "color-critical-soft", light: "#ffccc7", dark: "#5a2a2d", description: "Error alert border, critical regulatory badges and titles." },
  colorCaution: { name: "color-caution", light: "#a35f00", description: "Caution badges (interactions, delivery conditions) and the interactions title, under white text." },
  colorCautionSoft: { name: "color-caution-soft", light: "#ffda83", dark: "#4d3d14", description: "Caution regulatory badges and titles." },
  colorOk: { name: "color-ok", light: "#1e7e46", description: "Reimbursement badge, cheapest badge, under white text." },
  colorOkStrong: { name: "color-ok-strong", light: "#237804", description: "Cheap badge, prescription RID badge, under white text." },
  colorOkSurface: { name: "color-ok-surface", light: "#f6ffed", dark: "#1b2e1b", description: "Success alert background." },
  colorOkSurfaceAlt: { name: "color-ok-surface-alt", light: "#e5fae5", dark: "#183222", description: "Sent prescription row." },
  colorOkSoft: { name: "color-ok-soft", light: "#b7eb8f", dark: "#2f5a2f", description: "Success alert border, ok regulatory badges and titles." },
  colorOkBorder: { name: "color-ok-border", light: "#008000", dark: "#3fb873", description: "Sent prescription row border." },
  colorNeutral: { name: "color-neutral", light: "#5f6360", description: "Neutral badges (cold chain, not reimbursed), under white text." },
  colorCriticalStrong: { name: "color-critical-strong", light: "#c40000", description: "Critical badges (prescription conditions), under white text." },
  colorOnBadge: { name: "color-on-badge", light: "#ffffff", description: "Text on the critical, caution, ok and neutral badges." },
  shadowPopup: {
    name: "shadow-popup",
    light: "0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.12)",
    dark: "0 9px 28px 0 rgba(0, 0, 0, 0.4), 0 6px 16px 0 rgba(0, 0, 0, 0.5), 0 3px 6px 0 rgba(0, 0, 0, 0.6)",
    description: "Shadow of the posology suggestions and the search results panel."
  },
  shadowSection: { name: "shadow-section", light: "0 1px 1px 0 rgba(218, 218, 222, 0.25)", dark: "none", description: "Shadow of the extra-fields preview." },
  // Buttons
  buttonPrimaryBackground: { name: "button-primary-background", light: "#084b83", ref: "color-primary", description: "Primary button background and border." },
  buttonPrimaryText: { name: "button-primary-text", light: "#ffffff", ref: "color-on-primary", description: "Primary button text." },
  buttonSecondaryBackground: { name: "button-secondary-background", light: "#fcfcfd", dark: "#1b1f27", description: "Outlined button background." },
  buttonSecondaryText: { name: "button-secondary-text", light: "#084b83", ref: "color-primary", description: "Outlined button text." },
  buttonSecondaryBorder: { name: "button-secondary-border", light: "#cad0d5", ref: "color-border-strong", description: "Outlined button border." },
  buttonRadius: { name: "button-radius", light: "6px", ref: "radius-md", description: "Button corner radius." },
  // Icons
  iconInfo: { name: "icon-info", light: "#3d87c5", dark: "#6fa8dc", description: "Information icons, chevrons, spinner of the search." },
  iconCritical: { name: "icon-critical", light: "#ee1313", dark: "#ff6b63", description: "End of commercialisation, narcotic." },
  iconCaution: { name: "icon-caution", light: "#ff5e00", dark: "#ff8a3d", description: "Supply problems, orange triangle." },
  iconCautionAlt: { name: "icon-caution-alt", light: "#efac2f", description: "Composition (molecule)." },
  iconOk: { name: "icon-ok", light: "#09853d", dark: "#3fb873", description: "Start of commercialisation." },
  iconOkAlt: { name: "icon-ok-alt", light: "#197437", dark: "#3fb873", description: "Generic group (leaf)." },
  iconSuccess: { name: "icon-success", light: "#52c41a", description: "Success alert." },
  iconError: { name: "icon-error", light: "#ff4d4f", description: "Error alert." },
  iconNeutral: { name: "icon-neutral", light: "#000000", dark: "#e6e9ef", description: "Black triangle, pill bottle, prescription icon, default spinner." },
  iconMuted: { name: "icon-muted", light: "#9ca8b2", dark: "#8b95a1", description: "Search magnifier." },
  iconClose: { name: "icon-close", light: "#4b6682", dark: "#a9b8c9", description: "Close cross of the modals." },
  iconAction: { name: "icon-action", light: "#383a3c", dark: "#c9ced6", description: "Edit and delete icons of the prescription rows." }
};
var byName = new Map(Object.values(definitions).map((d) => [d.name, d]));
var expression = (definition) => {
  const referenced = "ref" in definition && definition.ref ? byName.get(definition.ref) : void 0;
  const fallback = referenced ? expression(referenced) : "dark" in definition && definition.dark ? `var(${DARK_PREFIX}${definition.name}, ${definition.light})` : definition.light;
  return `var(${THEME_PREFIX}${definition.name}, ${fallback})`;
};
var themeTokens = Object.values(definitions);
var cp = Object.fromEntries(Object.entries(definitions).map(([key, definition]) => [key, expression(definition)]));
var translucent = (color, percent) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;
var finePointer = "@media (hover: hover) and (pointer: fine)";
var targetSize = (property, fineValue = cp.targetSizeMin) => import_styled_components.css`
  ${property}: ${cp.targetSizeCoarse};

  ${finePointer} {
    ${property}: ${fineValue};
  }
`;
var darkDeclarations = themeTokens.filter((definition) => definition.dark).map((definition) => `${DARK_PREFIX}${definition.name}: ${definition.dark};`).join("\n");
var darkModeDefaults = import_styled_components.css`
  &[data-cp-theme='dark'],
  [data-cp-theme='dark'] & {
    ${darkDeclarations}
    color-scheme: dark;
  }

  @media (prefers-color-scheme: dark) {
    &[data-cp-theme='auto'],
    [data-cp-theme='auto'] & {
      ${darkDeclarations}
      color-scheme: dark;
    }
  }
`;
var HOST_SLOT_ATTRIBUTE = "data-cp-slot";
var own = `:where(:not([${HOST_SLOT_ATTRIBUTE}], [${HOST_SLOT_ATTRIBUTE}] *))`;
var elements = (...tags) => tags.map((tag) => `:where(&) ${tag}${own}`).join(", ");
var scopedReset = import_styled_components.css`
  :where(&) :where(*)${own}, :where(&) :where(*)${own}::before, :where(&) :where(*)${own}::after {
    box-sizing: border-box;
  }

  :where(&) :where(*)${own} {
    margin: 0;
    padding: 0;
    font-size: 100%;
  }

  ${elements("ul", "ol", "li")} {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ${elements("h1", "h2", "h3", "h4", "h5", "h6", "p")} {
    margin: 0;
    font-size: 100%;
  }

  ${elements("a")} {
    text-decoration: none;
  }

  ${elements("img", "audio", "video")} {
    max-width: 100%;
    height: auto;
  }

  ${elements("input", "textarea", "select", "button")} {
    border: none;
    font-family: inherit;
    font-size: 100%;
    color: inherit;
    margin: 0;
  }

  ${elements("button", "input")} {
    line-height: normal;
  }

  ${elements("textarea")} {
    resize: none;
    overflow: auto;
    vertical-align: top;
  }

  ${elements("table")} {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ${elements("td", "th")} {
    padding: 0;
    text-align: left;
  }

  :where(&) :where(*)${own}:focus-visible {
    outline: 2px solid ${cp.colorFocusRing};
    outline-offset: 2px;
  }
`;
var rootText = import_styled_components.css`
  color: ${cp.colorText};
  font-family: ${cp.fontFamily};
  font-size: ${cp.fontSizeRoot};
  line-height: normal;
`;
var libraryRoot = import_styled_components.css`
  ${darkModeDefaults}
  ${rootText}
  ${scopedReset}
  box-sizing: border-box;
`;
var LIBRARY_ROOT_CLASS = "cp-root";

// src/styles/elements.ts
var import_styled_components2 = require("styled-components");
var fieldCommonStyles = import_styled_components2.css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
var inputCommonStyles = import_styled_components2.css`
  width: 100%;
  display: flex;
  ${targetSize("height", cp.inputHeight)};
  padding: 5px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: pointer;

  border-radius: ${cp.radiusMd};
  border: 1px solid ${cp.colorBorderStrong};
  background: ${cp.colorSurface};

  color: ${cp.colorText};
  font-family: ${cp.fontFamilyControl};
  font-size: ${cp.fontSizeMd};
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: ${cp.colorPlaceholder};
  }

  &:hover,
  &:focus {
    border-color: ${cp.colorPrimary};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
  }
`;
var inputCommonStyles_disabled = import_styled_components2.css`
  cursor: not-allowed;
  background-color: ${cp.colorSurfaceDisabled};
  border-color: ${cp.colorBorderStrong};
  opacity: 0.7;

  &:hover {
    border-color: ${cp.colorBorderStrong};
  }
`;
var inputCommonStyles_error = import_styled_components2.css`
  border-color: ${cp.colorCritical};
  color: ${cp.colorCritical};

  &::placeholder {
    color: ${translucent(cp.colorCritical, 70)};
  }

  &:hover {
    border-color: ${translucent(cp.colorCritical, 50)};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${translucent(cp.colorCritical, 20)};
  }
`;
var labelCommonStyles = import_styled_components2.css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: ${cp.colorText};
  font-size: ${cp.fontSizeMd};
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;

  span {
    display: none;
  }
`;
var labelCommonStyles_required = import_styled_components2.css`
  span {
    display: flex;
    color: ${cp.colorCritical};
    font-weight: bold;
  }
`;
var labelCommonStyles_error = import_styled_components2.css`
  color: ${cp.colorCritical};
`;
var errorMessageCommonStyles = import_styled_components2.css`
  color: ${cp.colorCritical};
  font-size: ${cp.fontSizeSm};
`;
var infographicElementCommonStyles = import_styled_components2.css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
var infographicElementTitleCommonStyles = import_styled_components2.css`
  width: 100%;
  font-size: ${cp.fontSizeMd};
  font-weight: 500;
`;
var infographicElementTextCommonStyles = import_styled_components2.css`
  font-size: ${cp.fontSizeMd};
  font-weight: 400;
  color: ${cp.colorTextStrong};
`;
var infographicElementContentCommonStyles = import_styled_components2.css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: ${cp.fontSizeXs};
      font-weight: 400;
      color: ${cp.colorTextMuted};
    }

    p {
      ${infographicElementTextCommonStyles};
    }

    a {
      ${infographicElementTextCommonStyles};
      color: ${cp.colorLink};

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
var infographicElementLinkCommonStyles = import_styled_components2.css`
  ${infographicElementTextCommonStyles};
  color: ${cp.colorLink};

  &:hover {
    text-decoration: underline;
  }
`;

// src/styles/responsive-media-queries.ts
var import_styled_components3 = require("styled-components");
var displayResolution = {
  xs: 420,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
  xxl: 1400
};
var responsiveMediaQueries = {
  up: (size) => (first, ...args) => import_styled_components3.css`
      @media (min-width: ${size}px) {
        ${(0, import_styled_components3.css)(first, ...args)}
      }
    `,
  down: (size) => (first, ...args) => import_styled_components3.css`
      @media (max-width: ${size}px) {
        ${(0, import_styled_components3.css)(first, ...args)}
      }
    `,
  between: (min, max) => (first, ...args) => import_styled_components3.css`
      @media (min-width: ${displayResolution[min]}px) and (max-width: ${displayResolution[max]}px) {
        ${(0, import_styled_components3.css)(first, ...args)}
      }
    `
};

// src/internal/components/medication-elements/MedicationCard/medication-card-elements/Header/styles.ts
var StyledHeader = import_styled_components4.default.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  align-self: stretch;
  background: ${cp.colorSurface};
  border-radius: ${cp.radiusMd};

  ${responsiveMediaQueries.down(displayResolution.s)`
  gap: 4px;
  `};

  .medication {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;

    ${responsiveMediaQueries.down(displayResolution.s)`
    gap: 8px;
  `};

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 12px;

      &__heading {
        display: flex;
        flex-direction: column;
        gap: 4px;

        &__title {
          display: flex;
          align-items: center;
          gap: 8px;

          h3 {
            color: ${cp.colorText};
            font-size: ${cp.fontSizeLg};
            font-style: normal;
            font-weight: 500;
          }
        }

        &__activeIngredient {
          color: ${cp.colorText};
          font-size: ${cp.fontSizeMd};
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }
      }

      &__description {
        width: 100%;
        display: flex;
        gap: 32px;
        row-gap: 8px;
        flex-wrap: wrap;

        &__item {
          display: flex;
          align-items: center;
          gap: 6px;

          span {
            font-size: ${cp.fontSizeXs};
            font-weight: 400;
            color: ${cp.colorTextMuted};
          }

          p {
            font-size: ${cp.fontSizeMd};
            font-weight: 400;
            color: ${cp.colorTextStrong};
            font-style: normal;
            line-height: normal;
          }

          .price {
            color: ${cp.colorPrice};
            font-weight: 600;
          }
        }
      }
    }
  }
`;
var StyledCheapBadge = import_styled_components4.default.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: ${cp.radiusPill};
  font-size: ${cp.fontSize2xs};
  font-weight: 600;
  white-space: nowrap;
  color: ${cp.colorOnBadge};
  background-color: ${({ $variant }) => $variant === "cheapest" ? cp.colorOk : cp.colorOkStrong};
`;
var StyledExpandButton = import_styled_components4.default.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  ${targetSize("width")};
  ${targetSize("height")};
  background: none;
  cursor: pointer;

  ${({ $isExpanded }) => !!$isExpanded && import_styled_components4.css`
      transform: rotate(90deg);
    `};
`;
var StyledTextToIcon = import_styled_components4.default.div`
  height: 22px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  border-radius: ${cp.radiusSm};

  p {
    font-size: ${cp.fontSize2xs} !important;
    font-weight: 600;
    color: ${cp.colorOnBadge} !important;
  }

  ${({ $color }) => $color === "green" && import_styled_components4.css`
      background-color: ${cp.colorOk};
    `};

  ${({ $color }) => $color === "orange" && import_styled_components4.css`
      background-color: ${cp.colorCaution};
    `};

  ${({ $color }) => $color === "red" && import_styled_components4.css`
      background-color: ${cp.colorCriticalStrong};
    `};

  ${({ $color }) => $color === "grey" && import_styled_components4.css`
      background-color: ${cp.colorNeutral};
    `};
`;

// src/internal/components/medication-elements/MedicationCard/summary-elements/PriceReimbursementBadge/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PriceReimbursementBadge = ({ medication }) => {
  const be = medication.regulatory?.be;
  if (!be?.price) return null;
  const reimbursement = be.reimbursements;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "medication__content__description__item", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("medication.ui.price") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "price", children: be.price })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "medication__content__description__item", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        " ",
        t("medication.reimbursement.title")
      ] }),
      reimbursement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "green", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: reimbursement.reimbursementCriterion?.category }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "grey", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("medication.reimbursement.non") }) })
    ] })
  ] });
};

// src/internal/components/medication-elements/MedicationCard/summary-elements/DeliveryConditionsSummaryBadge/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var DeliveryConditionsSummaryBadge = ({ medication }) => {
  const code = medication.regulatory?.be?.deliveryModusCode;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "medication__content__description__item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("medication.delivery.title") }),
    code ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "orange", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: code }) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "green", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: t("medication.prescription.free") }) })
  ] });
};

// src/internal/components/medication-elements/MedicationCard/summary-elements/PrescriptionConditionsSummaryBadge/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var PrescriptionConditionsSummaryBadge = ({ medication }) => {
  const code = medication.regulatory?.be?.deliveryModusSpecificationCode;
  const specification = medication.regulatory?.be?.deliveryModusSpecification;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "medication__content__description__item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("medication.prescription.title") }),
    code && specification ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "red", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: code }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "green", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("medication.delivery.notApplicable") }) })
  ] });
};

// src/internal/components/common/Tooltip/index.tsx
var import_react = __toESM(require("react"));

// src/internal/components/common/Tooltip/styles.ts
var import_styled_components5 = __toESM(require("styled-components"));
var tooltipArrow = import_styled_components5.css`
  content: '';
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
`;
var tooltipTopOriented = import_styled_components5.css`
  .chevron {
    display: none;
    ${tooltipArrow};
    border-top: 7px solid ${cp.colorAccent};
    position: absolute;
    bottom: 23px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .popup {
    bottom: 28px;
  }
`;
var tooltipBottomOriented = import_styled_components5.css`
  .chevron {
    display: none;
    ${tooltipArrow};
    border-bottom: 7px solid ${cp.colorAccent};
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .popup {
    top: 30px;
  }
`;
var tooltipRightOriented = import_styled_components5.css`
  .chevron {
    right: 50%;
  }

  .popup {
    // Half width of the chevron
    right: -7px;
  }
`;
var tooltipLeftOriented = import_styled_components5.css`
  .popup {
    // Half width of the chevron
    left: -7px;
  }
`;
var tooltipOrientationStyles = ($tooltipOrientation) => {
  switch ($tooltipOrientation) {
    case "tr":
      return import_styled_components5.css`
        ${tooltipTopOriented};
        ${tooltipRightOriented};
      `;
    case "tl":
      return import_styled_components5.css`
        ${tooltipTopOriented};
        ${tooltipLeftOriented};
      `;
    case "br":
      return import_styled_components5.css`
        ${tooltipBottomOriented};
        ${tooltipRightOriented};
      `;
    case "bl":
      return import_styled_components5.css`
        ${tooltipBottomOriented};
        ${tooltipLeftOriented};
      `;
    default:
      return null;
  }
};
var StyleTooltip = import_styled_components5.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: min-content;
  cursor: pointer;

  ${({ $tooltipOrientation }) => tooltipOrientationStyles($tooltipOrientation)};

  &:hover {
    .chevron {
      display: flex;
    }
  }

  .icon {
    height: 22px;
    display: flex;
    align-items: center;
    z-index: 10;
  }

  .popup {
    display: none;
    position: absolute;
    z-index: 15;
    min-height: 32px;
    min-width: 300px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
    align-self: stretch;
    border-radius: ${cp.radiusMd};
    border: 1px solid ${cp.colorAccent};
    background: ${cp.colorSurface};

    &__iconWrap {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      border-bottom: 1px solid ${cp.colorAccent};
      padding-bottom: 6px;
    }

    &__icon {
      display: flex;
      min-width: 22px;
      height: 22px;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
    }

    p {
      color: ${cp.colorText};
      font-size: ${cp.fontSizeMd};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  ${({ $active }) => !!$active && import_styled_components5.css`
      .popup {
        display: flex;
      }
    `};
`;

// src/internal/components/common/Tooltip/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Tooltip = ({ content, contentSnippet, iconSnippet, orientation = "bl", boundaryBox }) => {
  const [active, setActive] = (0, import_react.useState)(false);
  const [tooltipOrientation, setTooltipOrientation] = (0, import_react.useState)(orientation);
  const tooltipRef = import_react.default.useRef(null);
  const repositionTooltip = (boundaryBox2) => {
    const tooltipElement = tooltipRef?.current;
    const boundaryBoxElement = boundaryBox2?.current;
    if (!tooltipElement || !boundaryBoxElement) return;
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const boundaryBoxRect = boundaryBoxElement.getBoundingClientRect();
    const widthOfTooltipPopUp = 300;
    if (boundaryBoxRect.right - tooltipRect.right > widthOfTooltipPopUp) {
      setTooltipOrientation("bl");
    } else if (boundaryBoxRect.right - tooltipRect.right < widthOfTooltipPopUp || boundaryBoxRect.right - tooltipRect.right === widthOfTooltipPopUp) {
      setTooltipOrientation("br");
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    StyleTooltip,
    {
      className: "StyleTooltip",
      ref: tooltipRef,
      $tooltipOrientation: tooltipOrientation,
      $active: active,
      onMouseEnter: () => {
        repositionTooltip(boundaryBox);
        setActive(true);
      },
      onMouseLeave: () => setActive(false),
      onClick: (event) => {
        event.stopPropagation();
        repositionTooltip(boundaryBox);
        setActive((wasActive) => !wasActive);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "icon", children: iconSnippet }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "chevron" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "popup", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "popup__iconWrap", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "popup__icon", children: iconSnippet }) }),
          !!content && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: content }),
          !!contentSnippet && contentSnippet
        ] })
      ]
    }
  );
};

// src/internal/components/common/Icons/index.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function SpinnerIcn({ pathFill = cp.iconNeutral, size = 12 }) {
  const sizePx = `${size}px`;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "svg",
    {
      "aria-hidden": "true",
      focusable: "false",
      style: { width: sizePx, height: sizePx, color: pathFill },
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      width: "24",
      height: "24",
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { strokeDasharray: "169.64600329384882 58.548667764616276", r: "36", strokeWidth: "12", stroke: "currentColor", fill: "none", cy: "50", cx: "50", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("animateTransform", { keyTimes: "0;1", values: "0 50 50;360 50 50", dur: "1s", repeatCount: "indefinite", type: "rotate", attributeName: "transform" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", {})
      ] })
    }
  );
}
var StatusSuccessIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconSuccess }, width: "26", height: "26", viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { clipPath: "url(#clip0_1152_2420)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      d: "M13 0C5.82098 0 0 5.82098 0 13C0 20.179 5.82098 26 13 26C20.179 26 26 20.179 26 13C26 5.82098 20.179 0\n        13 0ZM18.615 8.75469L12.5038 17.2279C12.4184 17.3471 12.3058 17.4443 12.1753 17.5113C12.0449 17.5783 11.9003\n        17.6132 11.7537 17.6132C11.607 17.6132 11.4625 17.5783 11.332 17.5113C11.2016 17.4443 11.089 17.3471 11.0036\n        17.2279L7.38504 12.2136C7.27478 12.0598 7.38504 11.8451 7.57366 11.8451H8.9346C9.23058 11.8451 9.51205 11.9873\n        9.68616 12.231L11.7522 15.098L16.3138 8.7721C16.4879 8.53125 16.7665 8.38616 17.0654 8.38616H18.4263C18.615\n        8.38616 18.7252 8.60089 18.615 8.75469Z",
      fill: "currentColor"
    }
  ) }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_1152_2420", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "26", height: "26", fill: "white" }) }) })
] });
var StatusErrorIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconError }, width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 0C18.6268 0 24 5.37321 24 12C24 18.6268 18.6268 24 12 24C5.37321 24 0 18.6268 0 12C0 5.37321 5.37321 0\n      12 0ZM15.428 7.36125H15.427L15.4248 7.36286L12 10.7879L8.57518 7.36286C8.57411 7.36152 8.57357 7.36125 8.57304\n      7.36125C8.57242 7.36106 8.57177 7.36106 8.57116 7.36125C8.57036 7.36125 8.56982 7.36152 8.56875 7.36259L7.36286\n      8.56848C7.36221 8.56916 7.36175 8.56999 7.36152 8.57089C7.36133 8.5715 7.36133 8.57216 7.36152\n      8.57277V8.5733C7.36197 8.57392 7.36251 8.57446 7.36313 8.57491L10.7879 12L7.36286 15.4248C7.36152 15.4259\n      7.36125 15.4264 7.36125 15.427C7.36106 15.4276 7.36106 15.4282 7.36125 15.4288C7.36125 15.4296 7.36152 15.4302\n      7.36259 15.4312L8.56848 16.6371C8.56916 16.6378 8.56999 16.6383 8.57089 16.6385C8.5715 16.6387 8.57216 16.6387\n      8.57277 16.6385C8.5733 16.6385 8.57384 16.6382 8.57491 16.6371L12 13.2121L15.4248 16.6371C15.4259 16.6382 15.4264\n      16.6385 15.427 16.6385C15.4276 16.6387 15.4282 16.6387 15.4288 16.6385C15.4296 16.6385 15.4302 16.6382 15.4312\n      16.6371L16.6371 15.4312C16.6378 15.4306 16.6383 15.4297 16.6385 15.4288C16.6387 15.4282 16.6387 15.4276 16.6385\n      15.427V15.4264C16.6381 15.4258 16.6377 15.4253 16.6371 15.4248L13.2121 12L16.6371 8.57518C16.6382 8.57411 16.6385\n      8.57357 16.6385 8.57304C16.6387 8.57242 16.6387 8.57177 16.6385 8.57116C16.6385 8.57036 16.6382 8.56982 16.6371\n      8.56875L15.4312 7.36286C15.4306 7.36221 15.4297 7.36175 15.4288 7.36152C15.4282 7.36133 15.4276 7.36133 15.427\n      7.36152L15.428 7.36125Z",
    fill: "currentColor"
  }
) });
var BlackTriangleIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconNeutral }, width: "12px", height: "12px", viewBox: "0 0 10 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.37602 8.49475C5.49353 8.4276 5.59093 8.33021 5.65808 8.21269L8.9 2.53934C9.1077 2.17586 8.98142 1.71282\n      8.61793 1.50511C8.5034 1.43966 8.37377 1.40524 8.24185 1.40524H1.75802C1.33938 1.40524 1 1.74461 1 2.16326C1\n      2.29517 1.03443 2.4248 1.09987 2.53934L4.34179 8.21269C4.54949 8.57617 5.01253 8.70246 5.37602 8.49475Z",
    fill: "currentColor"
  }
) });
var OrangeTriangleIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconCaution }, width: "12px", height: "12px", viewBox: "0 0 10 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.37602 8.49475C5.49353 8.4276 5.59093 8.33021 5.65808 8.21269L8.9 2.53934C9.1077 2.17586 8.98142 1.71282\n      8.61793 1.50511C8.5034 1.43966 8.37377 1.40524 8.24185 1.40524H1.75802C1.33938 1.40524 1 1.74461 1 2.16326C1\n      2.29517 1.03443 2.4248 1.09987 2.53934L4.34179 8.21269C4.54949 8.57617 5.01253 8.70246 5.37602 8.49475Z",
    fill: "currentColor"
  }
) });
var ChevronIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconInfo }, width: "12px", height: "12px", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { clipPath: "url(#clip0_153_633)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      d: "M2.57153 1.018L2.57153 2.02247C2.57153 2.09077 2.60502 2.15505 2.65993 2.19523L7.90457 6.00014L2.65993\n        9.80506C2.60502 9.84523 2.57153 9.90952 2.57153 9.97782L2.57153 10.9823C2.57153 11.0693 2.67064 11.1202 2.74162\n         11.0693L9.25189 6.34702C9.4876 6.17559 9.4876 5.8247 9.25189 5.65461L2.74162 0.932286C2.67064 0.880054 2.57153\n          0.930947 2.57153 1.018Z",
      fill: "currentColor"
    }
  ) }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_153_633", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "12px", height: "12px", fill: "white", transform: "matrix(0 -1 1 0 0 12)" }) }) })
] });
var EndOfCommercialisationIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconCritical }, width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { clipPath: "url(#clip0_330_2250)", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M4.65801 10.3098C4.52446 10.2195 4.36185 10.1662 4.18897 10.1664C4.07385 10.1664 3.96278 10.1899 3.86218\n        10.2325C3.71139 10.2963 3.58384 10.4023 3.49335 10.5362C3.40283 10.6698 3.34991 10.8324 3.3501 11.0052C3.34991\n        11.1204 3.37335 11.2314 3.416 11.3318C3.47997 11.4828 3.58579 11.6104 3.71952 11.7007C3.85328 11.7914 4.01608\n        11.8443 4.18897 11.8443C4.3041 11.8443 4.41496 11.8208 4.51536 11.7782C4.66635 11.7144 4.79408 11.6082 4.88439\n         11.4745C4.97472 11.3409 5.0278 11.1781 5.0278 11.0052C5.0278 10.8901 5.00415 10.7793 4.96171 10.6787C4.89793\n          10.5277 4.79174 10.4002 4.65801 10.3098ZM4.50062 11.1368C4.47503 11.1973 4.43181 11.2495 4.37772\n          11.2859C4.32346 11.3224 4.2599 11.3435 4.18895 11.3437C4.14147 11.3435 4.09745 11.3342 4.05735\n          11.3169C3.99707 11.2917 3.94473 11.2483 3.90829 11.1944C3.87184 11.1399 3.85091 11.0762 3.85054\n          11.0052C3.85072 10.9579 3.86022 10.9141 3.87728 10.8736C3.90247 10.8134 3.9459 10.7612 3.99995\n          10.7246C4.05423 10.6882 4.11798 10.6672 4.18893 10.667C4.23622 10.667 4.28003 10.6766 4.32032\n          10.6936C4.38079 10.719 4.43272 10.7622 4.46938 10.8165C4.50583 10.8708 4.52694 10.9343 4.52694\n          11.0053C4.52699 11.0527 4.51766 11.0966 4.50062 11.1368Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M3.95443 9.20724C3.86373 9.20724 3.77884 9.189 3.70093 9.15623C3.58466 9.10702 3.48425 9.02405 3.41408\n         8.91977C3.34663 8.81956 3.30671 8.70155 3.3036 8.57208C3.30709 8.4176 3.35633 8.28349 3.44277 8.17629C3.48756\n         8.12107 3.54278 8.0726 3.60983 8.03248C3.67611 7.99294 3.75423 7.96156 3.84592 7.94177L9.57245 7.00971C9.9467\n         6.94866 10.2442 6.6626 10.3198 6.29102L11.0203 2.84747V2.84709C11.0284 2.80716 11.0323 2.76645 11.0323\n          2.72616C11.0323 2.58698 10.9846 2.45093 10.895 2.34122C10.7797 2.20013 10.6068 2.11814 10.4243\n          2.11814H2.495L2.22481 1.18997V1.19016C2.10078 0.775195 1.76042 0.460828 1.33714 0.370125L0.367674\n          0.162539C0.203705 0.127266 0.0420336 0.231938 0.00678359 0.396094C-0.0283023 0.56025 0.0761586 0.721899\n          0.240526 0.756985L1.20962 0.964758C1.41601 1.00894 1.58192 1.16205 1.64221 1.36441L3.41371 7.44949C3.37379\n          7.4681 3.33521 7.48826 3.29821 7.51055C3.1071 7.62434 2.95398 7.78404 2.85125 7.97049C2.753 8.14763 2.70085\n          8.34844 2.696 8.55563H2.69502V8.5872H2.69579C2.69968 8.74906 2.73418 8.90431 2.79406 9.04599C2.89002 9.27256\n          3.04932 9.46425 3.25011 9.59991C3.4509 9.73575 3.69472 9.81541 3.95443 9.81523H7.17163C7.17064 9.7852 7.16717\n           9.75593 7.16717 9.7257C7.16717 9.54834 7.18538 9.37526 7.21815 9.20724H3.95443ZM8.28413 3.16263C8.45488\n           3.11302 8.63356 3.2107 8.68318 3.38145L9.33556 5.61441C9.38518 5.78517 9.28728 5.96367 9.11656\n           6.01366C8.94599 6.06349 8.7673 5.96562 8.71749 5.79485L8.06527 3.56187C8.01549 3.39134 8.11337 3.21265\n           8.28413 3.16263ZM6.87643 3.16845C7.04699 3.11843 7.2257 3.21631 7.27548 3.38707L7.99009 5.83418C8.0401\n           6.00476 7.94202 6.18363 7.77146 6.23346C7.60091 6.28324 7.4222 6.18539 7.37218 6.01463L6.65757\n           3.56747C6.60781 3.39696 6.70567 3.21806 6.87643 3.16845ZM5.46835 3.17348C5.6391 3.12387 5.81781 3.22174\n           5.8674 3.39248L6.64074 6.04022C6.69074 6.21099 6.59267 6.38967 6.42212 6.43948C6.25159 6.48931 6.07288\n           6.39143 6.02286 6.22066L5.24952 3.57274C5.19971 3.40219 5.29759 3.22348 5.46835 3.17348ZM4.06046\n           3.17911C4.23123 3.12928 4.40992 3.22718 4.45972 3.39795L5.29332 6.25249C5.34334 6.42324 5.24525 6.60213\n           5.0747 6.65175C4.90414 6.70174 4.72543 6.60368 4.67542 6.43313L3.84163 3.5782C3.79203 3.40763 3.88972\n           3.22891 4.06046 3.17911Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M9.88112 7.60687C8.71086 7.60687 7.7627 8.55541 7.7627 9.72569C7.7627 10.8958 8.71086 11.8443 9.88112\n        11.8443C11.0514 11.8443 11.9999 10.8958 11.9999 9.72569C11.9999 8.55541 11.0514 7.60687 9.88112\n        7.60687ZM11.0917 10.0788H8.67055V9.37235H11.0917V10.0788Z",
        fill: "currentColor"
      }
    )
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_330_2250", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "12", height: "12", fill: "white" }) }) })
] });
var LeafIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconOkAlt }, width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { clipPath: "url(#clip0_618_2370)", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("mask", { id: "mask0_618_2370", maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "14", height: "14", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M14 0H0V14H14V0Z", fill: "white" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { mask: "url(#mask0_618_2370)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M7.87489 0C4.49192 0 1.74989 2.74203 1.74989 6.125V11.0128L0.256266 12.5064C-0.085422 12.8481 -0.085422\n          13.4019 0.256266 13.7436C0.42711 13.9145 0.65111 14 0.874891 14C1.09867 14 1.32267 13.9145 1.49352\n          13.7436L2.98714 12.25H7.87489C11.2579 12.25 13.9999 9.50797 13.9999 6.125V0H7.87489ZM11.1185 4.11862L8.23627\n          7.00088H9.62489C10.1085 7.00088 10.4999 7.39222 10.4999 7.87588C10.4999 8.35953 10.1085 8.75088 9.62489\n          8.75088H6.48627L5.86852 9.36862C5.69767 9.53947 5.47367 9.625 5.24989 9.625C5.02611 9.625 4.80211 9.53947\n          4.63127 9.36862C4.28958 9.02694 4.28958 8.47306 4.63127 8.13138L5.24989 7.51275V4.375C5.24989 3.89134 5.64124\n           3.5 6.12489 3.5C6.60855 3.5 6.99989 3.89134 6.99989 4.375V5.76275L9.88127 2.88137C10.223 2.53969 10.7768\n           2.53969 11.1185 2.88137C11.4602 3.22306 11.4604 3.77694 11.1185 4.11862Z",
        fill: "currentColor"
      }
    ) })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_618_2370", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "14", height: "14", fill: "white" }) }) })
] });
var MoleculeIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconCautionAlt }, width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { clipPath: "url(#clip0_618_936)", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("mask", { id: "mask0_618_936", maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "14", height: "14", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M14 0H0V14H14V0Z", fill: "white" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { mask: "url(#mask0_618_936)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: "M10.1245 5.15595V2.10851C10.1245 1.90286 10.016 1.71436 9.84181 1.60869L7.29986 0.0835404C7.11421\n          -0.0278468 6.88572 -0.0278468 6.70008 0.0835404L4.15531 1.60869C3.97824 1.71436 3.87256 1.90286 3.87256\n          2.10851V5.15595C3.87256 5.36159 3.98109 5.55009 4.15531 5.65576L6.70008 7.18091C6.96856 7.33514 7.19133\n          7.25231 7.29986 7.18091L9.84181 5.65576C10.016 5.55009 10.1245 5.36159 10.1245 5.15595Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: "M5.96922 8.3405L3.4273 6.81532C3.24165 6.70393 3.01317 6.70393 2.82753 6.81532L0.282753 8.3405C0.105675\n          8.44612 0 8.63465 0 8.8403V11.8877C0 12.0934 0.108531 12.2819 0.282753 12.3875L2.82753 13.9127C3.096 14.0669\n          3.31877 13.9841 3.4273 13.9127L5.96922 12.3875C6.1463 12.2819 6.25197 12.0934 6.25197 11.8877V8.8403C6.25197\n          8.63465 6.1463 8.44612 5.96922 8.3405Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: "M13.7119 8.33763L11.17 6.81248C10.9843 6.7011 10.7559 6.7011 10.5702 6.81248L8.02541 8.33763C7.84831\n          8.44333 7.74268 8.63178 7.74268 8.83743V11.8849C7.74268 12.0906 7.85119 12.279 8.02541 12.3847L10.5673\n          13.9099C10.8358 14.0641 11.0586 13.9813 11.1671 13.9099L13.709 12.3847C13.8861 12.279 13.9918 12.0906\n          13.9918 11.8849V8.83743C13.9946 8.63178 13.8861 8.44333 13.7119 8.33763Z",
          fill: "currentColor"
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_618_936", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "14", height: "14", fill: "white" }) }) })
] });
var PillsBottleIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconNeutral }, width: "12px", height: "12px", viewBox: "0 0 10 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { clipPath: "url(#clip0_165_1782)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      d: "M7.8751 4.34052C7.86877 4.11591 7.75782 3.91751 7.58907 3.79252C7.40655 3.62106 7.2094 3.46818 7.01846\n        3.26338C6.98683 3.22948 6.96046 3.19954 6.93778 3.17205C6.93517 3.16894 6.93256 3.1658 6.92996 3.16263C6.92681\n        3.1587 6.92397 3.155 6.92093 3.15118L6.91757 3.14688C6.82224 3.02447 6.81289 2.95561 6.81289 2.83826C6.81289\n        2.77897 6.81289 2.65316 6.81289 2.52272H6.9662C7.18556 2.52272 7.3634 2.36418 7.3634 2.16861V1.35413C7.3634\n        1.15854 7.18557 1 6.9662 1H3.03366C2.81429 1 2.63645 1.15854 2.63645 1.35413V2.16859C2.63645 2.36416 2.81429\n        2.5227 3.03366 2.5227H3.18697C3.18697 2.65314 3.18697 2.77896 3.18697 2.83824C3.18697 2.95559 3.17762 3.02446\n        3.08227 3.14687L3.07893 3.15116C3.07589 3.15498 3.07308 3.1587 3.06991 3.16261C3.06734 3.16578 3.06474 3.16891\n        3.06208 3.17203C3.0394 3.19952 3.01303 3.22948 2.98144 3.26336C2.79046 3.46817 2.59332 3.62099 2.41079\n        3.79246C2.24204 3.91746 2.13109 4.11591 2.12476 4.34051C2.12476 4.34635 2.12427 4.35356 2.12427 4.36032C2.12427\n         4.86656 2.12427 7.86047 2.12427 8.24009C2.12427 8.62504 2.40714 9 2.88414 9C3.12245 9 3.82162 9 4.98483\n         9C4.98483 9 4.9887 9 4.99588 9H4.99991H5.00395C5.01113 9 5.015 9 5.015 9C6.17819 9 6.87738 9 7.11569 9C7.59269\n          9 7.87556 8.62504 7.87556 8.24009C7.87556 7.86047 7.87556 4.8673 7.87556 4.36108C7.87556 4.35432 7.8751\n          4.34637 7.8751 4.34052ZM7.08025 6.21274C7.08025 6.43213 6.90241 6.60997 6.68304\n          6.60997H4.99995H3.31686C3.0975 6.60997 2.91965 6.43213 2.91965 6.21274V5.5681C2.91965 5.34872 3.0975 5.17088\n           3.31686 5.17088H6.68304C6.90241 5.17088 7.08025 5.34874 7.08025 5.5681V6.21274Z",
      fill: "currentColor"
    }
  ) }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_165_1782", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "8", height: "8", fill: "white", transform: "translate(1 1)" }) }) })
] });
var PrescriptionIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconNeutral }, width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    d: "M8.56078 8.25L10.3903 6.42047C10.5368 6.27398 10.5368 6.03656 10.3903 5.89008L9.85992 5.35969C9.71344 5.2132\n       9.47602 5.2132 9.32953 5.35969L7.5 7.18922L5.53219 5.22141C6.64008 5.08125 7.5 4.14586 7.5 3C7.5 1.75734 6.49266\n        0.75 5.25 0.75H1.875C1.66781 0.75 1.5 0.917813 1.5 1.125V7.125C1.5 7.33219 1.66781 7.5 1.875 7.5H2.625C2.83219\n         7.5 3 7.33219 3 7.125V5.25H3.43945L6.43945 8.25L4.60992 10.0795C4.46344 10.226 4.46344 10.4634 4.60992\n          10.6099L5.14031 11.1403C5.2868 11.2868 5.52422 11.2868 5.6707 11.1403L7.5 9.31055L9.32953 11.1401C9.47602\n           11.2866 9.71344 11.2866 9.85992 11.1401L10.3903 10.6097C10.5368 10.4632 10.5368 10.2258 10.3903\n           10.0793L8.56078 8.25ZM3 2.25H5.25C5.66344 2.25 6 2.58656 6 3C6 3.41344 5.66344 3.75 5.25 3.75H3V2.25Z",
    fill: "currentColor"
  }
) });
var SolidPillIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconInfo }, width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { clipPath: "url(#clip0_618_3928)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      d: "M12.5957 9.11825C12.1339 8.62182 11.5084 8.31967 10.8342 8.26742L10.8168 8.26608L3.19964 8.25861C1.71537\n        8.25861 0.507812 9.46617 0.507812 10.9505C0.507812 12.4347 1.71537 13.6423 3.19964 13.6423H3.20011L10.7994\n        13.6348L10.8342 13.6335C11.5083 13.5812 12.1339 13.2791 12.5957 12.7827C13.0601 12.2834 13.3159 11.6327 13.3159\n        10.9505C13.3159 10.2682 13.0601 9.61754 12.5957 9.11825ZM6.98957 12.7251L3.19931 12.7288C2.21893 12.7286\n        1.42131 11.9309 1.42131 10.9505C1.42131 9.96992 2.21907 9.17214 3.19918 9.17214L6.98957\n        9.17586V12.7251ZM1.69844 7.39865C2.15702 7.73348 2.72102 7.91788 3.28648 7.91794H3.28659C3.48032 7.91794\n        3.67493 7.89669 3.86497 7.85477L3.882 7.85103L11.1737 5.64824C12.5941 5.21763 13.3994 3.71168 12.9688\n        2.2912C12.7979 1.72734 12.4566 1.24606 11.9819 0.899316C11.5232 0.564246 10.9591 0.37973 10.3935\n         0.37973C10.1285 0.379872 9.86494 0.419123 9.61137 0.496215L2.34107 2.70811L2.30812 2.71951C1.67812 2.96508\n         1.16713 3.43572 0.869242 4.04475C0.569637 4.65728 0.513664 5.35421 0.711578 6.00713C0.882531 6.5709 1.22378\n         7.05207 1.69844 7.39865ZM9.87685 1.37031C10.0443 1.31935 10.2185 1.29337 10.3935 1.29323C11.1697 1.29323\n         11.8691 1.8126 12.0946 2.55621C12.379 3.49462 11.847 4.48952 10.9091 4.77387L7.28069 5.86997L6.25098\n         2.47344L9.87685 1.37031Z",
      fill: "currentColor"
    }
  ) }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_618_3928", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "14", height: "14", fill: "white" }) }) })
] });
var StartOfCommercialisationIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconOk }, width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { clipPath: "url(#clip0_330_2383)", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M4.65803 10.3099C4.52448 10.2196 4.36187 10.1663 4.18897 10.1665C4.07385 10.1665 3.96278 10.1899 3.86218\n        10.2326C3.71139 10.2964 3.58384 10.4024 3.49335 10.5363C3.40283 10.6698 3.34991 10.8325 3.3501 11.0054C3.34991\n        11.1205 3.37337 11.2316 3.41601 11.3319C3.47997 11.4829 3.58579 11.6105 3.71952 11.7008C3.85326 11.7915 4.01608\n         11.8444 4.18897 11.8444C4.3041 11.8444 4.41496 11.8209 4.51536 11.7783C4.66635 11.7145 4.79408 11.6083 4.88441\n          11.4746C4.97474 11.341 5.02783 11.1782 5.02783 11.0053C5.02783 10.8902 5.00418 10.7793 4.96173\n          10.6788C4.89796 10.5278 4.79176 10.4002 4.65803 10.3099ZM4.50062 11.1369C4.47503 11.1974 4.43181\n          11.2496 4.37772 11.286C4.32346 11.3224 4.25987 11.3436 4.18895 11.3437C4.14147 11.3436 4.09745 11.3343\n          4.05735 11.317C3.99707 11.2918 3.94473 11.2484 3.90829 11.1945C3.87184 11.14 3.85091 11.0763 3.85054\n          11.0053C3.85075 10.958 3.86024 10.9142 3.8773 10.8737C3.9025 10.8134 3.94593 10.7613 3.99997 10.7247C4.05426\n          10.6882 4.11803 10.6673 4.18895 10.6671C4.23625 10.6671 4.28005 10.6766 4.32036 10.6937C4.38083 10.719\n          4.43277 10.7623 4.46943 10.8165C4.50587 10.8708 4.52699 10.9344 4.52699 11.0053C4.52699 11.0528 4.51768\n          11.0966 4.50062 11.1369Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M3.9545 9.20728C3.8638 9.20728 3.77891 9.18907 3.701 9.15631C3.58471 9.10709 3.4843 9.02412 3.41415\n        8.91985C3.3467 8.81965 3.30676 8.7016 3.30367 8.57215C3.30716 8.41765 3.3564 8.28354 3.44284 8.17636C3.4876\n        8.12112 3.54285 8.07267 3.6099 8.03255C3.67618 7.99301 3.75428 7.96163 3.84599 7.94185L9.57261 7.00976C9.94686\n         6.94871 10.2444 6.66263 10.32 6.29107L11.0205 2.84745V2.84707C11.0286 2.80714 11.0325 2.76645 11.0325\n         2.72614C11.0325 2.58696 10.9848 2.45091 10.8952 2.3412C10.7799 2.2001 10.607 2.11812 10.4245\n         2.11812H2.49505L2.22486 1.1899V1.19009C2.10081 0.775128 1.76045 0.460738 1.33714 0.370035L0.367674\n         0.162449C0.203705 0.127175 0.0420336 0.231824 0.00678359 0.396003C-0.0283023 0.56016 0.0761586 0.721808\n          0.240526 0.756894L1.20964 0.964667C1.41606 1.00885 1.58195 1.16196 1.64223 1.36432L3.41375 7.44949C3.37384\n           7.4681 3.33526 7.48826 3.29825 7.51055C3.10714 7.62434 2.95403 7.78404 2.8513 7.97049C2.75305 8.14765 2.7009\n            8.34844 2.69605 8.55565H2.69506V8.58722H2.69584C2.69973 8.74908 2.73423 8.90433 2.79411 9.04601C2.89006\n             9.27258 3.04937 9.46428 3.25016 9.59993C3.45095 9.73577 3.69477 9.81546 3.9545 9.81525H7.17174C7.17076\n              9.78523 7.16729 9.75595 7.16729 9.72572C7.16729 9.54837 7.1855 9.37528 7.21827\n              9.20724H3.9545V9.20728ZM8.28428 3.16259C8.45502 3.11297 8.63373 3.21066 8.68335 3.3814L9.33575\n              5.61441C9.38537 5.78517 9.28749 5.96368 9.11675 6.01367C8.94617 6.0635 8.76749 5.96562 8.71768\n              5.79485L8.06546 3.56185C8.01561 3.39129 8.11351 3.2126 8.28428 3.16259ZM6.87655 3.1684C7.04713 3.11839\n              7.22581 3.21626 7.27562 3.38703L7.99023 5.83418C8.04024 6.00476 7.94216 6.18366 7.7716 6.23346C7.60103\n              6.28327 7.42234 6.18539 7.37232 6.01463L6.65771 3.56745C6.60791 3.39694 6.70578 3.21802 6.87655\n              3.1684ZM5.46845 3.17344C5.63919 3.12382 5.8179 3.2217 5.86752 3.39244L6.64086 6.04022C6.69085 6.21099\n              6.59279 6.3897 6.42224 6.43948C6.25168 6.48931 6.07297 6.39143 6.02296 6.22067L5.24961 3.5727C5.19978\n              3.40214 5.29768 3.22346 5.46845 3.17344ZM4.06053 3.17907C4.2313 3.12924 4.41001 3.22714 4.45982\n              3.3979L5.29344 6.25249C5.34346 6.42324 5.24537 6.60214 5.07481 6.65178C4.90424 6.70177 4.72555 6.60371\n               4.67553 6.43315L3.84172 3.57818C3.79208 3.40758 3.88977 3.22889 4.06053 3.17907Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M9.88135 7.6069C8.71107 7.6069 7.7627 8.55547 7.7627 9.72575C7.7627 10.8958 8.71107 11.8444 9.88135\n        11.8444C11.0514 11.8444 12 10.8958 12 9.72575C12 8.55547 11.0514 7.6069 9.88135 7.6069ZM9.76121 10.7154L8.74831\n         9.90502L9.13266 9.42455L9.6583 9.84514L10.5439 8.70664L11.0298 9.0844L9.76121 10.7154Z",
        fill: "currentColor"
      }
    )
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_330_2383", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "12", height: "12", fill: "white" }) }) })
] });
var SupplyIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconCaution }, width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { clipPath: "url(#clip0_329_708)", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M5.18757 9.96101C4.45959 9.96101 3.86963 10.5508 3.86963 11.2788C3.86963 12.0069 4.45959 12.5966 5.18757\n        12.5966C5.91581 12.5966 6.50562 12.0069 6.50562 11.2788C6.50562 10.5508 5.91581 9.96101 5.18757\n        9.96101ZM5.18757 11.8517C4.87111 11.8517 4.61468 11.5953 4.61468 11.2788C4.61468 10.9622 4.87111 10.7059\n        5.18757 10.7059C5.50406 10.7059 5.76067 10.9622 5.76067 11.2788C5.76067 11.5953 5.50406 11.8517 5.18757 11.8517Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M12.1372 9.96101C11.4093 9.96101 10.8193 10.5508 10.8193 11.2788C10.8193 12.0069 11.4093 12.5966 12.1372\n        12.5966C12.8655 12.5966 13.4553 12.0069 13.4553 11.2788C13.4553 10.5508 12.8655 9.96101 12.1372 9.96101ZM12.1372\n         11.8517C11.8208 11.8517 11.5644 11.5953 11.5644 11.2788C11.5644 10.9622 11.8208 10.7059 12.1372\n         10.7059C12.4538 10.7059 12.7104 10.9622 12.7104 11.2788C12.7104 11.5953 12.4538 11.8517 12.1372 11.8517Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M6.6703 5.9117C6.6703 6.09636 6.51918 6.24744 6.33455 6.24744H1.70143C1.51676 6.24744 1.36572 6.09636 1.36572\n         5.9117V5.71025C1.36572 5.52562 1.5168 5.37454 1.70143 5.37454H6.33455C6.51922 5.37454 6.6703 5.52562 6.6703\n         5.71025V5.9117Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M14.7198 7.87737C14.2365 7.75174 13.96 7.67276 13.7703 7.30629L13.1358 6.02162C12.9459 5.65516 12.4529\n        5.35529 12.0403 5.35529H11.1725C11.1725 5.35529 11.0557 5.35773 11.0557 5.24024C11.0557 4.97087 11.0557\n        4.1628 11.0557 4.1628C11.0557 3.74512 10.8194 3.40337 10.3166 3.40337H3.24371C2.52388 3.40337 2.18213 3.74516\n        2.18213 4.1628V4.83801C2.18213 4.83801 2.18213 5.03883 2.3765 5.03883C3.36599 5.03883 6.33452 5.03883 6.33452\n        5.03883C6.70477 5.03883 7.006 5.34003 7.006 5.71028V5.91173C7.006 6.28199 6.70477 6.58318 6.33452\n        6.58318H2.3765C2.3765 6.58318 2.18213 6.56703 2.18213 6.77685C2.18213 6.88106 2.18213 6.95101 2.18213\n        7.00905C2.18213 7.19372 2.43524 7.19361 2.43524 7.19361H5.09958C5.46984 7.19361 5.77107 7.49483 5.77107\n        7.86506V8.0665C5.77107 8.43676 5.46984 8.73795 5.09958 8.73795H2.47727C2.47727 8.73795 2.18213 8.7325\n        2.18213 8.9675C2.18213 9.37541 2.18213 10.5991 2.18213 10.5991C2.18213 11.0167 2.52388 11.3585 2.94156\n        11.3585C2.94156 11.3585 3.25618 11.3585 3.36105 11.3585C3.45619 11.3585 3.4702 11.3055 3.4702 11.2789C3.4702\n        10.332 4.24066 9.5617 5.1876 9.5617C6.13462 9.5617 6.90504 10.332 6.90504 11.2789C6.90504 11.3056 6.89744\n        11.3585 6.9702 11.3585C7.80172 11.3585 10.3555 11.3585 10.3555 11.3585C10.4226 11.3585 10.4199 11.3019 10.4199\n        11.2789C10.4199 10.332 11.1903 9.5617 12.1373 9.5617C13.0843 9.5617 13.8547 10.332 13.8547 11.2789C13.8547\n        11.3056 13.854 11.3585 13.896 11.3585C14.2773 11.3585 14.7495 11.3585 14.7495 11.3585C15.1624 11.3585 15.5\n        11.0208 15.5 10.6081V9.18233C15.5001 7.98165 15.1209 7.98165 14.7198 7.87737ZM13.2917 7.81059C13.2917 7.81059\n        11.6981 7.81059 11.1557 7.81059C11.0674 7.81059 11.0557 7.72468 11.0557 7.72468V5.94529C11.0557 5.94529 11.0507\n         5.87696 11.164 5.87696C11.3164 5.87696 11.7735 5.87696 11.7735 5.87696C12.1408 5.87696 12.5794 6.14378 12.7483\n          6.46987L13.3129 7.61298C13.3367 7.659 13.3621 7.69986 13.3893 7.73647C13.4094 7.76332 13.3757 7.81059 13.2917\n           7.81059Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: "M5.43524 8.06651C5.43524 8.25118 5.28416 8.40226 5.09953 8.40226H0.835707C0.651039 8.40226 0.5 8.25118 0.5\n        8.06651V7.86506C0.5 7.68043 0.651076 7.52936 0.835707 7.52936H5.09953C5.2842 7.52936 5.43524 7.68043 5.43524\n        7.86506V8.06651Z",
        fill: "currentColor"
      }
    )
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("clipPath", { id: "clip0_329_708", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "15", height: "15", fill: "white", transform: "translate(0.5 0.5)" }) }) })
] });
var SearchIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconMuted }, width: "20px", height: "20px", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { mask: "url(#mask0_16_247)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    d: "M16.3333 17.5L11.0833 12.25C10.6667 12.5833 10.1875 12.8472 9.64583 13.0417C9.10417 13.2361 8.52778 13.3333\n        7.91667 13.3333C6.40278 13.3333 5.12153 12.809 4.07292 11.7604C3.02431 10.7118 2.5 9.43056 2.5 7.91667C2.5\n        6.40278 3.02431 5.12153 4.07292 4.07292C5.12153 3.02431 6.40278 2.5 7.91667 2.5C9.43056 2.5 10.7118 3.02431\n        11.7604 4.07292C12.809 5.12153 13.3333 6.40278 13.3333 7.91667C13.3333 8.52778 13.2361 9.10417 13.0417\n        9.64583C12.8472 10.1875 12.5833 10.6667 12.25 11.0833L17.5 16.3333L16.3333 17.5ZM7.91667 11.6667C8.95833\n        11.6667 9.84375 11.3021 10.5729 10.5729C11.3021 9.84375 11.6667 8.95833 11.6667 7.91667C11.6667 6.875 11.3021\n        5.98958 10.5729 5.26042C9.84375 4.53125 8.95833 4.16667 7.91667 4.16667C6.875 4.16667 5.98958 4.53125 5.26042\n        5.26042C4.53125 5.98958 4.16667 6.875 4.16667 7.91667C4.16667 8.95833 4.53125 9.84375 5.26042 10.5729C5.98958\n        11.3021 6.875 11.6667 7.91667 11.6667Z",
    fill: "currentColor"
  }
) }) });
var CloseIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconClose }, width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.1404 2.32697C13.1407 2.32697 13.1411 2.32732 13.1418 2.32804L14.172 3.3584C14.1727 3.35893 14.1729 3.35929\n       14.1731 3.35982C14.1732 3.36018 14.1732 3.36054 14.1731 3.3609C14.1731 3.36143 14.1727 3.36179 14.172\n       3.3625L9.0345 8.5L14.172 13.6375C14.1727 13.6382 14.1729 13.6386 14.1731 13.6391C14.1732 13.6395 14.1732 13.64\n       14.1731 13.6404C14.1731 13.6407 14.1727 13.6411 14.172 13.6418L13.1416 14.672C13.1411 14.6727 13.1407 14.6729\n       13.1404 14.673C13.14 14.6732 13.1395 14.6732 13.1391 14.673C13.1386 14.673 13.1382 14.6727 13.1375 14.672L8.00003\n        9.53447L2.86253 14.672C2.86182 14.6727 2.86146 14.6729 2.86093 14.673C2.86052 14.6732 2.86008 14.6732 2.85968\n         14.673C2.85932 14.673 2.85896 14.6727 2.85825 14.672L1.82807 13.6416C1.82735 13.6411 1.82718 13.6407 1.827\n         13.6404C1.82687 13.64 1.82687 13.6395 1.827 13.6391C1.827 13.6386 1.82735 13.6382 1.82807 13.6375L6.96557\n         8.5L1.82807 3.3625C1.82735 3.36179 1.82718 3.36143 1.827 3.3609C1.82687 3.36049 1.82687 3.36005 1.827\n         3.35965C1.827 3.35929 1.82735 3.35893 1.82807 3.35822L2.85843 2.32804C2.85896 2.32732 2.85932 2.32715 2.85968\n         2.32697C2.86008 2.32684 2.86052 2.32684 2.86093 2.32697C2.86146 2.32697 2.86182 2.32732 2.86253 2.32804L8.00003\n          7.46554L13.1375 2.32804C13.1382 2.32732 13.1386 2.32715 13.1391 2.32697C13.1395 2.32684 13.14 2.32684 13.1404\n           2.32697Z",
    fill: "currentColor"
  }
) });
var EditIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconAction }, width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  "path",
  {
    d: "M7.277 9.81458L12.1624 4.92916L11.4041 4.17083L6.51867 9.05625L7.277 9.81458ZM3.47075 11.0833C2.49853 11.0347\n      1.77422 10.8306 1.29784 10.4708C0.821446 10.1111 0.583252 9.59097 0.583252 8.91041C0.583252 8.27847 0.843321\n      7.76562 1.36346 7.37187C1.8836 6.97812 2.60547 6.74236 3.52909 6.66458C3.90825 6.63541 4.19263 6.57465 4.38221\n      6.48229C4.57179 6.38993 4.66659 6.26111 4.66659 6.09583C4.66659 5.84305 4.52318 5.65347 4.23638 5.52708C3.94957\n      5.40069 3.47561 5.30833 2.8145 5.25L2.91659 4.08333C3.91797 4.16111 4.65443 4.36284 5.12596 4.68854C5.59749\n      5.01423 5.83325 5.48333 5.83325 6.09583C5.83325 6.61111 5.6461 7.01458 5.27179 7.30625C4.89749 7.59791 4.34575\n      7.77291 3.61659 7.83125C2.99436 7.87986 2.5277 7.99409 2.21659 8.17396C1.90547 8.35382 1.74992 8.5993 1.74992\n      8.91041C1.74992 9.25069 1.88603 9.49618 2.15825 9.64687C2.43047 9.79757 2.88742 9.8875 3.52909 9.91666L3.47075\n      11.0833ZM7.55409 11.1854L5.14784 8.77916L10.7187 3.20833C10.9131 3.01389 11.144 2.91666 11.4114 2.91666C11.6787\n      2.91666 11.9096 3.01389 12.1041 3.20833L13.1249 4.22916C13.3194 4.42361 13.4166 4.65451 13.4166 4.92187C13.4166\n      5.18923 13.3194 5.42014 13.1249 5.61458L7.55409 11.1854ZM5.23534 11.6667C5.07006 11.7056 4.92422 11.6618 4.79784\n       11.5354C4.67145 11.409 4.6277 11.2632 4.66659 11.0979L5.14784 8.77916L7.55409 11.1854L5.23534 11.6667Z",
    fill: "currentColor"
  }
) });
var DeleteIcn = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { "aria-hidden": "true", focusable: "false", style: { color: cp.iconAction }, width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      d: "M5.83325 5.25C6.15542 5.25 6.41659 5.51117 6.41659 5.83334V9.625C6.41659 9.94717 6.15542 10.2083 5.83325\n      10.2083C5.51109 10.2083 5.24992 9.94717 5.24992 9.625V5.83334C5.24992 5.51117 5.51109 5.25 5.83325 5.25Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      d: "M8.74992 5.83334C8.74992 5.51117 8.48875 5.25 8.16659 5.25C7.84442 5.25 7.58325 5.51117 7.58325\n      5.83334V9.625C7.58325 9.94717 7.84442 10.2083 8.16659 10.2083C8.48875 10.2083 8.74992 9.94717 8.74992\n      9.625V5.83334Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M5.62588 0.583336C5.41285 0.583336 5.21676 0.699465 5.11436 0.88627L4.32112 2.33334H1.16659C0.844419 2.33334\n      0.583252 2.5945 0.583252 2.91667C0.583252 3.23884 0.844419 3.5 1.16659 3.5H2.04159V12.8333C2.04159 13.1555\n      2.30275 13.4167 2.62492 13.4167H11.3749C11.6971 13.4167 11.9583 13.1555 11.9583 12.8333V3.5H12.8333C13.1554\n      3.5 13.4166 3.23884 13.4166 2.91667C13.4166 2.5945 13.1554 2.33334 12.8333 2.33334H9.68208L8.90713\n      0.890634C8.80548 0.701395 8.60805 0.583336 8.39324 0.583336H5.62588ZM8.35775 2.33334L8.04442 1.75H5.97134L5.65158\n       2.33334H8.35775ZM3.20825 3.5V12.25H10.7916V3.5H3.20825Z",
      fill: "currentColor"
    }
  )
] });
var WarningIcn = ({ color = cp.iconInfo }) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { "aria-hidden": "true", focusable: "false", style: { color }, width: "16px", height: "16px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 2 1 21h22L12 2Zm0 4.5 7.53 13H4.47L12 6.5ZM11 10v5h2v-5h-2Zm0 6v2h2v-2h-2Z", fill: "currentColor" }) });

// src/internal/components/medication-elements/MedicationCard/infographic-elements/BlackTriangleBadge/index.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var BlackTriangleBadge = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.be?.blackTriangle) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--outline", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Tooltip, { content: t("medication.drugInfographic.blackTriangle"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(BlackTriangleIcn, {}), boundaryBox }) });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/RmaProfessionalLinkContent/styles.ts
var import_styled_components6 = __toESM(require("styled-components"));
var StyledRmaLink = import_styled_components6.default.div`
  ${infographicElementCommonStyles};

  .content {
    ${infographicElementContentCommonStyles};

    p {
      ${infographicElementTextCommonStyles};
    }

    a {
      ${infographicElementLinkCommonStyles};
    }
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/RmaProfessionalLinkContent/index.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var RmaProfessionalLinkContent = ({ rmaProfessionalLink, rmakeyMessages }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(StyledRmaLink, { className: "StyledRmaLink", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "content", children: [
    !!rmakeyMessages && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: rmakeyMessages }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: rmaProfessionalLink, children: t("medication.links.rma") })
  ] }) });
};
var RmaProfessionalLinkBadge = ({ medication, boundaryBox }) => {
  const be = medication.regulatory?.be;
  if (!be?.rmaProfessionalLink) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--outline", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RmaProfessionalLinkContent, { rmaProfessionalLink: be.rmaProfessionalLink, rmakeyMessages: be.rmakeyMessages }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(OrangeTriangleIcn, {}),
      boundaryBox
    }
  ) });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/SpeciallyRegulatedBadge/index.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var getSpecialRegulation = (code) => {
  switch (code) {
    case 1:
      return t("medication.drugSpecialRegulation.noNarcoticRegulation");
    case 2:
      return t("medication.drugSpecialRegulation.narcoticRegulation");
    default:
      return t("medication.drugSpecialRegulation.noSpecialRegulation");
  }
};
var SpeciallyRegulatedBadge = ({ medication, boundaryBox }) => {
  const code = medication.regulatory?.be?.speciallyRegulated;
  if (!code) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--outline", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Tooltip, { content: getSpecialRegulation(code), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(PillsBottleIcn, {}), boundaryBox }) });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/GenericPrescriptionRequiredBadge/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var GenericPrescriptionRequiredBadge = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.be?.genericPrescriptionRequired) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--outline", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Tooltip, { content: t("medication.drugInfographic.genericPrescriptionRequired"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PrescriptionIcn, {}), boundaryBox }) });
};

// src/internal/utils/date-helpers.ts
var convertYyyyMmDdNumberToIsoDate = (dateNumber) => {
  const year = Math.floor(dateNumber / 1e4);
  const month = Math.floor(dateNumber % 1e4 / 100).toString().padStart(2, "0");
  const day = (dateNumber % 100).toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
var getTreatmentStartDate = (prescribedMedication) => {
  if (prescribedMedication?.medication.beginMoment) {
    return convertYyyyMmDdNumberToIsoDate(prescribedMedication?.medication.beginMoment);
  } else {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
};
var getExecutableUntilDate = (prescribedMedication) => {
  if (prescribedMedication?.medication.endMoment) {
    return convertYyyyMmDdNumberToIsoDate(prescribedMedication.medication.endMoment);
  } else {
    const startDay = /* @__PURE__ */ new Date();
    const nextYear = new Date(startDay);
    nextYear.setFullYear(startDay.getFullYear() + 1);
    return nextYear.toISOString().split("T")[0];
  }
};
var formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return void 0;
  } else {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
};
function dateDecode(date) {
  return date > 9999e4 ? new Date(date / 1e10, date / 1e8 % 100 - 1, date / 1e6 % 100) : new Date(date / 1e4, date / 100 % 100 - 1, date % 100);
}
function dateEncode(date) {
  return date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate();
}
function offsetDate(date, offsetInDays) {
  const result = new Date(dateDecode(date));
  result.setDate(result.getDate() + offsetInDays);
  return dateEncode(result);
}

// src/internal/components/medication-elements/MedicationCard/infographic-elements/SupplyProblemsContent/styles.ts
var import_styled_components7 = __toESM(require("styled-components"));
var StyledSupplyProblems = import_styled_components7.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCautionSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/SupplyProblemsContent/index.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var SupplyProblemsContent = ({ medicationSupplyProblem }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(StyledSupplyProblems, { className: "StyledSupplyProblems", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h6", { children: t("medication.supply.issueTitle") }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "content", children: [
      medicationSupplyProblem.from && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: t("medication.supply.startDate") }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: formatTimestamp(medicationSupplyProblem.from) })
      ] }),
      medicationSupplyProblem.expectedEndOn && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: t("medication.supply.expectedEndDate") }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: formatTimestamp(medicationSupplyProblem.expectedEndOn) })
      ] }),
      getSamTextTranslation(medicationSupplyProblem.reason) && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: t("medication.supply.reason") }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: getSamTextTranslation(medicationSupplyProblem.reason) })
      ] }),
      getSamTextTranslation(medicationSupplyProblem.impact) && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: t("medication.supply.impact") }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: getSamTextTranslation(medicationSupplyProblem.impact) })
      ] }),
      medicationSupplyProblem.impact?.fr === "Importation possible par le pharmacien" && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: t("medication.supply.prescriberNote") }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { target: "_blank", rel: "noopener noreferrer", href: "https://www.afmps.be/sites/default/files/content/INSP/NARC/declaration-medecin.pdf", children: t("medication.supply.downloadPdf") })
      ] }),
      getSamTextTranslation(medicationSupplyProblem.additionalInformation) && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: t("medication.supply.extraInfo") }),
        getSamTextTranslation(medicationSupplyProblem.additionalInformation).split("\n").map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: line }, idx))
      ] })
    ] })
  ] });
};
var SupplyProblemsBadge = ({ medication, boundaryBox }) => {
  const medicationSupplyProblem = medication.regulatory?.be?.supplyProblems?.[0];
  if (!medicationSupplyProblem) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--orange", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Tooltip, { contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SupplyProblemsContent, { medicationSupplyProblem }), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SupplyIcn, {}), boundaryBox }) });
};
var SupplyProblemsExpandedBadge = ({ medication }) => {
  const supplyProblems = medication.regulatory?.be?.supplyProblems;
  if (!supplyProblems) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SupplyProblemsContent, { medicationSupplyProblem: supplyProblems[0] });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/EndOfCommercialisationContent/styles.ts
var import_styled_components8 = __toESM(require("styled-components"));
var StyledEndCommercialization = import_styled_components8.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCriticalSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/EndOfCommercialisationContent/index.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var EndOfCommercialisationContent = ({ medicationCommercialization }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(StyledEndCommercialization, { className: "StyledEndCommercialization", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h6", { children: t("medication.commercialization.end") }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "content", children: [
      medicationCommercialization.from && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("medication.commercialization.limitedAvailabilityFrom") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: formatTimestamp(medicationCommercialization.from) })
      ] }),
      medicationCommercialization.to && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("medication.commercialization.end") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: formatTimestamp(medicationCommercialization.to) })
      ] }),
      getSamTextTranslation(medicationCommercialization.endOfComercialization) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("medication.commercialization.unavailableFrom") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: getSamTextTranslation(medicationCommercialization.endOfComercialization) })
      ] }),
      getSamTextTranslation(medicationCommercialization.reason) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("medication.commercialization.endReason") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: getSamTextTranslation(medicationCommercialization.reason) })
      ] }),
      getSamTextTranslation(medicationCommercialization.impact) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("medication.commercialization.endImpact") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: getSamTextTranslation(medicationCommercialization.impact) })
      ] }),
      getSamTextTranslation(medicationCommercialization.additionalInformation) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("medication.commercialization.endAdditionalInformation") }),
        getSamTextTranslation(medicationCommercialization.additionalInformation).split("\n").map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: line }, idx))
      ] })
    ] })
  ] });
};
var EndOfCommercialisationBadge = ({ medication, boundaryBox }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0];
  if (!medicationCommercialization?.endOfComercialization) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--red", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EndOfCommercialisationContent, { medicationCommercialization }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EndOfCommercialisationIcn, {}),
      boundaryBox
    }
  ) });
};
var EndOfCommercialisationExpandedBadge = ({ medication }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0];
  if (!medicationCommercialization?.endOfComercialization) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EndOfCommercialisationContent, { medicationCommercialization });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/StartOfCommercialisationContent/styles.ts
var import_styled_components9 = __toESM(require("styled-components"));
var StyledStartCommercialization = import_styled_components9.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/StartOfCommercialisationContent/index.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var StartOfCommercialisationContent = ({ medicationCommercialization }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(StyledStartCommercialization, { className: "StyledStartCommercialization", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h6", { children: t("medication.commercialization.start") }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "content", children: medicationCommercialization.from && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: t("medication.commercialization.startAvailableFrom") }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: formatTimestamp(medicationCommercialization.from) })
    ] }) })
  ] });
};
var StartOfCommercialisationBadge = ({ medication, boundaryBox }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0];
  if (!medicationCommercialization || medicationCommercialization.endOfComercialization) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--green", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StartOfCommercialisationContent, { medicationCommercialization }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StartOfCommercialisationIcn, {}),
      boundaryBox
    }
  ) });
};
var StartOfCommercialisationExpandedBadge = ({ medication }) => {
  const medicationCommercialization = medication.regulatory?.be?.commercializations?.[0];
  if (!medicationCommercialization || medicationCommercialization.endOfComercialization) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StartOfCommercialisationContent, { medicationCommercialization });
};

// src/internal/utils/reimbursement-helpers.ts
var import_be_fhc_lite_api = require("@icure/be-fhc-lite-api");
var getReimbursementOptions = () => [
  {
    value: null,
    label: t("reimbursementHelper.practitionerSelectionOptions.none")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.PAYINGTHIRDPARTY,
    label: t("reimbursementHelper.practitionerSelectionOptions.PAYINGTHIRDPARTY")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.FIRSTDOSE,
    label: t("reimbursementHelper.practitionerSelectionOptions.FIRSTDOSE")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.SECONDDOSE,
    label: t("reimbursementHelper.practitionerSelectionOptions.SECONDDOSE")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.THIRDDOSE,
    label: t("reimbursementHelper.practitionerSelectionOptions.THIRDDOSE")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.CHRONICKINDEYDISEASE,
    label: t("reimbursementHelper.practitionerSelectionOptions.CHRONICKINDEYDISEASE")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.DIABETESTREATMENT,
    label: t("reimbursementHelper.practitionerSelectionOptions.DIABETESTREATMENT")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.DIABETESCONVENTION,
    label: t("reimbursementHelper.practitionerSelectionOptions.DIABETESCONVENTION")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.NOTREIMBURSABLE,
    label: t("reimbursementHelper.practitionerSelectionOptions.NOTREIMBURSABLE")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.EXPLAINMEDICATION,
    label: t("reimbursementHelper.practitionerSelectionOptions.EXPLAINMEDICATION")
  },
  {
    value: import_be_fhc_lite_api.Medication.InstructionsForReimbursementEnum.DIABETESSTARTPATH,
    label: t("reimbursementHelper.practitionerSelectionOptions.DIABETESSTARTPATH")
  }
];
function getCategoryLabelForReimbursement(code) {
  if (!code) return "";
  return t(`reimbursementHelper.categoryOptions.${code}`) || code;
}

// src/internal/components/medication-elements/MedicationCard/infographic-elements/ReimbursementsContent/styles.ts
var import_styled_components10 = __toESM(require("styled-components"));
var StyledReimbursement = import_styled_components10.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/ReimbursementsContent/index.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var ReimbursementsContent = ({ reimbursement }) => {
  const computeFeeAmount = (fee) => Math.round(+fee * 100) / 100 + "\u20AC";
  return reimbursement ? /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(StyledReimbursement, { className: "StyledReimbursement", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("h6", { children: [
      " ",
      t("medication.reimbursement.title")
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "content", children: [
      reimbursement.reimbursementCriterion?.category && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: t("medication.reimbursement.category") }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: reimbursement.reimbursementCriterion?.category })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: t("medication.reimbursement.categoryLabel") }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: getCategoryLabelForReimbursement(reimbursement.reimbursementCriterion?.category) })
        ] })
      ] }),
      reimbursement.copayments && reimbursement.copayments.map((el, index) => {
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          el.regimeType === 1 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { children: [
            t("medication.reimbursement.copay"),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: t("medication.reimbursement.copayPreferential") })
          ] }),
          el.regimeType === 2 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { children: [
            t("medication.reimbursement.copay"),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: t("medication.reimbursement.copayActive") })
          ] }),
          el.feeAmount && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "feeAmount", children: computeFeeAmount(el.feeAmount) })
        ] }, index);
      }),
      reimbursement.temporary && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: t("medication.reimbursement.temporary") }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "textRed", children: reimbursement.temporary })
      ] }),
      getSamTextTranslation(reimbursement.reimbursementCriterion?.description) && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: t("medication.reimbursement.chapter") }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: getSamTextTranslation(reimbursement.reimbursementCriterion?.description) })
      ] })
    ] })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "supplyProblemsTooltip", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: " title  title--green", children: "Conditions de prescription" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: " content", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "Not applicable" }) }) })
  ] });
};
var ReimbursementsBadge = ({ medication, boundaryBox }) => {
  const reimbursement = medication.regulatory?.be?.reimbursements;
  if (!reimbursement) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ReimbursementsContent, { reimbursement }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "green", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: reimbursement.reimbursementCriterion?.category }) }),
      boundaryBox
    }
  );
};
var ReimbursementsExpandedBadge = ({ medication }) => {
  const reimbursement = medication.regulatory?.be?.reimbursements;
  if (!reimbursement) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ReimbursementsContent, { reimbursement });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/DeliveryConditionsContent/styles.ts
var import_styled_components11 = __toESM(require("styled-components"));
var StyledDeliveryConditions = import_styled_components11.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCautionSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;
var StyledDeliveryConditionsNotApplicable = import_styled_components11.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/DeliveryConditionsContent/index.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var DeliveryConditionsContent = ({ deliveryModusCode, deliveryModus, deliveryModusSpecification }) => {
  return deliveryModusCode ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(StyledDeliveryConditions, { className: "StyledDeliveryConditions", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h6", { children: t("medication.delivery.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "content", children: [
      deliveryModusCode && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: t("medication.delivery.code") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: deliveryModusCode })
      ] }),
      deliveryModus && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: t("medication.delivery.modus") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: deliveryModus })
      ] }),
      deliveryModusSpecification && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: t("medication.delivery.specification") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: deliveryModusSpecification })
      ] })
    ] })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(StyledDeliveryConditionsNotApplicable, { className: "StyledDeliveryConditionsNotApplicable", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h6", { children: t("medication.delivery.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "content", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: t("medication.delivery.notApplicable") }) }) })
  ] });
};
var DeliveryConditionsBadge = ({ medication, boundaryBox }) => {
  const be = medication.regulatory?.be;
  if (!be?.deliveryModusCode) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DeliveryConditionsContent, { deliveryModus: be.deliveryModus, deliveryModusSpecification: be.deliveryModusSpecification, deliveryModusCode: be.deliveryModusCode }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "orange", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: be.deliveryModusCode }) }),
      boundaryBox
    }
  );
};
var DeliveryConditionsExpandedBadge = ({ medication }) => {
  const be = medication.regulatory?.be;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DeliveryConditionsContent, { deliveryModus: be?.deliveryModus, deliveryModusSpecification: be?.deliveryModusSpecification, deliveryModusCode: be?.deliveryModusCode });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/PrescriptionConditionsContent/styles.ts
var import_styled_components12 = __toESM(require("styled-components"));
var StyledPrescriptionConditions = import_styled_components12.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCriticalSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;
var StyledPrescriptionConditionsNotApplicable = import_styled_components12.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorOkSoft};
  }

  .content {
    ${infographicElementContentCommonStyles}
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/PrescriptionConditionsContent/index.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var PrescriptionConditionsContent = ({ deliveryModusSpecificationCode, deliveryModusSpecification }) => {
  return deliveryModusSpecificationCode ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(StyledPrescriptionConditions, { className: "StyledPrescriptionConditions", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h6", { children: t("medication.prescription.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "content", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: t("medication.delivery.code") }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: deliveryModusSpecificationCode })
      ] }),
      deliveryModusSpecification && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: t("medication.delivery.specification") }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: deliveryModusSpecification })
      ] })
    ] })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(StyledPrescriptionConditionsNotApplicable, { className: "StyledPrescriptionConditionsNotApplicable", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h6", { children: t("medication.prescription.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "content", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: t("medication.delivery.notApplicable") }) }) })
  ] });
};
var PrescriptionConditionsBadge = ({ medication, boundaryBox }) => {
  const be = medication.regulatory?.be;
  if (!be?.deliveryModusCode || !be?.deliveryModusSpecificationCode) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PrescriptionConditionsContent, { deliveryModusSpecificationCode: be.deliveryModusSpecificationCode, deliveryModusSpecification: be.deliveryModusSpecification }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "red", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: be.deliveryModusSpecificationCode }) }),
      boundaryBox
    }
  );
};
var PrescriptionConditionsExpandedBadge = ({ medication }) => {
  const be = medication.regulatory?.be;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PrescriptionConditionsContent, { deliveryModusSpecificationCode: be?.deliveryModusSpecificationCode, deliveryModusSpecification: be?.deliveryModusSpecification });
};

// src/internal/components/medication-elements/MedicationCard/expanded-elements/VmpBadge/index.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var VmpBadge = ({ medication }) => {
  const vmp = medication.regulatory?.be?.vmp;
  if (!vmp) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "vmp", children: [
    vmp.name?.fr && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "vmp__item", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { children: "VMP:" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { children: vmp.name.fr })
    ] }),
    vmp.vmpGroup?.name?.fr && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "vmp__item", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { children: "VMP-group:" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { children: vmp.vmpGroup.name.fr })
    ] })
  ] });
};

// src/internal/components/medication-elements/MedicationCard/expanded-elements/LinksBadge/index.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var LinksBadge = ({ medication }) => {
  const be = medication.regulatory?.be;
  if (!be?.crmLink && !be?.patientInformationLeafletLink && !be?.rmaProfessionalLink && !be?.spcLink && !be?.dhpcLink) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "links", children: [
    be?.crmLink && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("a", { href: be.crmLink, target: "_blank", rel: "noopener noreferrer", children: "Commented Medicines Directory (CBIP)" }),
    be?.patientInformationLeafletLink && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("a", { href: be.patientInformationLeafletLink, target: "_blank", rel: "noopener noreferrer", children: "Patient information leaflet" }),
    be?.rmaProfessionalLink && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("a", { href: be.rmaProfessionalLink, target: "_blank", rel: "noopener noreferrer", children: "Risk Minimisation Activities (RMA)" }),
    be?.spcLink && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("a", { href: be.spcLink, target: "_blank", rel: "noopener noreferrer", children: "Summary of Product Characteristics (SPC)" }),
    be?.dhpcLink && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("a", { href: be.dhpcLink, target: "_blank", rel: "noopener noreferrer", children: "Direct Healthcare Professional Communication (DHPC)" })
  ] });
};

// src/internal/components/medication-elements/register-be-badges.ts
registerRegulatoryBadge("be", "price", PriceReimbursementBadge, "summary");
registerRegulatoryBadge("be", "deliveryConditions", DeliveryConditionsSummaryBadge, "summary");
registerRegulatoryBadge("be", "prescriptionConditions", PrescriptionConditionsSummaryBadge, "summary");
registerRegulatoryBadge("be", "blackTriangle", BlackTriangleBadge, "detail");
registerRegulatoryBadge("be", "rmaProfessionalLink", RmaProfessionalLinkBadge, "detail");
registerRegulatoryBadge("be", "speciallyRegulated", SpeciallyRegulatedBadge, "detail");
registerRegulatoryBadge("be", "genericPrescriptionRequired", GenericPrescriptionRequiredBadge, "detail");
registerRegulatoryBadge("be", "supplyProblems", SupplyProblemsBadge, "detail");
registerRegulatoryBadge("be", "endOfCommercialisation", EndOfCommercialisationBadge, "detail");
registerRegulatoryBadge("be", "startOfCommercialisation", StartOfCommercialisationBadge, "detail");
registerRegulatoryBadge("be", "reimbursement", ReimbursementsBadge, "detail");
registerRegulatoryBadge("be", "deliveryConditions", DeliveryConditionsBadge, "detail");
registerRegulatoryBadge("be", "prescriptionConditions", PrescriptionConditionsBadge, "detail");
registerRegulatoryBadge("be", "vmp", VmpBadge, "expanded");
registerRegulatoryBadge("be", "links", LinksBadge, "expanded");
registerRegulatoryBadge("be", "reimbursement", ReimbursementsExpandedBadge, "expanded");
registerRegulatoryBadge("be", "prescriptionConditions", PrescriptionConditionsExpandedBadge, "expanded");
registerRegulatoryBadge("be", "deliveryConditions", DeliveryConditionsExpandedBadge, "expanded");
registerRegulatoryBadge("be", "supplyProblems", SupplyProblemsExpandedBadge, "expanded");
registerRegulatoryBadge("be", "endOfCommercialisation", EndOfCommercialisationExpandedBadge, "expanded");
registerRegulatoryBadge("be", "startOfCommercialisation", StartOfCommercialisationExpandedBadge, "expanded");

// src/internal/components/medication-elements/MedicationCard/summary-elements/ChPriceBadge/index.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var ChPriceBadge = ({ medication }) => {
  const price = medication.regulatory?.ch?.price;
  if (!price) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "medication__content__description__item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: t("medication.ui.price") }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className: "price", children: `${price.currency} ${price.amount.toFixed(2)}` })
  ] });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/SwissmedicCategoryContent/index.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
var SwissmedicCategoryBadge = ({ medication, boundaryBox }) => {
  const category = medication.regulatory?.ch?.swissmedicCategory;
  if (!category) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--outline", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Tooltip, { content: `${t("medication.swissmedic.category")} ${category}`, iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(PillsBottleIcn, {}), boundaryBox }) });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/NarcoticContent/index.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var NarcoticBadge = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.ch?.narcotic) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--red", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Tooltip, { content: t("medication.swissmedic.narcotic"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(WarningIcn, { color: cp.iconCritical }), boundaryBox }) });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/ColdChainContent/index.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var ColdChainBadge = ({ medication, boundaryBox }) => {
  if (!medication.regulatory?.ch?.coldChain) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    Tooltip,
    {
      content: t("medication.swissmedic.coldChain"),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "grey", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { children: t("medication.swissmedic.coldChainAbbreviation") }) }),
      boundaryBox
    }
  );
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/CompositionContent/styles.ts
var import_styled_components13 = __toESM(require("styled-components"));
var StyledComposition = import_styled_components13.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorAccentSoft};
  }

  .content {
    ${infographicElementContentCommonStyles};

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2px;

      li {
        font-size: ${cp.fontSizeSm};
        font-weight: 400;
        color: ${cp.colorTextStrong};
        display: flex;
        justify-content: space-between;
        gap: 8px;

        &.excipient {
          color: ${cp.colorTextSubtle};
        }

        .quantity {
          white-space: nowrap;
        }
      }
    }
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/CompositionContent/index.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var formatQuantity = (line) => line.quantity != null ? `${line.quantity}${line.unit ? ` ${line.unit}` : ""}` : "";
var CompositionContent = ({ composition }) => {
  const actives = composition.filter((line) => line.isActiveSubstance);
  const excipients = composition.filter((line) => !line.isActiveSubstance);
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(StyledComposition, { className: "StyledComposition", children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("h6", { children: t("medication.chComposition.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "content", children: [
      actives.length !== 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: t("medication.chComposition.activeSubstances") }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("ul", { children: actives.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("li", { children: [
          line.substanceName,
          formatQuantity(line) && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "quantity", children: formatQuantity(line) })
        ] }, index)) })
      ] }),
      excipients.length !== 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: t("medication.chComposition.otherIngredients") }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("ul", { children: excipients.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("li", { className: "excipient", children: [
          line.substanceName,
          formatQuantity(line) && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "quantity", children: formatQuantity(line) })
        ] }, index)) })
      ] })
    ] })
  ] });
};
var CompositionBadge = ({ medication, boundaryBox }) => {
  const composition = medication.regulatory?.ch?.composition;
  if (!composition?.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "regulatoryBadgeIcon regulatoryBadgeIcon--outline", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Tooltip, { contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CompositionContent, { composition }), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MoleculeIcn, {}), boundaryBox }) });
};

// src/internal/components/medication-elements/MedicationCard/infographic-elements/InteractionsContent/styles.ts
var import_styled_components14 = __toESM(require("styled-components"));
var StyledInteractions = import_styled_components14.default.div`
  ${infographicElementCommonStyles};

  h6 {
    ${infographicElementTitleCommonStyles};
    background-color: ${cp.colorCaution};
    color: ${cp.colorOnBadge};
  }

  .content {
    ${infographicElementContentCommonStyles};

    div p.effect {
      font-size: ${cp.fontSizeSm};
      color: ${cp.colorTextSubtle};
    }

    p.more {
      font-size: ${cp.fontSizeXs};
      font-weight: 400;
      color: ${cp.colorTextMuted};
    }
  }
`;

// src/internal/components/medication-elements/MedicationCard/infographic-elements/InteractionsContent/index.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var MAX_DISPLAYED_INTERACTIONS = 8;
var InteractionsContent = ({ interactions }) => {
  const displayed = interactions.slice(0, MAX_DISPLAYED_INTERACTIONS);
  const remaining = interactions.length - displayed.length;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(StyledInteractions, { className: "StyledInteractions", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h6", { children: t("medication.chInteractions.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "content", children: [
      displayed.map((interaction, index) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { children: interaction.relevance ? `${t("medication.chInteractions.relevance")} ${interaction.relevance}` : "" }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { children: interaction.title ?? interaction.id }),
        interaction.effect && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "effect", children: interaction.effect })
      ] }, interaction.id ?? index)),
      remaining > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "more", children: `+ ${remaining} ${t("medication.chInteractions.more")}` })
    ] })
  ] });
};
var InteractionsBadge = ({ medication, boundaryBox }) => {
  const interactions = medication.regulatory?.ch?.interactions;
  if (!interactions?.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    Tooltip,
    {
      contentSnippet: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(InteractionsContent, { interactions }),
      iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(StyledTextToIcon, { className: "StyledTextToIcon", $color: "orange", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { children: `${interactions.length} IX` }) }),
      boundaryBox
    }
  );
};

// src/internal/components/medication-elements/MedicationCard/expanded-elements/GtinBadge/index.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var GtinBadge = ({ medication }) => {
  const gtin = medication.regulatory?.ch?.gtin;
  if (!gtin || gtin.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "regulatoryField", children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: t("medication.swissmedic.gtin") }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { children: gtin.join(", ") })
  ] });
};

// src/internal/components/medication-elements/MedicationCard/expanded-elements/GenericGroupBadge/index.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var GenericGroupBadge = ({ medication }) => {
  const genericGroup = medication.regulatory?.ch?.genericGroup;
  if (!genericGroup) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "regulatoryField", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { children: t("medication.swissmedic.genericGroup") }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { children: genericGroup })
  ] });
};

// src/internal/components/medication-elements/register-ch-badges.ts
registerRegulatoryBadge("ch", "price", ChPriceBadge, "summary");
registerRegulatoryBadge("ch", "swissmedicCategory", SwissmedicCategoryBadge, "detail");
registerRegulatoryBadge("ch", "narcotic", NarcoticBadge, "detail");
registerRegulatoryBadge("ch", "coldChain", ColdChainBadge, "detail");
registerRegulatoryBadge("ch", "composition", CompositionBadge, "detail");
registerRegulatoryBadge("ch", "interactions", InteractionsBadge, "detail");
registerRegulatoryBadge("ch", "gtin", GtinBadge, "expanded");
registerRegulatoryBadge("ch", "genericGroup", GenericGroupBadge, "expanded");

// src/internal/services/loaders/medication-loader.ts
var import_cardinal_be_sam_sdk = require("@icure/cardinal-be-sam-sdk");

// src/internal/utils/string-helpers.ts
function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function trim(s) {
  if (!s) return s;
  return s.replace(/\s+/g, " ").trim();
}
function normalizeForSort(s) {
  if (!s) return s;
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// src/internal/services/loaders/merge-lazy-sorted-named-items.ts
function isSorted(items) {
  for (let i = 0; i < items.length - 1; i++) {
    if (normalizeForSort(items[i].title) > normalizeForSort(items[i + 1].title)) {
      return false;
    }
  }
  return true;
}
async function mergeLazySortedNamedItems(limit, arrays, fetchMissingCallbacks) {
  if (arrays.length !== fetchMissingCallbacks.length) {
    throw new Error("Each array must have a corresponding fetch callback.");
  }
  const result = [];
  const pointers = arrays.map(() => 0);
  let lastPushedName = "";
  async function loadItemsAtPointer(k, toName) {
    const p = pointers[k];
    if (p >= arrays[k].length) {
      const newItems = await fetchMissingCallbacks[k](lastPushedName, toName);
      if (!isSorted(newItems)) {
        throw new Error(`Fetched items for array ${k} are not sorted.`);
      }
      if (newItems.length > 0) {
        arrays[k].splice(p, 0, ...newItems);
      }
    }
  }
  async function indexOfSmallestFront() {
    let smallestName = void 0;
    for (let k = 0; k < arrays.length; k++) {
      const p = pointers[k];
      if (p < arrays[k].length) {
        const candidateName = normalizeForSort(arrays[k][p].title);
        if (smallestName === void 0 || candidateName < smallestName) {
          smallestName = candidateName;
        }
      }
    }
    for (let k = 0; k < arrays.length; k++) {
      await loadItemsAtPointer(k, smallestName);
    }
    let smallestIndex = null;
    smallestName = void 0;
    for (let k = 0; k < arrays.length; k++) {
      const p = pointers[k];
      if (p < arrays[k].length) {
        const candidateName = normalizeForSort(arrays[k][p].title);
        if (smallestName === void 0 || candidateName < smallestName) {
          smallestIndex = k;
          smallestName = candidateName;
        }
      }
    }
    return smallestIndex;
  }
  while (result.length < limit) {
    const si = await indexOfSmallestFront();
    if (si === null) break;
    const item = arrays[si][pointers[si]];
    result.push(item);
    lastPushedName = normalizeForSort(item.title);
    pointers[si]++;
  }
  return [result, pointers];
}

// src/internal/services/medication-mapper/map-sam-medication.ts
var defaultLanguage = "fr";
function mapSamMedication(amp, ampp, dmpp, index, language, now) {
  return {
    id: ampp.ctiExtended,
    kind: "product",
    title: ampp.prescriptionName?.[language] ?? ampp.prescriptionName?.[defaultLanguage] ?? ampp.abbreviatedName?.[language] ?? ampp.abbreviatedName?.[defaultLanguage] ?? amp.prescriptionName?.[language] ?? amp.prescriptionName?.[defaultLanguage] ?? amp.name?.[language] ?? amp.name?.[defaultLanguage] ?? amp.abbreviatedName?.[language] ?? amp.abbreviatedName?.[defaultLanguage] ?? "",
    activeIngredient: amp.vmp?.vmpGroup?.name?.[language] ?? amp.vmp?.vmpGroup?.name?.[defaultLanguage] ?? "",
    index,
    regulatory: {
      be: {
        ampId: amp.id,
        vmpGroupId: amp.vmp?.vmpGroup?.id,
        cnk: dmpp?.code,
        dmppProductId: dmpp?.productId,
        vmpTitle: amp.vmp?.name?.[language] ?? amp.vmp?.name?.[defaultLanguage] ?? "",
        price: ampp?.exFactoryPrice ? `\u20AC${ampp.exFactoryPrice}` : "",
        cheap: dmpp?.cheap,
        cheapest: dmpp?.cheapest,
        crmLink: ampp.crmLink?.[language] ?? ampp.crmLink?.[defaultLanguage],
        patientInformationLeafletLink: ampp.leafletLink?.[language] ?? ampp.leafletLink?.[defaultLanguage],
        blackTriangle: amp.blackTriangle,
        speciallyRegulated: ampp.speciallyRegulated,
        genericPrescriptionRequired: ampp.genericPrescriptionRequired,
        intendedName: ampp.prescriptionName?.[language] ?? ampp.prescriptionName?.[defaultLanguage],
        rmaProfessionalLink: ampp.rmaProfessionalLink?.[language] ?? ampp.rmaProfessionalLink?.[defaultLanguage],
        spcLink: ampp.spcLink?.[language] ?? ampp.spcLink?.[defaultLanguage],
        dhpcLink: ampp.dhpcLink?.[language] ?? ampp.dhpcLink?.[defaultLanguage],
        rmakeyMessages: ampp.rmaKeyMessages?.[language] ?? ampp.rmaKeyMessages?.[defaultLanguage],
        vmp: amp.vmp,
        supplyProblems: ampp.supplyProblems,
        commercializations: ampp?.commercializations,
        deliveryModusCode: ampp.deliveryModusCode,
        deliveryModus: ampp.deliveryModus?.[language] ?? ampp.deliveryModus?.[defaultLanguage],
        deliveryModusSpecificationCode: ampp.deliveryModusSpecificationCode,
        deliveryModusSpecification: ampp.deliveryModusSpecification?.[language] ?? ampp.deliveryModusSpecification?.[defaultLanguage],
        reimbursements: dmpp?.reimbursements?.find((reimbursement) => reimbursement.from && reimbursement.from <= now && (!reimbursement.to || reimbursement.to > now))
      }
    }
  };
}
function mapSamMedicationProductTitle(amp, language) {
  return amp.prescriptionName?.[language] ?? amp.prescriptionName?.[defaultLanguage] ?? amp.name?.[language] ?? amp.name?.[defaultLanguage] ?? amp.abbreviatedName?.[language] ?? amp.abbreviatedName?.[defaultLanguage] ?? "";
}
function mapSamMolecule(vmp, language) {
  return {
    id: vmp.code,
    kind: "molecule",
    title: capitalize(vmp.name?.[language]) ?? capitalize(vmp.name?.[defaultLanguage]) ?? "",
    regulatory: {
      be: {
        vmpGroupId: vmp.id,
        vmpGroup: vmp
      }
    }
  };
}
function mapSamNonMedicinal(nmp, language) {
  return {
    id: nmp.code,
    kind: "nonMedicinal",
    title: capitalize(nmp.name?.[language]) ?? capitalize(nmp.name?.[defaultLanguage]) ?? "",
    regulatory: {
      be: {
        nmpId: nmp.id
      }
    }
  };
}

// src/internal/services/loaders/medication-loader.ts
async function loadMedicationsPage(medications, min, deliveryEnvironment, acc = [], filter = (m) => m) {
  const language = cardinalLanguage.getLanguage();
  const now = Date.now();
  const twoYearsAgo = now - 2 * 365 * 24 * 3600 * 1e3;
  const loadedPage = !await medications.hasNext() ? [] : await medications.next(min);
  const page = loadedPage.map((amp) => {
    if (amp.to && amp.to < now) {
      return null;
    }
    const activeAmpps = amp.ampps.filter((ampp) => ampp.from && (!ampp.to || ampp.to > now));
    const authorizedAmpps = activeAmpps.filter((ampp) => ampp.status?.toLowerCase() === import_cardinal_be_sam_sdk.AmpStatus.Authorized.toLowerCase());
    const commercializedAmpps = authorizedAmpps.filter((ampp) => ampp.commercializations?.some((c) => !!c.from && (!c.to || c.to > twoYearsAgo)));
    const deliverableAmpps = commercializedAmpps.filter(
      (ampp) => ampp.dmpps?.some((dmpp) => dmpp.from && (!dmpp.to || dmpp.to > now) && dmpp.deliveryEnvironment?.toString() === deliveryEnvironment)
    );
    if (deliverableAmpps.length === 0) {
      return null;
    }
    const medications2 = deliverableAmpps.map((ampp, index) => {
      const dmpp = ampp.dmpps?.find(
        (dmpp2) => dmpp2.from && (!dmpp2.to || dmpp2.to > now) && dmpp2.deliveryEnvironment?.toString() === deliveryEnvironment && dmpp2.codeType === import_cardinal_be_sam_sdk.DmppCodeType.Cnk
      );
      return mapSamMedication(amp, ampp, dmpp, index, language, now);
    }).map(filter).filter((m) => !!m).sort((a, b) => {
      const indexA = a.index ?? 0;
      const indexB = b.index ?? 0;
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      return normalizeForSort(a.title).localeCompare(normalizeForSort(b.title));
    });
    if (medications2.length === 0) {
      return null;
    }
    return {
      id: amp.id,
      title: mapSamMedicationProductTitle(amp, language),
      medications: medications2
    };
  }).filter((mp) => mp !== null);
  return loadedPage.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadMedicationsPage(medications, min, deliveryEnvironment, [...acc, ...page], filter);
}
async function loadMoleculesPage(molecules, min, acc = []) {
  const language = cardinalLanguage.getLanguage();
  const now = Date.now();
  const loadedPage = !await molecules.hasNext() ? [] : await molecules.next(min);
  const page = loadedPage.filter((vmp) => !(vmp.to && vmp.to < now)).map((vmp) => mapSamMolecule(vmp, language));
  return page.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadMoleculesPage(molecules, min, [...acc, ...page]);
}
async function loadNonMedicinalPage(products, min, acc = []) {
  const language = cardinalLanguage.getLanguage();
  const now = Date.now();
  const loadedPage = !await products.hasNext() ? [] : await products.next(min);
  const page = loadedPage.filter((nmp) => !(nmp.to && nmp.to < now)).map((nmp) => mapSamNonMedicinal(nmp, language));
  return page.length < min || page.length + acc.length >= min ? [...acc, ...page] : await loadNonMedicinalPage(products, min, [...acc, ...page]);
}
async function loadUntil(toName, loadPage, limit = 10) {
  let page = [];
  if (!toName) {
    while (page.length < limit) {
      const newPage = await loadPage();
      if (!newPage.length) break;
      page = [...page, ...newPage];
    }
    return page;
  }
  const lcToName = normalizeForSort(toName);
  while (page.length === 0 || normalizeForSort(page[page.length - 1].title) < lcToName) {
    const newPage = await loadPage();
    if (!newPage.length) break;
    page = [...page, ...newPage];
  }
  return page;
}
async function loadMore({
  untreatedLoadedMedicationProducts,
  untreatedLoadedMolecules,
  untreatedLoadNonMedicinals,
  medicationProductsIterator,
  moleculesIterator,
  nonMedicinalesIterator,
  deliveryEnvironment,
  limit = 10
}) {
  const [result, pointers] = await mergeLazySortedNamedItems(
    limit,
    [[...untreatedLoadedMedicationProducts], [...untreatedLoadedMolecules], [...untreatedLoadNonMedicinals]],
    [
      async (_, toName) => {
        const loaded = await loadUntil(
          toName,
          () => medicationProductsIterator ? loadMedicationsPage(medicationProductsIterator, limit, deliveryEnvironment) : Promise.resolve([]),
          limit
        );
        untreatedLoadedMedicationProducts.push(...loaded);
        return loaded;
      },
      async (_, toName) => {
        const loaded = await loadUntil(toName, () => moleculesIterator ? loadMoleculesPage(moleculesIterator, limit) : Promise.resolve([]), limit);
        untreatedLoadedMolecules.push(...loaded);
        return loaded;
      },
      async (_, toName) => {
        const loaded = await loadUntil(toName, () => nonMedicinalesIterator ? loadNonMedicinalPage(nonMedicinalesIterator, limit) : Promise.resolve([]), limit);
        untreatedLoadNonMedicinals.push(...loaded);
        return loaded;
      }
    ]
  );
  return {
    result,
    updated: {
      medicationsPage: untreatedLoadedMedicationProducts.slice(pointers[0]),
      moleculesPage: untreatedLoadedMolecules.slice(pointers[1]),
      productsPage: untreatedLoadNonMedicinals.slice(pointers[2])
    }
  };
}

// src/shared/types/medication-provider.ts
var MedicationProviderError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = new.target.name;
  }
};
var MedicationNotFoundError = class extends MedicationProviderError {
};
var MedicationSearchValidationError = class extends MedicationProviderError {
};
var MedicationProviderUnavailableError = class extends MedicationProviderError {
};

// src/shared/services/cardinal-sam/sam-medication-provider.ts
var SamMedicationProvider = class {
  constructor(sdk, deliveryEnvironment) {
    this.sdk = sdk;
    this.deliveryEnvironment = deliveryEnvironment;
  }
  async *findByLabel(label) {
    const [medicationProductsIterator, moleculesIterator, nonMedicinalesIterator] = await this.searchByLabel(label);
    let untreatedLoadedMedicationProducts = [];
    let untreatedLoadedMolecules = [];
    let untreatedLoadNonMedicinals = [];
    while (true) {
      const { result, updated } = await this.loadNextPage({
        untreatedLoadedMedicationProducts,
        untreatedLoadedMolecules,
        untreatedLoadNonMedicinals,
        medicationProductsIterator,
        moleculesIterator,
        nonMedicinalesIterator,
        label
      });
      if (result.length === 0) return;
      for (const item of result) {
        yield item;
      }
      untreatedLoadedMedicationProducts = updated.medicationsPage;
      untreatedLoadedMolecules = updated.moleculesPage;
      untreatedLoadNonMedicinals = updated.productsPage;
    }
  }
  /**
   * Enriches a selected medication with its full VMP group (incl. standard dosages) ahead of
   * prescribing — moved here verbatim from `MedicationSearch`'s old `handleAddPrescription`,
   * which read `sdk` directly before this provider abstraction existed.
   */
  async enrichForPrescription(medication) {
    const vmpGroupCode = medication.regulatory?.be?.vmp?.vmpGroup?.code;
    if (!vmpGroupCode) return medication;
    const vmpGroup = await loadVmpGroup(this.sdk, vmpGroupCode);
    return { ...medication, regulatory: { ...medication.regulatory, be: { ...medication.regulatory?.be, vmpGroup } } };
  }
  /**
   * Loads cheaper alternatives sharing the medication's VMP group — same gating (already-cheap
   * medications have none) and cheap/cheapest filter as the pre-abstraction implementation.
   */
  async loadCheapAlternatives(medication) {
    const vmpGroupCode = medication.regulatory?.be?.vmp?.vmpGroup?.code;
    if (medication.regulatory?.be?.cheap || !vmpGroupCode) return [];
    const ampPage = await loadAlternativeMedications(this.sdk, vmpGroupCode);
    const products = await loadMedicationsPage(ampPage, 10, this.deliveryEnvironment, [], (mt) => mt.regulatory?.be?.cheap || mt.regulatory?.be?.cheapest ? mt : void 0);
    return products.flatMap((p) => p.medications);
  }
  async searchByLabel(label) {
    try {
      return await findMedicationsByLabel(this.sdk, label);
    } catch (error) {
      throw new MedicationProviderUnavailableError(`SAM medication search failed for label "${label}"`, error);
    }
  }
  async loadNextPage(args) {
    const { label, ...loadMoreArgs } = args;
    try {
      return await loadMore({ ...loadMoreArgs, deliveryEnvironment: this.deliveryEnvironment });
    } catch (error) {
      throw new MedicationProviderUnavailableError(`SAM medication page load failed for label "${label}"`, error);
    }
  }
};

// src/shared/services/cardinal-sam/index.ts
var findMedicationsByLabel = async (sdk, query) => {
  const language = cardinalLanguage.getLanguage();
  try {
    return await Promise.all([sdk.findPaginatedAmpsByLabel(language, query), sdk.findPaginatedVmpGroupsByLabel(language, query), sdk.findPaginatedNmpsByLabel(language, query)]);
  } catch (error) {
    console.error("Error in findMedicationsByLabel:", error);
    throw error;
  }
};
var loadAlternativeMedications = async (sdk, vmpGroupCode) => {
  return sdk.findPaginatedAmpsByGroupCode(vmpGroupCode);
};
var loadVmpGroup = async (sdk, vmpGroupCode) => {
  const groups = await sdk.listVmpGroupsByVmpGroupCodes([vmpGroupCode]);
  return groups[0];
};
var fetchSamVersion = async (sdk) => {
  try {
    return await sdk.getSamVersion();
  } catch (error) {
    console.error("Error in fetchSamVersion:", error);
    return void 0;
  }
};

// src/shared/services/medindex/medindex-medication-provider.ts
var import_medindex_sdk = require("@icure/medindex-sdk");

// src/internal/services/medication-mapper/map-medindex-medication.ts
var DEFAULT_MEDINDEX_LANGUAGE = "de";
function toMedIndexLanguage(language) {
  return language === "fr" || language === "de" ? language : DEFAULT_MEDINDEX_LANGUAGE;
}
function resolveLocalized(dict, language) {
  return dict[language] ?? dict[DEFAULT_MEDINDEX_LANGUAGE] ?? "";
}
var PRICE_TYPE_PREFERENCE = ["PPUB", "PPHA", "PEXF"];
function selectDisplayPrice(prices) {
  for (const type of PRICE_TYPE_PREFERENCE) {
    const candidates = prices.filter((price) => price.type === type && price.chf != null);
    if (candidates.length === 0) continue;
    const latest = candidates.reduce((newest, candidate) => (candidate.validFrom ?? 0) > (newest.validFrom ?? 0) ? candidate : newest);
    return { amount: latest.chf, currency: "CHF" };
  }
  return void 0;
}
function mapComposition(product, language) {
  const lines = product.composition.map((line) => {
    const substanceName = line.substance ? resolveLocalized(line.substance.name, language) : "";
    if (!substanceName) return null;
    return {
      substanceName,
      quantity: line.quantity ?? void 0,
      unit: line.unit ?? void 0,
      isActiveSubstance: line.isActiveSubstance
    };
  }).filter((line) => line !== null);
  return lines.length ? lines : void 0;
}
function mapInteractions(product, language, interactionsById) {
  const interactions = product.interactions.map((ref) => {
    const resolved = ref.id ? interactionsById?.get(ref.id) : void 0;
    return {
      id: ref.id ?? void 0,
      relevance: ref.relevance ?? resolved?.relevance ?? void 0,
      title: resolved ? resolveLocalized(resolved.titles, language) || void 0 : void 0,
      effect: resolved ? resolveLocalized(resolved.effect, language) || void 0 : void 0,
      measures: resolved ? resolveLocalized(resolved.measuresText, language) || void 0 : void 0
    };
  });
  return interactions.length ? interactions : void 0;
}
function mapMedIndexMedication(product, pkg, language, interactionsById) {
  return {
    id: pkg.id,
    kind: "product",
    title: resolveLocalized(pkg.name, language) || resolveLocalized(product.names, language),
    // Only the substances medINDEX marks as active (`WHK` = "W"): the full composition —
    // excipients included — is surfaced by the composition badge instead of being dumped into
    // this one summary line. Products whose source data marks no line as active (defensive —
    // not observed in the wild) fall back to every named substance rather than showing nothing.
    activeIngredient: (product.composition.some((line) => line.isActiveSubstance) ? product.composition.filter((line) => line.isActiveSubstance) : product.composition).map((line) => line.substance ? resolveLocalized(line.substance.name, language) : "").filter((name) => !!name).join(", "),
    regulatory: {
      ch: {
        pharmacode: String(pkg.pharmacode),
        gtin: pkg.gtin,
        swissmedicCategory: pkg.swissmedicCategory ?? void 0,
        narcotic: pkg.narcotic,
        coldChain: pkg.coldChain,
        genericGroup: product.genericGroup ?? void 0,
        price: selectDisplayPrice(pkg.prices),
        composition: mapComposition(product, language),
        interactions: mapInteractions(product, language, interactionsById)
      }
    }
  };
}
function mapMedIndexProductTitle(product, language) {
  return resolveLocalized(product.names, language);
}

// src/shared/services/medindex/medindex-medication-provider.ts
var PAGE_SIZE = 10;
async function pullNext(iterator, size) {
  const items = [];
  while (items.length < size) {
    const { value, done } = await iterator.next();
    if (done) break;
    items.push(value);
  }
  return items;
}
async function* mergeLanes(lanes) {
  const seen = /* @__PURE__ */ new Set();
  for (const lane of lanes) {
    try {
      for await (const product of lane.iterable) {
        if (seen.has(product.id)) continue;
        seen.add(product.id);
        yield product;
      }
    } catch (error) {
      if (!(lane.optional && error instanceof import_medindex_sdk.MedIndexNotFoundError)) throw error;
    }
  }
}
var ATC_PATTERN = /^[A-Za-z]\d\d([A-Za-z]([A-Za-z](\d\d)?)?)?$/;
var MedIndexMedicationProvider = class {
  constructor(client) {
    this.client = client;
  }
  async *findByLabel(label) {
    let lanes;
    const trimmed = label.trim();
    const language = toMedIndexLanguage(cardinalLanguage.getLanguage());
    try {
      lanes = [
        { iterable: this.client.product.iterateByLabel(trimmed, language), optional: false },
        { iterable: this.client.product.iterateBySubstance(trimmed, language), optional: true },
        // The ATC index is uppercase, and `iterateByAtc` deliberately passes the code through
        // literally — normalize here so a lowercase query still hits.
        ...ATC_PATTERN.test(trimmed) ? [{ iterable: this.client.product.iterateByAtc(trimmed.toUpperCase()), optional: true }] : []
      ];
    } catch (error) {
      throw this.translateError(error, `medINDEX product search failed for label "${label}"`);
    }
    const iterator = mergeLanes(lanes);
    while (true) {
      const page = await this.loadNextPage(iterator, label);
      if (page.length === 0) return;
      for (const item of page) {
        yield item;
      }
    }
  }
  /**
   * Pulls product chunks from the source and maps each surviving one into a `MedicationProductType`,
   * recursing for another chunk whenever filtering (inactive products/packages) leaves fewer
   * qualifying results than `PAGE_SIZE` and the source isn't exhausted yet — mirrors
   * `loadMedicationsPage`'s own recursion for the same "don't dribble out a near-empty page" reason.
   */
  async loadNextPage(iterator, label, acc = []) {
    const products = await this.pullProducts(iterator, label);
    if (products.length === 0) return acc;
    const activeProducts = products.filter((product) => product.active);
    const [packagesByProductId, interactionsById] = activeProducts.length ? await Promise.all([this.fetchPackagesByProduct(activeProducts, label), this.fetchInteractionsById(activeProducts)]) : [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
    const language = toMedIndexLanguage(cardinalLanguage.getLanguage());
    const page = activeProducts.map((product) => this.toMedicationProductType(product, packagesByProductId.get(product.id) ?? [], language, interactionsById)).filter((product) => product !== null);
    const combined = [...acc, ...page];
    return products.length < PAGE_SIZE || combined.length >= PAGE_SIZE ? combined : this.loadNextPage(iterator, label, combined);
  }
  /** Returns `null` (filtered out) once none of a product's packages are active — mirroring how
   * `loadMedicationsPage` returns `null` for an AMP whose AMPPs are all undeliverable. */
  toMedicationProductType(product, packages, language, interactionsById) {
    const activePackages = packages.filter((pkg) => pkg.active);
    if (activePackages.length === 0) return null;
    return {
      id: product.id,
      title: mapMedIndexProductTitle(product, language),
      medications: activePackages.map((pkg) => mapMedIndexMedication(product, pkg, language, interactionsById))
    };
  }
  async pullProducts(iterator, label) {
    try {
      return await pullNext(iterator, PAGE_SIZE);
    } catch (error) {
      throw this.translateError(error, `medINDEX product search failed for label "${label}"`);
    }
  }
  /**
   * One batched `interaction.byIds` call per chunk, resolving the full `RawInteraction` documents
   * behind every product's interaction refs so `mapMedIndexMedication` can embed localized
   * titles/effects. Enrichment only — a `MedIndexNotFoundError` (an older medINDEX server without
   * the /interaction endpoint) degrades to an empty map, same as the optional search lanes, and
   * the mapper falls back to ref-only entries. Any other error still propagates: it signals the
   * same source unavailability a package lookup failure would.
   */
  async fetchInteractionsById(products) {
    const ids = Array.from(new Set(products.flatMap((product) => product.interactions.map((ref) => ref.id)).filter((id) => !!id)));
    if (ids.length === 0) return /* @__PURE__ */ new Map();
    try {
      const interactions = await this.client.interaction.byIds(ids);
      return new Map(interactions.map((interaction) => [interaction.id, interaction]));
    } catch (error) {
      if (error instanceof import_medindex_sdk.MedIndexNotFoundError) return /* @__PURE__ */ new Map();
      throw this.translateError(error, "medINDEX interaction lookup failed");
    }
  }
  /** One batched `byProductIds` call per chunk, not one call per product — the whole point of
   * pulling products in chunks in the first place. */
  async fetchPackagesByProduct(products, label) {
    try {
      const packages = await this.client.package.byProductIds(products.map((product) => product.id));
      const byProductId = /* @__PURE__ */ new Map();
      for (const pkg of packages) {
        const productId = pkg.product?.id;
        if (!productId) continue;
        const existing = byProductId.get(productId);
        if (existing) existing.push(pkg);
        else byProductId.set(productId, [pkg]);
      }
      return byProductId;
    } catch (error) {
      throw this.translateError(error, `medINDEX package lookup failed for label "${label}"`);
    }
  }
  // Collapses `MedIndexServerError`/`MedIndexNetworkError` into one `MedicationProviderUnavailableError`
  // per this library's error contract (see `MedicationProvider`'s doc comment / docs/plan.md's
  // Decisions table) — callers only need "try again later," not the exact transport-vs-server cause.
  translateError(error, message) {
    if (error instanceof import_medindex_sdk.MedIndexNotFoundError) return new MedicationNotFoundError(message, error);
    if (error instanceof import_medindex_sdk.MedIndexValidationError) return new MedicationSearchValidationError(message, error);
    if (error instanceof import_medindex_sdk.MedIndexServerError || error instanceof import_medindex_sdk.MedIndexNetworkError) return new MedicationProviderUnavailableError(message, error);
    return new MedicationProviderUnavailableError(message, error);
  }
};

// src/shared/services/medication-provider-config/index.ts
function createMedicationProvider(config) {
  switch (config.country) {
    case "be":
      return new SamMedicationProvider(config.sdk, config.deliveryEnvironment);
    case "ch":
      return new MedIndexMedicationProvider(config.client);
  }
}

// src/shared/services/indexed-db/index.ts
var IndexedDbServiceStore = class {
  db;
  config;
  constructor(config) {
    this.config = config;
    this.db = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.DB_NAME, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.config.STORE_NAME)) {
          db.createObjectStore(this.config.STORE_NAME, { keyPath: this.config.KEY_PATH });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async get(key) {
    const db = await this.db;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.STORE_NAME, "readonly");
      const store = tx.objectStore(this.config.STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => {
        if (request.result?.value != null) {
          resolve(request.result.value);
        } else {
          reject(new Error(`No value for key: ${key}`));
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
  async put(key, value) {
    const db = await this.db;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.STORE_NAME, "readwrite");
      const store = tx.objectStore(this.config.STORE_NAME);
      const getRequest = store.get(key);
      getRequest.onsuccess = () => {
        const exists = !!getRequest.result;
        const record = { id: key, value };
        const request = exists ? store.put(record) : store.add(record);
        request.onsuccess = () => resolve(value);
        request.onerror = () => reject(request.error);
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }
  async delete(key) {
    const db = await this.db;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.STORE_NAME, "readwrite");
      const store = tx.objectStore(this.config.STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
};
var createIndexedDbTokenStore = () => {
  let store;
  const open = () => store ??= new IndexedDbServiceStore(TOKEN_IDB_CONFIG);
  return {
    put: (key, value) => open().put(key, value),
    // A miss (the store rejects) is `undefined`, as the TokenStore contract says.
    get: (key) => open().get(key).catch(() => void 0)
  };
};

// src/shared/services/certificate/index.ts
var certificateStoreInstance;
var certificateStore = () => certificateStoreInstance ??= new IndexedDbServiceStore(CERTIFICATE_IDB_CONFIG);
var loadCertificateInformation = async (hcp_ssin) => {
  try {
    const record = await certificateStore().get(hcp_ssin);
    return {
      salt: new Uint8Array(record.salt).buffer,
      iv: new Uint8Array(record.iv).buffer,
      encryptedCertificate: new Uint8Array(record.encryptedCertificate).buffer
    };
  } catch {
    console.error("No certificate record found for the prescriber");
    return void 0;
  }
};
var loadAndDecryptCertificate = async (hcp_ssin, passphrase) => {
  try {
    const info = await loadCertificateInformation(hcp_ssin);
    if (!info) return void 0;
    const { salt, iv, encryptedCertificate } = info;
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey("raw", encoder.encode(passphrase), { name: "PBKDF2" }, false, ["deriveKey"]);
    const decryptionKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: new Uint8Array(salt), iterations: 1e5, hash: "SHA-256" },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    return await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new Uint8Array(iv)
      },
      decryptionKey,
      new Uint8Array(encryptedCertificate)
    );
  } catch {
    console.error("Certificate decryption failed for the prescriber");
    return void 0;
  }
};
var uploadAndEncryptCertificate = async (hcp_ssin, passphrase, certificate) => {
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), { name: "PBKDF2" }, false, ["deriveKey"]);
    const encryptionKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 1e5,
        hash: "SHA-256"
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const encryptedCertificate = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, encryptionKey, certificate);
    const record = {
      id: hcp_ssin,
      salt: Array.from(salt),
      iv: Array.from(iv),
      encryptedCertificate: Array.from(new Uint8Array(encryptedCertificate))
    };
    return await certificateStore().put(hcp_ssin, record);
  } catch {
    console.error("Certificate encryption failed for the prescriber");
    return void 0;
  }
};
var deleteCertificate = async (hcp_ssin) => {
  try {
    await certificateStore().delete(hcp_ssin);
    return true;
  } catch {
    console.error("Failed to delete the prescriber certificate");
    return false;
  }
};

// src/shared/services/fhc/index.ts
var import_be_fhc_lite_api2 = require("@icure/be-fhc-lite-api");
var isCredentials = (value) => typeof value !== "string";
var resolveCredentials = async (source) => typeof source === "function" ? await source() : source;
var DEFAULT_VALIDITY_DAYS = 90;
var makePrescriptionRequest = (config, samVersion, prescriber, patient, prescribedMedication) => new import_be_fhc_lite_api2.PrescriptionRequest({
  medications: [prescribedMedication.medication],
  patient: {
    firstName: patient.firstName,
    lastName: patient.lastName,
    ssin: patient.ssin,
    dateOfBirth: patient.dateOfBirth
  },
  hcp: {
    firstName: prescriber.firstName,
    lastName: prescriber.lastName,
    ssin: prescriber.ssin,
    nihii: prescriber.nihii,
    addresses: prescriber.addresses
  },
  feedback: false,
  vendorName: config.vendor.vendorName,
  vendorEmail: config.vendor.vendorEmail,
  vendorPhone: config.vendor.vendorPhone,
  packageName: config.samPackage.packageName,
  packageVersion: config.samPackage.packageVersion,
  vision: prescribedMedication.pharmacistVisibility,
  visionOthers: prescribedMedication.prescriberVisibility,
  samVersion,
  deliveryDate: prescribedMedication.medication.beginMoment ?? dateEncode(/* @__PURE__ */ new Date()),
  // The "executable until" date; it used to be the start date (`beginMoment`), so a prescription
  // sent from the modal expired the day it started.
  expirationDate: prescribedMedication.medication.endMoment ?? offsetDate(prescribedMedication.medication.beginMoment ?? dateEncode(/* @__PURE__ */ new Date()), DEFAULT_VALIDITY_DAYS),
  lang: cardinalLanguage.getLanguage()
});
var createFhcCode = (type, code, version = "1.0") => new import_be_fhc_lite_api2.Code({
  id: `${type}:${code}:${version}`,
  type,
  code,
  version
});
var MissingStsTokenError = class extends Error {
  constructor() {
    super("Cannot obtain an STS token");
    this.name = "MissingStsTokenError";
  }
};
var createPrescriptions = (fhc_url, prescriber, prescription, keystoreId, tokenId, passphrase) => {
  const recipe = new import_be_fhc_lite_api2.fhcRecipeApi(fhc_url, []);
  return Promise.all(
    prescription.medications?.map(
      (m) => recipe.createPrescriptionV4UsingPOST(
        keystoreId,
        tokenId,
        passphrase,
        "persphysician",
        prescriber.nihii,
        prescriber.ssin,
        `${prescriber.firstName} ${prescriber.lastName}`,
        "iCure",
        "1",
        new import_be_fhc_lite_api2.PrescriptionRequest({ ...prescription, medications: [m] })
      )
    ) ?? []
  );
};
var sendRecipe = async (config, samVersion, prescriber, patient, prescribedMedication, auth, fhc_url, cache) => {
  const prescription = makePrescriptionRequest(config, samVersion, prescriber, patient, prescribedMedication);
  if (!prescriber?.ssin || !prescriber?.nihii) throw new Error("Missing prescriber information");
  if (isCredentials(auth)) {
    const credentials = await resolveCredentials(auth);
    if (!credentials.tokenId) throw new MissingStsTokenError();
    return createPrescriptions(fhc_url, prescriber, prescription, credentials.keystoreId, credentials.tokenId, credentials.passphrase);
  }
  if (!cache) throw new Error("A TokenStore is needed with a passphrase");
  const passphrase = auth;
  const keystore = await loadAndDecryptCertificate(prescriber.ssin, passphrase);
  if (!keystore) throw new Error("Cannot obtain keystore");
  const sts = new import_be_fhc_lite_api2.fhcStsApi(fhc_url, []);
  const storeKey = `keystore.${prescriber.ssin}`;
  const keystoreUuid = await cache.get(storeKey) ?? await sts.uploadKeystoreUsingPOST(keystore).then(({ uuid: uuid2 }) => {
    if (!uuid2) throw new Error("Cannot obtain keystore uuid");
    return cache.put(storeKey, uuid2);
  });
  const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, "doctor");
  if (!stsToken.tokenId) throw new MissingStsTokenError();
  return createPrescriptions(fhc_url, prescriber, prescription, keystoreUuid, stsToken.tokenId, passphrase);
};
var verifyCertificateWithSts = async (prescriber, auth, cache, fhc_url) => {
  if (!prescriber?.ssin || !prescriber?.nihii) {
    return {
      status: false,
      error: {
        en: "Missing prescriber information",
        fr: "Informations du prescripteur manquantes",
        nl: "Ontbrekende voorschrijversinformatie",
        de: "Fehlende Verschreiberinformationen"
      }
    };
  }
  try {
    if (isCredentials(auth)) {
      const credentials = await resolveCredentials(auth);
      return { status: !!credentials.tokenId && await new import_be_fhc_lite_api2.fhcStsApi(fhc_url, []).checkTokenValidUsingGET(credentials.tokenId) };
    }
    if (!cache) throw new Error("A TokenStore is needed with a passphrase");
    const passphrase = auth;
    const keystore = await loadAndDecryptCertificate(prescriber.ssin, passphrase);
    if (!keystore) {
      return {
        status: false,
        error: {
          en: "Cannot obtain the certificate",
          fr: "Impossible d\u2019obtenir le certificat",
          nl: "Certificaat kan niet worden verkregen",
          de: "Zertifikat kann nicht abgerufen werden"
        }
      };
    }
    const sts = new import_be_fhc_lite_api2.fhcStsApi(fhc_url, []);
    const storeKey = `keystore.${prescriber.ssin}`;
    const keystoreUuid = await sts.uploadKeystoreUsingPOST(keystore).then(({ uuid: uuid2 }) => {
      if (!uuid2) throw new Error("Cannot obtain keystore uuid");
      return cache.put(storeKey, uuid2);
    });
    const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, "doctor");
    return { status: !!stsToken.tokenId };
  } catch (error) {
    console.error("Certificate verification error:", error?.message ?? "unknown");
    return {
      status: false,
      error: {
        en: error?.message || "Unknown error occurred",
        fr: error?.message || "Une erreur inconnue est survenue",
        nl: error?.message || "Er is een onbekende fout opgetreden",
        de: error?.message || "Ein unbekannter Fehler ist aufgetreten"
      }
    };
  }
};
var validateDecryptedCertificate = async (hcp, passphrase, cache, fhc_url) => {
  try {
    if (!await loadAndDecryptCertificate(hcp.ssin, passphrase)) {
      return { status: false };
    }
    return await verifyCertificateWithSts(hcp, passphrase, cache, fhc_url);
  } catch {
    return { status: false };
  }
};

// src/shared/components/PractitionerCertificate/index.tsx
var import_react4 = require("react");

// src/internal/components/common/Alert/styles.ts
var import_styled_components15 = __toESM(require("styled-components"));
var StyledAlert = import_styled_components15.default.div`
  width: 100%;
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: ${cp.radiusXl};
  border: 1px solid ${cp.colorSurface};

  .heading {
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  h4 {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeLg};
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  p {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeMd};
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }

  ${({ $error }) => !!$error && import_styled_components15.css`
      border-color: ${cp.colorCriticalSoft};
      background: ${cp.colorCriticalSurface};
    `};

  ${({ $success }) => !!$success && import_styled_components15.css`
      border-color: ${cp.colorOkSoft};
      background: ${cp.colorOkSurface};
    `};
`;

// src/internal/components/common/Alert/index.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var Alert = ({ status, title, description }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(StyledAlert, { className: "StyledAlert", $success: status === "success", $error: status === "error", children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "heading", children: [
      status === "success" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(StatusSuccessIcn, {}),
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(StatusErrorIcn, {}),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h4", { children: title })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("p", { children: description })
  ] });
};

// src/internal/components/certificate-elements/CertificateUploadForm/index.tsx
var import_react3 = require("react");
var import_react_hook_form = require("react-hook-form");

// src/internal/utils/file-helpers.ts
var readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

// src/internal/components/form-elements/Button/styles.ts
var import_styled_components16 = __toESM(require("styled-components"));
var viewStyles = ($view) => {
  switch ($view) {
    case "primary":
      return import_styled_components16.css`
        background: ${cp.buttonPrimaryBackground};
        border-color: ${cp.buttonPrimaryBackground};
        color: ${cp.buttonPrimaryText};

        &:hover {
          opacity: 0.9;
        }
      `;
    case "outlined":
      return import_styled_components16.css`
        border-color: ${cp.buttonSecondaryBorder};
        background: ${cp.buttonSecondaryBackground};
        color: ${cp.buttonSecondaryText};

        &:hover {
          border-color: ${cp.buttonSecondaryText};
        }
      `;
    case "withSpinner":
      return import_styled_components16.css`
        border-color: ${cp.buttonSecondaryBorder};
        background: ${cp.buttonSecondaryBackground};
        color: ${cp.buttonSecondaryText};
        gap: 8px;
      `;
    default:
      return null;
  }
};
var StyledButton = import_styled_components16.default.button`
  /* The button is a public atom that may be mounted outside any library root. */
  ${darkModeDefaults}
  display: flex;
  ${targetSize("height", cp.controlHeight)};
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-radius: ${cp.buttonRadius};
  font-family: ${cp.fontFamily};
  font-size: ${cp.fontSizeMd};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${cp.buttonPrimaryBackground};
  cursor: pointer;
  min-width: 64px;

  ${({ $view }) => viewStyles($view)}
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    border-color: ${cp.colorBorderStrong};
    background: ${cp.colorSurfaceDisabled};
    color: ${cp.colorTextSubtle};
  }
`;

// src/internal/components/form-elements/Button/index.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var Button = ({ title, view = "primary", handleClick, type = "button", ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    StyledButton,
    {
      className: "StyledButton",
      $view: view,
      onClick: handleClick,
      type,
      ...view === "withSpinner" ? { "aria-label": title, "aria-busy": true } : {},
      ...rest,
      children: view === "withSpinner" ? SpinnerIcn({}) : title
    }
  );
};

// src/internal/components/form-elements/TextInput/index.tsx
var import_react2 = require("react");

// src/internal/components/form-elements/TextInput/styles.ts
var import_styled_components17 = __toESM(require("styled-components"));
var StyledTextInputLabel = import_styled_components17.default.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components17.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components17.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextInput = import_styled_components17.default.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledInput = import_styled_components17.default.input`
  ${inputCommonStyles};

  &::file-selector-button {
    border-radius: 0;
    height: 100%;
    cursor: pointer;
    background-color: ${cp.colorSurface};
    border: none;
    border-right: 1px solid ${cp.colorBorderStrong};
    margin-right: 16px;
    padding-right: 12px;
    transition: background-color 200ms;
    color: ${cp.colorPlaceholder};
  }

  ${({ $error }) => !!$error && import_styled_components17.css`
      ${inputCommonStyles_error}
      &::file-selector-button {
        color: ${translucent(cp.colorCritical, 70)};
        border-color: ${cp.colorCritical};
      }
    `};
  ${({ $disabled }) => !!$disabled && import_styled_components17.css`
      ${inputCommonStyles_disabled}
    `};
`;

// src/internal/components/form-elements/TextInput/index.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var TextInput = (0, import_react2.forwardRef)(({ label, min, type, id, required, errorMessage, disabled, autoFocus, ...rest }, ref) => {
  const localRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (autoFocus && localRef.current) {
      localRef.current.focus();
    }
  }, [autoFocus]);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(StyledTextInput, { className: "StyledTextInput", children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(StyledTextInputLabel, { className: "StyledTextInputLabel", htmlFor: id, $required: required, $error: !!errorMessage, children: [
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { "aria-hidden": "true", children: "*" }),
      label
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      StyledInput,
      {
        className: "StyledInput",
        id,
        name: id,
        ref: (node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          localRef.current = node;
        },
        placeholder: label,
        type: type ?? "text",
        min,
        "aria-required": required || void 0,
        "aria-invalid": !!errorMessage || void 0,
        "aria-describedby": errorMessage ? `${id}-error` : void 0,
        ...rest,
        disabled,
        $disabled: disabled,
        $error: !!errorMessage
      }
    ),
    errorMessage && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("p", { id: `${id}-error`, className: "error", children: errorMessage })
  ] });
});
TextInput.displayName = "TextInput";

// src/internal/components/certificate-elements/CertificateUploadForm/styles.ts
var import_styled_components18 = __toESM(require("styled-components"));
var StyledCertificateUpload = import_styled_components18.default.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 12px;
`;
var StyledCertificateForm = import_styled_components18.default.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: ${cp.radiusXl};
  border: 1px solid ${cp.colorBorder};
  background: ${cp.colorSurface};
  padding: 24px;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.l)`
   padding: 18px;
  `}
  h3 {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeLg};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .StyledCertificateUpload__inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: 12px;
  }
`;

// src/internal/components/certificate-elements/CertificateUploadForm/index.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var CertificateUploadForm = ({ onUploadCertificate, onResetCertificate, onDecryptCertificate, certificateAlreadyUploaded, hcpSsin }) => {
  const [storedAtMount, setStoredAtMount] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    if (!hcpSsin) return;
    loadCertificateInformation(hcpSsin).then((stored) => setStoredAtMount(!!stored)).catch(() => setStoredAtMount(false));
  }, []);
  const alreadyUploaded = hcpSsin ? storedAtMount : certificateAlreadyUploaded;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: certificateFormError }
  } = (0, import_react_hook_form.useForm)();
  const handleFormSubmit = async ({ certificate, password }) => {
    if (alreadyUploaded) {
      onDecryptCertificate(password);
    } else {
      const certificateData = await readFileAsArrayBuffer(certificate[0]);
      onUploadCertificate(certificateData, password);
    }
  };
  const onUploadedAnotherCertificate = async () => {
    setStoredAtMount(false);
    onResetCertificate();
    reset();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(StyledCertificateUpload, { className: "StyledCertificateUpload", children: [
    alreadyUploaded && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Alert, { status: "error", title: t("practitioner.certificateUpload.passwordMissingTitle"), description: t("practitioner.certificateUpload.passwordMissingDescription") }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(StyledCertificateForm, { className: "StyledCertificateForm", onSubmit: handleSubmit(handleFormSubmit), id: "uploadCertificateForm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("h3", { children: !alreadyUploaded ? t("practitioner.certificateUpload.titleUpload") : t("practitioner.certificateUpload.titlePassword") }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "StyledCertificateUpload__inputs", children: [
        !alreadyUploaded && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          TextInput,
          {
            label: t("practitioner.certificateUpload.fileLabel"),
            type: "file",
            id: "certificate",
            accept: ".p12,.acc-p12",
            required: true,
            ...register("certificate", {
              required: t("practitioner.certificateUpload.errorRequired")
            }),
            errorMessage: certificateFormError["certificate"]?.message
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          TextInput,
          {
            label: t("practitioner.certificateUpload.passwordLabel"),
            type: "password",
            id: "password",
            required: true,
            ...register("password", {
              required: t("practitioner.certificateUpload.errorRequired")
            }),
            errorMessage: certificateFormError["password"]?.message
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        Button,
        {
          title: !alreadyUploaded ? t("practitioner.certificateUpload.submitButtonUpload") : t("practitioner.certificateUpload.submitButtonPassword"),
          type: "submit",
          form: "uploadCertificateForm"
        }
      )
    ] }),
    alreadyUploaded && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Button, { title: t("practitioner.certificateUpload.resetButton"), type: "reset", view: "outlined", form: "uploadCertificateForm", handleClick: onUploadedAnotherCertificate })
  ] });
};

// src/shared/components/PractitionerCertificate/styles.ts
var import_styled_components19 = __toESM(require("styled-components"));
var StyledPractitionerCertificate = import_styled_components19.default.div`
  ${libraryRoot}
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.m)`
  width: 100%;
    min-width: 100%;
  `}
`;

// src/shared/components/PractitionerCertificate/index.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var SUCCESS_ALERT_DURATION_MS = 5e3;
var PractitionerCertificate = ({
  certificateValid,
  onUploadCertificate,
  onResetCertificate,
  onDecryptCertificate,
  certificateUploaded,
  errorWhileVerifyingCertificate,
  hcpSsin
}) => {
  const showSuccessAlert = certificateValid && !errorWhileVerifyingCertificate;
  const [successAlertDismissed, setSuccessAlertDismissed] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    if (!showSuccessAlert) {
      setSuccessAlertDismissed(false);
      return;
    }
    const timer = setTimeout(() => setSuccessAlertDismissed(true), SUCCESS_ALERT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [showSuccessAlert]);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_jsx_runtime30.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(StyledPractitionerCertificate, { className: `StyledPractitionerCertificate ${LIBRARY_ROOT_CLASS}`, children: [
    showSuccessAlert && !successAlertDismissed && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Alert, { status: "success", title: t("practitioner.certificateFeedback.successTitle"), description: t("practitioner.certificateFeedback.successDescription") }),
    !certificateValid && !certificateUploaded && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Alert, { status: "error", title: t("practitioner.certificateFeedback.failureTitle"), description: t("practitioner.certificateFeedback.failureDescription") }),
    errorWhileVerifyingCertificate && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Alert, { status: "error", title: t("practitioner.certificateFeedback.verificationErrorTitle"), description: errorWhileVerifyingCertificate }),
    (!certificateValid || !certificateUploaded) && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      CertificateUploadForm,
      {
        onUploadCertificate,
        onResetCertificate,
        onDecryptCertificate,
        certificateAlreadyUploaded: certificateUploaded,
        hcpSsin
      }
    )
  ] }) });
};

// src/shared/components/MedicationSearch/index.tsx
var import_react8 = require("react");

// src/internal/components/medication-elements/MedicationCard/index.tsx
var import_react6 = require("react");

// src/internal/components/medication-elements/MedicationCard/medication-card-elements/Header/index.tsx
var import_react5 = require("react");

// src/internal/components/common/RegulatoryBadges/index.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var RegulatoryBadges = ({ medication, placement, boundaryBox }) => {
  const countries = Object.keys(medication.regulatory ?? {});
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_jsx_runtime31.Fragment, { children: countries.flatMap(
    (country) => getRegulatoryBadges(country, placement).map(({ key, Component }) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Component, { medication, boundaryBox }, `${country}.${key}`))
  ) });
};

// src/internal/components/medication-elements/MedicationInfographics/styles.ts
var import_styled_components20 = __toESM(require("styled-components"));
var StyledMedicationInfographics = import_styled_components20.default.div`
  display: flex;
  align-items: center;
  gap: 2px;

  .regulatoryBadgeIcon {
    display: flex;
    width: 22px;
    height: 22px;
    justify-content: center;
    align-items: center;
    border-radius: ${cp.radiusSm};

    &--outline {
      border: 1px solid ${cp.colorAccentSoft};
    }

    &--red {
      background-color: ${cp.colorCriticalSoft};
    }

    &--orange {
      background-color: ${cp.colorCautionSoft};
    }

    &--green {
      background-color: ${cp.colorOkSoft};
    }
  }
`;

// src/internal/components/medication-elements/MedicationInfographics/index.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var MedicationInfographics = ({ medication, boundaryBox }) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(StyledMedicationInfographics, { className: "StyledMedicationInfographics", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RegulatoryBadges, { medication, placement: "detail", boundaryBox }) });

// src/internal/components/medication-elements/MedicationCard/medication-card-elements/Header/index.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var Header = ({ handleAddPrescription, medication, isMedicationCardExpanded, setMedicationCardExpanded, subMedication, readOnly }) => {
  const medicationCardRef = (0, import_react5.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(StyledHeader, { className: "StyledHeader", ref: medicationCardRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      "div",
      {
        className: "medication",
        onClick: readOnly ? void 0 : handleAddPrescription,
        role: readOnly ? void 0 : "button",
        tabIndex: readOnly ? void 0 : 0,
        onKeyDown: (event) => {
          if (event.key === "Enter" && !readOnly) handleAddPrescription();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "medication__content", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "medication__content__heading", children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "medication__content__heading__title", children: [
              !subMedication && (medication.kind === "product" ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Tooltip, { content: t("medication.drugType.medication"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SolidPillIcn, {}), boundaryBox: medicationCardRef }) : medication.kind === "nonMedicinal" ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Tooltip, { content: t("medication.drugType.homologation"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(LeafIcn, {}), boundaryBox: medicationCardRef }) : medication.kind === "molecule" ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Tooltip, { content: t("medication.drugType.molecule"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(MoleculeIcn, {}), boundaryBox: medicationCardRef }) : null),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("h3", { children: medication.title }),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(MedicationInfographics, { medication, boundaryBox: medicationCardRef })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("p", { className: "medication__content__heading__activeIngredient", children: medication.activeIngredient })
          ] }),
          !readOnly && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "medication__content__description", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RegulatoryBadges, { medication, placement: "summary", boundaryBox: medicationCardRef }) })
        ] })
      }
    ),
    !readOnly && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      StyledExpandButton,
      {
        className: "StyledExpandButton",
        $isExpanded: isMedicationCardExpanded,
        onClick: (e) => {
          e.stopPropagation();
          setMedicationCardExpanded(!isMedicationCardExpanded);
        },
        type: "button",
        "aria-label": t("medication.ui.showDetails"),
        "aria-expanded": isMedicationCardExpanded,
        children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(ChevronIcn, {})
      }
    )
  ] });
};

// src/internal/components/medication-elements/MedicationCard/medication-card-elements/Extension/styles.ts
var import_styled_components21 = __toESM(require("styled-components"));
var StyledExtension = import_styled_components21.default.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  gap: 18px;

  background-color: ${cp.colorSurfaceSunken};

  border-radius: 0 0 ${cp.radiusMd} ${cp.radiusMd};

  border-top: 1px dashed ${cp.colorAccent};

  .vmp {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        font-size: ${cp.fontSizeXs};
        font-weight: 400;
        color: ${cp.colorTextMuted};
      }

      p {
        font-size: ${cp.fontSizeMd};
        font-weight: 400;
        color: ${cp.colorTextStrong};
      }
    }
  }

  // Generic label+value row for country-specific fields that don't warrant their own styled
  // component (currently ch's GTIN list / generic group) — same visual treatment as .vmp__item
  // above, under a country-neutral name.
  .regulatoryField {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: ${cp.fontSizeXs};
      font-weight: 400;
      color: ${cp.colorTextMuted};
    }

    p {
      font-size: ${cp.fontSizeMd};
      font-weight: 400;
      color: ${cp.colorTextStrong};
    }
  }

  // Each section below is now an independently-registered 'expanded' badge that may render
  // null (React emits no DOM node for it), so a divider div can no longer be hand-placed
  // between "the next section that will actually render". Putting the divider styling on
  // every child but the first sidesteps that: :not(:first-child) only ever matches DOM
  // siblings that actually rendered, so the line shows up exactly between rendered sections
  // with zero bookkeeping. padding-top replicates the second half of the original
  // gap-line-gap spacing (18px gap, 1px line, 18px gap) that the container's gap alone
  // only covers half of, now that the line lives on the section itself instead of its own
  // flex item.
  & > *:not(:first-child) {
    padding-top: 18px;
    border-top: 1px dashed ${translucent(cp.colorAccent, 25)};
  }

  .links {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 8px;

    a {
      width: 49%;
      color: ${cp.colorLink};
      font-size: ${cp.fontSizeMd};
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

// src/internal/components/medication-elements/MedicationCard/medication-card-elements/Extension/index.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
var Extension = ({ medication }) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(StyledExtension, { className: "StyledExtension", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(RegulatoryBadges, { medication, placement: "expanded" }) });

// src/internal/components/medication-elements/MedicationCard/styles.ts
var import_styled_components22 = __toESM(require("styled-components"));
var activeMedicationCard = import_styled_components22.css`
  border-color: ${cp.colorAccent};
  box-shadow: 0 0 0 2px ${cp.colorHoverHalo};
`;
var StyledMedicationCard = import_styled_components22.default.div`
  /* The card is a public atom that may be mounted outside any library root. */
  ${darkModeDefaults}
  ${rootText}
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${cp.radiusMd};
  background: ${cp.colorSurface};
  border: 1px solid ${cp.colorBorderAccent};
  cursor: pointer;

  ${({ $subMedication }) => $subMedication && import_styled_components22.css`
      ${StyledHeader} {
        padding-left: 28px;

        h3 {
          font-size: ${cp.fontSizeMd};
        }
      }
    `};

  &:hover {
    ${activeMedicationCard};
  }

  ${({ $isExpanded }) => $isExpanded && import_styled_components22.css`
      ${activeMedicationCard};

      ${StyledHeader} {
        border-radius: ${cp.radiusMd} ${cp.radiusMd} 0 0;
      }
    `};

  ${({ $focused, $disableHover }) => $focused && $disableHover && import_styled_components22.css`
      &:hover {
        ${activeMedicationCard};
      }
    `};

  ${({ $focused }) => $focused && import_styled_components22.css`
      ${activeMedicationCard};
    `};

  ${({ $disableHover }) => $disableHover && import_styled_components22.css`
      &:hover {
        border-color: ${cp.colorBorderAccent};
        box-shadow: none;
        cursor: not-allowed;
      }
    `};
`;

// src/internal/components/medication-elements/MedicationCard/index.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
var MedicationCard = ({ medication, handleAddPrescription, id, focused, disableHover, subMedication, readOnly }) => {
  const [isExpanded, setIsExpanded] = (0, import_react6.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(StyledMedicationCard, { className: "StyledMedicationCard", $focused: focused, $isExpanded: isExpanded, $disableHover: disableHover, $subMedication: subMedication, id, children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      Header,
      {
        handleAddPrescription: () => handleAddPrescription(medication),
        medication,
        isMedicationCardExpanded: isExpanded,
        setMedicationCardExpanded: (status) => setIsExpanded(status),
        subMedication,
        readOnly
      }
    ),
    isExpanded && !readOnly && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Extension, { medication })
  ] });
};

// src/internal/components/medication-elements/MedicationProductTitle/styles.ts
var import_styled_components23 = __toESM(require("styled-components"));
var StyledMedicationProductTitle = import_styled_components23.default.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: ${cp.radiusMd};
  background: ${cp.colorSurface};
  border: 1px solid ${cp.colorBorderAccent};
  padding: 8px 12px;

  h3 {
    color: ${cp.colorText};
    font-size: ${cp.fontSizeLg};
    font-style: normal;
    font-weight: 500;
  }
`;

// src/internal/components/medication-elements/MedicationProductTitle/index.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
var MedicationProductTitle = ({ productTitle }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(StyledMedicationProductTitle, { className: "StyledMedicationProductTitle", children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Tooltip, { content: t("medication.drugType.medication"), iconSnippet: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(SolidPillIcn, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("h3", { children: productTitle })
  ] });
};

// src/internal/components/common/InfiniteScroll/index.tsx
var import_react7 = require("react");
var import_jsx_runtime37 = require("react/jsx-runtime");
var InfiniteScroll = ({ threshold = 0, loadMore: loadMore2 }) => {
  const infiniteScrollRef = (0, import_react7.useRef)(null);
  const isLoadMore = (0, import_react7.useRef)(false);
  (0, import_react7.useEffect)(() => {
    const element = infiniteScrollRef.current?.parentElement;
    if (!element) return;
    const onScroll = (e) => {
      const target = e.target;
      const offset = target.scrollHeight - target.clientHeight - target.scrollTop;
      if (offset <= threshold) {
        if (!isLoadMore.current) {
          loadMore2();
        }
        isLoadMore.current = true;
      } else {
        isLoadMore.current = false;
      }
    };
    element.addEventListener("scroll", onScroll);
    element.addEventListener("resize", onScroll);
    return () => {
      element.removeEventListener("scroll", onScroll);
      element.removeEventListener("resize", onScroll);
    };
  }, [threshold, loadMore2]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { ref: infiniteScrollRef, style: { width: 0 } });
};

// src/shared/components/MedicationSearch/styles.ts
var import_styled_components24 = __toESM(require("styled-components"));
var StyledMedicationSearch = import_styled_components24.default.div`
  ${libraryRoot}
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .spinner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }

  .placeholder {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 12px;

    p {
      color: ${cp.colorTextSubtle};
      font-size: ${cp.fontSizeMd};
      text-align: center;
    }
  }
`;
var StyledMedicationSearchInput = import_styled_components24.default.div`
  ${fieldCommonStyles};

  p {
    ${labelCommonStyles};
  }

  input {
    width: 100%;
    background: transparent;
    color: inherit;
    font: inherit;
    /* The surrounding field draws the focus indicator (:focus-within). */
    outline: none;

    &::placeholder {
      color: ${cp.colorPlaceholder};
    }
  }

  ${({ $dropdownDisplayed }) => !!$dropdownDisplayed && import_styled_components24.css`
      label {
        border-color: ${cp.colorPrimary};
        box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
        border-radius: ${cp.radiusMd};
      }
    `};

  ${({ $error }) => !!$error && import_styled_components24.css`
      p {
        ${labelCommonStyles_error};
      }
    `};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledLabel = import_styled_components24.default.label`
  ${inputCommonStyles};

  justify-content: space-between;

  &:focus-within {
    border-color: ${cp.colorPrimary};
    box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
    outline: 2px solid ${cp.colorFocusRing};
    outline-offset: 1px;
  }

  ${({ $error }) => !!$error && import_styled_components24.css`
      ${inputCommonStyles_error};
    `};
`;
var StyledMedicationSearchDropdown = import_styled_components24.default.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  position: relative;

  padding: 6px 8px 6px 6px;
  gap: 5px;

  border-radius: 0 0 ${cp.radiusMd} ${cp.radiusMd};
  border-top: none;
  background: ${cp.colorSurfaceAccent};
  box-shadow: ${cp.shadowPopup};

  .medicationCardWrap {
    width: 100%;
  }

  .medOrProdWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .cardWrap {
    width: 100%;

    &.subMedication {
      padding-left: 12px;
    }
  }
`;

// src/shared/components/MedicationSearch/index.tsx
var import_jsx_runtime38 = require("react/jsx-runtime");
var PAGE_SIZE2 = 10;
var medMapper = (item) => ({
  medications: item.medications ?? [item],
  product: item.medications ? item : void 0
});
var pullNext2 = async (iterator, size) => {
  const items = [];
  while (items.length < size) {
    const { value, done } = await iterator.next();
    if (done) break;
    items.push(value);
  }
  return items;
};
var MedicationSearch = ({ medicationProvider, onAddPrescription, disableInputEventsTracking, short = false, searchPlaceholder }) => {
  const [searchQuery, setSearchQuery] = (0, import_react8.useState)("");
  const searchQueryRef = (0, import_react8.useRef)(searchQuery);
  (0, import_react8.useEffect)(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);
  const [dropdownDisplayed, setDropdownDisplayed] = (0, import_react8.useState)(false);
  const [pages, setPages] = (0, import_react8.useState)([]);
  const [showSpinner, setShowSpinner] = (0, import_react8.useState)(false);
  const [showNoMatchesPlaceholder, setShowNoMatchesPlaceholder] = (0, import_react8.useState)(false);
  const [focusedMedicationIndex, setFocusedMedicationIndex] = (0, import_react8.useState)(0);
  const [focusedSubMedicationIndex, setFocusedSubMedicationIndex] = (0, import_react8.useState)(0);
  const iteratorRef = (0, import_react8.useRef)(void 0);
  const resultRefs = (0, import_react8.useRef)([]);
  (0, import_react8.useEffect)(() => {
    setDropdownDisplayed(!!searchQuery);
  }, [searchQuery]);
  const resetSearch = () => {
    iteratorRef.current = void 0;
    setPages([]);
    setFocusedMedicationIndex(0);
    setFocusedSubMedicationIndex(0);
  };
  const runLoadMore = async () => {
    const iterator = iteratorRef.current;
    return iterator ? pullNext2(iterator, PAGE_SIZE2) : [];
  };
  const doSearch = async (q) => {
    iteratorRef.current = medicationProvider.findByLabel(q)[Symbol.asyncIterator]();
    setShowSpinner(true);
    const result = await runLoadMore();
    if (q !== searchQueryRef.current) return;
    setShowSpinner(false);
    setPages(result.map(medMapper));
    setShowNoMatchesPlaceholder(!result.length);
    setFocusedMedicationIndex(0);
    setFocusedSubMedicationIndex(0);
  };
  (0, import_react8.useEffect)(() => {
    const q = searchQuery.trim();
    setShowNoMatchesPlaceholder(false);
    if (q.length === 0) {
      resetSearch();
      setShowSpinner(false);
      return;
    }
    if (q.length < 3) {
      setShowSpinner(false);
      return;
    }
    const handle = setTimeout(() => {
      if (q === searchQueryRef.current) {
        doSearch(q).catch((error) => console.error("Error while searching medications:", error));
      }
    }, 100);
    return () => clearTimeout(handle);
  }, [searchQuery, medicationProvider]);
  const scrollToFocusedItem = (index) => {
    if (index >= 0 && resultRefs.current[index]) {
      resultRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };
  const handleKeyDown = (event) => {
    if (disableInputEventsTracking) return;
    const pageCount = pages.length;
    if (pageCount === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      let mi = focusedMedicationIndex;
      let si = focusedSubMedicationIndex + 1;
      if (si >= (pages[mi]?.medications.length ?? 0)) {
        si = 0;
        mi = (mi + 1) % pageCount;
      }
      setFocusedMedicationIndex(mi);
      setFocusedSubMedicationIndex(si);
      scrollToFocusedItem(mi);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      let mi = focusedMedicationIndex;
      let si = focusedSubMedicationIndex - 1;
      if (si < 0) {
        mi = (mi - 1 + pageCount) % pageCount;
        si = (pages[mi]?.medications.length ?? 1) - 1;
      }
      setFocusedMedicationIndex(mi);
      setFocusedSubMedicationIndex(si);
      scrollToFocusedItem(mi);
    } else if (event.key === "Enter" && focusedMedicationIndex >= 0 && focusedSubMedicationIndex >= 0) {
      event.preventDefault();
      const med = pages[focusedMedicationIndex]?.medications[focusedSubMedicationIndex];
      if (med) handleAddPrescription(med);
    }
  };
  const handleAddPrescription = async (med) => {
    const enriched = await medicationProvider.enrichForPrescription?.(med) ?? med;
    const alternatives = await medicationProvider.loadCheapAlternatives?.(med) ?? [];
    onAddPrescription(enriched, alternatives);
    setSearchQuery("");
  };
  const showSearchError = () => {
    const value = searchQuery?.trim();
    return !!value && value.length < 3;
  };
  const isFocused = (medicationIndex, subMedicationIndex) => focusedMedicationIndex === medicationIndex && focusedSubMedicationIndex === subMedicationIndex;
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_jsx_runtime38.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(StyledMedicationSearch, { className: `StyledMedicationSearch ${LIBRARY_ROOT_CLASS}`, onKeyDown: handleKeyDown, children: [
    /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(StyledMedicationSearchInput, { className: "StyledMedicationSearchInput", $dropdownDisplayed: dropdownDisplayed, $error: showSearchError(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("p", { children: [
        t("medication.search.label"),
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(StyledLabel, { className: "StyledLabel", $error: showSearchError(), htmlFor: "searchMedications", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          "input",
          {
            id: "searchMedications",
            "aria-label": t("medication.search.label"),
            type: "text",
            placeholder: searchPlaceholder ?? t("medication.search.label"),
            autoComplete: "off",
            autoCapitalize: "off",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SearchIcn, {})
      ] }),
      showSearchError() && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("p", { className: "error", children: t("medication.search.errorMessage") })
    ] }),
    showSpinner && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "spinner", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SpinnerIcn, { size: 32, pathFill: cp.iconInfo }) }),
    pages.length !== 0 && dropdownDisplayed && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(StyledMedicationSearchDropdown, { className: "medicationSearchDropdown", children: [
      pages.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        "div",
        {
          ref: (el) => {
            resultRefs.current[i] = el;
          },
          className: "medOrProdWrap",
          children: entry.product ? /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_jsx_runtime38.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(MedicationProductTitle, { productTitle: entry.product.title }),
            entry.medications.map((smed, j) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: `cardWrap subMedication${isFocused(i, j) ? " focused" : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              MedicationCard,
              {
                medication: smed,
                handleAddPrescription,
                id: `result-${i}-${j}`,
                focused: isFocused(i, j),
                subMedication: true,
                short
              }
            ) }, j))
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: `cardWrap${isFocused(i, 0) ? " focused" : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            MedicationCard,
            {
              medication: entry.medications[0],
              handleAddPrescription,
              id: `result-${i}`,
              focused: isFocused(i, 0),
              subMedication: false,
              short
            }
          ) })
        },
        i
      )),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        InfiniteScroll,
        {
          threshold: 50,
          loadMore: () => runLoadMore().then((result) => {
            if (result.length) setPages((prev) => [...prev, ...result.map(medMapper)]);
          })
        }
      )
    ] }),
    showNoMatchesPlaceholder && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "placeholder", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("p", { children: t("medication.search.noMatchingPlaceholder") }) })
  ] }) });
};

// src/shared/components/PrescriptionModal/index.tsx
var import_react15 = require("react");
var import_medication_sdk3 = require("@icure/medication-sdk");

// src/internal/utils/dosage-helpers.ts
var suffixPrefixOverlap = (a, b) => {
  const aTrim = a.replace(/\s+$/, "");
  const max = Math.min(aTrim.length, b.length);
  for (let k = max; k > 0; k--) {
    if (aTrim.slice(-k).toLowerCase() === b.slice(0, k).toLowerCase()) return k;
  }
  return 0;
};

// src/internal/utils/prescription-duration-helpers.ts
var getDurationTimeUnits = () => [
  {
    value: "DAY" /* DAY */,
    label: t("prescriptionDurationHelper.durationUnits.day")
  },
  {
    value: "WEEK" /* WEEK */,
    label: t("prescriptionDurationHelper.durationUnits.week")
  }
];
var getPeriodicityTimeUnits = () => [
  {
    value: "0" /* NONE */,
    label: t("prescriptionDurationHelper.periodicityUnits.none")
  },
  {
    value: "7" /* WEEK */,
    label: t("prescriptionDurationHelper.periodicityUnits.week")
  },
  {
    value: "14" /* TWO_WEEKS */,
    label: t("prescriptionDurationHelper.periodicityUnits.twoWeeks")
  },
  {
    value: "21" /* THREE_WEEKS */,
    label: t("prescriptionDurationHelper.periodicityUnits.threeWeeks")
  },
  {
    value: "1" /* NUMBER_OF_DAYS */,
    label: t("prescriptionDurationHelper.periodicityUnits.numberOfDays")
  }
];
var getDurationInDays = (timeUnit, value) => {
  if (timeUnit === "DAY" /* DAY */) {
    return value;
  } else if (timeUnit === "WEEK" /* WEEK */) {
    return value * 7;
  }
  throw new Error(`Invalid time unit: ${timeUnit}`);
};
var getDurationFromDays = (numberOfDays) => {
  if (numberOfDays % 7 === 0) {
    return {
      duration: numberOfDays / 7,
      durationTimeUnit: "WEEK" /* WEEK */
    };
  } else {
    return {
      duration: numberOfDays,
      durationTimeUnit: "DAY" /* DAY */
    };
  }
};

// src/internal/utils/visibility-helpers.ts
function getPractitionerVisibilityOptions() {
  return [
    {
      value: "open",
      label: t("prescriptionVisibilityHelper.practitionerVisibility.open")
    },
    {
      value: "locked",
      label: t("prescriptionVisibilityHelper.practitionerVisibility.locked")
    },
    {
      value: "gmd_prescriber",
      label: t("prescriptionVisibilityHelper.practitionerVisibility.gmd_prescriber")
    }
  ];
}
function getPharmacistVisibilityOptions() {
  return [
    {
      value: null,
      label: t("prescriptionVisibilityHelper.pharmacistVisibility.null")
    },
    {
      value: "locked",
      label: t("prescriptionVisibilityHelper.pharmacistVisibility.locked")
    }
  ];
}

// src/internal/components/form-elements/SelectInput/index.tsx
var import_react9 = require("react");

// src/internal/components/form-elements/SelectInput/styles.ts
var import_styled_components25 = __toESM(require("styled-components"));
var StyledSelectInputLabel = import_styled_components25.default.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components25.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components25.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledSelectInput = import_styled_components25.default.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledSelectDropdown = import_styled_components25.default.select`
  ${inputCommonStyles};

  ${({ $error }) => !!$error && import_styled_components25.css`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && import_styled_components25.css`
      ${inputCommonStyles_disabled}
    `};
`;

// src/internal/components/form-elements/SelectInput/index.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
var SelectInput = (0, import_react9.forwardRef)(({ label, id, required, disabled, options, value, onChange, errorMessage, ...rest }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(StyledSelectInput, { className: "StyledSelectInput", children: [
  /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(StyledSelectInputLabel, { className: "StyledSelectInputLabel", htmlFor: id, $required: required, $error: !!errorMessage, children: [
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { "aria-hidden": "true", children: "*" }),
    label
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    StyledSelectDropdown,
    {
      className: "StyledSelectDropdown",
      ref,
      id,
      name: id,
      value,
      onChange,
      disabled,
      "aria-required": required || void 0,
      "aria-invalid": !!errorMessage || void 0,
      "aria-describedby": errorMessage ? `${id}-error` : void 0,
      ...rest,
      children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("option", { value: option.value ?? "", children: option.label }, option.value ?? ""))
    }
  ),
  !!errorMessage && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("p", { id: `${id}-error`, className: "error", children: errorMessage })
] }));

// src/internal/components/form-elements/RadioInput/index.tsx
var import_react10 = require("react");

// src/internal/components/form-elements/RadioInput/styles.ts
var import_styled_components26 = __toESM(require("styled-components"));
var StyledRadioGroupLabel = import_styled_components26.default.p`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components26.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components26.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledRadioButtonToggleStuffing = import_styled_components26.default.span`
  display: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${cp.colorPrimary};
`;
var StyledRadioButtonToggle = import_styled_components26.default.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${cp.colorBorderControl};
  background: ${cp.colorSurface};

  ${({ $error }) => !!$error && import_styled_components26.css`
      border-color: ${cp.colorCritical};

      &:hover {
        box-shadow: 0 0 0 2px ${translucent(cp.colorCritical, 20)};
      }

      ${StyledRadioButtonToggleStuffing} {
        background: ${cp.colorCritical};
      }
    `}
`;
var StyledRadioButtonLabel = import_styled_components26.default.span`
  ${labelCommonStyles};

  ${({ $error }) => !!$error && import_styled_components26.css`
      ${labelCommonStyles_error}
    `}

  width: auto;
  font-weight: 400;
`;
var StyledRadioButton = import_styled_components26.default.label`
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  ${targetSize("min-height")};
  cursor: pointer;

  &:hover {
    ${StyledRadioButtonToggle} {
      box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
      border-color: ${cp.colorPrimary};
    }
  }

  /* Visually hidden but still focusable and announced; the whole label is the target. */
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;

    &:checked + ${StyledRadioButtonToggle} {
      border-color: ${cp.colorPrimary};

      ${StyledRadioButtonToggleStuffing} {
        display: flex;
      }
    }

    &:focus-visible + ${StyledRadioButtonToggle} {
      outline: 2px solid ${cp.colorFocusRing};
      outline-offset: 2px;
    }
  }

  ${({ $error }) => !!$error && import_styled_components26.css`
      &:hover {
        ${StyledRadioButtonToggle} {
          box-shadow: 0 0 0 2px ${translucent(cp.colorCritical, 20)};
          border-color: ${cp.colorCritical};
        }
      }

      input {
        &:checked + ${StyledRadioButtonToggle} {
          border-color: ${cp.colorCritical};

          ${StyledRadioButtonToggleStuffing} {
            display: flex;
          }
        }
      }
    `}
`;
var StyledRadioInput = import_styled_components26.default.div`
  ${fieldCommonStyles};

  .radioBtnsGroup {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 18px;
  }

  .error {
    ${errorMessageCommonStyles}
  }
`;

// src/internal/components/form-elements/RadioInput/index.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
var RadioInput = (0, import_react10.forwardRef)(({ label, name, options, required, errorMessage, value, onChange }, ref) => {
  const groupLabelId = (0, import_react10.useId)();
  const errorId = (0, import_react10.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(StyledRadioInput, { className: "StyledRadioInput", children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(StyledRadioGroupLabel, { id: groupLabelId, className: "StyledRadioGroupLabel", $required: required, $error: !!errorMessage, children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { "aria-hidden": "true", children: "*" }),
      label
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "div",
      {
        className: "radioBtnsGroup",
        role: "radiogroup",
        "aria-labelledby": groupLabelId,
        "aria-required": required || void 0,
        "aria-invalid": !!errorMessage || void 0,
        "aria-describedby": errorMessage ? errorId : void 0,
        children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(StyledRadioButton, { className: "StyledRadioButton", htmlFor: option.id, $error: !!errorMessage, children: [
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            "input",
            {
              id: option.id,
              name,
              type: "radio",
              checked: value === option.value,
              value: String(option.value),
              required,
              onChange: () => onChange?.(option.value),
              ref
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(StyledRadioButtonToggle, { className: "StyledRadioButtonToggle", $error: !!errorMessage, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(StyledRadioButtonToggleStuffing, { className: "StyledRadioButtonToggleStuffing" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(StyledRadioButtonLabel, { $error: !!errorMessage, children: option.label })
        ] }, option.id))
      }
    ),
    !!errorMessage && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("p", { id: errorId, className: "error", children: errorMessage })
  ] });
});
RadioInput.displayName = "RadioInput";

// src/internal/components/form-elements/ToggleSwitch/index.tsx
var import_react11 = require("react");

// src/internal/components/form-elements/ToggleSwitch/styles.ts
var import_styled_components27 = __toESM(require("styled-components"));
var StyledSwitch = import_styled_components27.default.div`
  ${fieldCommonStyles};

  .toggleSwitchLabel {
    ${labelCommonStyles};
  }

  .toggleWrapper {
    display: flex;
    ${targetSize("min-height")};
    padding: 4px 0;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    .toggle {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      width: 46px;
      height: 24px;

      .slider {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${cp.colorBorderStrong};
        border: 1px solid transparent;
        transition: 0.4s;
        border-radius: ${cp.radiusPill};

        &::before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: ${cp.colorSurface};
          transition: 0.4s;
          border-radius: 50%;
        }
      }

      input {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        ${targetSize("height", "24px")};
        margin: 0;
        opacity: 0;
        cursor: pointer;

        &:hover + .slider {
          border-color: ${cp.colorPrimary};
          box-shadow: 0 0 0 2px ${cp.colorFocusHalo};
        }

        &:checked + .slider {
          background-color: ${cp.colorPrimary};
        }

        &:focus-visible + .slider {
          outline: 2px solid ${cp.colorFocusRing};
          outline-offset: 2px;
        }

        &:checked + .slider::before {
          transform: translateX(20px);
        }
      }
    }

    .toggleSwitchText {
      ${labelCommonStyles};
      width: auto;
    }
  }
`;

// src/internal/components/form-elements/ToggleSwitch/index.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
var ToggleSwitch = (0, import_react11.forwardRef)(({ id, value, label, onChange, checked }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(StyledSwitch, { className: "StyledSwitch", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { className: "toggleSwitchLabel", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "toggleWrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("span", { className: "toggle", children: [
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("input", { id, name: id, type: "checkbox", role: "switch", checked, onChange, ref }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "slider", "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("label", { htmlFor: id, className: "toggleSwitchText", children: value })
    ] })
  ] });
});
ToggleSwitch.displayName = "ToggleSwitch";

// src/internal/components/form-elements/TextareaInput/index.tsx
var import_react12 = __toESM(require("react"));

// src/internal/components/form-elements/TextareaInput/styles.ts
var import_styled_components28 = __toESM(require("styled-components"));
var StyledTextareaInputLabel = import_styled_components28.default.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components28.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components28.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextareaInput = import_styled_components28.default.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledTextarea = import_styled_components28.default.textarea`
  ${inputCommonStyles};
  height: unset;

  ${({ $error }) => !!$error && import_styled_components28.css`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && import_styled_components28.css`
      ${inputCommonStyles_disabled}
    `};
`;

// src/internal/components/form-elements/TextareaInput/index.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
var TextareaInput = import_react12.default.forwardRef(({ label, id, required, disabled, errorMessage, ...rest }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(StyledTextareaInput, { className: "StyledTextareaInput", children: [
  /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(StyledTextareaInputLabel, { className: "StyledTextareaInputLabel", htmlFor: id, $required: required, $error: !!errorMessage, children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { "aria-hidden": "true", children: "*" }),
    label
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    StyledTextarea,
    {
      className: "StyledTextarea",
      placeholder: label,
      name: id,
      id,
      $disabled: disabled,
      $error: !!errorMessage,
      disabled,
      rows: 3,
      "aria-required": required || void 0,
      "aria-invalid": !!errorMessage || void 0,
      "aria-describedby": errorMessage && id ? `${id}-error` : void 0,
      ref,
      ...rest
    }
  ),
  errorMessage && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("p", { id: id ? `${id}-error` : void 0, className: "error", children: errorMessage })
] }));

// src/shared/components/PrescriptionModal/styles.ts
var import_styled_components29 = __toESM(require("styled-components"));
var StyledPrescriptionModal = import_styled_components29.default.div`
  ${libraryRoot}
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background-color: ${cp.colorOverlay};
  z-index: 1020;

  .content {
    width: 900px;
    height: 100%;
    max-height: 100%;
    border: none;
    padding: 0;
    margin: 0 0 0 auto;

    ${responsiveMediaQueries.down(displayResolution.l)`
      width: 100%;
      border-radius: 0.2em;
  `};
  }

  .addMedicationForm {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    &__header {
      display: flex;
      padding: 20px 24px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      border-bottom: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};

      ${responsiveMediaQueries.down(displayResolution.l)`
      padding: 20px 16px;
  `};

      h3 {
        color: ${cp.colorText};
        font-size: ${cp.fontSizeLg};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      &__closeIcn {
        ${targetSize("width")};
        ${targetSize("height")};
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: ${cp.colorSurface};
        border-radius: ${cp.radiusXs};

        &:hover {
          background-color: ${cp.colorSurfaceDisabled};
        }
      }
    }

    &__body {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      flex: 1 0 0;
      gap: 12px;
      background-color: ${cp.colorSurfaceSunken};

      ${responsiveMediaQueries.down(displayResolution.l)`
       padding: 16px;
      `};

      ${responsiveMediaQueries.down(displayResolution.s)`
        padding: 8px;
      `};

      &__content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
        border-radius: ${cp.radiusXl};
        border: 1px solid ${cp.colorBorder};
        background: ${cp.colorSurface};
        padding: 24px;
        gap: 12px;

        ${responsiveMediaQueries.down(displayResolution.l)`
           padding: 18px;
        `};

        &__inputsGroup {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 4px;
          align-self: stretch;

          ${responsiveMediaQueries.down(displayResolution.s)`
          flex-direction: column;
            gap: 12px;
        `};
        }
      }

      &__extraFieldsPreview {
        display: flex;
        width: 100%;
        padding: 12px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;

        border-radius: ${cp.radiusXl};
        border: 1px solid ${cp.colorBorder};
        background: ${cp.colorSurface};
        box-shadow: ${cp.shadowSection};

        p {
          color: ${cp.colorTextSubtle};
          font-size: ${cp.fontSizeMd};
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 169.231% */
        }
      }
    }

    &__footer {
      display: flex;
      padding: 20px 24px;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
      border-top: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};
    }

    @keyframes zoom {
      from {
        transform: scale(0.95);
      }
      to {
        transform: scale(1);
      }
    }

    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
var StyledDosageInput = import_styled_components29.default.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .posologyEditorSlot {
    width: 100%;
  }

  .suggestionsDropdown[hidden] {
    display: none;
  }

  .suggestionsDropdown {
    position: absolute;
    z-index: 1;
    top: calc(100% + 2px);

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2px;
    gap: 2px;

    border-radius: ${cp.radiusMd};
    background: ${cp.colorSurface};
    box-shadow: ${cp.shadowPopup};
  }
`;
var suggestionItemOnAction = import_styled_components29.css`
  background: ${cp.colorSurfaceAccent};
  color: ${cp.colorPrimary} !important;
`;
var StyledSuggestionItem = import_styled_components29.default.li`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: center;
  align-self: stretch;

  border-radius: ${cp.radiusXs};
  background: ${cp.colorSurface};

  color: ${cp.colorText};
  font-family: ${cp.fontFamilyControl};
  font-size: ${cp.fontSizeMd};
  font-weight: 400;
  line-height: 22px;

  button {
    width: 100%;
    padding: 8px;
    ${targetSize("min-height")};
    text-align: left;
    background: none;
    cursor: pointer;
  }

  &:hover {
    ${suggestionItemOnAction}
  }

  ${({ $focused }) => !!$focused && import_styled_components29.css`
      ${suggestionItemOnAction}
    `};

  ${({ $disableHover }) => !!$disableHover && import_styled_components29.css`
      &:hover {
        background: none;
      }
    `};

  ${({ $disableHover, $focused }) => !!$disableHover && $focused && import_styled_components29.css`
      &:hover {
        ${suggestionItemOnAction}
      }
    `};
`;

// src/shared/components/PrescriptionModal/index.tsx
var import_react_hook_form2 = require("react-hook-form");

// src/internal/components/medication-elements/CheapAlternatives/index.tsx
var import_react13 = require("react");

// src/internal/components/medication-elements/CheapAlternatives/styles.ts
var import_styled_components30 = __toESM(require("styled-components"));
var StyledCheapAlternatives = import_styled_components30.default.div`
  margin: 8px 0;
  border: 1px solid ${cp.colorBorderAccent};
  border-radius: ${cp.radiusMd};
  overflow: hidden;
`;
var StyledCheapAlternativesHeader = import_styled_components30.default.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${targetSize("min-height")};
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  text-align: left;
  background: ${cp.colorSurfaceAccentSubtle};
  color: ${cp.colorLink};
  font-family: inherit;
  font-size: ${cp.fontSizeSm};
`;
var StyledCheapAlternativesHeaderContent = import_styled_components30.default.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;
var StyledCheapAlternativesToggle = import_styled_components30.default.span`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => $expanded ? "90deg" : "0deg"});
`;
var StyledCheapAlternativesContent = import_styled_components30.default.ul`
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;
var StyledCheapAlternativesItem = import_styled_components30.default.li`
  button {
    width: 100%;
    ${targetSize("min-height")};
    text-align: left;
    padding: 6px 12px;
    border: none;
    background: none;
    color: ${cp.colorText};
    cursor: pointer;
    font-family: inherit;
    font-size: ${cp.fontSizeSm};

    &:hover {
      background: ${cp.colorSurfaceAccentSubtle};
    }
  }
`;

// src/internal/components/medication-elements/CheapAlternatives/index.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
var CheapAlternatives = ({ sdk, medications, onSelectMedication }) => {
  const [isExpanded, setIsExpanded] = (0, import_react13.useState)(false);
  const [isCheap, setIsCheap] = (0, import_react13.useState)(false);
  if (!medications || medications.length === 0) {
    return null;
  }
  const onMedicationClick = async (medication) => {
    setIsCheap(true);
    const vmpGroupCode = medication.regulatory?.be?.vmp?.vmpGroup?.code;
    const vmpGroup = vmpGroupCode ? await loadVmpGroup(sdk, vmpGroupCode) : void 0;
    onSelectMedication({ ...medication, regulatory: { ...medication.regulatory, be: { ...medication.regulatory?.be, vmpGroup } } });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(StyledCheapAlternatives, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(StyledCheapAlternativesHeader, { type: "button", "aria-expanded": isExpanded, onClick: () => setIsExpanded((v) => !v), children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(StyledCheapAlternativesHeaderContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(WarningIcn, {}),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children: isCheap ? t("medication.drugInfographic.otherCheapAlternativesMessage") : t("medication.drugInfographic.cheapAlternativesMessage") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(StyledCheapAlternativesToggle, { "aria-hidden": "true", $expanded: isExpanded, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(ChevronIcn, {}) })
    ] }),
    isExpanded && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(StyledCheapAlternativesContent, { children: medications.map((medication, index) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(StyledCheapAlternativesItem, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("button", { type: "button", onClick: () => onMedicationClick(medication), children: medication.title }) }, medication.id ?? index)) })
  ] });
};

// src/internal/components/medication-elements/StandardDosages/index.tsx
var import_react14 = require("react");
var import_medication_sdk = require("@icure/medication-sdk");

// src/internal/components/medication-elements/StandardDosages/styles.ts
var import_styled_components31 = __toESM(require("styled-components"));
var StyledStandardDosages = import_styled_components31.default.div`
  margin: 8px 0;
  border: 1px solid ${cp.colorBorderAccent};
  border-radius: ${cp.radiusMd};
  overflow: hidden;
`;
var StyledStandardDosagesHeader = import_styled_components31.default.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${targetSize("min-height")};
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  text-align: left;
  background: ${cp.colorSurfaceAccentSubtle};
  color: ${cp.colorLink};
  font-family: inherit;
  font-size: ${cp.fontSizeSm};
`;
var StyledStandardDosagesHeaderContent = import_styled_components31.default.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;
var StyledStandardDosagesToggle = import_styled_components31.default.span`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => $expanded ? "90deg" : "0deg"});
`;
var StyledStandardDosagesContent = import_styled_components31.default.ul`
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;
var StyledStandardDosagesItem = import_styled_components31.default.li`
  button {
    width: 100%;
    ${targetSize("min-height")};
    text-align: left;
    padding: 6px 12px;
    border: none;
    background: none;
    color: ${cp.colorText};
    cursor: pointer;
    font-family: inherit;
    font-size: ${cp.fontSizeSm};

    &:hover {
      background: ${cp.colorSurfaceAccentSubtle};
    }
  }
`;

// src/internal/components/medication-elements/StandardDosages/index.tsx
var import_jsx_runtime44 = require("react/jsx-runtime");
var StandardDosages = ({ dosages, language, onSelectDosage }) => {
  const [isExpanded, setIsExpanded] = (0, import_react14.useState)(false);
  if (!dosages || dosages.length === 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(StyledStandardDosages, { className: "StyledStandardDosages", children: [
    /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(StyledStandardDosagesHeader, { type: "button", "aria-expanded": isExpanded, onClick: () => setIsExpanded((v) => !v), children: [
      /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(StyledStandardDosagesHeaderContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(WarningIcn, {}),
        t("medication.drugInfographic.standardDosagesMessage")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(StyledStandardDosagesToggle, { "aria-hidden": "true", $expanded: isExpanded, children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(ChevronIcn, {}) })
    ] }),
    isExpanded && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(StyledStandardDosagesContent, { children: dosages.map((dosage, index) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(StyledStandardDosagesItem, { children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("button", { type: "button", onClick: () => onSelectDosage(dosage), children: (0, import_medication_sdk.marshal)(dosage, language) }) }, index)) })
  ] });
};

// src/internal/services/prescription/create-prescription.ts
var import_be_fhc_lite_api3 = require("@icure/be-fhc-lite-api");
var import_uuid = require("uuid");
var import_medication_sdk2 = require("@icure/medication-sdk");
var createRegimenItemsFromDosage = (dosage) => {
  try {
    const { parsePosology } = (0, import_medication_sdk2.makeParser)("fr");
    const parsedPosologies = dosage ? parsePosology(dosage) : void 0;
    if (!parsedPosologies || parsedPosologies.length === 0) {
      return void 0;
    }
    const errors = [];
    parsedPosologies.forEach((posology) => {
      if ((posology.period?.temporalUnit ?? "day") === "day") {
        const dayMoments = posology.moments.filter((m) => m.periodOfTime || m.fullTime);
        if (dayMoments.length > 0 && posology.frequency && posology.frequency != dayMoments.length) {
          errors.push(`Inconsistent posology: frequency ${posology.frequency}/day does not match the number of day periods specified`);
        }
      } else if (posology.period?.temporalUnit === "week") {
        if (posology.moments.filter((m) => m.dayOfWeek).length > 0 && posology.frequency && posology.frequency != posology.moments.length) {
          errors.push(`Inconsistent posology: frequency ${posology.frequency}/week does not match number of days specified`);
        }
        if (posology.moments.filter((m) => m.periodOfTime || m.fullTime).length > 1) {
          errors.push(`Inconsistent posology: for weekly posologies, only one time of day specification is allowed`);
        }
      }
    });
    return errors.length > 0 ? void 0 : parsedPosologies.flatMap((posology) => {
      if ((posology.period?.temporalUnit ?? "day") === "day") {
        const dailyRegiment = [...new Array(Math.max((posology.frequency ?? 1) - posology.moments.filter((m) => m.periodOfTime || m.fullTime).length, 0))].map(() => {
          return new import_be_fhc_lite_api3.RegimenItem({
            administratedQuantity: {
              quantity: posology.regimenQuantity?.quantity ?? 1,
              unit: posology.regimenQuantity?.galenic ?? "unit"
            }
          });
        }).concat(
          posology.moments.filter((m) => m.periodOfTime).map((moment) => {
            return new import_be_fhc_lite_api3.RegimenItem({
              administratedQuantity: {
                quantity: posology.regimenQuantity?.quantity ?? 1,
                unit: posology.regimenQuantity?.galenic ?? "unit"
              },
              dayPeriod: {
                type: "CD-PERIOD",
                code: moment.periodOfTime
              }
            });
          })
        ).concat(
          posology.moments.filter((m) => m.fullTime).map((moment) => {
            return new import_be_fhc_lite_api3.RegimenItem({
              administratedQuantity: {
                quantity: posology.regimenQuantity?.quantity ?? 1,
                unit: posology.regimenQuantity?.galenic ?? "unit"
              },
              timeOfDay: parseInt(moment.fullTime?.replace(":", "") ?? "0000")
            });
          })
        );
        const weekMoments = posology.moments.filter((m) => m.dayOfWeek);
        return weekMoments.length > 0 ? dailyRegiment.flatMap(
          (item) => weekMoments.map((moment) => {
            return new import_be_fhc_lite_api3.RegimenItem({
              ...item,
              weekday: {
                weekDay: { type: "CD-WEEKDAY", code: moment.dayOfWeek }
              }
            });
          })
        ) : dailyRegiment;
      } else if ((posology.frequency ?? 1) === posology.moments.length) {
        const periodOfTimeItem = posology.moments.find((m) => m.periodOfTime);
        const timeOfDayItem = posology.moments.find((m) => m.fullTime);
        return posology.moments.filter((m) => m.dayOfWeek).map((moment) => {
          return new import_be_fhc_lite_api3.RegimenItem({
            administratedQuantity: {
              quantity: posology.regimenQuantity?.quantity ?? 1,
              unit: posology.regimenQuantity?.galenic ?? "unit"
            },
            weekday: {
              weekDay: { type: "CD-WEEKDAY", code: moment.dayOfWeek }
            },
            dayPeriod: periodOfTimeItem ? {
              type: "CD-PERIOD",
              code: periodOfTimeItem.periodOfTime
            } : void 0,
            timeOfDay: timeOfDayItem ? parseInt(timeOfDayItem.fullTime?.replace(":", "") ?? "0000") : void 0
          });
        });
      } else {
        return [];
      }
    });
  } catch (e) {
    console.error("Error parsing dosage:", e instanceof Error ? e.name : "unknown");
    return void 0;
  }
};
var regimenOf = (formValues) => formValues.regimen !== void 0 ? formValues.regimen.length > 0 ? formValues.regimen : void 0 : createRegimenItemsFromDosage(formValues.dosage);
var createSinglePrescribedMedication = (prescribedMedication, formValues) => {
  return [
    {
      ...prescribedMedication,
      medication: new import_be_fhc_lite_api3.Medication({
        ...prescribedMedication.medication,
        beginMoment: offsetDate(
          parseInt(formValues.treatmentStartDate?.replace(/-/g, "")),
          formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit) * (formValues.periodicityDaysNumber ?? 1) : 0
        ),
        endMoment: offsetDate(
          parseInt(formValues.executableUntil?.replace(/-/g, "")),
          formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit) * (formValues.periodicityDaysNumber ?? 1) : 0
        ),
        duration: new import_be_fhc_lite_api3.Duration({
          unit: createFhcCode("CD-TIMEUNIT", "D"),
          value: getDurationInDays(formValues.durationTimeUnit, formValues.duration)
        }),
        regimen: regimenOf(formValues),
        instructionForPatient: formValues.dosage,
        recipeInstructionForPatient: formValues.recipeInstructionForPatient,
        instructionsForReimbursement: formValues.instructionsForReimbursement,
        substitutionAllowed: formValues.substitutionAllowed
      }),
      prescriberVisibility: formValues.prescriberVisibility,
      pharmacistVisibility: formValues.pharmacistVisibility
    }
  ];
};
var determineMedicationData = (medicationToPrescribe) => {
  const be = medicationToPrescribe?.regulatory?.be;
  if (be?.ampId && !be.genericPrescriptionRequired && be.cnk) {
    return {
      medicinalProduct: new import_be_fhc_lite_api3.Medicinalproduct({
        samId: be.dmppProductId,
        intendedcds: [createFhcCode("CD-DRUG-CNK", be.cnk)],
        intendedname: be.intendedName
      })
    };
  } else if (be?.vmpGroupId) {
    return {
      substanceProduct: new import_be_fhc_lite_api3.Substanceproduct({
        samId: be.vmpGroupId,
        intendedcds: [createFhcCode("CD_VMPGROUP", be.vmpGroupId)],
        intendedname: be.vmpTitle ?? medicationToPrescribe.title
      })
    };
  } else {
    return { compoundPrescription: medicationToPrescribe.title };
  }
};
var createMedicationForPrescription = (formValues, medicationToPrescribe, idx) => {
  const medicationData = determineMedicationData(medicationToPrescribe);
  return new import_be_fhc_lite_api3.Medication({
    ...medicationData,
    beginMoment: offsetDate(
      parseInt(formValues.treatmentStartDate?.replace(/-/g, "")),
      formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit ?? "1") * (formValues.periodicityDaysNumber ?? 1) * idx : 0
    ),
    endMoment: offsetDate(
      parseInt(formValues.executableUntil?.replace(/-/g, "")),
      formValues.periodicityTimeUnit ? parseInt(formValues.periodicityTimeUnit ?? "1") * (formValues.periodicityDaysNumber ?? 1) * idx : 0
    ),
    duration: new import_be_fhc_lite_api3.Duration({
      unit: createFhcCode("CD-TIMEUNIT", "D"),
      value: getDurationInDays(formValues.durationTimeUnit, formValues.duration)
    }),
    regimen: regimenOf(formValues),
    instructionForPatient: formValues.dosage,
    recipeInstructionForPatient: formValues.recipeInstructionForPatient,
    instructionsForReimbursement: formValues.instructionsForReimbursement,
    substitutionAllowed: formValues.substitutionAllowed
  });
};
var createMultiplePrescribedMedications = (formValues, medicationToPrescribe) => {
  const prescriptionsNumber = formValues.prescriptionsNumber ?? 1;
  return Array.from({ length: prescriptionsNumber }, (_, idx) => {
    return {
      uuid: (0, import_uuid.v4)(),
      medication: createMedicationForPrescription(formValues, medicationToPrescribe, idx),
      prescriberVisibility: formValues.prescriberVisibility,
      pharmacistVisibility: formValues.pharmacistVisibility
    };
  });
};
var createPrescribedMedication = (formValues, prescribedMedication, medicationToPrescribe) => {
  if (prescribedMedication) {
    return createSinglePrescribedMedication(prescribedMedication, formValues);
  } else if (medicationToPrescribe) {
    return createMultiplePrescribedMedications(formValues, medicationToPrescribe);
  } else {
    return [];
  }
};
var createPosologyFromStandardDosage = (group, context) => {
  if (!group?.standardDosage || group?.standardDosage.length === 0) {
    return [];
  }
  const filteredDosages = group.standardDosage.filter((dosage) => {
    if (dosage.targetGroup && context.ageInYears !== void 0) {
      const targetGroup = dosage.targetGroup;
      const age = context.ageInYears;
      if (targetGroup === "NEONATE" && age >= 1 / 12) return false;
      if (targetGroup === "PAEDIATRICS" && (age < 1 / 12 || age >= 12)) return false;
      if (targetGroup === "ADOLESCENT" && (age < 12 || age >= 18)) return false;
      if (targetGroup === "ADULT" && age < 18) return false;
    }
    if (dosage.kidneyFailureClass !== void 0 && context.renalFunctionMlPerMin !== void 0) {
      const clearance = context.renalFunctionMlPerMin;
      const kidneyClass = dosage.kidneyFailureClass;
      if (kidneyClass === 0 && clearance < 60) return false;
      if (kidneyClass === 1 && (clearance < 30 || clearance >= 60)) return false;
      if (kidneyClass === 2 && (clearance < 10 || clearance >= 30)) return false;
      if (kidneyClass === 3 && clearance >= 10) return false;
    }
    if (dosage.parameterBounds && dosage.parameterBounds.length > 0 && !dosage.parameterBounds.some((bound) => {
      if (bound.dosageParameter?.code?.toLowerCase() === "age" && context.ageInYears !== void 0) {
        const age = context.ageInYears;
        if (bound.lowerBound !== void 0 && age < bound.lowerBound) return false;
        if (bound.upperBound !== void 0 && age > bound.upperBound) return false;
        return true;
      } else if (bound.dosageParameter?.code?.toLowerCase() === "weight" && context.weightInKg !== void 0) {
        const weight = context.weightInKg;
        if (bound.lowerBound !== void 0 && weight < bound.lowerBound) return false;
        if (bound.upperBound !== void 0 && weight > bound.upperBound) return false;
        return true;
      } else {
        return false;
      }
    })) {
      return false;
    }
    return true;
  });
  return filteredDosages.flatMap((dosage) => {
    let quantity = dosage.quantity ?? 1;
    if (dosage.quantityDenominator) {
      quantity = quantity / dosage.quantityDenominator;
    }
    if (dosage.quantityMultiplicator && context.weightInKg) {
      if (dosage.quantityMultiplicator.toLowerCase().includes("weight") || dosage.quantityMultiplicator.toLowerCase().includes("kg")) {
        quantity = quantity * context.weightInKg;
      }
    }
    const frequency = dosage.administrationFrequencyQuantity ?? 1;
    const timeframeValue = dosage.administrationFrequencyTimeframe?.value ?? 1;
    const timeframeUnit = dosage.administrationFrequencyTimeframe?.unit ?? "D";
    const temporalUnit = timeframeUnit === "W" || timeframeUnit === "WK" || timeframeUnit.toLowerCase().includes("week") ? "week" : "day";
    const regimenItem = {
      regimenQuantity: {
        quantity: quantity * (group.singleAdministrationDose?.value ?? 1),
        galenic: group.singleAdministrationDose?.unit ?? "unit"
      },
      frequency,
      period: {
        timeframeValue,
        temporalUnit
      },
      moments: []
    };
    return [regimenItem];
  });
};

// src/shared/components/PrescriptionModal/index.tsx
var import_jsx_runtime45 = require("react/jsx-runtime");
var PrescriptionModal = ({
  sdk,
  medicationToPrescribe,
  prescriptionToModify,
  alternativeCheapMedications,
  standardDosageContext,
  onClose,
  onSubmit,
  modalMood,
  posologyEditor: PosologyEditor
}) => {
  const titleId = (0, import_react15.useId)();
  const suggestionsId = (0, import_react15.useId)();
  const [posologySuggestions, setPosologySuggestions] = (0, import_react15.useState)([]);
  const [focusedDosageIndex, setFocusedDosageIndex] = (0, import_react15.useState)(-1);
  const [disableHover, setDisableHover] = (0, import_react15.useState)(false);
  const [dosageFromSuggestion, setDosageFromSuggestion] = (0, import_react15.useState)("");
  const [medication, setMedication] = (0, import_react15.useState)(medicationToPrescribe);
  const [alternatives, setAlternatives] = (0, import_react15.useState)(alternativeCheapMedications ?? []);
  const resultRefs = (0, import_react15.useRef)([]);
  const defaultValues = {
    medicationTitle: trim(
      medicationToPrescribe?.title ?? prescriptionToModify?.medication?.medicinalProduct?.intendedname ?? prescriptionToModify?.medication?.substanceProduct?.intendedname ?? prescriptionToModify?.medication?.compoundPrescription ?? prescriptionToModify?.medication?.compoundPrescriptionV2?.text ?? ""
    ),
    dosage: prescriptionToModify?.medication?.instructionForPatient ?? "",
    // Only a host editor works on the structured regimen; the free-text editor parses it at submit time.
    regimen: PosologyEditor ? prescriptionToModify?.medication?.regimen ?? [] : void 0,
    duration: getDurationFromDays(prescriptionToModify?.medication?.duration?.value ?? 1).duration,
    durationTimeUnit: getDurationFromDays(prescriptionToModify?.medication?.duration?.value ?? 1).durationTimeUnit,
    treatmentStartDate: getTreatmentStartDate(prescriptionToModify),
    executableUntil: getExecutableUntilDate(prescriptionToModify),
    prescriptionsNumber: 1,
    substitutionAllowed: prescriptionToModify?.medication?.substitutionAllowed ?? false,
    showExtraFields: false,
    periodicityTimeUnit: getPeriodicityTimeUnits()[0].value,
    periodicityDaysNumber: 1,
    recipeInstructionForPatient: prescriptionToModify?.medication?.recipeInstructionForPatient ?? void 0,
    instructionsForReimbursement: prescriptionToModify?.medication?.instructionsForReimbursement ?? void 0,
    prescriberVisibility: prescriptionToModify?.prescriberVisibility ?? getPractitionerVisibilityOptions()[0]?.value,
    pharmacistVisibility: prescriptionToModify?.pharmacistVisibility ?? getPharmacistVisibilityOptions()[0]?.value
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors: prescriptionFormErrors }
  } = (0, import_react_hook_form2.useForm)({ defaultValues });
  const dosage = watch("dosage");
  const regimen = watch("regimen");
  const prescriptionsNumber = watch("prescriptionsNumber");
  const periodicityTimeUnit = watch("periodicityTimeUnit");
  const showExtraFields = watch("showExtraFields");
  const recipeInstructionForPatient = watch("recipeInstructionForPatient");
  const instructionsForReimbursement = watch("instructionsForReimbursement");
  const prescriberVisibility = watch("prescriberVisibility");
  const pharmacistVisibility = watch("pharmacistVisibility");
  const language = cardinalLanguage.getLanguage();
  const { completePosology: completeDosage } = (0, import_medication_sdk3.makeParser)(language);
  const dosageRef = (0, import_react15.useRef)(dosage);
  (0, import_react15.useEffect)(() => {
    if (dosage !== void 0) {
      dosageRef.current = dosage;
    }
  }, [dosage]);
  (0, import_react15.useEffect)(() => {
    const dosageWhenCalled = dosage;
    setTimeout(() => {
      if (dosageWhenCalled && dosageWhenCalled === dosageRef.current && dosageWhenCalled != dosageFromSuggestion) {
        setPosologySuggestions(completeDosage(dosageWhenCalled));
      }
    }, 100);
  }, [dosage]);
  const standardDosages = (0, import_react15.useMemo)(
    () => medication?.regulatory?.be?.vmpGroup ? createPosologyFromStandardDosage(medication.regulatory.be.vmpGroup, standardDosageContext ?? {}) : [],
    [medication, standardDosageContext]
  );
  const onSelectStandardDosage = (item) => {
    setValue("dosage", (0, import_medication_sdk3.marshal)(item, language), { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };
  const onSelectAlternativeMedication = (selected) => {
    setAlternatives((prev) => {
      const withoutSelected = prev.filter((m) => m !== selected);
      return medication ? [medication, ...withoutSelected] : withoutSelected;
    });
    setMedication(selected);
    setValue("medicationTitle", trim(selected.title), { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };
  const handleModalClose = () => {
    onClose();
    reset();
  };
  const handleFormSubmit = (data) => {
    const prescribedMedications = createPrescribedMedication(data, prescriptionToModify, medication);
    onSubmit(prescribedMedications);
    handleModalClose();
  };
  const onPosologyEditorChange = (value) => {
    setValue("regimen", value.regimen, { shouldDirty: true });
    setValue("dosage", value.text, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };
  const handleKeyDown = (event) => {
    const length = posologySuggestions.length;
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      event.stopPropagation();
      if (length && focusedDosageIndex >= 0 && focusedDosageIndex < length) {
        setDisableHover(false);
        validateSuggestion(posologySuggestions[focusedDosageIndex]);
      }
      return;
    }
    if (!length) return;
    const defaultActions = () => {
      event.preventDefault();
      setDisableHover(true);
    };
    if (event.key === "ArrowDown") {
      defaultActions();
      setFocusedDosageIndex((prev) => (prev + 1) % length);
      scrollToFocusedItem((focusedDosageIndex + 1) % length);
    } else if (event.key === "ArrowUp") {
      defaultActions();
      setFocusedDosageIndex((prev) => (prev - 1 + length) % length);
      scrollToFocusedItem((focusedDosageIndex - 1 + length) % length);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setPosologySuggestions([]);
      setFocusedDosageIndex(-1);
    }
  };
  const scrollToFocusedItem = (index) => {
    if (index >= 0 && resultRefs.current[index]) {
      resultRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };
  const handleMouseMove = () => {
    setDisableHover(false);
  };
  const validateSuggestion = (suggestion) => {
    if (suggestion) {
      const current = dosageRef.current ?? "";
      const overlap = suffixPrefixOverlap(current, suggestion);
      const merged = ((overlap > 0 ? current.replace(/\s+$/, "") : current.trimEnd() + (current ? " " : "")) + suggestion.slice(overlap)).replace(/\s*\/\s*/g, " / ").replace(/\s{2,}/g, " ").trim();
      setValue("dosage", merged, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      setDosageFromSuggestion(merged);
      setPosologySuggestions([]);
      setFocusedDosageIndex(1);
    }
  };
  const suggestionsDisplayed = posologySuggestions.length !== 0;
  const activeSuggestionId = suggestionsDisplayed && focusedDosageIndex >= 0 && focusedDosageIndex < posologySuggestions.length ? `posology-${focusedDosageIndex}` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(StyledPrescriptionModal, { className: `StyledPrescriptionModal ${LIBRARY_ROOT_CLASS}`, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "content", role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("form", { id: "prescriptionForm", className: "addMedicationForm", onSubmit: handleSubmit(handleFormSubmit), autoComplete: "off", children: [
    /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("h3", { id: titleId, children: modalMood === "create" ? t("prescription.createTitle") : t("prescription.modifyTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("button", { className: "addMedicationForm__header__closeIcn", onClick: handleModalClose, type: "reset", "aria-label": t("prescription.closeDialog"), children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(CloseIcn, {}) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body", onKeyDown: handleKeyDown, children: [
      medication && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__content", children: [
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(MedicationCard, { medication, handleAddPrescription: () => {
        }, id: "modal-medication-card", readOnly: true }),
        alternatives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(CheapAlternatives, { sdk, medications: alternatives, onSelectMedication: onSelectAlternativeMedication })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__content", children: [
        !medication && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          TextInput,
          {
            label: t("prescription.form.medicationTitle"),
            required: true,
            disabled: true,
            id: "medicationTitle",
            ...register("medicationTitle", {
              required: t("prescription.form.fieldRequired")
            }),
            errorMessage: prescriptionFormErrors["medicationTitle"]?.message
          }
        ),
        PosologyEditor ? /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          import_react_hook_form2.Controller,
          {
            name: "dosage",
            control,
            rules: { required: t("prescription.form.fieldRequired") },
            render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "posologyEditorSlot", ...{ [HOST_SLOT_ATTRIBUTE]: "" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                PosologyEditor,
                {
                  id: "dosage",
                  label: t("prescription.form.dosage"),
                  value: { regimen: regimen ?? [], text: field.value ?? "" },
                  context: { medication, prescriptionToModify, language, standardDosages, standardDosageContext },
                  onChange: onPosologyEditorChange,
                  errorMessage: prescriptionFormErrors["dosage"]?.message,
                  errorMessageId: "dosage-error"
                }
              ),
              prescriptionFormErrors["dosage"]?.message && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { id: "dosage-error", className: "error", children: prescriptionFormErrors["dosage"]?.message })
            ] })
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_jsx_runtime45.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(StyledDosageInput, { className: "StyledDosageInput", children: [
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              TextInput,
              {
                label: t("prescription.form.dosage"),
                id: "dosage",
                required: true,
                autoFocus: true,
                role: "combobox",
                "aria-autocomplete": "list",
                "aria-expanded": suggestionsDisplayed,
                "aria-controls": suggestionsId,
                "aria-activedescendant": activeSuggestionId,
                ...register("dosage", {
                  required: t("prescription.form.fieldRequired")
                }),
                errorMessage: prescriptionFormErrors["dosage"]?.message
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              "ul",
              {
                id: suggestionsId,
                className: "suggestionsDropdown",
                role: "listbox",
                "aria-label": t("prescription.form.posologySuggestions"),
                hidden: !suggestionsDisplayed,
                onMouseMove: handleMouseMove,
                children: posologySuggestions.map((posology, index) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(StyledSuggestionItem, { role: "none", $disableHover: disableHover, $focused: focusedDosageIndex === index, className: "StyledSuggestionItem", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  "button",
                  {
                    id: `posology-${index}`,
                    type: "button",
                    role: "option",
                    "aria-selected": focusedDosageIndex === index,
                    tabIndex: -1,
                    onClick: (e) => {
                      e.preventDefault();
                      validateSuggestion(posology);
                    },
                    children: posology
                  }
                ) }, index))
              }
            )
          ] }),
          standardDosages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(StandardDosages, { dosages: standardDosages, language, onSelectDosage: onSelectStandardDosage })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__content__inputsGroup", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            TextInput,
            {
              label: t("prescription.form.duration"),
              id: "duration",
              type: "number",
              min: 1,
              required: true,
              ...register("duration", {
                required: t("prescription.form.fieldRequired")
              }),
              errorMessage: prescriptionFormErrors["duration"]?.message
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            import_react_hook_form2.Controller,
            {
              name: "durationTimeUnit",
              control,
              rules: { required: t("prescription.form.fieldRequired") },
              render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                SelectInput,
                {
                  ...field,
                  label: t("prescription.form.durationTimeUnit"),
                  id: "durationTimeUnit",
                  required: true,
                  options: getDurationTimeUnits(),
                  errorMessage: prescriptionFormErrors["durationTimeUnit"]?.message
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__content__inputsGroup", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            TextInput,
            {
              label: t("prescription.form.treatmentStartDate"),
              id: "treatmentStartDate",
              type: "date",
              required: true,
              ...register("treatmentStartDate", {
                required: t("prescription.form.fieldRequired")
              }),
              errorMessage: prescriptionFormErrors["treatmentStartDate"]?.message
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            TextInput,
            {
              label: t("prescription.form.executableUntil"),
              id: "executableUntil",
              type: "date",
              required: true,
              ...register("executableUntil", {
                required: t("prescription.form.fieldRequired")
              }),
              errorMessage: prescriptionFormErrors["executableUntil"]?.message
            }
          )
        ] }),
        !prescriptionToModify && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__content__inputsGroup", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            TextInput,
            {
              label: t("prescription.form.prescriptionsNumber"),
              id: "prescriptionsNumber",
              type: "number",
              min: 1,
              max: 12,
              required: true,
              ...register("prescriptionsNumber", {
                required: t("prescription.form.fieldRequired")
              }),
              errorMessage: prescriptionFormErrors["prescriptionsNumber"]?.message
            }
          ),
          prescriptionsNumber && prescriptionsNumber > 1 && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            import_react_hook_form2.Controller,
            {
              name: "periodicityTimeUnit",
              control,
              rules: { required: t("prescription.form.fieldRequired") },
              render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                SelectInput,
                {
                  ...field,
                  label: t("prescription.form.periodicityTimeUnit"),
                  id: "periodicityTimeUnit",
                  required: true,
                  options: getPeriodicityTimeUnits(),
                  errorMessage: prescriptionFormErrors["periodicityTimeUnit"]?.message
                }
              )
            }
          ),
          periodicityTimeUnit === "1" && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            TextInput,
            {
              label: t("prescription.form.periodicityDaysNumber"),
              id: "periodicityDaysNumber",
              type: "number",
              min: 1,
              required: true,
              ...register("periodicityDaysNumber", {
                required: t("prescription.form.fieldRequired")
              }),
              errorMessage: prescriptionFormErrors["periodicityDaysNumber"]?.message
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "addMedicationForm__body__content__radioBtns", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          import_react_hook_form2.Controller,
          {
            name: "substitutionAllowed",
            control,
            render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              RadioInput,
              {
                ...field,
                value: field.value,
                onChange: (val) => field.onChange(val),
                label: t("prescription.form.substitutionAllowed"),
                options: [
                  { label: t("prescription.form.substitutionYes"), value: true, id: "yes" },
                  { label: t("prescription.form.substitutionNo"), value: false, id: "no" }
                ],
                required: true,
                errorMessage: prescriptionFormErrors["substitutionAllowed"]?.message
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
        import_react_hook_form2.Controller,
        {
          name: "showExtraFields",
          control,
          render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(ToggleSwitch, { ...field, id: "showExtraFields", value: t("prescription.form.toggleExtraFields") })
        }
      ),
      !showExtraFields ? /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__extraFieldsPreview", children: [
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("span", { children: [
            t("prescription.form.patientInstructions"),
            " :"
          ] }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { children: recipeInstructionForPatient || t("prescription.form.instructionLabelNone") }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("span", { children: [
            t("prescription.form.reimbursementInstructions"),
            " :"
          ] }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { children: getReimbursementOptions().find((x) => x.value === instructionsForReimbursement)?.label || t("prescription.form.instructionLabelNone") }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("span", { children: [
            t("prescription.form.prescriberVisibility"),
            " :"
          ] }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { children: getPractitionerVisibilityOptions().find((o) => o.value === prescriberVisibility)?.label }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("span", { children: [
            t("prescription.form.pharmacistVisibility"),
            " :"
          ] }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { children: getPharmacistVisibilityOptions().find((o) => o.value === pharmacistVisibility)?.label }) })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__body__content", children: [
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(TextareaInput, { label: t("prescription.form.patientInstructions"), id: "recipeInstructionForPatient", ...register("recipeInstructionForPatient") }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          import_react_hook_form2.Controller,
          {
            name: "instructionsForReimbursement",
            control,
            render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              SelectInput,
              {
                ...field,
                label: t("prescription.form.reimbursementInstructions"),
                id: "instructionsForReimbursement",
                options: getReimbursementOptions(),
                value: field.value ?? "",
                onChange: (e) => {
                  const val = e.target.value === "" ? null : e.target.value;
                  field.onChange(val);
                }
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          import_react_hook_form2.Controller,
          {
            name: "prescriberVisibility",
            control,
            render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(SelectInput, { ...field, label: t("prescription.form.prescriberVisibility"), id: "prescriberVisibility", options: getPractitionerVisibilityOptions() })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          import_react_hook_form2.Controller,
          {
            name: "pharmacistVisibility",
            control,
            render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              SelectInput,
              {
                ...field,
                label: t("prescription.form.pharmacistVisibility"),
                id: "pharmacistVisibility",
                options: getPharmacistVisibilityOptions(),
                value: field.value ?? "",
                onChange: (e) => {
                  const val = e.target.value === "" ? null : e.target.value;
                  field.onChange(val);
                }
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "addMedicationForm__footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Button, { title: t("prescription.form.cancel"), type: "reset", view: "outlined", onClick: handleModalClose }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Button, { title: t("prescription.form.submit"), type: "submit", view: "primary" })
    ] })
  ] }) }) });
};

// src/shared/components/PrescriptionList/index.tsx
var import_react16 = require("react");

// src/internal/components/prescription-elements/PrescriptionCard/styles.ts
var import_styled_components32 = __toESM(require("styled-components"));
var actionBtnCommonStyles = import_styled_components32.css`
  background: none;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  ${targetSize("width")};
  ${targetSize("height")};
  border-radius: ${cp.radiusMd};

  ${responsiveMediaQueries.down(displayResolution.s)`
        border: 1px solid ${cp.colorSurfaceAccent};
        background: ${cp.colorSurfaceAccentSubtle};
    `};
`;
var StyledPrescriptionCard = import_styled_components32.default.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
  border-radius: ${cp.radiusMd};
  background: ${cp.colorSurfaceSunken};
  border: 1px solid ${cp.colorBorderAccent};

  &:hover {
    border-radius: ${cp.radiusMd};
    border-color: ${cp.colorAccent};
    box-shadow: 0 0 0 2px ${cp.colorHoverHalo};
    background-color: ${cp.colorSurface};
  }

  ${({ $prescribed }) => !!$prescribed && import_styled_components32.css`
      background: ${cp.colorOkSurfaceAlt};
      border-color: ${cp.colorOkBorder};

      &:hover {
        border-color: ${cp.colorOkBorder};
        border-radius: inherit;
        background: ${cp.colorOkSurfaceAlt};
        box-shadow: inherit;
      }
    `};

  .prescriptionCardHeader {
    width: 83%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    ${responsiveMediaQueries.down(displayResolution.s)`
      width: 100%;
    `};

    &__prescription {
      display: flex;
      align-items: center;
      gap: 12px;

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        &__title {
          display: flex;
          align-items: flex-start;
          gap: 8px;

          h3 {
            color: ${cp.colorText};
            font-size: ${cp.fontSizeLg};
            font-style: normal;
            font-weight: 500;
          }
        }

        p {
          color: ${cp.colorText};
          font-size: ${cp.fontSizeMd};
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }
      }
    }
  }

  .actions {
    display: flex;
    gap: 8px;

    ${responsiveMediaQueries.down(displayResolution.s)`
     width: 100%;
      gap: 4px;
    `};

    .edit {
      ${actionBtnCommonStyles};

      &:hover {
        svg {
          path {
            fill: ${cp.colorAccent};
          }
        }
      }
    }

    .delete {
      ${actionBtnCommonStyles};

      &:hover {
        svg {
          path {
            fill: ${cp.colorCritical};
          }
        }
      }
    }
  }

  .rid {
    font-size: ${cp.fontSizeXs};
    letter-spacing: 1.2px;
    background-color: ${cp.colorOkStrong};
    color: ${cp.colorOnBadge};
    padding: 4px 8px;
    border-radius: ${cp.radiusXs};
  }
`;

// src/internal/components/prescription-elements/PrescriptionCard/index.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
var PrescriptionCard = ({ prescribedMedication, handleModifyPrescription, handleDeletePrescription }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(StyledPrescriptionCard, { className: "StyledPrescriptionCard", $prescribed: !!prescribedMedication.rid, children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "prescriptionCardHeader", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "prescriptionCardHeader__prescription", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "prescriptionCardHeader__prescription__content", children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "prescriptionCardHeader__prescription__content__title", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("h3", { children: prescribedMedication.medication.medicinalProduct?.intendedname ?? prescribedMedication.medication.substanceProduct?.intendedname ?? prescribedMedication.medication.compoundPrescription }) }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("p", { children: prescribedMedication.medication.instructionForPatient })
    ] }) }) }),
    !prescribedMedication.rid ? /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("button", { className: "edit", type: "button", "aria-label": t("prescription.list.modify"), onClick: () => handleModifyPrescription(prescribedMedication), children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(EditIcn, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("button", { className: "delete", type: "button", "aria-label": t("prescription.list.delete"), onClick: () => handleDeletePrescription(prescribedMedication), children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(DeleteIcn, {}) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "rid", children: prescribedMedication.rid })
  ] });
};

// src/shared/components/PrescriptionList/styles.ts
var import_styled_components33 = __toESM(require("styled-components"));
var StyledPrescriptionList = import_styled_components33.default.div`
  ${libraryRoot}
  display: flex;
  flex-direction: column;
  gap: 24px;

  .cardinal-prescriptions {
    display: flex;
    flex-direction: column;
    gap: 4px;

    ${responsiveMediaQueries.down(displayResolution.m)`
      width: 100%;
      min-width: 100%;
    `};

    &__title {
      ${labelCommonStyles}
    }

    &__rows {
      width: 100%;
      height: auto;
      max-height: 380px;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;

      padding: 6px 8px 6px 6px;
      gap: 5px;
      border-radius: ${cp.radiusLg};
      border: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};
    }

    &__footer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
    }
  }
`;

// src/shared/components/PrescriptionList/index.tsx
var import_jsx_runtime47 = require("react/jsx-runtime");
var PrescriptionList = ({
  handleModifyPrescription,
  handleDeletePrescription,
  handleSendPrescriptions,
  handlePrintPrescriptions,
  prescribedMedications,
  hideSectionsTitles
}) => {
  const [printing, setPrinting] = (0, import_react16.useState)(false);
  const [sending, setSending] = (0, import_react16.useState)(false);
  const spinPrint = async (action) => {
    setPrinting(true);
    await action();
    setPrinting(false);
  };
  const spinSend = async (action) => {
    setSending(true);
    await action();
    setSending(false);
  };
  const sentPrescriptions = () => {
    return prescribedMedications.filter((item) => !!item.rid);
  };
  const pendingPrescriptions = () => {
    return prescribedMedications.filter((item) => !item.rid);
  };
  if (!prescribedMedications) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_jsx_runtime47.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(StyledPrescriptionList, { className: `StyledPrescriptionList ${LIBRARY_ROOT_CLASS}`, children: [
    sentPrescriptions().length !== 0 && /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "cardinal-prescriptions", children: [
      !hideSectionsTitles && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("p", { className: "cardinal-prescriptions__title", children: t("prescription.list.sentTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "cardinal-prescriptions__rows", children: sentPrescriptions().map((medication, idx) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
        PrescriptionCard,
        {
          prescribedMedication: medication,
          handleModifyPrescription,
          handleDeletePrescription
        },
        medication.uuid || idx
      )) }),
      handlePrintPrescriptions && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "cardinal-prescriptions__footer", children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
        Button,
        {
          disabled: sending,
          title: t("prescription.list.print"),
          handleClick: () => spinPrint(handlePrintPrescriptions),
          view: printing && !sending ? "withSpinner" : "outlined",
          type: "button"
        }
      ) })
    ] }),
    pendingPrescriptions().length !== 0 && /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "cardinal-prescriptions", children: [
      !hideSectionsTitles && /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("p", { className: "cardinal-prescriptions__title", children: [
        " ",
        t("prescription.list.pendingTitle")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "cardinal-prescriptions__rows", children: pendingPrescriptions().map((medication, idx) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
        PrescriptionCard,
        {
          prescribedMedication: medication,
          handleModifyPrescription,
          handleDeletePrescription
        },
        medication.uuid || idx
      )) }),
      (handlePrintPrescriptions || handleSendPrescriptions) && /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "cardinal-prescriptions__footer", children: [
        handlePrintPrescriptions && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          Button,
          {
            disabled: sending,
            title: t("prescription.list.sendAndPrint"),
            handleClick: () => spinPrint(handlePrintPrescriptions),
            view: printing ? "withSpinner" : "outlined",
            type: "submit",
            form: "prescriptionForm"
          }
        ),
        handleSendPrescriptions && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          Button,
          {
            disabled: printing,
            title: t("prescription.list.send"),
            view: sending && !printing ? "withSpinner" : "primary",
            type: "submit",
            handleClick: () => spinSend(handleSendPrescriptions)
          }
        )
      ] })
    ] })
  ] }) });
};

// src/shared/components/PrescriptionPrintModal/index.tsx
var import_react18 = require("react");

// src/internal/components/prescription-elements/PrescriptionDocumentToPrint/index.tsx
var import_react17 = require("react");
var import_jsbarcode = __toESM(require("jsbarcode"));

// src/internal/components/prescription-elements/PrescriptionDocumentToPrint/styles.ts
var import_styled_components34 = __toESM(require("styled-components"));
var StyledPrescriptionDocument = import_styled_components34.default.div`
  ${libraryRoot}
  color: ${cp.colorPaperText};
  @media print {
    .prescription {
      page-break-after: always;
      border: none;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 24px;

  .prescription-document {
    border: 1px solid ${cp.colorBorder};
    border-radius: ${cp.radiusLg};
    background-color: ${cp.colorPaper};
    padding: 24px;
    font-size: ${cp.fontSizeMd};

    display: flex;
    flex-direction: column;
    gap: 24px;

    &__divider {
      border-top: 1px solid ${cp.colorBorder};
    }

    &__header {
      text-align: center;

      display: flex;
      flex-direction: column;
      gap: 4px;

      h1 {
        margin: 0;
        font-size: ${cp.fontSizeXl};
        padding-bottom: 4px;
      }
    }

    &__options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  .prescription-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__persons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h3 {
      font-size: ${cp.fontSizeMd};
    }

    .prescription-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 24px 12px;
      border-radius: ${cp.radiusXl};
      border: 1px dashed ${cp.colorBorderControl};

      &__block {
        display: flex;
        flex-direction: column;
        width: 48%;

        &--right {
          align-items: center;
          width: auto;
        }
      }
    }

    .prescription-item:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .barcode {
    width: 200px;
    height: 40px;
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    svg {
      height: 40px;
    }
  }
`;

// src/internal/components/prescription-elements/PrescriptionDocumentToPrint/index.tsx
var import_jsx_runtime48 = require("react/jsx-runtime");
function chunk(arr, chunkSize = 1, cache = []) {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
}
var PrescriptionDocumentToPrint = ({ prescribedMedications, prescriber, patient }) => {
  const chunks = chunk(prescribedMedications, 4);
  const ridElements = (0, import_react17.useRef)([]);
  (0, import_react17.useEffect)(() => {
    prescribedMedications.forEach((med, idx) => {
      if (med.rid && ridElements.current[idx]) {
        (0, import_jsbarcode.default)(ridElements.current[idx], med.rid, {
          format: "CODE128A",
          // Barcodes stay black on white whatever the theme: pharmacy scanners need the contrast.
          lineColor: "#000",
          width: 2,
          height: 40,
          displayValue: true
        });
      }
    });
  }, [prescribedMedications]);
  const formatDate = (date) => {
    return (date && dateDecode(date)?.toLocaleDateString()) ?? "-";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(StyledPrescriptionDocument, { className: "StyledPrescriptionDocument", children: prescribedMedications?.length ? chunks.map((chunk2, chunkIndex) => /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-document", children: [
    /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-document__header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("h1", { children: t("prescription.pdf.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("p", { children: t("prescription.pdf.instructions") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "prescription-document__divider" }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-document__options", children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("strong", { children: t("prescription.pdf.options.title") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("ol", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("li", { children: t("prescription.pdf.options.option1") }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("li", { children: t("prescription.pdf.options.option2") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "prescription-document__divider" }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-section__persons", children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("strong", { children: [
            t("prescription.pdf.prescriber"),
            ": "
          ] }),
          prescriber.lastName,
          " ",
          prescriber.firstName,
          " ",
          prescriber.nihii
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("strong", { children: [
            t("prescription.pdf.patient"),
            ": "
          ] }),
          patient.lastName,
          " ",
          patient.firstName,
          " ",
          patient.ssin
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("h3", { children: t("prescription.pdf.electronicContent") }),
      chunk2.map((prescription, prescriptionIndex) => /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-item", children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-item__block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { children: [
            t("prescription.pdf.product"),
            " ",
            "",
            /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("strong", { children: trim(
              prescription.medication.medicinalProduct?.intendedname ?? prescription.medication?.substanceProduct?.intendedname ?? prescription.medication?.compoundPrescription ?? ""
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { children: [
            t("prescription.pdf.dosage"),
            " ",
            prescription.medication.instructionForPatient
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { children: [
            t("prescription.pdf.date"),
            " ",
            formatDate(prescription.medication.beginMoment)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("p", { children: [
            t("prescription.pdf.validUntil"),
            " ",
            prescription.medication.endMoment ? formatDate(prescription.medication.endMoment) : "-"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "prescription-item__block prescription-item__block--right", children: [
          /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("strong", { className: "ridTitle", children: [
            "RID ",
            prescriptionIndex + 1
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "barcode", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
            "svg",
            {
              ref: (el) => {
                ridElements.current[chunkIndex * 4 + prescriptionIndex] = el;
              }
            }
          ) })
        ] })
      ] }, prescriptionIndex))
    ] })
  ] }, chunkIndex)) : null });
};

// src/shared/components/PrescriptionPrintModal/styles.ts
var import_styled_components35 = __toESM(require("styled-components"));
var StyledPrescriptionPrintModal = import_styled_components35.default.div`
  ${libraryRoot}
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1020;
  display: flex;
  background: ${cp.colorOverlay};

  .contentWrap {
    width: 900px;
    height: 100%;
    max-height: 100%;
    border: none;
    padding: 0;
    margin: 0 0 0 auto;

    ${responsiveMediaQueries.down(displayResolution.l)`
       width: 100%;
      border-radius: 0.2em;
  `};
  }

  .content {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    &__header {
      display: flex;
      padding: 20px 24px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      border-bottom: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};

      ${responsiveMediaQueries.down(displayResolution.l)`
        padding: 20px 16px;
      `};

      h3 {
        color: ${cp.colorText};
        font-size: ${cp.fontSizeLg};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      &__closeIcn {
        ${targetSize("width")};
        ${targetSize("height")};
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: ${cp.colorSurface};
        border-radius: ${cp.radiusXs};

        &:hover {
          background-color: ${cp.colorSurfaceDisabled};
        }
      }
    }

    &__body {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      flex: 1 0 0;
      gap: 12px;
      background-color: ${cp.colorSurfaceSunken};

      ${responsiveMediaQueries.down(displayResolution.l)`
        padding: 16px;
      `};

      ${responsiveMediaQueries.down(displayResolution.s)`
         padding: 8px;
      `};

      &__content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
        border-radius: ${cp.radiusXl};
        border: 1px solid ${cp.colorBorder};
        background: ${cp.colorSurface};
        padding: 24px;
        gap: 12px;

        ${responsiveMediaQueries.down(displayResolution.l)`
          padding: 18px;
        `};
      }

      &__extraFieldsPreview {
        display: flex;
        width: 100%;
        padding: 12px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;

        border-radius: ${cp.radiusXl};
        border: 1px solid ${cp.colorBorder};
        background: ${cp.colorSurface};
        box-shadow: ${cp.shadowSection};

        p {
          color: ${cp.colorTextSubtle};
          font-size: ${cp.fontSizeMd};
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 169.231% */
        }
      }
    }

    &__footer {
      display: flex;
      padding: 20px 24px;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
      border-top: 1px solid ${cp.colorBorder};
      background: ${cp.colorSurface};
    }
  }
`;

// src/shared/components/PrescriptionPrintModal/index.tsx
var import_jsx_runtime49 = require("react/jsx-runtime");
var PrescriptionPrintModal = ({ closeModal, prescribedMedications, prescriber, patient }) => {
  const titleId = (0, import_react18.useId)();
  const print = () => {
    const div = document.getElementById("print-container");
    if (div) {
      let setPrint = function() {
        const closePrint = () => {
          document.body.removeChild(hideFrame);
        };
        if (hideFrame.contentWindow && hideFrame.contentDocument) {
          const stylesheets = document.querySelectorAll("link[rel='stylesheet'], style");
          stylesheets.forEach((stylesheet) => {
            hideFrame.contentDocument.head.appendChild(stylesheet.cloneNode(true));
          });
          hideFrame.contentDocument.body.appendChild(newdiv);
          hideFrame.contentWindow.onbeforeunload = closePrint;
          hideFrame.contentWindow.onafterprint = closePrint;
          hideFrame.contentWindow.print();
        }
      };
      const newdiv = div.cloneNode(true);
      newdiv.style.cssText = window.getComputedStyle(div).cssText;
      newdiv.id = "new" + div.id;
      const hideFrame = document.createElement("iframe");
      hideFrame.style.display = "none";
      hideFrame.onload = setPrint;
      hideFrame.src = "about:blank";
      document.body.appendChild(hideFrame);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_jsx_runtime49.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(StyledPrescriptionPrintModal, { className: `StyledPrescriptionPrintModal ${LIBRARY_ROOT_CLASS}`, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "contentWrap", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "content", role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, children: [
    /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "content__header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("h3", { id: titleId, children: t("practitioner.printModal.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("button", { className: "content__header__closeIcn", onClick: closeModal, type: "button", "aria-label": t("prescription.closeDialog"), children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(CloseIcn, {}) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "content__body", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { id: "print-container", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(PrescriptionDocumentToPrint, { prescribedMedications, prescriber, patient }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "content__footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(Button, { title: t("practitioner.printModal.close"), type: "reset", view: "outlined", handleClick: closeModal }),
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(Button, { title: t("practitioner.printModal.print"), type: "submit", view: "primary", handleClick: print })
    ] })
  ] }) }) }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  HOST_SLOT_ATTRIBUTE,
  IndexedDbServiceStore,
  LIBRARY_ROOT_CLASS,
  MedIndexMedicationProvider,
  MedicationCard,
  MedicationNotFoundError,
  MedicationProviderError,
  MedicationProviderUnavailableError,
  MedicationSearch,
  MedicationSearchValidationError,
  MissingStsTokenError,
  PractitionerCertificate,
  PrescriptionList,
  PrescriptionModal,
  PrescriptionPrintModal,
  SamMedicationProvider,
  THEME_PREFIX,
  cardinalLanguage,
  createFhcCode,
  createIndexedDbTokenStore,
  createMedicationProvider,
  deleteCertificate,
  fetchSamVersion,
  findMedicationsByLabel,
  getRegulatoryBadges,
  getSamTextTranslation,
  loadAlternativeMedications,
  loadAndDecryptCertificate,
  loadCertificateInformation,
  loadVmpGroup,
  registerRegulatoryBadge,
  sendRecipe,
  t,
  themeTokens,
  uploadAndEncryptCertificate,
  validateDecryptedCertificate,
  verifyCertificateWithSts
});
//# sourceMappingURL=index.js.map