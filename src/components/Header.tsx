import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import {
  getCurrentNepaliDate,
  getCurrentNepaliTimeString,
  NEPALI_WEEKDAYS
} from '../utils/nepaliDate';
import { Shield, Search, Bell, User, Calendar, RefreshCw, Menu } from 'lucide-react';

interface HeaderProps {
  selectedFiscalYear?: string;
  onFiscalYearChange?: (fy: string) => void;
  onSearch?: (term: string) => void;
  onRefresh?: () => void;
  activeTab?: ActiveTab;
  onNavigate?: (tab: ActiveTab) => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedFiscalYear = '2083/84',
  onFiscalYearChange,
  onSearch,
  onRefresh,
  activeTab,
  onNavigate,
  onToggleSidebar
}) => {
  const [nepaliDateStr, setNepaliDateStr] = useState<string>('');
  const [nepaliTimeStr, setNepaliTimeStr] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const { formatted } = getCurrentNepaliDate();
      const time = getCurrentNepaliTimeString();
      const dayIdx = new Date().getDay();
      const weekday = NEPALI_WEEKDAYS[dayIdx];
      setNepaliDateStr(`${formatted}, ${weekday}`);
      setNepaliTimeStr(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#dbe4ef] shadow-xs px-4 py-2.5 flex items-center justify-between gap-4">
      {/* Left: Government Logo & Titles */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            title="मेनु टगल गर्नुहोस्"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Nepal Emblem SVG Icon */}
        <div className="w-11 h-11 rounded-full bg-[#fdf2f2] border border-[#f5c6cb] flex items-center justify-center p-1 shadow-xs flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Traditional Nepalese stylized red & white emblem silhouette */}
            <circle cx="50" cy="50" r="46" fill="#dc2626" />
            <path d="M 50,14 L 62,38 L 88,42 L 68,60 L 74,86 L 50,72 L 26,86 L 32,60 L 12,42 L 38,38 Z" fill="#ffffff" />
            <circle cx="50" cy="50" r="14" fill="#1e3a8a" />
            <circle cx="50" cy="50" r="8" fill="#ffffff" />
          </svg>
        </div>

        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-[#dc2626] uppercase tracking-wider flex items-center gap-1.5">
            नेपाल सरकार <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dc2626]"></span>
            <span>प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालय</span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-[#0c2f55] tracking-tight m-0 font-['Noto_Serif_Devanagari',serif]">
            राष्ट्रिय सतर्कता केन्द्र
          </h1>
          <div className="text-[11px] text-[#556987] font-medium hidden sm:block">
            एकीकृत उजुरी, अनुगमन, प्राविधिक परीक्षण तथा जोखिम नक्सा प्रणाली
          </div>
        </div>
      </div>

      {/* Middle: Search input */}
      <div className="hidden md:flex items-center flex-1 max-w-xs relative">
        <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="उजुरी, आयोजना, कार्यालय खोज्नुहोस्..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f4f7fb] border border-[#cfdbe8] rounded-full focus:outline-none focus:border-[#1d4ed8] focus:bg-white transition-all text-[#1e293b]"
        />
      </div>

      {/* Right: Date/Time, Fiscal Year & User Profile */}
      <div className="flex items-center gap-3 text-xs">
        {/* Live Nepali Date & Time */}
        <div className="hidden lg:flex flex-col text-right pr-2 border-r border-[#e2e8f0]">
          <div className="font-bold text-[#0c2f55] flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#2563eb]" />
            <span>{nepaliDateStr || '२०८३-०५-२८'}</span>
          </div>
          <div className="text-[10px] text-[#64748b] font-mono">
            {nepaliTimeStr || '१०:१५:००'}
          </div>
        </div>

        {/* Fiscal Year dropdown */}
        <div className="flex items-center gap-1 bg-[#f0f5fc] px-2 py-1 rounded-md border border-[#cbdcf2]">
          <span className="text-[11px] font-semibold text-[#1e40af] hidden sm:inline">आ.व.</span>
          <select
            value={selectedFiscalYear}
            onChange={(e) => onFiscalYearChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-[#0f2d59] border-none outline-none cursor-pointer pr-1"
          >
            <option value="all">सबै आ.व.</option>
            <option value="2083/84">२०८३/८४</option>
            <option value="2082/83">२०८२/८३</option>
            <option value="2081/82">२०८१/८२</option>
          </select>
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            title="रिफ्रेस गर्नुहोस्"
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {/* Admin profile chip */}
        <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] px-2.5 py-1 rounded-full shadow-2xs">
          <div className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-[10px]">
            प्र
          </div>
          <div className="leading-tight text-left">
            <div className="text-[11px] font-bold text-[#0c2f55]">प्रशासक (Admin)</div>
            <div className="text-[9px] text-[#10b981] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> सक्रिय
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
