import React, { useState } from 'react';
import { ActiveTab } from '../types';
import {
  Home,
  FileText,
  PlusCircle,
  ListOrdered,
  Building2,
  Clock,
  Users,
  SearchCheck,
  Microscope,
  FolderGit2,
  Megaphone,
  MapPin,
  FileSpreadsheet,
  CalendarDays,
  KeyRound,
  History,
  UserCog,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  counts?: {
    ujuri?: number;
    officeMon?: number;
    dressTime?: number;
    surveys?: number;
    technicalAudit?: number;
    projects?: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, counts }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    ujuri: activeTab.startsWith('ujuri') || activeTab === 'new_ujuri',
    office: activeTab.startsWith('office_mon'),
    dress: activeTab.startsWith('dress_time'),
    survey: activeTab.startsWith('survey'),
    project: activeTab.startsWith('project_mon')
  });

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItemClass = (isActive: boolean) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 ${
      isActive
        ? 'bg-[#1b4e7e] text-white shadow-xs font-bold border-l-3 border-[#60a5fa]'
        : 'text-[#d0e0f0] hover:bg-[#12385c] hover:text-white'
    }`;

  return (
    <aside
      className={`h-[calc(100vh-62px)] bg-gradient-to-b from-[#092645] via-[#0d365f] to-[#071c33] text-white flex flex-col flex-shrink-0 transition-all duration-200 border-r border-[#16416a] select-none ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Collapse Toggle Button */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#16416a]/80 text-[11px] text-[#93b4d4]">
        {!isCollapsed && <span className="font-bold tracking-wider uppercase text-[10px] text-[#86aed6]">मेनु सूची</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-[#16416a] text-[#c0d8ef] transition-colors ml-auto"
          title={isCollapsed ? 'खोल्नुहोस्' : 'खुम्च्याउनुहोस्'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-1 scrollbar-thin scrollbar-thumb-[#1e4e7e]">
        {/* ड्यासबोर्ड */}
        <div
          onClick={() => onSelectTab('dashboard')}
          className={navItemClass(activeTab === 'dashboard')}
          title="ड्यासबोर्ड"
        >
          <Home className="w-4 h-4 flex-shrink-0 text-[#60a5fa]" />
          {!isCollapsed && <span>ड्यासबोर्ड</span>}
        </div>

        {/* उजुरी व्यवस्थापन */}
        <div>
          <div
            onClick={() => toggleSubmenu('ujuri')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab.includes('ujuri') ? 'text-white font-bold bg-[#143d66]' : 'text-[#d0e0f0] hover:bg-[#12385c]'
            }`}
            title="उजुरी व्यवस्थापन"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 flex-shrink-0 text-[#f59e0b]" />
              {!isCollapsed && <span>उजुरी व्यवस्थापन</span>}
            </div>
            {!isCollapsed && (
              openSubmenus.ujuri ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
          {!isCollapsed && openSubmenus.ujuri && (
            <div className="pl-6 pr-1 py-1 space-y-0.5 text-[11px] border-l border-[#1f4e7e] ml-4 my-0.5">
              <div
                onClick={() => onSelectTab('new_ujuri')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'new_ujuri' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <PlusCircle className="w-3 h-3 text-[#10b981]" /> नयाँ उजुरी
              </div>
              <div
                onClick={() => onSelectTab('ujuri_vivaran')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'ujuri_vivaran' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <ListOrdered className="w-3 h-3 text-[#38bdf8]" /> उजुरी विवरण
              </div>
            </div>
          )}
        </div>

        {/* कार्यालय अनुगमन */}
        <div>
          <div
            onClick={() => toggleSubmenu('office')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab.includes('office_mon') ? 'text-white font-bold bg-[#143d66]' : 'text-[#d0e0f0] hover:bg-[#12385c]'
            }`}
            title="कार्यालय अनुगमन"
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 flex-shrink-0 text-[#38bdf8]" />
              {!isCollapsed && <span>कार्यालय अनुगमन</span>}
            </div>
            {!isCollapsed && (
              openSubmenus.office ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
          {!isCollapsed && openSubmenus.office && (
            <div className="pl-6 pr-1 py-1 space-y-0.5 text-[11px] border-l border-[#1f4e7e] ml-4 my-0.5">
              <div
                onClick={() => onSelectTab('office_mon_form')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'office_mon_form' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <PlusCircle className="w-3 h-3 text-[#10b981]" /> अनुगमन फारम
              </div>
              <div
                onClick={() => onSelectTab('office_mon_detail')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'office_mon_detail' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <ListOrdered className="w-3 h-3 text-[#38bdf8]" /> अनुगमन विवरण
              </div>
            </div>
          )}
        </div>

        {/* समय/पोशाक अनुगमन */}
        <div>
          <div
            onClick={() => toggleSubmenu('dress')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab.includes('dress_time') ? 'text-white font-bold bg-[#143d66]' : 'text-[#d0e0f0] hover:bg-[#12385c]'
            }`}
            title="समय/पोशाक अनुगमन"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 flex-shrink-0 text-[#a855f7]" />
              {!isCollapsed && <span>समय/पोशाक अनुगमन</span>}
            </div>
            {!isCollapsed && (
              openSubmenus.dress ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
          {!isCollapsed && openSubmenus.dress && (
            <div className="pl-6 pr-1 py-1 space-y-0.5 text-[11px] border-l border-[#1f4e7e] ml-4 my-0.5">
              <div
                onClick={() => onSelectTab('dress_time_form')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'dress_time_form' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <PlusCircle className="w-3 h-3 text-[#10b981]" /> अनुगमन फारम
              </div>
              <div
                onClick={() => onSelectTab('dress_time_detail')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'dress_time_detail' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <ListOrdered className="w-3 h-3 text-[#38bdf8]" /> अनुगमन विवरण
              </div>
            </div>
          )}
        </div>

        {/* सेवाग्राही सर्वेक्षण */}
        <div>
          <div
            onClick={() => toggleSubmenu('survey')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab.includes('survey') ? 'text-white font-bold bg-[#143d66]' : 'text-[#d0e0f0] hover:bg-[#12385c]'
            }`}
            title="सेवाग्राही सर्वेक्षण"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 flex-shrink-0 text-[#ec4899]" />
              {!isCollapsed && <span>सेवाग्राही सर्वेक्षण</span>}
            </div>
            {!isCollapsed && (
              openSubmenus.survey ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
          {!isCollapsed && openSubmenus.survey && (
            <div className="pl-6 pr-1 py-1 space-y-0.5 text-[11px] border-l border-[#1f4e7e] ml-4 my-0.5">
              <div
                onClick={() => onSelectTab('survey_form')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'survey_form' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <PlusCircle className="w-3 h-3 text-[#10b981]" /> सर्वेक्षण फारम
              </div>
              <div
                onClick={() => onSelectTab('survey_dashboard')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'survey_dashboard' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <ListOrdered className="w-3 h-3 text-[#38bdf8]" /> सर्वेक्षण विवरण/ड्यासबोर्ड
              </div>
            </div>
          )}
        </div>

        {/* छानविन/अन्वेषण */}
        <div
          onClick={() => onSelectTab('investigation')}
          className={navItemClass(activeTab === 'investigation')}
          title="छानविन/अन्वेषण"
        >
          <SearchCheck className="w-4 h-4 flex-shrink-0 text-[#10b981]" />
          {!isCollapsed && <span>छानविन/अन्वेषण</span>}
        </div>

        {/* प्राविधिक परीक्षण */}
        <div
          onClick={() => onSelectTab('technical_audit')}
          className={navItemClass(activeTab === 'technical_audit')}
          title="प्राविधिक परीक्षण"
        >
          <Microscope className="w-4 h-4 flex-shrink-0 text-[#f43f5e]" />
          {!isCollapsed && <span>प्राविधिक परीक्षण</span>}
        </div>

        {/* आयोजना अनुगमन */}
        <div>
          <div
            onClick={() => toggleSubmenu('project')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab.includes('project_mon') ? 'text-white font-bold bg-[#143d66]' : 'text-[#d0e0f0] hover:bg-[#12385c]'
            }`}
            title="आयोजना अनुगमन"
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4 flex-shrink-0 text-[#eab308]" />
              {!isCollapsed && <span>आयोजना अनुगमन</span>}
            </div>
            {!isCollapsed && (
              openSubmenus.project ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
          {!isCollapsed && openSubmenus.project && (
            <div className="pl-6 pr-1 py-1 space-y-0.5 text-[11px] border-l border-[#1f4e7e] ml-4 my-0.5">
              <div
                onClick={() => onSelectTab('project_mon_form')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'project_mon_form' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <PlusCircle className="w-3 h-3 text-[#10b981]" /> अनुगमन फारम
              </div>
              <div
                onClick={() => onSelectTab('project_mon_dashboard')}
                className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'project_mon_dashboard' ? 'bg-[#1b4e7e] text-white font-bold' : 'text-[#b0cde6] hover:bg-[#12385c] hover:text-white'
                }`}
              >
                <ListOrdered className="w-3 h-3 text-[#38bdf8]" /> अनुगमन विवरण
              </div>
            </div>
          )}
        </div>

        {/* प्रवर्द्धनात्मक कार्यक्रम */}
        <div
          onClick={() => onSelectTab('promotional_programs')}
          className={navItemClass(activeTab === 'promotional_programs')}
          title="प्रवर्द्धनात्मक कार्यक्रम"
        >
          <Megaphone className="w-4 h-4 flex-shrink-0 text-[#38bdf8]" />
          {!isCollapsed && <span>प्रवर्द्धनात्मक कार्यक्रम</span>}
        </div>

        {/* जोखिम नक्सा */}
        <div
          onClick={() => onSelectTab('risk_map')}
          className={navItemClass(activeTab === 'risk_map')}
          title="जोखिम नक्सा"
        >
          <MapPin className="w-4 h-4 flex-shrink-0 text-[#ef4444]" />
          {!isCollapsed && <span>जोखिम नक्सा</span>}
        </div>

        {/* शाखा रिपोर्टहरु */}
        <div
          onClick={() => onSelectTab('section_reports')}
          className={navItemClass(activeTab === 'section_reports')}
          title="शाखा रिपोर्टहरु"
        >
          <FileSpreadsheet className="w-4 h-4 flex-shrink-0 text-[#22c55e]" />
          {!isCollapsed && <span>शाखा रिपोर्टहरु</span>}
        </div>

        {/* क्यालेण्डर */}
        <div
          onClick={() => onSelectTab('calendar')}
          className={navItemClass(activeTab === 'calendar')}
          title="क्यालेण्डर"
        >
          <CalendarDays className="w-4 h-4 flex-shrink-0 text-[#fbbf24]" />
          {!isCollapsed && <span>क्यालेण्डर</span>}
        </div>

        <div className="pt-2 my-2 border-t border-[#16416a]"></div>

        {/* पासवर्ड परिवर्तन */}
        <div
          onClick={() => onSelectTab('password_change')}
          className={navItemClass(activeTab === 'password_change')}
          title="पासवर्ड परिवर्तन"
        >
          <KeyRound className="w-4 h-4 flex-shrink-0 text-[#94a3b8]" />
          {!isCollapsed && <span>पासवर्ड परिवर्तन</span>}
        </div>

        {/* अडिट लग */}
        <div
          onClick={() => onSelectTab('audit_log')}
          className={navItemClass(activeTab === 'audit_log')}
          title="अडिट लग"
        >
          <History className="w-4 h-4 flex-shrink-0 text-[#94a3b8]" />
          {!isCollapsed && <span>अडिट लग</span>}
        </div>

        {/* प्रयोगकर्ता व्यवस्थापन */}
        <div
          onClick={() => onSelectTab('user_management')}
          className={navItemClass(activeTab === 'user_management')}
          title="प्रयोगकर्ता व्यवस्थापन"
        >
          <UserCog className="w-4 h-4 flex-shrink-0 text-[#94a3b8]" />
          {!isCollapsed && <span>प्रयोगकर्ता व्यवस्थापन</span>}
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-[#16416a] bg-[#07182c]/70">
        <div className="flex items-center gap-2 text-xs text-[#9fbacc] hover:text-white cursor-pointer transition-colors">
          <LogOut className="w-4 h-4 text-red-400" />
          {!isCollapsed && <span className="font-semibold">लगआउट</span>}
        </div>
      </div>
    </aside>
  );
};
