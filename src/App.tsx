import React, { useState } from 'react';
import {
  ActiveTab,
  UjuriRecord,
  OfficeMonitoringRecord,
  DressTimeRecord,
  CitizenSurveyRecord,
  InvestigationRecord,
  TechnicalAuditRecord,
  ProjectMonitoringRecord,
  PromotionalRecord,
  CalendarEvent,
  SystemUser,
  AuditLogEntry
} from './types';
import {
  INITIAL_UJURI_RECORDS,
  INITIAL_OFFICE_MONITORING,
  INITIAL_DRESS_TIME_MONITORING,
  INITIAL_SURVEYS,
  INITIAL_INVESTIGATIONS,
  INITIAL_TECHNICAL_AUDITS,
  INITIAL_PROJECT_MONITORING,
  INITIAL_PROMOTIONAL_RECORDS,
  INITIAL_CALENDAR_EVENTS_LIST,
  INITIAL_SYSTEM_USERS,
  INITIAL_AUDIT_LOG_ENTRIES
} from './data/initialData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { NewUjuriForm } from './components/Ujuri/NewUjuriForm';
import { UjuriVivaranTable } from './components/Ujuri/UjuriVivaranTable';
import { OfficeMonitoringForm } from './components/OfficeMonitoring/OfficeMonitoringForm';
import { OfficeMonitoringDetails } from './components/OfficeMonitoring/OfficeMonitoringDetails';
import { DressTimeForm } from './components/DressTime/DressTimeForm';
import { DressTimeDetails } from './components/DressTime/DressTimeDetails';
import { SurveyForm } from './components/Survey/SurveyForm';
import { SurveyDashboard } from './components/Survey/SurveyDashboard';
import { InvestigationView } from './components/Investigation/InvestigationView';
import { TechnicalAuditView } from './components/TechnicalAudit/TechnicalAuditView';
import { ProjectMonitoringView } from './components/ProjectMonitoring/ProjectMonitoringView';
import { PromotionalView } from './components/Promotional/PromotionalView';
import { CalendarView } from './components/Calendar/CalendarView';
import { UserManagementView } from './components/Admin/UserManagementView';
import { AuditLogView } from './components/Admin/AuditLogView';
import { ChangePasswordView } from './components/Admin/ChangePasswordView';
import { getCurrentNepaliDate } from './utils/nepaliDate';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('2083/84');

  // Core Data Collections
  const [ujuriRecords, setUjuriRecords] = useState<UjuriRecord[]>(INITIAL_UJURI_RECORDS);
  const [officeRecords, setOfficeRecords] = useState<OfficeMonitoringRecord[]>(INITIAL_OFFICE_MONITORING);
  const [dressTimeRecords, setDressTimeRecords] = useState<DressTimeRecord[]>(INITIAL_DRESS_TIME_MONITORING);
  const [surveyRecords, setSurveyRecords] = useState<CitizenSurveyRecord[]>(INITIAL_SURVEYS);
  const [investigationRecords, setInvestigationRecords] = useState<InvestigationRecord[]>(INITIAL_INVESTIGATIONS);
  const [technicalAuditRecords, setTechnicalAuditRecords] = useState<TechnicalAuditRecord[]>(INITIAL_TECHNICAL_AUDITS);
  const [projectRecords, setProjectRecords] = useState<ProjectMonitoringRecord[]>(INITIAL_PROJECT_MONITORING);
  const [promotionalRecords, setPromotionalRecords] = useState<PromotionalRecord[]>(INITIAL_PROMOTIONAL_RECORDS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS_LIST);
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>(INITIAL_SYSTEM_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOG_ENTRIES);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addAuditLog = (action: string, details: string) => {
    const { formatted } = getCurrentNepaliDate();
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: `${formatted} ${new Date().toLocaleTimeString('ne-NP')}`,
      user: 'प्रशासक (admin)',
      role: 'सुपर प्रशासक',
      action,
      details,
      ipAddress: '१९२.१६८.१.१०५'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Ujuri Handlers
  const handleSaveUjuri = (newRecord: UjuriRecord) => {
    setUjuriRecords((prev) => [newRecord, ...prev]);
    addAuditLog('नयाँ उजुरी दर्ता', `दर्ता नं: ${newRecord.registrationNumber} (उजुरकर्ता: ${newRecord.complainantName})`);
    showToast(`उजुरी सफलतापूर्वक दर्ता गरियो (दर्ता नं: ${newRecord.registrationNumber})`);
    setActiveTab('ujuri_vivaran');
  };

  const handleUpdateUjuri = (updated: UjuriRecord) => {
    setUjuriRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    addAuditLog('उजुरी सम्पादन', `दर्ता नं: ${updated.registrationNumber} विवरण अद्यावधिक गरियो`);
    showToast(`उजुरी विवरण अद्यावधिक भयो (${updated.registrationNumber})`);
  };

  const handleDeleteUjuri = (id: string) => {
    const record = ujuriRecords.find((r) => r.id === id);
    setUjuriRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('उजुरी मेटाइएको', `उजुरी दर्ता नं: ${record?.registrationNumber || id} हटाइयो`);
    showToast('उजुरी सफलतापूर्वक हटाइयो।');
  };

  // Office Monitoring Handlers
  const handleSaveOfficeMonitoring = (rec: OfficeMonitoringRecord) => {
    setOfficeRecords((prev) => [rec, ...prev]);
    addAuditLog('कार्यालय अनुगमन दर्ता', `कार्यालय: ${rec.officeName}, जिल्ला: ${rec.district}`);
    showToast(`कार्यालय अनुगमन प्रतिवेदन दर्ता भयो (${rec.officeName})`);
    setActiveTab('office_mon_detail');
  };

  const handleDeleteOfficeMonitoring = (id: string) => {
    setOfficeRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('कार्यालय अनुगमन हटाइएको', `अभिलेख ID: ${id}`);
    showToast('कार्यालय अनुगमन अभिलेख हटाइयो।');
  };

  // Dress Time Handlers
  const handleSaveDressTime = (rec: DressTimeRecord) => {
    setDressTimeRecords((prev) => [rec, ...prev]);
    addAuditLog('समय/पोशाक अनुगमन दर्ता', `कार्यालय: ${rec.officeName}, कैफियत: ${rec.totalViolations}`);
    showToast(`समय/पोशाक अनुगमन प्रतिवेदन दर्ता भयो (${rec.officeName})`);
    setActiveTab('dress_time_detail');
  };

  const handleDeleteDressTime = (id: string) => {
    setDressTimeRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('समय/पोशाक अनुगमन हटाइएको', `अभिलेख ID: ${id}`);
    showToast('अनुगमन अभिलेख हटाइयो।');
  };

  // Survey Handlers
  const handleSaveSurvey = (rec: CitizenSurveyRecord) => {
    setSurveyRecords((prev) => [rec, ...prev]);
    addAuditLog('नागरिक सर्वेक्षण दर्ता', `कार्यालय: ${rec.officeVisited}, जिल्ला: ${rec.district}`);
    showToast('नागरिक प्रतिक्रिया सर्वेक्षण सफलतापूर्वक सुरक्षित भयो।');
    setActiveTab('survey_dashboard');
  };

  // Investigation Handlers
  const handleAddInvestigation = (rec: InvestigationRecord) => {
    setInvestigationRecords((prev) => [rec, ...prev]);
    addAuditLog('छानबिन प्रविष्टि', `दर्ता नं: ${rec.regNo}`);
    showToast(`छानबिन अभिलेख सुरक्षित गरियो (${rec.regNo})`);
  };

  const handleUpdateInvestigation = (rec: InvestigationRecord) => {
    setInvestigationRecords((prev) => prev.map((r) => (r.id === rec.id ? rec : r)));
    addAuditLog('छानबिन अद्यावधिक', `दर्ता नं: ${rec.regNo}`);
    showToast(`छानबिन प्रतिवेदन अद्यावधिक गरियो (${rec.regNo})`);
  };

  const handleDeleteInvestigation = (id: string) => {
    setInvestigationRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('छानबिन हटाइएको', `ID: ${id}`);
    showToast('छानबिन अभिलेख हटाइयो।');
  };

  // Technical Audit Handlers
  const handleAddTechnicalAudit = (rec: TechnicalAuditRecord) => {
    setTechnicalAuditRecords((prev) => [rec, ...prev]);
    addAuditLog('प्राविधिक परीक्षण प्रविष्टि', `आयोजना: ${rec.projectName}`);
    showToast(`प्राविधिक परीक्षण अभिलेख सुरक्षित भयो (${rec.projectName})`);
  };

  const handleUpdateTechnicalAudit = (rec: TechnicalAuditRecord) => {
    setTechnicalAuditRecords((prev) => prev.map((r) => (r.id === rec.id ? rec : r)));
    addAuditLog('प्राविधिक परीक्षण अद्यावधिक', `आयोजना: ${rec.projectName}`);
    showToast(`प्राविधिक परीक्षण विवरण अद्यावधिक भयो`);
  };

  const handleDeleteTechnicalAudit = (id: string) => {
    setTechnicalAuditRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('प्राविधिक परीक्षण हटाइएको', `ID: ${id}`);
    showToast('प्राविधिक परीक्षण अभिलेख हटाइयो।');
  };

  // Project Monitoring Handlers
  const handleAddProject = (rec: ProjectMonitoringRecord) => {
    setProjectRecords((prev) => [rec, ...prev]);
    addAuditLog('आयोजना अनुगमन प्रविष्टि', `आयोजना: ${rec.projectName}`);
    showToast(`आयोजना अनुगमन अभिलेख सुरक्षित भयो (${rec.projectName})`);
  };

  const handleUpdateProject = (rec: ProjectMonitoringRecord) => {
    setProjectRecords((prev) => prev.map((r) => (r.id === rec.id ? rec : r)));
    addAuditLog('आयोजना अनुगमन अद्यावधिक', `आयोजना: ${rec.projectName}`);
    showToast(`आयोजना अनुगमन विवरण अद्यावधिक भयो`);
  };

  const handleDeleteProject = (id: string) => {
    setProjectRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('आयोजना अनुगमन हटाइएको', `ID: ${id}`);
    showToast('आयोजना अनुगमन अभिलेख हटाइयो।');
  };

  // Promotional Handlers
  const handleAddPromotional = (rec: PromotionalRecord) => {
    setPromotionalRecords((prev) => [rec, ...prev]);
    addAuditLog('प्रवर्द्धनात्मक कार्यक्रम प्रविष्टि', `कार्यक्रम: ${rec.programName}`);
    showToast(`कार्यक्रम सफलतापूर्वक दर्ता भयो (${rec.programName})`);
  };

  const handleUpdatePromotional = (rec: PromotionalRecord) => {
    setPromotionalRecords((prev) => prev.map((r) => (r.id === rec.id ? rec : r)));
    addAuditLog('प्रवर्द्धनात्मक कार्यक्रम अद्यावधिक', `कार्यक्रम: ${rec.programName}`);
    showToast(`कार्यक्रम विवरण अद्यावधिक भयो`);
  };

  const handleDeletePromotional = (id: string) => {
    setPromotionalRecords((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('प्रवर्द्धनात्मक कार्यक्रम हटाइएको', `ID: ${id}`);
    showToast('कार्यक्रम अभिलेख हटाइयो।');
  };

  // Calendar Handler
  const handleAddCalendarEvent = (event: CalendarEvent) => {
    setCalendarEvents((prev) => [event, ...prev]);
    addAuditLog('कार्यतालिका थप', `कार्यक्रम: ${event.title}`);
    showToast(`कार्यतालिकामा कार्यक्रम थपियो (${event.title})`);
  };

  // User Management Handlers
  const handleAddUser = (user: SystemUser) => {
    setSystemUsers((prev) => [user, ...prev]);
    addAuditLog('प्रयोगकर्ता सिर्जना', `नाम: ${user.name}, प्रयोगकर्ता नाम: ${user.username}`);
    showToast(`नयाँ प्रयोगकर्ता सिर्जना भयो (${user.name})`);
  };

  const handleUpdateUser = (user: SystemUser) => {
    setSystemUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    addAuditLog('प्रयोगकर्ता अद्यावधिक', `प्रयोगकर्ता: ${user.username}`);
    showToast(`प्रयोगकर्ता विवरण अद्यावधिक भयो (${user.name})`);
  };

  const handleDeleteUser = (id: string) => {
    setSystemUsers((prev) => prev.filter((u) => u.id !== id));
    addAuditLog('प्रयोगकर्ता हटाइएको', `User ID: ${id}`);
    showToast('प्रयोगकर्ता खाता हटाइयो।');
  };

  const counts = {
    ujuri: ujuriRecords.length,
    officeMon: officeRecords.length,
    dressTime: dressTimeRecords.length,
    surveys: surveyRecords.length,
    technicalAudit: technicalAuditRecords.length,
    projects: projectRecords.length
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-['Mukta',sans-serif] text-slate-900 antialiased selection:bg-[#0c2f55] selection:text-white">
      {/* Government Grade Top Header */}
      <Header
        activeTab={activeTab}
        selectedFiscalYear={selectedFiscalYear}
        onFiscalYearChange={(fy) => setSelectedFiscalYear(fy)}
        onNavigate={(tab) => setActiveTab(tab)}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0c2f55] text-white px-4 py-3 rounded-xl shadow-lg border border-blue-300/30 flex items-center gap-2.5 text-xs font-bold animate-slide-down">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          counts={counts}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Tab: Dashboard */}
            {(activeTab === 'dashboard' || activeTab === 'risk_map' || activeTab === 'section_reports') && (
              <DashboardView
                ujuriList={ujuriRecords}
                technicalAudits={technicalAuditRecords}
                projectList={projectRecords}
                dressTimeRecords={dressTimeRecords}
                surveyList={surveyRecords}
                onNavigate={(tab) => setActiveTab(tab as ActiveTab)}
              />
            )}

            {/* Tab: New Ujuri Form */}
            {activeTab === 'new_ujuri' && (
              <NewUjuriForm
                onSave={handleSaveUjuri}
                onCancel={() => setActiveTab('ujuri_vivaran')}
              />
            )}

            {/* Tab: Ujuri List Table */}
            {activeTab === 'ujuri_vivaran' && (
              <UjuriVivaranTable
                records={ujuriRecords}
                onUpdateRecord={handleUpdateUjuri}
                onDeleteRecord={handleDeleteUjuri}
                onAddNew={() => setActiveTab('new_ujuri')}
              />
            )}

            {/* Tab: Office Monitoring Details */}
            {activeTab === 'office_mon_detail' && (
              <OfficeMonitoringDetails
                records={officeRecords}
                onAddNew={() => setActiveTab('office_mon_form')}
                onDeleteRecord={handleDeleteOfficeMonitoring}
              />
            )}

            {/* Tab: Office Monitoring Form */}
            {activeTab === 'office_mon_form' && (
              <OfficeMonitoringForm
                onSave={handleSaveOfficeMonitoring}
                onCancel={() => setActiveTab('office_mon_detail')}
              />
            )}

            {/* Tab: Dress / Time Monitoring Details */}
            {activeTab === 'dress_time_detail' && (
              <DressTimeDetails
                records={dressTimeRecords}
                onAddNew={() => setActiveTab('dress_time_form')}
                onDeleteRecord={handleDeleteDressTime}
              />
            )}

            {/* Tab: Dress / Time Monitoring Form */}
            {activeTab === 'dress_time_form' && (
              <DressTimeForm
                onSave={handleSaveDressTime}
                onCancel={() => setActiveTab('dress_time_detail')}
              />
            )}

            {/* Tab: Citizen Survey Dashboard */}
            {activeTab === 'survey_dashboard' && (
              <SurveyDashboard
                surveys={surveyRecords}
                onAddNew={() => setActiveTab('survey_form')}
              />
            )}

            {/* Tab: Citizen Survey Form */}
            {activeTab === 'survey_form' && (
              <SurveyForm
                onSave={handleSaveSurvey}
                onCancel={() => setActiveTab('survey_dashboard')}
              />
            )}

            {/* Tab: Investigation / Enquiry View */}
            {activeTab === 'investigation' && (
              <InvestigationView
                records={investigationRecords}
                onAddRecord={handleAddInvestigation}
                onUpdateRecord={handleUpdateInvestigation}
                onDeleteRecord={handleDeleteInvestigation}
              />
            )}

            {/* Tab: Technical Audit View */}
            {activeTab === 'technical_audit' && (
              <TechnicalAuditView
                records={technicalAuditRecords}
                onAddRecord={handleAddTechnicalAudit}
                onUpdateRecord={handleUpdateTechnicalAudit}
                onDeleteRecord={handleDeleteTechnicalAudit}
              />
            )}

            {/* Tab: Project Monitoring View */}
            {(activeTab === 'project_mon_dashboard' || activeTab === 'project_mon_form') && (
              <ProjectMonitoringView
                records={projectRecords}
                onAddRecord={handleAddProject}
                onUpdateRecord={handleUpdateProject}
                onDeleteRecord={handleDeleteProject}
              />
            )}

            {/* Tab: Promotional Programs View */}
            {activeTab === 'promotional_programs' && (
              <PromotionalView
                records={promotionalRecords}
                onAddRecord={handleAddPromotional}
                onUpdateRecord={handleUpdatePromotional}
                onDeleteRecord={handleDeletePromotional}
              />
            )}

            {/* Tab: Calendar View */}
            {activeTab === 'calendar' && (
              <CalendarView
                events={calendarEvents}
                onAddEvent={handleAddCalendarEvent}
              />
            )}

            {/* Tab: User Management View */}
            {activeTab === 'user_management' && (
              <UserManagementView
                users={systemUsers}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
              />
            )}

            {/* Tab: Audit Log View */}
            {activeTab === 'audit_log' && (
              <AuditLogView logs={auditLogs} />
            )}

            {/* Tab: Change Password View */}
            {activeTab === 'password_change' && (
              <ChangePasswordView />
            )}
          </div>
        </main>
      </div>

      {/* Official Government Footer */}
      <footer className="bg-[#081f38] text-blue-200/80 text-[11px] py-2 px-4 border-t border-[#12365e] flex flex-wrap justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span>प्रतिलिपि अधिकार © २०८३ राष्ट्रिय सतर्कता केन्द्र, नेपाल सरकार। सर्वाधिकार सुरक्षित।</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>सूचना प्रविधि शाखा द्वारा संचालित</span>
          <span>•</span>
          <span className="font-mono">संस्करण २.४.० (Gov Grade)</span>
        </div>
      </footer>
    </div>
  );
}
