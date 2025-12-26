export interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    profile?: UserProfile;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserProfile {
    id: string;
    userId: string;
    function: string;
    matricule?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: Date;
    photo?: string;
    dateOfHire?: Date;
    contractType?: ContractType;
    coefficient?: number;
    hourlyRate?: number;
    skills?: string[];
    emergencyContact?: EmergencyContact;
    kmFromHome?: number;
    kmAllowance?: number;
}
export interface EmergencyContact {
    name: string;
    phone: string;
    relationship?: string;
}
export declare enum UserRole {
    ADMIN = "ADMIN",
    CAFF = "CAFF",
    RDC = "RDC",
    PREPA = "PR\u00C9PA",
    CE = "CE",
    RH = "RH",
    OTHER = "AUTRE",
    EMPLOYEE = "EMPLOYEE"
}
export declare enum ContractType {
    CDI = "CDI",
    CDD = "CDD",
    ETT = "ETT"
}
export interface Perimeter {
    id: string;
    name: string;
    address: string;
    gpsLatitude?: number;
    gpsLongitude?: number;
    workingHours?: string;
    description?: string;
    timezone?: string;
    dateFormat?: string;
    currency?: string;
    language?: string;
}
export interface Site {
    id: string;
    name: string;
    sector?: string;
    address: string;
    gpsLatitude?: number;
    gpsLongitude?: number;
    guardPostGps?: {
        latitude: number;
        longitude: number;
    };
    meetingPoints?: Array<{
        latitude: number;
        longitude: number;
    }>;
    emergencyNumber?: string;
    requiredDocuments?: string[];
    requiredTrainings?: string[];
    specificEquipment?: string[];
}
export interface SiteHierarchy {
    site: Site;
    sectors?: SiteSector[];
}
export interface SiteSector {
    id: string;
    siteId: string;
    name: string;
    units?: SiteUnit[];
}
export interface SiteUnit {
    id: string;
    sectorId: string;
    name: string;
    buildings?: SiteBuilding[];
}
export interface SiteBuilding {
    id: string;
    unitId: string;
    name: string;
    floors?: SiteFloor[];
}
export interface SiteFloor {
    id: string;
    buildingId: string;
    name: string;
    equipments?: SiteEquipment[];
}
export interface SiteEquipment {
    id: string;
    floorId: string;
    name: string;
}
export declare enum InterventionStatus {
    DIAGNOSED = "Diagnostiqu\u00E9",
    TO_PLAN = "\u00C0 planifier",
    PLANNED = "Planifi\u00E9e",
    LAUNCHED = "Lanc\u00E9e",
    IN_PROGRESS = "En-cours",
    COMPLETED = "Termin\u00E9e",
    CANCELLED = "Annul\u00E9e"
}
export declare enum InterventionType {
    SCAFFOLDING = "\u00C9chafaudage",
    CALORIFUGE = "Calorifuge"
}
export declare enum InterventionNature {
    INSTALLATION = "Pose",
    REMOVAL = "D\u00E9pose"
}
export interface Intervention {
    id: string;
    name: string;
    siteId: string;
    sectorId?: string;
    unitId?: string;
    buildingId?: string;
    floorId?: string;
    equipmentId?: string;
    interventionType: InterventionType;
    nature: InterventionNature;
    status: InterventionStatus;
    rdcId?: string;
    ceId?: string;
    responsibleId?: string;
    plannedStartDate?: Date;
    plannedEndDate?: Date;
    actualStartDate?: Date;
    actualEndDate?: Date;
    plannedDuration?: number;
    actualDuration?: number;
    progress?: number;
    amount?: number;
    remainingAmount?: number;
    codeAffaire?: string;
    orderNumber?: string;
    clientContact?: Contact;
    gpsLocation?: {
        latitude: number;
        longitude: number;
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface Contact {
    name: string;
    phone?: string;
    email?: string;
}
export interface Worksite {
    id: string;
    name: string;
    rdcId?: string;
    status: WorksiteStatus;
    quoteAmount?: number;
    orderAmount?: number;
    incurredCosts?: number;
    remainingWork?: number;
    budgetVariance?: number;
    profitability?: number;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum WorksiteStatus {
    OPEN = "Ouvert",
    IN_PROGRESS = "En cours",
    CLOSED = "Cl\u00F4tur\u00E9"
}
export declare enum AbsenceType {
    CP = "CP",
    RTT = "RTT",
    REST = "Repos",
    RC = "RC",
    RL = "RL",
    EF = "EF",
    SICK = "Maladie",
    AT = "AT",
    TRAINING = "Formation",
    UNJUSTIFIED = "Absence injustifi\u00E9e"
}
export interface Absence {
    id: string;
    userId: string;
    type: AbsenceType;
    startDate: Date;
    endDate?: Date;
    duration: number;
    comments?: string;
    status: AbsenceStatus;
    justification?: string;
    validatedBy?: string;
    validatedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum AbsenceStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum MaterialState {
    NEW = "neuf",
    GOOD = "bon",
    USED = "us\u00E9",
    OUT_OF_ORDER = "HS"
}
export interface Material {
    id: string;
    name: string;
    reference: string;
    category: MaterialCategory;
    state: MaterialState;
    acquisitionValue?: number;
    assignedToUserId?: string;
    assignedToInterventionId?: string;
    location?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum MaterialCategory {
    INDIVIDUAL_TOOLS = "Outillage individuel",
    COLLECTIVE_TOOLS = "Outillage collectif",
    EPI = "EPI",
    CONSUMABLES = "Consommables",
    INVENTORY = "Inventaire",
    SUPPLIES = "Fournitures"
}
export interface Vehicle {
    id: string;
    registration: string;
    type: VehicleType;
    brand?: string;
    model?: string;
    assignedToUserId?: string;
    assignedToInterventionId?: string;
    assignmentDate?: Date;
    returnDate?: Date;
    mileage?: number;
    photo?: string;
    inspectionReport?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum VehicleType {
    CAR = "Voiture",
    TRUCK = "Camion",
    MACHINERY = "Engin"
}
export interface Document {
    id: string;
    name: string;
    type: DocumentType;
    filePath: string;
    fileSize?: number;
    mimeType?: string;
    expirationDate?: Date;
    userId?: string;
    interventionId?: string;
    uploadedBy: string;
    uploadedAt: Date;
}
export declare enum DocumentType {
    IDENTITY = "Carte d'identit\u00E9",
    PASSPORT = "Passeport",
    DRIVING_LICENSE = "Permis de conduire",
    REGISTRATION = "Carte grise",
    MEDICAL_VISIT = "Visite m\u00E9dicale",
    AUTHORIZATION = "Habilitation",
    TRAINING = "Formation",
    SITE_ACCESS = "Acc\u00E8s site client",
    PLAN = "Plan",
    PHOTO = "Photo",
    PDP = "PDP",
    MOS = "MOS",
    RISK_ANALYSIS = "Analyse de risques",
    SAFETY_CHECKLIST = "Check-list s\u00E9curit\u00E9",
    INTERVENTION_REPORT = "Compte rendu d'intervention",
    AUTO_CONTROL = "Rapport d'auto-contr\u00F4le",
    VEHICLE_REPORT = "Constat de v\u00E9hicule",
    OTHER = "Autre"
}
//# sourceMappingURL=index.d.ts.map