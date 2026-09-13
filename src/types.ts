export type ActiveTab =
  | 'dashboard'
  | 'new_ujuri'
  | 'ujuri_vivaran'
  | 'office_mon_form'
  | 'office_mon_detail'
  | 'dress_time_form'
  | 'dress_time_detail'
  | 'survey_form'
  | 'survey_dashboard'
  | 'investigation'
  | 'technical_audit'
  | 'project_mon_form'
  | 'project_mon_dashboard'
  | 'promotional_programs'
  | 'risk_map'
  | 'section_reports'
  | 'calendar'
  | 'password_change'
  | 'audit_log'
  | 'user_management';

export interface UjuriRecord {
  id: string;
  registrationNumber: string;
  registrationDate: string; // BS date e.g. २०८३-०४-२५
  complainantName: string;
  opponentName: string;
  ministry: string;
  province: string;
  district: string;
  municipality: string;
  complaintType: string;
  complaintSource: string;
  priority: 'उच्च' | 'मध्यम' | 'सामान्य' | 'न्यून';
  complaintDescription: string;
  committeeDecision: string;
  finalDecisionType: string;
  finalDecision: string;
  decisionDate?: string;
  assignedDepartment: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  remarks: string;
  attachments?: string[];
}

export interface FacilityCheck {
  name: string;
  status: 'cha' | 'chaina' | 'samanya';
}

export interface OfficeMonitoringRecord {
  id: string;
  officeName: string;
  officeType: string;
  province: string;
  district: string;
  municipality: string;
  monitoringDate: string;
  monitoringTeam: string;
  monitoringPosition: string;
  address: string;
  serviceFlow: Record<string, string>;
  facilities: FacilityCheck[];
  totalStaff: number;
  workingStaff: number;
  vacantStaff: number;
  mainServices: string;
  issuesFound: string;
  recommendations: string;
  remarks: string;
  status: 'done' | 'pending';
}

export interface StaffViolationEntry {
  id: string;
  category: 'अनुपस्थिति' | 'पोशाक पालना नगरेका';
  position: string;
  symbolNo: string;
  employeeName: string;
  remarks: string;
}

export interface DressTimeRecord {
  id: string;
  province: string;
  district: string;
  localLevel: string;
  officeName: string;
  officePhone: string;
  monitoringDate: string;
  monitoringTime: string;
  totalStaff: number;
  activeStaff: number;
  vacantStaff: number;
  staffViolations: StaffViolationEntry[];
  teamLeader: string;
  teamLeaderPost: string;
  officialName: string;
  officialPost: string;
  timeViolationsCount: number;
  dressViolationsCount: number;
  totalViolations: number;
}

export interface CitizenSurveyRecord {
  id: string;
  surveyDate: string;
  province: string;
  district: string;
  localLevel: string;
  fullAddress: string;
  gender: 'पुरुष' | 'महिला' | 'अन्य';
  officeVisited: string;
  office2?: string;
  office3?: string;
  overallSatisfaction: number; // 1-5
  isSatisfied: boolean;
  satisfactionReasons?: string[];
  dissatisfactionReasons?: string[];
  serviceQuality: 'राम्रो' | 'मध्यम' | 'कमजोर';
  tookOutsideHelp: boolean;
  outsideHelper?: string;
  paidBribe: boolean;
  bribeRecipient?: string;
  knowsCitizenCharter: boolean;
  receivedServiceInTime: boolean;
  delayReason?: string;
  filedComplaint: boolean;
  attendedPublicHearing: boolean;
  knowsRightToInformation: boolean;
  goodOffices: string;
  weakOffices: string;
  suggestions: string;
}

export interface InvestigationRecord {
  id: string;
  sn: number;
  regNo: string;
  regDate: string;
  complainant: string;
  respondent: string;
  office: string;
  details: string;
  investigationDate: string;
  reportDate: string;
  reportSummary: string;
  status: 'completed' | 'ongoing';
  files?: string[];
}

export interface TechnicalAuditRecord {
  id: string;
  sn?: number;
  projectName: string;
  relatedAgency?: string;
  agency?: string;
  province?: string;
  district?: string;
  projectType?: string;
  contractAmount?: string;
  auditDate: string;
  auditorName?: string;
  auditorPost?: string;
  keyFindings?: string;
  recommendations?: string;
  status: 'completed' | 'in_progress';
  ncrList?: string[]; // Non-conformance reports
  disposalDate?: string;
  disposalInfoDate?: string;
  remarks?: string;
  files?: string[];
}

export interface TeamMemberEntry {
  name: string;
  role: string;
  date: string;
}

export interface ProjectChecklistItem {
  topic: string;
  answer: 'yes' | 'no';
  remark: string;
}

export interface ProjectMonitoringRecord {
  id: string;
  sn?: number;
  projectName: string;
  province: string;
  district: string;
  localLevel?: string;
  wardNo?: string;
  fullAddress?: string;
  sector?: string;
  ministry?: string;
  implementingBody?: string;
  contractorName?: string;
  agreementNo?: string;
  agreementDate?: string;
  startDate?: string;
  expectedEndDate?: string;
  approvedCost?: number;
  estimatedCost?: string | number;
  expenditureSoFar?: number;
  physicalProgress: number; // percentage
  financialProgress?: number;
  monitoringDate?: string;
  lastMonitoredDate?: string;
  monitoringTeam?: string;
  majorObstacles?: string;
  status: 'done' | 'progress' | 'slow' | 'notstarted' | 'completed' | 'critical';
  isRisk?: boolean;
  issuesCount?: number;
  overallRemarks?: string;
  suggestions?: string;
  teamMembers?: TeamMemberEntry[];
  checklists?: {
    categoryKey: string;
    categoryLabel: string;
    items: ProjectChecklistItem[];
  }[];
  photos?: string[];
}

export interface PromotionalProgramRecord {
  id: string;
  name: string;
  quarter: 'पहिलो' | 'दोस्रो' | 'तेस्रो' | 'चौथो';
  date: string;
  place: string;
  targetGroup: string;
  expectedParticipants: number;
  status: 'upcoming' | 'ongoing' | 'done';
  fiscalYear: string;
  photos?: string[];
}

export interface PromotionalRecord {
  id: string;
  sn: number;
  programName: string;
  programType: string;
  targetGroup: string;
  location: string;
  date: string;
  participantsCount: number;
  budget: string;
  objectives: string;
  outcomes: string;
  status: 'completed' | 'upcoming';
}

export interface CalendarMeetingEvent {
  id: string;
  date: string; // YYYY-MM-DD (BS)
  time: string; // e.g. "11:00"
  title: string;
  type: 'उजुरी व्यवस्थापन समिति बैठक' | 'मासिक समीक्षा बैठक' | 'अन्य बैठक/कार्यक्रम';
  description?: string;
  location?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'monitoring' | 'meeting' | 'hearing' | 'holiday';
  location: string;
  description?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'mahashakha' | 'shakha';
  mahashakha: string;
  shakha: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface SystemUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  designation: string;
  branch: string;
  role: 'super_admin' | 'admin' | 'officer' | 'operator';
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface AuditLogItem {
  id: string;
  instanceId: string;
  instanceName: string;
  activity: 'create' | 'update' | 'delete' | 'login' | 'logout';
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  details?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
}
