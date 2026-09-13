import React, { useState } from 'react';
import { CitizenSurveyRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import { NepalMap } from '../NepalMap';
import {
  Users,
  Smile,
  Frown,
  AlertTriangle,
  Award,
  TrendingUp,
  FileSpreadsheet,
  Building,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';

interface SurveyDashboardProps {
  surveys: CitizenSurveyRecord[];
  onAddNew: () => void;
}

export const SurveyDashboard: React.FC<SurveyDashboardProps> = ({ surveys, onAddNew }) => {
  const [selectedMetric, setSelectedMetric] = useState<'satisfaction' | 'bribe' | 'quality'>('satisfaction');
  const [genderFilter, setGenderFilter] = useState('');

  const filteredSurveys = surveys.filter((s) => !genderFilter || s.gender === genderFilter);

  const totalCount = filteredSurveys.length;
  const satisfiedCount = filteredSurveys.filter((s) => s.isSatisfied).length;
  const satisfactionPct = totalCount > 0 ? Math.round((satisfiedCount / totalCount) * 100) : 0;
  const bribeCount = filteredSurveys.filter((s) => s.paidBribe).length;
  const bribePct = totalCount > 0 ? Math.round((bribeCount / totalCount) * 100) : 0;
  const charterCount = filteredSurveys.filter((s) => s.knowsCitizenCharter).length;
  const charterPct = totalCount > 0 ? Math.round((charterCount / totalCount) * 100) : 0;

  // Gender counts
  const maleCount = filteredSurveys.filter((s) => s.gender === 'पुरुष').length;
  const femaleCount = filteredSurveys.filter((s) => s.gender === 'महिला').length;

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#dbe4ef] shadow-xs">
        <div>
          <h3 className="font-extrabold text-sm text-[#0c2f55] m-0">
            सेवाग्राही सन्तुष्टि तथा सुशासन सर्वेक्षण ड्यासबोर्ड
          </h3>
          <p className="text-gray-500 text-[11px] m-0">
            नागरिक प्रतिक्रिया, सन्तुष्टि दर र सेवा प्रवाहको प्रत्यक्ष विश्लेषण
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="p-1.5 border border-[#cfdbe8] rounded bg-white text-xs"
          >
            <option value="">सबै लिङ्ग</option>
            <option value="पुरुष">पुरुष मात्र</option>
            <option value="महिला">महिला मात्र</option>
          </select>

          <button
            onClick={onAddNew}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>नयाँ सर्वेक्षण</span>
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#64748b] font-bold">कुल उत्तरदाता संख्या</div>
          <div className="text-xl font-black text-[#1e40af]">{toNepaliDigits(totalCount)}</div>
          <div className="text-[9px] text-gray-400">फिल्टर अनुसार</div>
        </div>

        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#16a34a] font-bold">समग्र सन्तुष्टि दर</div>
          <div className="text-xl font-black text-[#15803d]">{toNepaliDigits(satisfactionPct)}%</div>
          <div className="text-[9px] text-emerald-600 font-semibold">{toNepaliDigits(satisfiedCount)} जना सन्तुष्ट</div>
        </div>

        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#0284c7] font-bold">राम्रो गुणस्तर दर</div>
          <div className="text-xl font-black text-[#0369a1]">
            {toNepaliDigits(
              totalCount > 0
                ? Math.round((filteredSurveys.filter((s) => s.serviceQuality === 'राम्रो').length / totalCount) * 100)
                : 0
            )}
            %
          </div>
          <div className="text-[9px] text-blue-600 font-semibold">गुणस्तरीय सेवा</div>
        </div>

        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#e11d48] font-bold">अतिरिक्त रकम (घुस) दर</div>
          <div className="text-xl font-black text-[#be123c]">{toNepaliDigits(bribePct)}%</div>
          <div className="text-[9px] text-rose-500 font-semibold">{toNepaliDigits(bribeCount)} ले तिरेको</div>
        </div>

        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#7c3aed] font-bold">बडापत्र जानकारी दर</div>
          <div className="text-xl font-black text-[#6d28d9]">{toNepaliDigits(charterPct)}%</div>
          <div className="text-[9px] text-purple-600 font-semibold">सचेत नागरिक</div>
        </div>

        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#d97706] font-bold">गुनासो दर्ता दर</div>
          <div className="text-xl font-black text-[#b45309]">
            {toNepaliDigits(
              totalCount > 0
                ? Math.round((filteredSurveys.filter((s) => s.filedComplaint).length / totalCount) * 100)
                : 0
            )}
            %
          </div>
          <div className="text-[9px] text-amber-600 font-semibold">उजुरी गरेका</div>
        </div>
      </div>

      {/* Map & Donut Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Map with metric toggles */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-3.5">
          <div className="flex flex-wrap items-center justify-between pb-2 border-b border-[#edf2f7] mb-2">
            <span className="font-extrabold text-[#0c2f55] text-xs">प्रदेशगत सर्वेक्षण अवस्था</span>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedMetric('satisfaction')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                  selectedMetric === 'satisfaction'
                    ? 'bg-[#10b981] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                सन्तुष्टि
              </button>
              <button
                onClick={() => setSelectedMetric('bribe')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                  selectedMetric === 'bribe'
                    ? 'bg-[#dc2626] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                अतिरिक्त रकम
              </button>
            </div>
          </div>
          <NepalMap title="प्रदेशगत सन्तुष्टि तथा जोखिम नक्सा" height={230} />
        </div>

        {/* Satisfaction donut & demographics */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-3.5 flex flex-col justify-between">
          <div className="pb-2 border-b border-[#edf2f7] font-extrabold text-[#0c2f55] text-xs">
            समग्र सेवा सन्तुष्टि तथा उत्तरदाता सहभागिता
          </div>

          <div className="grid grid-cols-2 gap-3 items-center my-2">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full border-8 border-emerald-500 flex items-center justify-center bg-gray-50 shadow-inner">
                <span className="text-xl font-black text-[#0c2f55]">{toNepaliDigits(satisfactionPct)}%</span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold mt-1.5">सन्तुष्टि दर</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span>पुरुष उत्तरदाता</span>
                  <span className="font-bold">{toNepaliDigits(maleCount)}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${totalCount ? (maleCount / totalCount) * 100 : 50}%` }}
                    className="bg-blue-600 h-full rounded-full"
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span>महिला उत्तरदाता</span>
                  <span className="font-bold">{toNepaliDigits(femaleCount)}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${totalCount ? (femaleCount / totalCount) * 100 : 50}%` }}
                    className="bg-pink-500 h-full rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Highlights */}
          <div className="bg-[#f8fafc] p-2.5 rounded-lg border border-[#e2e8f0] grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-emerald-700 font-bold block mb-0.5">उत्कृष्ट सेवा दिने कार्यालय:</span>
              <span className="text-gray-700">राष्ट्रिय परिचयपत्र कार्यालय, राहदानी विभाग</span>
            </div>
            <div>
              <span className="text-rose-700 font-bold block mb-0.5">सुधार आवश्यक कार्यालय:</span>
              <span className="text-gray-700">मालपोत कार्यालय, नापी, यातायात कार्यालय</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent feedback list */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b font-bold text-xs text-[#0c2f55] bg-[#f8fafc]">
          हालैका नागरिक सर्वेक्षण प्रतिक्रियाहरू ({toNepaliDigits(filteredSurveys.length)})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-bold border-b">
                <th className="p-2.5 text-left">मिति</th>
                <th className="p-2.5 text-left">प्रदेश/जिल्ला</th>
                <th className="p-2.5 text-left">लिङ्ग</th>
                <th className="p-2.5 text-left">कार्यालय</th>
                <th className="p-2.5 text-center">सन्तुष्टि</th>
                <th className="p-2.5 text-center">अतिरिक्त रकम</th>
                <th className="p-2.5 text-left">सुझाव</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredSurveys.slice(0, 8).map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="p-2.5 font-mono">{s.surveyDate}</td>
                  <td className="p-2.5 font-semibold">
                    {s.district}, {s.province}
                  </td>
                  <td className="p-2.5">{s.gender}</td>
                  <td className="p-2.5 font-bold text-[#0c2f55]">{s.officeVisited}</td>
                  <td className="p-2.5 text-center">
                    {s.isSatisfied ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        सन्तुष्ट
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                        असन्तुष्ट
                      </span>
                    )}
                  </td>
                  <td className="p-2.5 text-center font-bold">
                    {s.paidBribe ? (
                      <span className="text-red-600">पर्‍यो</span>
                    ) : (
                      <span className="text-emerald-700">परेन</span>
                    )}
                  </td>
                  <td className="p-2.5 text-gray-600 max-w-[220px] truncate" title={s.suggestions}>
                    {s.suggestions || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
