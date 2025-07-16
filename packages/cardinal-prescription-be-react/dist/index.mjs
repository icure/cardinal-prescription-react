// src/services/i18n/index.tsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// src/services/i18n/translations/components/home.translations.ts
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

// src/services/i18n/translations/components/prescription.translations.ts
var prescriptionTranslations = {
  fr: {
    createTitle: "Cr\xE9er la prescription",
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
      sendAndPrint: "Envoyer et imprimer"
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
      instructionLabelNone: "Aucun"
    }
  },
  en: {
    createTitle: "Create prescription",
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
      sendAndPrint: "Send and print"
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
      instructionLabelNone: "None"
    }
  },
  nl: {
    createTitle: "Voorschrift aanmaken",
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
      sendAndPrint: "Verzenden en afdrukken"
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
      instructionLabelNone: "Geen"
    }
  },
  de: {
    createTitle: "Rezept erstellen",
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
      sendAndPrint: "Senden und drucken"
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
      instructionLabelNone: "Keine"
    }
  }
};

// src/services/i18n/translations/components/medication.translations.ts
var medicationTranslations = {
  fr: {
    drugType: {
      medication: "M\xE9dicament",
      molecule: "Mol\xE9cule",
      homologation: "Homologation"
    },
    drugInfographic: {
      blackTriangle: "Pharmacovigilance renforc\xE9e (Triangle noir)",
      rma: "Activit\xE9s additionnelles de minimisation des risques ou additional RMA (Risk Minimisation Activities) (Source: AFMPS)",
      genericPrescriptionRequired: "Ordonnance g\xE9n\xE9rique requise"
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
      price: "Prix :"
    },
    search: {
      label: "Trouver un m\xE9dicament",
      errorMessage: " Entrez au moins 3 lettres du nom du m\xE9dicament"
    }
  },
  en: {
    drugType: {
      medication: "Medication",
      molecule: "Molecule",
      homologation: "Homologation"
    },
    drugInfographic: {
      blackTriangle: "Enhanced pharmacovigilance (Black triangle)",
      rma: "Additional risk minimisation activities or additional RMA (Risk Minimisation Activities) (Source: FAMHP)",
      genericPrescriptionRequired: "Generic prescription required"
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
      price: "Price:"
    },
    search: {
      label: "Find a medication",
      errorMessage: "Enter at least 3 letters of the medication name"
    }
  },
  nl: {
    drugType: {
      medication: "Geneesmiddel",
      molecule: "Molecule",
      homologation: "Homologatie"
    },
    drugInfographic: {
      blackTriangle: "Verhoogde waakzaamheid (Zwarte driehoek)",
      rma: "Aanvullende risicobeperkende maatregelen (RMA) (Bron: FAGG)",
      genericPrescriptionRequired: "Generiek voorschrift vereist"
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
      price: "Prijs:"
    },
    search: {
      label: "Zoek een geneesmiddel",
      errorMessage: "Voer minstens 3 letters van de naam in"
    }
  },
  de: {
    drugType: {
      medication: "Arzneimittel",
      molecule: "Molek\xFCl",
      homologation: "Zulassung"
    },
    drugInfographic: {
      blackTriangle: "Verst\xE4rkte Pharmakovigilanz (Schwarzes Dreieck)",
      rma: "Zus\xE4tzliche Ma\xDFnahmen zur Risikominimierung (RMA) (Quelle: BfArM)",
      genericPrescriptionRequired: "Generisches Rezept erforderlich"
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
      price: "Preis :"
    },
    search: {
      label: "Arzneimittel suchen",
      errorMessage: "Geben Sie mindestens 3 Buchstaben des Arzneimittelnamens ein"
    }
  }
};

// src/services/i18n/translations/components/practitioner.translations.ts
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

// src/services/i18n/translations/utils/visibility-helpers.translations.ts
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

// src/services/i18n/translations/utils/reimbursement-helpers.translations.ts
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

// src/services/i18n/translations/utils/prescription-duration-helpers.translations.ts
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

// src/services/i18n/translations/utils/delivery-helpers.translations.ts
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

// src/services/i18n/translations/index.ts
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

// src/services/constants.ts
var FHC_URL = "https://fhcacc.icure.cloud";
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

// src/services/i18n/index.tsx
var I18nService = class _I18nService {
  static instance;
  i18n;
  constructor() {
    this.i18n = i18n;
    this.i18n.use(initReactI18next).init({
      resources: {
        en: { translation: appTranslations.en },
        fr: { translation: appTranslations.fr },
        nl: { translation: appTranslations.nl },
        de: { translation: appTranslations.de }
      },
      lng: DEFAULT_APP_LANGULAGE,
      fallbackLng: DEFAULT_APP_LANGULAGE,
      interpolation: { escapeValue: false }
    }).catch((error) => {
      console.error("i18n init error:", error);
    });
  }
  // Singleton pattern to avoid multiple initializations
  static getInstance() {
    if (!_I18nService.instance) {
      _I18nService.instance = new _I18nService();
    }
    return _I18nService.instance;
  }
  setLanguage(lang) {
    return this.i18n.changeLanguage(lang);
  }
  getCurrentLanguage() {
    return this.i18n.language;
  }
  t(key, options) {
    return this.i18n.t(key, options);
  }
};

// src/services/cardinal-sam/index.ts
var SamSdkService = class {
  sdk;
  constructor(sdk) {
    if (!sdk) throw new Error("SamV2Api instance is required");
    this.sdk = sdk;
  }
  /**
   * Search for medications matching the given query and language.
   * @param language Language code (e.g., 'en', 'fr', 'nl' or 'de')
   * @param query Medication search query string
   * @returns Paginated lists of AMP, VMPGroup, and NMP matches
   */
  async findMedicationsByLabel(language, query) {
    try {
      return await Promise.all([
        this.sdk.findPaginatedAmpsByLabel(language, query),
        this.sdk.findPaginatedVmpGroupsByLabel(language, query),
        this.sdk.findPaginatedNmpsByLabel(language, query)
      ]);
    } catch (error) {
      console.error("Error in findMedicationsByLabel:", error);
      throw error;
    }
  }
  /**
   * Fetch the current version information for the SAM database.
   */
  async fetchSamVersion() {
    try {
      return await this.sdk.getSamVersion();
    } catch (error) {
      console.error("Error in fetchSamVersion:", error);
      return void 0;
    }
  }
};

// src/services/indexed-db/index.ts
var IndexedDbService = class {
  db;
  config;
  constructor(config) {
    this.config = config;
  }
  async initializeIndexedDb() {
    this.db = await new Promise((resolve, reject) => {
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
  getIndexedDb() {
    if (!this.db) {
      throw new Error("IndexedDB not initialized. Call initializeIndexedDb() first.");
    }
    return this.db;
  }
  getIndexedDbStore() {
    const db = this.getIndexedDb();
    const storeName = this.config.STORE_NAME;
    return {
      get: (key) => {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, "readonly");
          const store = tx.objectStore(storeName);
          const request = store.get(key);
          request.onsuccess = () => {
            request.result != null ? resolve(request.result) : reject(new Error(`No value for key: ${key}`));
          };
          request.onerror = () => reject(request.error);
        });
      },
      put: (key, value) => {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const getRequest = store.get(key);
          getRequest.onsuccess = () => {
            const exists = !!getRequest.result;
            console.log("exists");
            console.log(exists);
            const record = { id: key, value };
            const request = exists ? store.put(record) : store.add(record);
            request.onsuccess = () => resolve(value);
            request.onerror = () => reject(request.error);
          };
          getRequest.onerror = () => reject(getRequest.error);
        });
      },
      delete: (key) => {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          console.log("store");
          console.log(store);
          const request = store.delete(key);
          console.log("request");
          console.log(request);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
    };
  }
};

// src/services/certificate/index.ts
var CertificateService = class {
  indexedDbService;
  certificateStore = null;
  constructor() {
    this.indexedDbService = new IndexedDbService(CERTIFICATE_IDB_CONFIG);
  }
  /** You MUST call this before using any instance methods. */
  async initialize() {
    await this.indexedDbService.initializeIndexedDb();
    this.certificateStore = this.indexedDbService.getIndexedDbStore();
  }
  async loadCertificateInformation(hcp_ssin) {
    try {
      const record = await this.getCertificateFromStore(hcp_ssin);
      return {
        salt: new Uint8Array(record.salt).buffer,
        iv: new Uint8Array(record.iv).buffer,
        encryptedCertificate: new Uint8Array(record.encryptedCertificate).buffer
      };
    } catch (error) {
      console.error(`No certificate record found for HCP SSIN ${hcp_ssin}:`, error);
      return void 0;
    }
  }
  async loadAndDecryptCertificate(hcp_ssin, passphrase) {
    console.log("hcp_ssin: " + hcp_ssin);
    console.log("passphrase: " + passphrase);
    try {
      const info = await this.loadCertificateInformation(hcp_ssin);
      console.log("info: ");
      console.log(info);
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
    } catch (error) {
      console.error(`Decryption failed for HCP SSIN "${hcp_ssin}":`, error);
      return void 0;
    }
  }
  async uploadAndEncryptCertificate(hcp_ssin, passphrase, certificate) {
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
      const res = await this.saveCertificateInStore(hcp_ssin, record);
      console.log("uploadAndEncryptCertificate res");
      console.log(res);
      return res;
    } catch (error) {
      console.error(`Encryption failed for certificate of the HCP SSIN ${hcp_ssin}:`, error);
      return void 0;
    }
  }
  async deleteCertificate(hcp_ssin) {
    try {
      await this.deleteCertificateFromStore(hcp_ssin).then((res) => {
        console.log("deleteCertificateFromStore res");
        console.log(res);
      });
      console.log(`Certificate with ID ${hcp_ssin} successfully deleted.`);
      return true;
    } catch (error) {
      console.error(`Failed to delete certificate with ID ${hcp_ssin}:`, error);
      return false;
    }
  }
  async saveCertificateInStore(id, certificate) {
    if (!this.certificateStore) throw new Error("CertificateService not initialized");
    return await this.certificateStore.put(id, certificate);
  }
  async getCertificateFromStore(id) {
    if (!this.certificateStore) throw new Error("CertificateService not initialized");
    return this.certificateStore.get(id);
  }
  async deleteCertificateFromStore(id) {
    if (!this.certificateStore) throw new Error("CertificateService not initialized");
    await this.certificateStore.delete(id);
  }
};

// src/services/fhc/index.ts
import { Code as FhcCode, fhcRecipeApi, fhcStsApi, PrescriptionRequest } from "@icure/be-fhc-lite-api";

// src/utils/date-helpers.ts
function dateEncode(date) {
  return date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate();
}

// src/services/fhc/index.ts
var FhcService = class _FhcService {
  tokenStore;
  certificateService;
  indexedDbService;
  vendor;
  samPackage;
  constructor(config) {
    this.vendor = config.vendor;
    this.samPackage = config.samPackage;
    this.indexedDbService = new IndexedDbService(TOKEN_IDB_CONFIG);
  }
  // Use this static method to create and initialize the service!
  static async initialize(config, certificateService) {
    const service = new _FhcService(config);
    await service.indexedDbService.initializeIndexedDb();
    service.tokenStore = service.indexedDbService.getIndexedDbStore();
    service.certificateService = certificateService;
    return service;
  }
  async sendRecipe(samVersion, prescriber, patient, prescribedMedication, passphrase) {
    const prescription = this.makePrescriptionRequest(samVersion, prescriber, patient, prescribedMedication);
    if (!prescriber?.ssin || !prescriber?.nihii) throw new Error("Missing prescriber information");
    const keystore = await this.loadAndDecryptCertificate(prescriber.ssin, passphrase);
    if (!keystore) throw new Error("Cannot obtain keystore");
    const sts = new fhcStsApi(FHC_URL, []);
    const recipe = new fhcRecipeApi(FHC_URL, []);
    const { STORE_KEY, TOKEN_KEY } = this.buildTokenStorageKeys(prescriber);
    let keystoreUuid = await this.getTokenFromStore(STORE_KEY).catch(() => void 0);
    if (!keystoreUuid) {
      const { uuid } = await sts.uploadKeystoreUsingPOST(keystore);
      if (!uuid) throw new Error("Cannot obtain keystore uuid");
      await this.saveTokenInStore(STORE_KEY, uuid);
      keystoreUuid = uuid;
    }
    const tokenValue = await this.getTokenFromStore(TOKEN_KEY).catch(() => void 0);
    const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, keystoreUuid, "doctor", tokenValue);
    if (!stsToken.tokenId) throw new Error("Cannot obtain token");
    return Promise.all(
      prescription.medications?.map(
        (m) => recipe.createPrescriptionV4UsingPOST(
          keystoreUuid,
          stsToken.tokenId,
          passphrase,
          "persphysician",
          prescriber.nihii,
          prescriber.ssin,
          `${prescriber.firstName} ${prescriber.lastName}`,
          "iCure",
          "1",
          new PrescriptionRequest({ ...prescription, medications: [m] })
        )
      ) ?? []
    );
  }
  async verifyCertificateWithSts(prescriber, passphrase) {
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
      const keystore = await this.loadAndDecryptCertificate(prescriber.ssin, passphrase);
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
      const { STORE_KEY } = this.buildTokenStorageKeys(prescriber);
      const sts = new fhcStsApi(FHC_URL, []);
      const { uuid } = await sts.uploadKeystoreUsingPOST(keystore);
      if (!uuid) throw new Error("Cannot obtain keystore uuid");
      await this.saveTokenInStore(STORE_KEY, uuid);
      const token = await this.getTokenFromStore(STORE_KEY);
      const stsToken = await sts.requestTokenUsingGET(passphrase, prescriber.ssin, token, "doctor", token);
      return { status: !!stsToken.tokenId };
    } catch (error) {
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
  }
  async validateDecryptedCertificate(hcp, passphrase) {
    try {
      await this.loadAndDecryptCertificate(hcp.ssin, passphrase);
      return await this.verifyCertificateWithSts(hcp, passphrase);
    } catch {
      return { status: false };
    }
  }
  createFhcCode(type, code, version = "1.0") {
    return new FhcCode({ id: `${type}:${code}:${version}`, type, code, version });
  }
  async getTokenFromStore(id) {
    if (!this.tokenStore) throw new Error("PrescriptionService not initialized");
    return this.tokenStore.get(id);
  }
  async saveTokenInStore(id, token) {
    if (!this.tokenStore) throw new Error("PrescriptionService not initialized");
    return await this.tokenStore.put(id, token);
  }
  async loadAndDecryptCertificate(hcp_ssin, passphrase) {
    return this.certificateService.loadAndDecryptCertificate(hcp_ssin, passphrase);
  }
  buildTokenStorageKeys(hcp) {
    return {
      STORE_KEY: `keystore.${hcp.ssin}`,
      TOKEN_KEY: `token.${hcp.ssin}`
    };
  }
  makePrescriptionRequest(samVersion, prescriber, patient, prescribedMedication) {
    return new PrescriptionRequest({
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
      vendorName: this.vendor.vendorName,
      vendorEmail: this.vendor.vendorEmail,
      vendorPhone: this.vendor.vendorPhone,
      packageName: this.samPackage.packageName,
      packageVersion: this.samPackage.packageVersion,
      vision: prescribedMedication.pharmacistVisibility,
      visionOthers: prescribedMedication.prescriberVisibility,
      samVersion,
      deliveryDate: prescribedMedication.medication.beginMoment ?? dateEncode(/* @__PURE__ */ new Date()),
      expirationDate: prescribedMedication.medication.beginMoment ?? dateEncode(new Date(+/* @__PURE__ */ new Date() + 1e3 * 3600 * 24 * 90)),
      lang: "fr"
    });
  }
};

// src/components/certificate-elements/PractitionerCertificate/index.tsx
import { useTranslation as useTranslation2 } from "react-i18next";

// src/components/common/Alert/styles.ts
import styled, { css as css3 } from "styled-components";

// src/styles/reset.ts
import { createGlobalStyle } from "styled-components";
var GlobalStyles = createGlobalStyle`
  /* Reset of the user agent styles */

  * {
    margin: 0;
    padding: 0;
    font-size: 100%;
    box-sizing: border-box;
  }
  
  // Links
  a {
    text-decoration: none;

    &:active,
    &:hover {
      outline: 0;
    }
  }

  // List
  ul,
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  // Headlines
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
  }

  // Default
  html,
  body {
    box-sizing: border-box;
    font-size: 16px;
    background-color: #fbfdff;
    font-family: 'Lato', sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  img,
  audio,
  video {
    max-width: 100%;
    height: auto;
  }

  iframe {
    border: 0;
  }

  // Form
  textarea {
    resize: none;
    /*remove the resize handle on the bottom right*/
    overflow: auto;
    vertical-align: top;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  input,
  textarea,
  select,
  button {
    outline: none;
    border: none;
    font-size: 100%;
    margin: 0;
  }

  button,
  input {
    line-height: normal;
  }

  // browser user agent input reset

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: rgb(0, 0, 0);
    transition: background-color 5000s ease-in-out 0s;
  }

  // Table
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }
`;

// src/styles/variables.ts
var colors = {
  blue: {
    800: "#084b83",
    600: "#4b6682",
    500: "#3d87c5",
    300: "#eef6fe",
    200: "#f9fbfe",
    100: "#dce7f2"
  },
  grey: {
    900: "#1d2235",
    650: "#9ca8b2",
    600: "#848482",
    550: "#cad0d5",
    300: "#e4e4e7",
    200: "#f5f5f5",
    100: "#fcfcfd"
  },
  orange: {
    900: "#ef762f"
  },
  green: {
    400: "#b7eb8f",
    300: "#f6ffed",
    200: "#e5fae5"
  },
  red: {
    800: "#FF0000FF",
    400: "#ffccc7",
    300: "#fff1f0"
  }
};

// src/styles/elements.ts
import { css } from "styled-components";
var fieldCommonStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
var inputCommonStyles = css`
  width: 100%;
  display: flex;
  height: 32px;
  padding: 5px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: pointer;

  border-radius: 6px;
  border: 1px solid ${colors.grey[550]};
  background: #fff;

  color: ${colors.grey[900]};
  font-family: 'Inter Variable', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: ${colors.grey[650]};
  }

  &:hover,
  &:focus {
    border-color: ${colors.blue[800]};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
  }
`;
var inputCommonStyles_disabled = css`
  cursor: not-allowed;
  background-color: ${colors.grey[200]};
  border-color: ${colors.grey[550]};
  opacity: 0.7;

  &:hover {
    border-color: ${colors.grey[550]};
  }
`;
var inputCommonStyles_error = css`
  border-color: red;
  color: red;

  &::placeholder {
    color: rgba(255, 0, 0, 0.5);
  }

  &:hover {
    border-color: rgba(255, 0, 0, 0.5);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
  }
`;
var labelCommonStyles = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: ${colors.grey[900]};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;

  span {
    display: none;
  }
`;
var labelCommonStyles_required = css`
  span {
    display: flex;
    color: red;
    font-weight: bold;
  }
`;
var labelCommonStyles_error = css`
  color: red;
`;
var errorMessageCommonStyles = css`
  color: red;
  font-size: 13px;
`;

// src/styles/responsive-media-queries.ts
import { css as css2 } from "styled-components";
var displayResolution = {
  xs: 420,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
  xxl: 1400
};
var responsiveMediaQueries = {
  up: (size) => (first, ...args) => css2`
      @media (min-width: ${size}px) {
        ${css2(first, ...args)}
      }
    `,
  down: (size) => (first, ...args) => css2`
      @media (max-width: ${size}px) {
        ${css2(first, ...args)}
      }
    `,
  between: (min, max) => (first, ...args) => css2`
      @media (min-width: ${displayResolution[min]}px) and (max-width: ${displayResolution[max]}px) {
        ${css2(first, ...args)}
      }
    `
};

// src/components/common/Alert/styles.ts
var StyledAlert = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid white;

  .heading {
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;
  }

  h4 {
    color: ${colors.grey[900]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  p {
    color: ${colors.grey[900]};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }

  ${({ $error }) => !!$error && css3`
      border-color: ${colors.red[400]};
      background: ${colors.red[300]};
    `};

  ${({ $success }) => !!$success && css3`
      border-color: ${colors.green[400]};
      background: ${colors.green[300]};
    `};
`;

// src/components/common/Icons/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SpinnerIcn({ pathFill = "#000000", size = 12 }) {
  const sizePx = `${size}px`;
  return /* @__PURE__ */ jsx("svg", { style: { width: sizePx, height: sizePx }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", width: "24", height: "24", children: /* @__PURE__ */ jsxs("g", { children: [
    /* @__PURE__ */ jsx("circle", { strokeDasharray: "169.64600329384882 58.548667764616276", r: "36", strokeWidth: "12", stroke: pathFill, fill: "none", cy: "50", cx: "50", children: /* @__PURE__ */ jsx("animateTransform", { keyTimes: "0;1", values: "0 50 50;360 50 50", dur: "1s", repeatCount: "indefinite", type: "rotate", attributeName: "transform" }) }),
    /* @__PURE__ */ jsx("g", {})
  ] }) });
}
var StatusSuccessIcn = () => /* @__PURE__ */ jsxs("svg", { width: "26", height: "26", viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_1152_2420)", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M13 0C5.82098 0 0 5.82098 0 13C0 20.179 5.82098 26 13 26C20.179 26 26 20.179 26 13C26 5.82098 20.179 0\n        13 0ZM18.615 8.75469L12.5038 17.2279C12.4184 17.3471 12.3058 17.4443 12.1753 17.5113C12.0449 17.5783 11.9003\n        17.6132 11.7537 17.6132C11.607 17.6132 11.4625 17.5783 11.332 17.5113C11.2016 17.4443 11.089 17.3471 11.0036\n        17.2279L7.38504 12.2136C7.27478 12.0598 7.38504 11.8451 7.57366 11.8451H8.9346C9.23058 11.8451 9.51205 11.9873\n        9.68616 12.231L11.7522 15.098L16.3138 8.7721C16.4879 8.53125 16.7665 8.38616 17.0654 8.38616H18.4263C18.615\n        8.38616 18.7252 8.60089 18.615 8.75469Z",
      fill: "#52C41A"
    }
  ) }),
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_1152_2420", children: /* @__PURE__ */ jsx("rect", { width: "26", height: "26", fill: "white" }) }) })
] });
var StatusErrorIcn = () => /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 0C18.6268 0 24 5.37321 24 12C24 18.6268 18.6268 24 12 24C5.37321 24 0 18.6268 0 12C0 5.37321 5.37321 0\n      12 0ZM15.428 7.36125H15.427L15.4248 7.36286L12 10.7879L8.57518 7.36286C8.57411 7.36152 8.57357 7.36125 8.57304\n      7.36125C8.57242 7.36106 8.57177 7.36106 8.57116 7.36125C8.57036 7.36125 8.56982 7.36152 8.56875 7.36259L7.36286\n      8.56848C7.36221 8.56916 7.36175 8.56999 7.36152 8.57089C7.36133 8.5715 7.36133 8.57216 7.36152\n      8.57277V8.5733C7.36197 8.57392 7.36251 8.57446 7.36313 8.57491L10.7879 12L7.36286 15.4248C7.36152 15.4259\n      7.36125 15.4264 7.36125 15.427C7.36106 15.4276 7.36106 15.4282 7.36125 15.4288C7.36125 15.4296 7.36152 15.4302\n      7.36259 15.4312L8.56848 16.6371C8.56916 16.6378 8.56999 16.6383 8.57089 16.6385C8.5715 16.6387 8.57216 16.6387\n      8.57277 16.6385C8.5733 16.6385 8.57384 16.6382 8.57491 16.6371L12 13.2121L15.4248 16.6371C15.4259 16.6382 15.4264\n      16.6385 15.427 16.6385C15.4276 16.6387 15.4282 16.6387 15.4288 16.6385C15.4296 16.6385 15.4302 16.6382 15.4312\n      16.6371L16.6371 15.4312C16.6378 15.4306 16.6383 15.4297 16.6385 15.4288C16.6387 15.4282 16.6387 15.4276 16.6385\n      15.427V15.4264C16.6381 15.4258 16.6377 15.4253 16.6371 15.4248L13.2121 12L16.6371 8.57518C16.6382 8.57411 16.6385\n      8.57357 16.6385 8.57304C16.6387 8.57242 16.6387 8.57177 16.6385 8.57116C16.6385 8.57036 16.6382 8.56982 16.6371\n      8.56875L15.4312 7.36286C15.4306 7.36221 15.4297 7.36175 15.4288 7.36152C15.4282 7.36133 15.4276 7.36133 15.427\n      7.36152L15.428 7.36125Z",
    fill: "#FF4D4F"
  }
) });

// src/components/common/Alert/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Alert = ({ status, title, description }) => {
  return /* @__PURE__ */ jsxs2(StyledAlert, { $success: status === "success", $error: status === "error", children: [
    /* @__PURE__ */ jsxs2("div", { className: "heading", children: [
      status === "success" && /* @__PURE__ */ jsx2(StatusSuccessIcn, {}),
      status === "error" && /* @__PURE__ */ jsx2(StatusErrorIcn, {}),
      /* @__PURE__ */ jsx2("h4", { children: title })
    ] }),
    /* @__PURE__ */ jsx2("p", { children: description })
  ] });
};

// src/components/certificate-elements/CertificateUploadForm/index.tsx
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// src/utils/file-helpers.ts
var readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

// src/components/form-elements/Button/styles.ts
import styled2, { css as css4 } from "styled-components";
var viewStyles = ($view) => {
  switch ($view) {
    case "primary":
      return css4`
        background: ${colors.blue[800]};
        color: #ffffff;

        &:hover {
          opacity: 0.9;
        }
      `;
    case "outlined":
      return css4`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};

        &:hover {
          border-color: ${colors.blue[800]};
        }
      `;
    case "withSpinner":
      return css4`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};
        gap: 8px;
      `;
    default:
      return null;
  }
};
var StyledButton = styled2.button`
  display: flex;
  height: 32px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${colors.blue[800]};
  cursor: pointer;
  min-width: 64px;

  ${({ $view }) => viewStyles($view)}
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    border-color: ${colors.grey[550]};
    background: ${colors.grey[200]};
    color: ${colors.grey[600]};
  }
`;

// src/components/form-elements/Button/index.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var Button = ({ title, view = "primary", handleClick, type = "button", ...rest }) => {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx3(GlobalStyles, {}),
    /* @__PURE__ */ jsx3(StyledButton, { $view: view, onClick: handleClick, type, ...rest, children: view === "withSpinner" ? SpinnerIcn({}) : title })
  ] });
};

// src/components/form-elements/TextInput/index.tsx
import { forwardRef, useEffect, useRef } from "react";

// src/components/form-elements/TextInput/styles.ts
import styled3, { css as css5 } from "styled-components";
var StyledTextInputLabel = styled3.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && css5`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && css5`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextInput = styled3.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledInput = styled3.input`
  ${inputCommonStyles};

  &::file-selector-button {
    border-radius: 0;
    height: 100%;
    cursor: pointer;
    background-color: white;
    border: none;
    border-right: 1px solid ${colors.grey[550]};
    margin-right: 16px;
    padding-right: 12px;
    transition: background-color 200ms;
    color: ${colors.grey[650]};
  }

  ${({ $error }) => !!$error && css5`
      ${inputCommonStyles_error}
      &::file-selector-button {
        color: rgba(255, 0, 0, 0.5);
        border-color: red;
      }
    `};
  ${({ $disabled }) => !!$disabled && css5`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/TextInput/index.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var TextInput = forwardRef(({ label, id, required, errorMessage, disabled, autoFocus, ...rest }, ref) => {
  const localRef = useRef(null);
  useEffect(() => {
    if (autoFocus && localRef.current) {
      localRef.current.focus();
    }
  }, [autoFocus]);
  return /* @__PURE__ */ jsxs4(StyledTextInput, { children: [
    /* @__PURE__ */ jsxs4(StyledTextInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
      /* @__PURE__ */ jsx4("span", { children: "*" }),
      label
    ] }),
    /* @__PURE__ */ jsx4(
      StyledInput,
      {
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
        ...rest,
        $disabled: disabled,
        $error: !!errorMessage
      }
    ),
    errorMessage && /* @__PURE__ */ jsx4("p", { className: "error", children: errorMessage })
  ] });
});
TextInput.displayName = "TextInput";

// src/components/certificate-elements/CertificateUploadForm/styles.ts
import styled4 from "styled-components";
var StyledCertificateUpload = styled4.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 12px;
`;
var StyledCertificateForm = styled4.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid ${colors.grey[300]};
  background: #fff;
  padding: 24px;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.l)`
   padding: 18px;
  `}
  h3 {
    color: ${colors.grey[900]};
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: 12px;
  }
`;

// src/components/certificate-elements/CertificateUploadForm/index.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var CertificateUploadForm = ({ onSubmit, onReset, certificateAlreadyUploaded }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: certificateFormError }
  } = useForm();
  const handleFormSubmit = async ({ certificate, password }) => {
    const certificateData = await readFileAsArrayBuffer(certificate[0]);
    onSubmit(certificateData, password);
  };
  const onUploadedAnotherCertificate = async () => {
    onReset();
    reset();
  };
  return /* @__PURE__ */ jsxs5(StyledCertificateUpload, { children: [
    /* @__PURE__ */ jsxs5(StyledCertificateForm, { onSubmit: handleSubmit(handleFormSubmit), id: "uploadCertificateForm", children: [
      /* @__PURE__ */ jsx5("h3", { children: !certificateAlreadyUploaded ? t("practitioner.certificateUpload.titleUpload") : t("practitioner.certificateUpload.titlePassword") }),
      /* @__PURE__ */ jsxs5("div", { className: "inputs", children: [
        /* @__PURE__ */ jsx5(
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
        /* @__PURE__ */ jsx5(
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
      /* @__PURE__ */ jsx5(
        Button,
        {
          title: !certificateAlreadyUploaded ? t("practitioner.certificateUpload.submitButtonUpload") : t("practitioner.certificateUpload.submitButtonPassword"),
          type: "submit",
          form: "uploadCertificateForm"
        }
      )
    ] }),
    certificateAlreadyUploaded && /* @__PURE__ */ jsx5(Button, { title: t("practitioner.certificateUpload.resetButton"), type: "reset", view: "outlined", form: "uploadCertificateForm", handleClick: onUploadedAnotherCertificate })
  ] });
};

// src/components/certificate-elements/PractitionerCertificate/styles.ts
import styled5 from "styled-components";
var StyledPractitionerCertificate = styled5.div`
  width: 50%;
  min-width: 700px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ${responsiveMediaQueries.down(displayResolution.m)`
  width: 100%;
    min-width: 100%;
  `}
`;

// src/components/certificate-elements/PractitionerCertificate/index.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var PractitionerCertificate = ({
  onResetCertificate,
  certificateValid,
  onUploadCertificate,
  certificateUploaded,
  errorWhileVerifyingCertificate
}) => {
  const { t } = useTranslation2();
  return /* @__PURE__ */ jsxs6(StyledPractitionerCertificate, { children: [
    certificateValid && !errorWhileVerifyingCertificate && /* @__PURE__ */ jsx6(Alert, { status: "success", title: t("practitioner.certificateFeedback.successTitle"), description: t("practitioner.certificateFeedback.successDescription") }),
    !certificateValid && !certificateUploaded && /* @__PURE__ */ jsx6(Alert, { status: "error", title: t("practitioner.certificateFeedback.failureTitle"), description: t("practitioner.certificateFeedback.failureDescription") }),
    errorWhileVerifyingCertificate && /* @__PURE__ */ jsx6(Alert, { status: "error", title: t("practitioner.certificateFeedback.verificationErrorTitle"), description: errorWhileVerifyingCertificate }),
    certificateUploaded && errorWhileVerifyingCertificate && /* @__PURE__ */ jsx6(Alert, { status: "error", title: t("practitioner.certificateUpload.passwordMissingTitle"), description: t("practitioner.certificateUpload.passwordMissingDescription") }),
    (!certificateValid || !certificateUploaded) && /* @__PURE__ */ jsx6(CertificateUploadForm, { onSubmit: onUploadCertificate, onReset: onResetCertificate, certificateAlreadyUploaded: certificateUploaded })
  ] });
};
export {
  CertificateService,
  FhcService,
  I18nService,
  IndexedDbService,
  PractitionerCertificate,
  SamSdkService
};
//# sourceMappingURL=index.mjs.map