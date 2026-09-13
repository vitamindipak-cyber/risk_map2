import React, { useState } from 'react';
import { DressTimeRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import { NepalMap } from '../NepalMap';
import {
  Search,
  PlusCircle,
  Eye,
  Trash2,
  X,
  Clock,
  Shirt,
  Users
} from 'lucide-react';

interface DressTimeDetailsProps {
  records: DressTimeRecord[];
  onAddNew: () => void;
  onDeleteRecord: (id: string) => void;
}

export const DressTimeDetails: React.FC<DressTimeDetailsProps> = ({
  records,
  onAddNew,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [violationFilter, setViolationFilter] = useState('');
  const [viewRecord, setViewRecord] = useState<DressTimeRecord | null>(null);

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      r.officeName.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.teamLeader.toLowerCase().includes(q) ||
      r.staffViolations.some((v) => v.employeeName.toLowerCase().includes(q));

    const matchType =
      !violationFilter ||
      (violationFilter === 'time' && r.timeViolationsCount > 0) ||
      (violationFilter === 'dress' && r.dressViolationsCount > 0);

    return matchSearch && matchType;
  });

  const totalMonitored = records.length;
  const timeViolationCount = records.reduce((s, r) => s + (r.timeViolationsCount || 0), 0);
  const dressViolationCount = records.reduce((s, r) => s + (r.dressViolationsCount || 0), 0);
  const totalViolations = timeViolationCount + dressViolationCount;

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* 5 Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#64748b] font-bold">कुल छड्के अनुगमन</div>
          <div className="text-xl font-black text-[#1e40af]">{toNepaliDigits(totalMonitored)}</div>
          <div className="text-[9px] text-gray-400">कार्यालय अनुगमन</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#d97706] font-bold">समय अपरिपालना संख्या</div>
          <div className="text-xl font-black text-[#b45309]">{toNepaliDigits(timeViolationCount)}</div>
          <div className="text-[9px] text-amber-600 font-semibold">अनुपस्थित कर्मचारी</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#e11d48] font-bold">पोशाक अपरिपालना संख्या</div>
          <div className="text-xl font-black text-[#be123c]">{toNepaliDigits(dressViolationCount)}</div>
          <div className="text-[9px] text-rose-500 font-semibold">नियम विपरित पोशाक</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-3 shadow-2xs">
          <div className="text-[10px] text-[#7c3aed] font-bold">कुल अपरिपालना (Violations)</div>
          <div className="text-xl font-black text-[#6d28d9]">{toNepaliDigits(totalViolations)}</div>
          <div className="text-[9px] text-purple-600 font-semibold">कारबाही प्रक्रियामा</div>
        </div>
      </div>

      {/* Map visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NepalMap title="अनुगमन गरिएका जिल्लाहरू" height={220} />
        <NepalMap title="बढी अपरिपालना देखिएका जिल्लाहरू" height={220} />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b border-[#edf2f7] flex flex-wrap items-center justify-between gap-2 bg-[#f8fafc]">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="कार्यालय, कर्मचारी, जिल्ला खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={violationFilter}
              onChange={(e) => setViolationFilter(e.target.value)}
              className="p-1.5 border border-[#cfdbe8] rounded bg-white text-xs"
            >
              <option value="">सबै प्रकारका अनुगमन</option>
              <option value="time">समय अपरिपालना मात्र</option>
              <option value="dress">पोशाक अपरिपालना मात्र</option>
            </select>

            <button
              onClick={onAddNew}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>नयाँ समय/पोशाक अनुगमन</span>
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
                <th className="p-2.5 text-left">कार्यालयको नाम</th>
                <th className="p-2.5 text-center">कूल कर्मचारी</th>
                <th className="p-2.5 text-center">समय अपरिपालना</th>
                <th className="p-2.5 text-center">पोशाक अपरिपालना</th>
                <th className="p-2.5 text-left">अनुगमनकर्ता</th>
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
                    <td className="p-2.5 font-bold text-[#0c2f55] whitespace-nowrap">{r.officeName}</td>
                    <td className="p-2.5 text-center font-bold">{toNepaliDigits(r.totalStaff)}</td>
                    <td className="p-2.5 text-center">
                      {r.timeViolationsCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                          {toNepaliDigits(r.timeViolationsCount)}
                        </span>
                      ) : (
                        <span className="text-gray-400">०</span>
                      )}
                    </td>
                    <td className="p-2.5 text-center">
                      {r.dressViolationsCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                          {toNepaliDigits(r.dressViolationsCount)}
                        </span>
                      ) : (
                        <span className="text-gray-400">०</span>
                      )}
                    </td>
                    <td className="p-2.5 whitespace-nowrap text-gray-600">{r.teamLeader}</td>
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
                    कुनै अभिलेख फेला परेन।
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
              <h3 className="font-bold text-sm">अनुगमन विवरण: {viewRecord.officeName}</h3>
              <button onClick={() => setViewRecord(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded border">
                <div>
                  <span className="text-gray-500 block">मिति तथा समय</span>
                  <span className="font-bold">
                    {viewRecord.monitoringDate} ({viewRecord.monitoringTime})
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">स्थान</span>
                  <span className="font-bold">
                    {viewRecord.district}, {viewRecord.province}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">अनुगमन टोली प्रमुख</span>
                  <span className="font-bold">{viewRecord.teamLeader} ({viewRecord.teamLeaderPost})</span>
                </div>
                <div>
                  <span className="text-gray-500 block">कार्यालय अधिकृत</span>
                  <span className="font-bold">{viewRecord.officialName}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">अपरिपालना गर्ने कर्मचारीहरूको सूची ({toNepaliDigits(viewRecord.staffViolations.length)})</h4>
                <div className="border rounded overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-2 text-left">प्रकार</th>
                        <th className="p-2 text-left">नाम</th>
                        <th className="p-2 text-left">पद</th>
                        <th className="p-2 text-left">संकेत नं</th>
                        <th className="p-2 text-left">कैफियत</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {viewRecord.staffViolations.map((s, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-semibold text-rose-700">{s.category}</td>
                          <td className="p-2 font-bold">{s.employeeName}</td>
                          <td className="p-2">{s.position}</td>
                          <td className="p-2 font-mono">{s.symbolNo}</td>
                          <td className="p-2 text-gray-600">{s.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
