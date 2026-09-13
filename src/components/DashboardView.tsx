import React, { useState } from 'react';
import {
  UjuriRecord,
  TechnicalAuditRecord,
  ProjectMonitoringRecord,
  DressTimeRecord,
  CitizenSurveyRecord
} from '../types';
import { toNepaliDigits, formatNepaliCurrency } from '../utils/nepaliDate';
import { NepalMap } from './NepalMap';
import {
  ShieldAlert,
  FileCheck2,
  FolderKanban,
  Clock,
  Users2,
  TrendingUp,
  AlertTriangle,
  Award,
  BarChart3,
  CheckCircle2,
  Clock3,
  Building,
  Layers,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  ujuriList?: UjuriRecord[];
  technicalAudits?: TechnicalAuditRecord[];
  projectList?: ProjectMonitoringRecord[];
  dressTimeRecords?: DressTimeRecord[];
  surveyList?: CitizenSurveyRecord[];
  onNavigate?: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  ujuriList = [],
  technicalAudits = [],
  projectList = [],
  dressTimeRecords = [],
  surveyList = [],
  onNavigate
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // Computed metrics
  const totalUjuri = ujuriList.length;
  const inProgressUjuri = ujuriList.filter((u) => u.status === 'in_progress').length;
  const resolvedUjuri = ujuriList.filter((u) => u.status === 'resolved' || u.status === 'closed').length;
  const pendingUjuri = ujuriList.filter((u) => u.status === 'pending').length;

  const totalProjects = projectList.length;
  const totalBudget = projectList.reduce((sum, p) => sum + (p.approvedCost || 0), 0);
  const totalSpent = projectList.reduce((sum, p) => sum + (p.expenditureSoFar || 0), 0);
  const avgProgress = totalProjects > 0
    ? Math.round(projectList.reduce((sum, p) => sum + (p.physicalProgress || 0), 0) / totalProjects)
    : 0;

  // Technical audits
  const totalAudits = technicalAudits.length;
  const thisYearAudits = technicalAudits.filter((t) => t.auditDate.startsWith('२०८३')).length || totalAudits;
  const ongoingAudits = technicalAudits.filter((t) => t.status === 'in_progress').length;
  const completedAudits = technicalAudits.filter((t) => t.status === 'completed').length;
  const totalNCRs = technicalAudits.reduce((sum, t) => sum + (t.ncrList?.length || 0), 0);

  // Time & Dress monitoring
  const totalDressTime = dressTimeRecords.length;
  const totalTimeViolations = dressTimeRecords.reduce((sum, d) => sum + (d.timeViolationsCount || 0), 0);
  const totalDressViolations = dressTimeRecords.reduce((sum, d) => sum + (d.dressViolationsCount || 0), 0);

  // Survey
  const totalSurveys = surveyList.length;
  const satisfiedCount = surveyList.filter((s) => s.isSatisfied).length;
  const satisfactionRate = totalSurveys > 0 ? Math.round((satisfiedCount / totalSurveys) * 100) : 78;
  const bribeCount = surveyList.filter((s) => s.paidBribe).length;
  const bribeRate = totalSurveys > 0 ? Math.round((bribeCount / totalSurveys) * 100) : 12;

  // Monthly breakdown counts for bar simulation
  const months = ['साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र', 'बैशाख', 'जेठ', 'असार'];
  const monthlyUjuriCounts = [14, 22, 18, 12, 15, 9, 11, 8, 14, 16, 20, 25];

  // District distribution for map
  const districtCounts: Record<string, number> = {
    'बागमती प्रदेश': 38,
    'मधेश प्रदेश': 28,
    'गण्डकी प्रदेश': 22,
    'लुम्बिनी प्रदेश': 19,
    'कोशी प्रदेश': 24,
    'कर्णाली प्रदेश': 16,
    'सुदूरपश्चिम प्रदेश': 14
  };

  return (
    <div className="space-y-4 p-1">
      {/* Top Banner: Official National Integrity Pulse */}
      <div className="bg-gradient-to-r from-[#0c2f55] via-[#124275] to-[#1c5591] text-white p-3.5 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3 border border-[#255f9e]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#77c4ff]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-blue-200 uppercase tracking-wider">
              राष्ट्रिय सदाचार तथा सुशासन सूचकांक (National Integrity Index)
            </div>
            <div className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>{toNepaliDigits(78.4)}</span>
              <span className="text-xs font-normal text-blue-200">/ १०० अंक</span>
              <span className="text-xs bg-[#10b981] text-white px-2 py-0.5 rounded-full font-bold">
                सन्तोषजनक
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-center">
            <span className="text-[10px] text-blue-200 block">सुशासन सूचकांक</span>
            <span className="font-extrabold text-[#77c4ff]">{toNepaliDigits(82.6)}%</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-center">
            <span className="text-[10px] text-blue-200 block">पारदर्शिता दर</span>
            <span className="font-extrabold text-[#facc15]">{toNepaliDigits(76.2)}%</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-center">
            <span className="text-[10px] text-blue-200 block">सेवाग्राही सन्तुष्टि</span>
            <span className="font-extrabold text-[#34d399]">{toNepaliDigits(satisfactionRate)}%</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: नेपाल जोखिम नक्सा (Geographic Surveillance) */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#edf2f7] mb-2.5">
            <h3 className="text-sm font-extrabold text-[#0c2f55] flex items-center gap-2">
              <span className="p-1 rounded bg-blue-50 text-[#1d4ed8]">
                <Layers className="w-4 h-4" />
              </span>
              जोखिम नक्सा - निगरानी स्थिति
            </h3>
            <button
              onClick={() => onNavigate('risk_map')}
              className="text-[11px] font-bold text-[#1d4ed8] hover:underline cursor-pointer"
            >
              विस्तृत नक्सा →
            </button>
          </div>

          {/* Interactive Nepal Map */}
          <NepalMap
            title="प्रदेशगत अनुगमन तथा उजुरी घनत्व"
            districtCounts={districtCounts}
            height={220}
            onSelectDistrict={(prov) => setSelectedProvince(prov)}
            selectedDistrict={selectedProvince || undefined}
          />

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#edf2f7] text-center text-xs">
            <div className="bg-[#f8fafc] p-1.5 rounded border border-[#e2e8f0]">
              <div className="text-[10px] text-[#64748b]">कुल निगरानी जिल्ला</div>
              <div className="font-black text-[#0f2942] text-sm">{toNepaliDigits(77)}</div>
            </div>
            <div className="bg-[#f0fdf4] p-1.5 rounded border border-[#bbf7d0]">
              <div className="text-[10px] text-[#166534]">सक्रिय टोली</div>
              <div className="font-black text-[#15803d] text-sm">{toNepaliDigits(14)}</div>
            </div>
            <div className="bg-[#fef2f2] p-1.5 rounded border border-[#fecaca]">
              <div className="text-[10px] text-[#991b1b]">उच्च जोखिम क्षेत्र</div>
              <div className="font-black text-[#dc2626] text-sm">{toNepaliDigits(3)}</div>
            </div>
          </div>
        </div>

        {/* Card 2: आयोजना अनुगमन तथा प्राविधिक परीक्षण स्थिति */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#edf2f7] mb-2.5">
            <h3 className="text-sm font-extrabold text-[#0c2f55] flex items-center gap-2">
              <span className="p-1 rounded bg-amber-50 text-[#d97706]">
                <FolderKanban className="w-4 h-4" />
              </span>
              आयोजना अनुगमन तथा प्राविधिक परीक्षण
            </h3>
            <button
              onClick={() => onNavigate('project_mon_dashboard')}
              className="text-[11px] font-bold text-[#1d4ed8] hover:underline cursor-pointer"
            >
              आयोजना विवरण →
            </button>
          </div>

          {/* Key Stat Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div className="bg-[#f8fafc] border-l-3 border-[#2563eb] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">कुल आयोजना अनुगमन</div>
              <div className="text-base font-black text-[#1e40af]">{toNepaliDigits(totalProjects || 142)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#10b981] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">स्वीकृत कुल लागत</div>
              <div className="text-xs font-black text-[#047857] truncate">
                {formatNepaliCurrency(totalBudget || 450000000)}
              </div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#f59e0b] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">औसत भौतिक प्रगति</div>
              <div className="text-base font-black text-[#b45309]">{toNepaliDigits(avgProgress || 68)}%</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#8b5cf6] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">वित्तीय खर्च प्रगति</div>
              <div className="text-xs font-black text-[#6d28d9] truncate">
                {formatNepaliCurrency(totalSpent || 320000000)}
              </div>
            </div>
          </div>

          {/* Technical Audit Index Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#edf2f7]">
            <div>
              <div className="text-xs font-bold text-[#0f2942] mb-1.5 flex items-center justify-between">
                <span>प्राविधिक परीक्षण कार्यक्षेत्र (प्रकार)</span>
                <span className="text-[10px] text-gray-500">कुल: {toNepaliDigits(totalAudits || 66)}</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-0.5 border-b border-gray-100">
                  <span className="text-gray-600">सडक पूर्वाधार</span>
                  <span className="font-bold text-gray-800">{toNepaliDigits(28)}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-gray-100">
                  <span className="text-gray-600">सिंचाई तथा जलस्रोत</span>
                  <span className="font-bold text-gray-800">{toNepaliDigits(16)}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-gray-100">
                  <span className="text-gray-600">भवन तथा आवास</span>
                  <span className="font-bold text-gray-800">{toNepaliDigits(12)}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-gray-600">खानेपानी तथा अन्य</span>
                  <span className="font-bold text-gray-800">{toNepaliDigits(10)}</span>
                </div>
              </div>
            </div>

            {/* Audit compliance list */}
            <div className="bg-[#f8fafc] p-2.5 rounded-lg border border-[#e2e8f0] text-xs space-y-1.5">
              <div className="font-bold text-[#0c2f55] text-xs">परीक्षण परिणाम स्थिति</div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">सम्पन्न परीक्षण</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  {toNepaliDigits(completedAudits || 42)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">चालु परीक्षण</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">
                  {toNepaliDigits(ongoingAudits || 24)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">अपरिपालना (NCRs)</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold text-[11px]">
                  {toNepaliDigits(totalNCRs || 18)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">डिस्पोजल हुन बाँकी</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold text-[11px]">
                  {toNepaliDigits(6)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: उजुरी व्यवस्थापन (Complaint Overview & Decisions) */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#edf2f7] mb-2.5">
            <h3 className="text-sm font-extrabold text-[#0c2f55] flex items-center gap-2">
              <span className="p-1 rounded bg-red-50 text-[#dc2626]">
                <FileCheck2 className="w-4 h-4" />
              </span>
              उजुरी व्यवस्थापन तथा फछ्यौट
            </h3>
            <button
              onClick={() => onNavigate('ujuri_vivaran')}
              className="text-[11px] font-bold text-[#1d4ed8] hover:underline cursor-pointer"
            >
              उजुरी सूची →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div className="bg-[#f8fafc] border-l-3 border-[#2563eb] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">कूल उजुरी दर्ता</div>
              <div className="text-base font-black text-[#1e40af]">{toNepaliDigits(totalUjuri || 1862)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#10b981] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">फछ्यौट भएका</div>
              <div className="text-base font-black text-[#15803d]">{toNepaliDigits(resolvedUjuri || 1420)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#f59e0b] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">चालू उजुरी</div>
              <div className="text-base font-black text-[#b45309]">{toNepaliDigits(inProgressUjuri || 312)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#64748b] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">फछ्यौट हुन बाँकी</div>
              <div className="text-base font-black text-[#475569]">{toNepaliDigits(pendingUjuri || 130)}</div>
            </div>
          </div>

          {/* Breakdown by decisions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#edf2f7] items-center">
            {/* Status visual ring */}
            <div className="flex items-center gap-3 bg-[#f8fafc] p-2.5 rounded-lg border border-[#e2e8f0]">
              <div className="relative w-16 h-16 rounded-full border-4 border-[#10b981] flex items-center justify-center bg-white shadow-2xs flex-shrink-0">
                <span className="text-xs font-black text-[#0f2942]">
                  {toNepaliDigits(totalUjuri || 1862)}
                </span>
              </div>
              <div className="text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-[#15803d] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  <span>फछ्यौट: {toNepaliDigits(76)}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#b45309] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
                  <span>चालू: {toNepaliDigits(17)}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#475569] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#64748b]"></span>
                  <span>बाँकी: {toNepaliDigits(7)}%</span>
                </div>
              </div>
            </div>

            {/* Decisions list */}
            <div className="text-xs space-y-1">
              <div className="flex justify-between py-0.5 border-b border-gray-100">
                <span className="text-gray-600">तामेली</span>
                <span className="font-bold text-gray-800">{toNepaliDigits(642)}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-gray-100">
                <span className="text-gray-600">सुझाव / निर्देशन</span>
                <span className="font-bold text-gray-800">{toNepaliDigits(524)}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-gray-100">
                <span className="text-gray-600">सतर्क गराइएको</span>
                <span className="font-bold text-gray-800">{toNepaliDigits(184)}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-600">अ.दु.अ.आ. पठाइएको</span>
                <span className="font-bold text-[#dc2626]">{toNepaliDigits(70)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: समय/पोशाक अनुगमन तथा सेवाग्राही सन्तुष्टि */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#edf2f7] mb-2.5">
            <h3 className="text-sm font-extrabold text-[#0c2f55] flex items-center gap-2">
              <span className="p-1 rounded bg-purple-50 text-[#7c3aed]">
                <Clock className="w-4 h-4" />
              </span>
              समय/पोशाक अनुगमन तथा सेवाग्राही सर्वेक्षण
            </h3>
            <button
              onClick={() => onNavigate('dress_time_detail')}
              className="text-[11px] font-bold text-[#1d4ed8] hover:underline cursor-pointer"
            >
              अनुगमन विवरण →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div className="bg-[#f8fafc] border-l-3 border-[#0284c7] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">कूल छड्के अनुगमन</div>
              <div className="text-base font-black text-[#0369a1]">{toNepaliDigits(totalDressTime || 84)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#e11d48] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">समय अपरिपालना</div>
              <div className="text-base font-black text-[#be123c]">{toNepaliDigits(totalTimeViolations || 28)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#d97706] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">पोशाक अपरिपालना</div>
              <div className="text-base font-black text-[#b45309]">{toNepaliDigits(totalDressViolations || 19)}</div>
            </div>
            <div className="bg-[#f8fafc] border-l-3 border-[#16a34a] p-2 rounded text-center">
              <div className="text-[10px] text-[#64748b]">सर्वेक्षण सन्तुष्टि दर</div>
              <div className="text-base font-black text-[#15803d]">{toNepaliDigits(satisfactionRate)}%</div>
            </div>
          </div>

          {/* Monthly trend simulation bar chart */}
          <div className="pt-2 border-t border-[#edf2f7]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-[#0c2f55]">महिना अनुसार उजुरी तथा अनुगमन प्रवृत्ति</span>
              <span className="text-[10px] text-gray-500">आ.व. २०८३/८४</span>
            </div>
            <div className="flex items-end justify-between h-16 gap-1 bg-[#f8fafc] px-2 py-1.5 rounded-lg border border-[#e2e8f0]">
              {months.map((m, idx) => {
                const count = monthlyUjuriCounts[idx] || 10;
                const heightPct = Math.min(100, Math.max(15, count * 3.5));
                return (
                  <div key={m} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-[#3b82f6] group-hover:bg-[#1d4ed8] rounded-t transition-all"
                      title={`${m}: ${toNepaliDigits(count)}`}
                    ></div>
                    <span className="text-[8px] text-gray-500 mt-1 truncate w-full text-center">{m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
