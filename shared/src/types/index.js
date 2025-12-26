"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentType = exports.VehicleType = exports.MaterialCategory = exports.MaterialState = exports.AbsenceStatus = exports.AbsenceType = exports.WorksiteStatus = exports.InterventionNature = exports.InterventionType = exports.InterventionStatus = exports.ContractType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CAFF"] = "CAFF";
    UserRole["RDC"] = "RDC";
    UserRole["PREPA"] = "PR\u00C9PA";
    UserRole["CE"] = "CE";
    UserRole["RH"] = "RH";
    UserRole["OTHER"] = "AUTRE";
    UserRole["EMPLOYEE"] = "EMPLOYEE";
})(UserRole || (exports.UserRole = UserRole = {}));
var ContractType;
(function (ContractType) {
    ContractType["CDI"] = "CDI";
    ContractType["CDD"] = "CDD";
    ContractType["ETT"] = "ETT";
})(ContractType || (exports.ContractType = ContractType = {}));
var InterventionStatus;
(function (InterventionStatus) {
    InterventionStatus["DIAGNOSED"] = "Diagnostiqu\u00E9";
    InterventionStatus["TO_PLAN"] = "\u00C0 planifier";
    InterventionStatus["PLANNED"] = "Planifi\u00E9e";
    InterventionStatus["LAUNCHED"] = "Lanc\u00E9e";
    InterventionStatus["IN_PROGRESS"] = "En-cours";
    InterventionStatus["COMPLETED"] = "Termin\u00E9e";
    InterventionStatus["CANCELLED"] = "Annul\u00E9e";
})(InterventionStatus || (exports.InterventionStatus = InterventionStatus = {}));
var InterventionType;
(function (InterventionType) {
    InterventionType["SCAFFOLDING"] = "\u00C9chafaudage";
    InterventionType["CALORIFUGE"] = "Calorifuge";
})(InterventionType || (exports.InterventionType = InterventionType = {}));
var InterventionNature;
(function (InterventionNature) {
    InterventionNature["INSTALLATION"] = "Pose";
    InterventionNature["REMOVAL"] = "D\u00E9pose";
})(InterventionNature || (exports.InterventionNature = InterventionNature = {}));
var WorksiteStatus;
(function (WorksiteStatus) {
    WorksiteStatus["OPEN"] = "Ouvert";
    WorksiteStatus["IN_PROGRESS"] = "En cours";
    WorksiteStatus["CLOSED"] = "Cl\u00F4tur\u00E9";
})(WorksiteStatus || (exports.WorksiteStatus = WorksiteStatus = {}));
var AbsenceType;
(function (AbsenceType) {
    AbsenceType["CP"] = "CP";
    AbsenceType["RTT"] = "RTT";
    AbsenceType["REST"] = "Repos";
    AbsenceType["RC"] = "RC";
    AbsenceType["RL"] = "RL";
    AbsenceType["EF"] = "EF";
    AbsenceType["SICK"] = "Maladie";
    AbsenceType["AT"] = "AT";
    AbsenceType["TRAINING"] = "Formation";
    AbsenceType["UNJUSTIFIED"] = "Absence injustifi\u00E9e";
})(AbsenceType || (exports.AbsenceType = AbsenceType = {}));
var AbsenceStatus;
(function (AbsenceStatus) {
    AbsenceStatus["PENDING"] = "pending";
    AbsenceStatus["APPROVED"] = "approved";
    AbsenceStatus["REJECTED"] = "rejected";
})(AbsenceStatus || (exports.AbsenceStatus = AbsenceStatus = {}));
var MaterialState;
(function (MaterialState) {
    MaterialState["NEW"] = "neuf";
    MaterialState["GOOD"] = "bon";
    MaterialState["USED"] = "us\u00E9";
    MaterialState["OUT_OF_ORDER"] = "HS";
})(MaterialState || (exports.MaterialState = MaterialState = {}));
var MaterialCategory;
(function (MaterialCategory) {
    MaterialCategory["INDIVIDUAL_TOOLS"] = "Outillage individuel";
    MaterialCategory["COLLECTIVE_TOOLS"] = "Outillage collectif";
    MaterialCategory["EPI"] = "EPI";
    MaterialCategory["CONSUMABLES"] = "Consommables";
    MaterialCategory["INVENTORY"] = "Inventaire";
    MaterialCategory["SUPPLIES"] = "Fournitures";
})(MaterialCategory || (exports.MaterialCategory = MaterialCategory = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType["CAR"] = "Voiture";
    VehicleType["TRUCK"] = "Camion";
    VehicleType["MACHINERY"] = "Engin";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["IDENTITY"] = "Carte d'identit\u00E9";
    DocumentType["PASSPORT"] = "Passeport";
    DocumentType["DRIVING_LICENSE"] = "Permis de conduire";
    DocumentType["REGISTRATION"] = "Carte grise";
    DocumentType["MEDICAL_VISIT"] = "Visite m\u00E9dicale";
    DocumentType["AUTHORIZATION"] = "Habilitation";
    DocumentType["TRAINING"] = "Formation";
    DocumentType["SITE_ACCESS"] = "Acc\u00E8s site client";
    DocumentType["PLAN"] = "Plan";
    DocumentType["PHOTO"] = "Photo";
    DocumentType["PDP"] = "PDP";
    DocumentType["MOS"] = "MOS";
    DocumentType["RISK_ANALYSIS"] = "Analyse de risques";
    DocumentType["SAFETY_CHECKLIST"] = "Check-list s\u00E9curit\u00E9";
    DocumentType["INTERVENTION_REPORT"] = "Compte rendu d'intervention";
    DocumentType["AUTO_CONTROL"] = "Rapport d'auto-contr\u00F4le";
    DocumentType["VEHICLE_REPORT"] = "Constat de v\u00E9hicule";
    DocumentType["OTHER"] = "Autre";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
//# sourceMappingURL=index.js.map