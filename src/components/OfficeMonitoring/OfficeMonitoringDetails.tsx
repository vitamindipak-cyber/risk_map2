import React, { useState } from 'react';
import { OfficeMonitoringRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import { NEPAL_PROVINCES } from '../../data/nepalData';
import { NepalMap } from '../NepalMap';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  CheckCircle,
  AlertTriangle,
  Building,
  RotateCcw,
  PlusCircle
} from 'lucide-react';

interface OfficeMonitoringDetailsProps {
  records: OfficeMonitoringRecord[];
  onAddNew: () => void;
  onDeleteRecord: (id: string) => void;
}

export const OfficeMonitoringDetails: React.FC<OfficeMonitoringDetailsProps> = ({
  records,
  onAddNew,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [issueFilter, setIssueFilter] = useState('');
  const [viewRecord, setViewRecord] = useState<OfficeMonitoringRecord | null>(null);

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      r.officeName.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.monitoringTeam.toLowerCase().includes(q);
    const matchProv = !provinceFilter || r.province === provinceFilter;
    const matchIssue =
      !issueFilter || (issueFilter === 'yes' ? Boolean(r.issuesFound) : !r.issuesFound);

    return matchSearch && matchProv && matchIssue;
  });

  const totalOffices = records.length;
  const uniqueProvinces = new Set(records.map((r) => r.province)).size;
  const uniqueDistricts = new Set(records.map((r) => r.district)).size;
  const problemCount = records.filter((r) => Boolean(r.issuesFound)).length;

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* 5 Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#64748b] font-bold">कुल कार्यालय अनुगमन</div>
          <div className="text-xl font-black text-[#1e40af]">{toNepaliDigits(totalOffices)}</div>
          <div className="text-[9px] text-gray-400">निगरानी गरिएको</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#0d9488] font-bold">प्रदेश समेटिएको</div>
          <div className="text-xl font-black text-[#0d9488]">{toNepaliDigits(uniqueProvinces || 7)}</div>
          <div className="text-[9px] text-emerald-600 font-semibold">सबै प्रदेश</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#6366f1] font-bold">जिल्ला समेटिएको</div>
          <div className="text-xl font-black text-[#4338ca]">{toNepaliDigits(uniqueDistricts || 24)}</div>
          <div className="text-[9px] text-indigo-500 font-semibold">जिल्ला कभरेज</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#e11d48] font-bold">समस्या भेटिएका</div>
          <div className="text-xl font-black text-[#be123c]">{toNepaliDigits(problemCount)}</div>
          <div className="text-[9px] text-rose-500 font-semibold">सुधार आवश्यक</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#16a34a] font-bold">सन्तोषजनक कार्यालय</div>
          <div className="text-xl font-black text-[#15803d]">
            {toNepaliDigits(totalOffices - problemCount)}
          </div>
          <div className="text-[9px] text-green-600 font-semibold">नियमित सञ्चालन</div>
        </div>
      </div>

      {/* Map visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NepalMap title="अनुगमन गरिएका जिल्लाहरू" height={220} />
        <NepalMap title="समस्या देखिएका जिल्लाहरू (जोखिम विश्लेषण)" height={220} />
      </div>

      {/* Details Table */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b border-[#edf2f7] flex flex-wrap items-center justify-between gap-2 bg-[#f8fafc]">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="कार्यालय, जिल्ला, अनुगमनकर्ता खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={provinceFilter}
              onChange={(e) => setProvinceFilter(e.target.value)}
              className="p-1.5 border border-[#cfdbe8] rounded bg-white text-xs"
            >
              <option value="">सबै प्रदेश</option>
              {Object.values(NEPAL_PROVINCES).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              value={issueFilter}
              onChange={(e) => setIssueFilter(e.target.value)}
              className="p-1.5 border border-[#cfdbe8] rounded bg-white text-xs"
            >
              <option value="">सबै अवस्था</option>
              <option value="yes">समस्या देखिएको</option>
              <option value="no">सन्तोषजनक</option>
            </select>

            <button
              onClick={onAddNew}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>नयाँ अनुगमन</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-left">मिति</th>
                <th className="p-2.5 text-left">प्रदेश</th>
                <th className="p-2.5 text-left">जिल्ला</th>
                <th className="p-2.5 text-left">स्थानीय तह</th>
                <th className="p-2.5 text-left">कार्यालयको नाम</th>
                <th className="p-2.5 text-left">अनुगमनकर्ता</th>
                <th className="p-2.5 text-left min-w-[180px]">समस्या/कैफियत</th>
                <th className="p-2.5 text-center">स्थिति</th>
                <th className="p-2.5 text-center">कार्य</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {filtered.length > 0 ? (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-2.5 font-mono whitespace-nowrap">{r.monitoringDate}</td>
                    <td className="p-2.5 whitespace-nowrap">{r.province}</td>
                    <td className="p-2.5 whitespace-nowrap font-semibold">{r.district}</td>
                    <td className="p-2.5 whitespace-nowrap">{r.municipality}</td>
                    <td className="p-2.5 font-bold text-[#0c2f55] whitespace-nowrap">{r.officeName}</td>
                    <td className="p-2.5 whitespace-nowrap text-gray-600">{r.monitoringTeam}</td>
                    <td className="p-2.5 text-gray-700 max-w-[200px] truncate" title={r.issuesFound}>
                      {r.issuesFound || 'कुनै गम्भीर समस्या नदेखिएको'}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {r.status === 'done' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          सम्पन्न
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          सुधार बाँकी
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewRecord(r)}
                          className="p-1 rounded text-blue-600 hover:bg-blue-100"
                          title="हेर्नुहोस्"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`के तपाईं निश्चित हुनुहुन्छ? ${r.officeName}`)) {
                              onDeleteRecord(r.id);
                            }
                          }}
                          className="p-1 rounded text-red-600 hover:bg-red-100"
                          title="मेटाउनुहोस्"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-400">
                    कुनै अनुगमन अभिलेख फेला परेन।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-xs">
            <div className="bg-[#0c2f55] text-white p-4 flex justify-between items-center sticky top-0">
              <h3 className="font-bold text-sm">कार्यालय अनुगमन विवरण: {viewRecord.officeName}</h3>
              <button onClick={() => setViewRecord(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded border">
                <div>
                  <span className="text-gray-500 block">अनुगमन मिति</span>
                  <span className="font-bold">{viewRecord.monitoringDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">ठेगाना</span>
                  <span className="font-bold">
                    {viewRecord.municipality}, {viewRecord.district}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">अनुगमनकर्ता</span>
                  <span className="font-bold">{viewRecord.monitoringTeam}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">दरबन्दी स्थिति</span>
                  <span className="font-bold">
                    कार्यरत: {toNepaliDigits(viewRecord.workingStaff)} / कुल: {toNepaliDigits(viewRecord.totalStaff)}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">देखिएका मूलभूत समस्याहरू</h4>
                <p className="p-3 bg-red-50/50 rounded border border-red-100 text-gray-800">
                  {viewRecord.issuesFound || 'कुनै गम्भीर समस्या नदेखिएको।'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">सुधारका लागि दिइएको निर्देशन</h4>
                <p className="p-3 bg-emerald-50/50 rounded border border-emerald-100 text-gray-800">
                  {viewRecord.recommendations || 'नियमित सुधार जारी राख्ने।'}
                </p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 text-right border-t">
              <button
                onClick={() => setViewRecord(null)}
                className="px-4 py-1.5 bg-[#0c2f55] text-white rounded font-bold"
              >
                बन्द गर्नुहोस्
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
