# Cardinal Prescription React — Context

This document defines the shared language for cardinal-prescription-react's medication-lookup
and prescription-sending domain, as the codebase evolves from Belgium-only to a
country-configurable component (`be`, `ch`, later `fr`).

## Language

- **MedicationType** — the library's own normalized medication representation, mapped from
  whichever country's medication source is active; the type consumers of this library actually
  see (as opposed to a raw SAM/medINDEX SDK entity).
- **Country config** — the single configuration point (`country: 'be' | 'ch' | 'fr'`) that
  selects medication source, transmission protocol, and regulatory UI behavior at runtime; this
  library ships as one configurable package, not per-country packages.
- **Regulatory bag** — the per-country extension slot on `MedicationType`
  (`regulatory.be`, `regulatory.ch`, ...) holding fields that only exist for that country's
  regulator (Belgian reimbursement chapters, commercialisation dates, black-triangle; Swiss
  `swissmedicCategory`, CHF pricing, narcotic/cold-chain flags). A missing key means the concept
  doesn't exist for that country, not that data happened to be absent.
- **MedicationProvider** — the interface this library defines for fetching medication data. The
  consuming app constructs a concrete provider (`SamMedicationProvider`,
  `MedIndexMedicationProvider`) and passes it in, replacing today's raw `sdk: IccBesamv2Api`
  prop threaded through `MedicationSearch`.
- **AMP / AMPP / VMP / VMPGroup / NMP / DMPP** — SAM's (Belgian) product hierarchy: existing
  vocabulary, kept as-is rather than renamed, since it's specific to the `be` source.
- **CNK** — Belgian pack code (SAM's package identifier); the Swiss equivalent concept is
  **pharmacode** (medINDEX).
- **RID** — the recip-e prescription id, assigned when a prescription is sent to recip-e;
  Belgian-only.
- **FHC / STS** — the Belgian certificate-based authentication/transmission layer used to send
  prescriptions to recip-e; Belgian-only, no Swiss or French equivalent exists yet.
- **medINDEX** — the Swiss medication reference database (HCI Solutions AG), consumed via a new
  read-only REST layer (`hci-medication-module`'s `standalone` module) that requires no auth
  (public reference data, no PHI).
- **Regulatory badge renderer** — the generic, config-driven replacement for today's hardcoded
  Belgian `MedicationCard` sub-components (`ReimbursementsContent`, etc.). Iterates over
  whatever keys exist in `regulatory.<country>` and renders whatever badge is registered for
  that key, instead of new bespoke components being added per country.

## Relationships

- A **Country config** selects exactly one **MedicationProvider** implementation and determines
  which key of `MedicationType.regulatory` gets populated.
- A **MedicationProvider** wraps one country's medication source (SAM's `IccBesamv2Api` for
  `be`, the new medINDEX SDK for `ch`) and returns **MedicationType** instances — it never
  leaks the country's raw SDK types into the rest of the component tree.
- **AMP/AMPP/VMP/VMPGroup/NMP/DMPP** are SAM-specific (`be`) source shapes, mapped into
  **MedicationType** by the `be` provider; medINDEX's `MedicationProductDto`/
  `MedicationPackageDto` are the `ch` equivalent, mapped by the `ch` provider.
- **RID** and **FHC/STS** belong to the prescription-*sending* side (recip-e), a separate
  concern from medication *lookup*. This phase's `ch` work does not touch prescription sending.
- The **Regulatory badge renderer** reads `MedicationType.regulatory` generically — adding a
  new regulatory field for any country means registering a badge for that key, never adding a
  new `MedicationCard` sub-component or a `country === 'xx'` branch.

## Example dialogue

Dev: "Should the `ch` MedicationProvider set `regulatory.be` on the medications it returns?"
Domain expert: "No — `regulatory.be` should simply be absent (not present-but-null) for anything
sourced from medINDEX. Only the `be` provider ever populates `regulatory.be`. A null
reimbursement chapter would read as 'we don't know the chapter,' but Switzerland doesn't have
reimbursement chapters in this data model at all — the key must not exist."

## Language (France, `fr` — researched, not yet implemented)

- **BDPM** (Base de Données Publique des Médicaments) — France's official medication reference
  database (ANSM/HAS/UNCAM), with a public REST API. This is the `fr` medication *source*,
  distinct from both SAM (`be`) and medINDEX (`ch`) — `fr` will need its own
  `MedicationProvider` implementation, not a reuse of the `ch` one.
- **CIS** / **CIP7** / **CIP13** — BDPM's identifiers: CIS identifies the pharmaceutical
  specialty (roughly SAM's AMP / medINDEX's product level), CIP7/CIP13 identify the commercial
  presentation/pack (roughly SAM's CNK / medINDEX's pharmacode level).
- **INS** (Identité Nationale de Santé) — France's mandatory (since 2021) unique patient
  identifier (matricule + 5 identity traits), used for referencing health data. Analogous role
  to Belgium's SSIN, but a distinct identifier scheme — not interchangeable.
- **RPPS** (Répertoire Partagé des Professionnels de Santé) — France's unique prescriber
  identifier, authenticated via **Pro Santé Connect** (RPPS-based auth) or a physical
  professional health card. Analogous role to Belgium's NIHII, distinct scheme.
- **Ordonnance numérique** — France's e-prescription transmission mechanism: the prescriber's
  software generates a unique prescription id + QR code, submitted to a secure database hosted
  by l'Assurance Maladie; the pharmacist scans the QR code to retrieve dispensing data. This is
  the `fr` equivalent of recip-e, but protocol-incompatible with it (no RID/FHC/STS reuse
  possible).
- **Ségur numérique / LAP certification** — France requires prescription software to be
  formally referenced under the "Ségur numérique en santé" program and certified by HAS as a
  **LAP** (Logiciel d'Aide à la Prescription) before it can be used for real prescriptions. This
  is a regulatory/certification burden with no Belgian or Swiss equivalent in this codebase's
  current scope — implementing `fr` support is not purely an engineering/mapping exercise.

## Flagged ambiguities

- **"SDK" is overloaded.** `@icure/medication-sdk` (existing dependency, currently unused in
  `src/`) is an unrelated dosage-text parser (chevrotain-based lexer/parser for free-text dosage
  instructions), not a product-lookup client. The new medINDEX client being built as a
  submodule of `hci-medication-importer` needs a distinct package name (e.g.
  `@icure/medindex-sdk`) to avoid confusion with this existing, unrelated package.
- **Gap-analysis scope vs. rollout order.** The requested gap analysis is `be` vs `fr`
  (prescription-sending flow), even though this phase's country rollout adds `ch` (not `fr`)
  first. Resolved: `ch` stays a medication-*source* swap only (no prescription-transmission
  work — no Swiss recip-e equivalent exists yet); the full `be`-vs-`fr` prescription-flow gap
  analysis proceeds now anyway, to design the abstraction generically ahead of `fr`'s eventual
  implementation.
- **Certification is a `fr`-specific non-goal, not an oversight.** Ségur/LAP certification is a
  legal prerequisite for shipping real French prescriptions, but it is explicitly out of scope
  for this phase's gap analysis, which covers the *technical* be-vs-fr gap only (data source,
  identifiers, transmission protocol) so the codebase's abstraction is shaped correctly ahead of
  time. The certification process itself is a separate, later initiative.
