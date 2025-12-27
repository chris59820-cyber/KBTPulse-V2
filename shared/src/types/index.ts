// Types partagés
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

export enum UserRole {
  ADMIN = 'ADMIN',
  CAFF = 'CAFF',
  RDC = 'RDC',
  PREPA = 'PRÉPA',
  CE = 'CE',
  RH = 'RH',
  OTHER = 'AUTRE',
  EMPLOYEE = 'EMPLOYEE',
}

export enum ContractType {
  CDI = 'CDI',
  CDD = 'CDD',
  ETT = 'ETT',
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
  guardPostGps?: { latitude: number; longitude: number };
  meetingPoints?: Array<{ latitude: number; longitude: number }>;
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

export enum InterventionStatus {
  DIAGNOSED = 'Diagnostiqué',
  TO_PLAN = 'À planifier',
  PLANNED = 'Planifiée',
  LAUNCHED = 'Lancée',
  IN_PROGRESS = 'En-cours',
  COMPLETED = 'Terminée',
  CANCELLED = 'Annulée',
}

export enum InterventionType {
  SCAFFOLDING = 'Échafaudage',
  CALORIFUGE = 'Calorifuge',
}

export enum InterventionNature {
  INSTALLATION = 'Pose',
  REMOVAL = 'Dépose',
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
  plannedDuration?: number; // en heures
  actualDuration?: number; // en heures
  progress?: number; // pourcentage
  amount?: number;
  remainingAmount?: number;
  codeAffaire?: string;
  orderNumber?: string;
  clientContact?: Contact;
  gpsLocation?: { latitude: number; longitude: number };
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

export enum WorksiteStatus {
  OPEN = 'Ouvert',
  IN_PROGRESS = 'En cours',
  CLOSED = 'Clôturé',
}

export enum AbsenceType {
  CP = 'CP', // Congés payés
  RTT = 'RTT', // Réduction du temps de travail
  REST = 'Repos', // Repos compensateur
  RC = 'RC', // Repos compensateur
  RL = 'RL', // Repos légal
  EF = 'EF', // Événement familial
  SICK = 'Maladie', // Arrêt maladie (avec justificatif)
  AT = 'AT', // Accident du travail
  TRAINING = 'Formation', // Formation professionnelle
  MEDICAL_VISIT = 'Visite médicale', // Visite médicale
  UNJUSTIFIED = 'Absence injustifiée',
}

export interface Absence {
  id: string;
  userId: string;
  type: AbsenceType;
  startDate: Date;
  endDate?: Date;
  duration: number; // en jours ou heures
  comments?: string;
  status: AbsenceStatus;
  justification?: string; // URL du document justificatif
  validatedBy?: string;
  validatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum AbsenceStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum MaterialState {
  NEW = 'neuf',
  GOOD = 'bon',
  USED = 'usé',
  OUT_OF_ORDER = 'HS',
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

export enum MaterialCategory {
  INDIVIDUAL_TOOLS = 'Outillage individuel',
  COLLECTIVE_TOOLS = 'Outillage collectif',
  EPI = 'EPI',
  CONSUMABLES = 'Consommables',
  INVENTORY = 'Inventaire',
  SUPPLIES = 'Fournitures',
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

export enum VehicleType {
  CAR = 'Voiture',
  TRUCK = 'Camion',
  MACHINERY = 'Engin',
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

export enum DocumentType {
  IDENTITY = 'Carte d\'identité',
  PASSPORT = 'Passeport',
  DRIVING_LICENSE = 'Permis de conduire',
  REGISTRATION = 'Carte grise',
  MEDICAL_VISIT = 'Visite médicale',
  AUTHORIZATION = 'Habilitation',
  TRAINING = 'Formation',
  SITE_ACCESS = 'Accès site client',
  PLAN = 'Plan',
  PHOTO = 'Photo',
  PDP = 'PDP',
  MOS = 'MOS',
  RISK_ANALYSIS = 'Analyse de risques',
  SAFETY_CHECKLIST = 'Check-list sécurité',
  INTERVENTION_REPORT = 'Compte rendu d\'intervention',
  AUTO_CONTROL = 'Rapport d\'auto-contrôle',
  VEHICLE_REPORT = 'Constat de véhicule',
  OTHER = 'Autre',
}

export enum NotificationType {
  DOCUMENT_EXPIRING = 'document_expiring',
  LEAVE_VALIDATION = 'leave_validation',
  FORMATION_VALIDATION = 'formation_validation',
  NEW_ASSIGNMENT = 'new_assignment',
  PLANNING_MODIFIED = 'planning_modified',
  MESSAGE = 'message',
  SECURITY_ALERT = 'security_alert',
  INTERVENTION_STATUS_CHANGED = 'intervention_status_changed',
  OTHER = 'other',
}