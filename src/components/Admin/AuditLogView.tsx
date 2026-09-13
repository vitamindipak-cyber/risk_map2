import React, { useState } from 'react';
import { AuditLogEntry } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  User,
  Activity,
  FileSpreadsheet
} from 'lucide-react';

interface AuditLogViewProps {
  logs: AuditLogEntry[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const filtered = logs.filter((l) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      l.user.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.ipAddress.toLowerCase().includes(q);

    const matchAction = !actionFilter || l.action.includes(actionFilter);

    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-800 rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#0c2f55] m-0">
              प्रणाली अडिट लग तथा गतिविधि अभिलेख (Security Audit Trail)
            </h2>
            <p className="text-gray-500 text-[11px] m-0">
              प्रणालीमा भएका हरेक प्रविष्टि, सम्पादन, मेटाउने कार्य तथा लगइन लगहरूको आधिकारिक अभिलेख
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('अडिट लग डाउनलोड भयो।')}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 cursor-pointer shadow-2xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>लग निर्यात (Export)</span>
        </button>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b flex flex-wrap items-center justify-between gap-2 bg-[#f8fafc]">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="प्रयोगकर्ता, कार्य, विवरण, IP ठेगाना खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="p-1.5 border border-[#cfdbe8] rounded bg-white text-xs"
            >
              <option value="">सबै कार्यहरू</option>
              <option value="दर्ता">दर्ता</option>
              <option value="सम्पादन">सम्पादन</option>
              <option value="अनुगमन">अनुगमन</option>
              <option value="लगइन">लगइन</option>
            </select>
            <span className="text-[11px] text-gray-500">
              कुल: <b>{toNepaliDigits(filtered.length)}</b> वटा लग
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-left whitespace-nowrap">समय तथा मिति</th>
                <th className="p-2.5 text-left whitespace-nowrap">प्रयोगकर्ता</th>
                <th className="p-2.5 text-left whitespace-nowrap">भूमिका</th>
                <th className="p-2.5 text-left whitespace-nowrap">कार्य (Action)</th>
                <th className="p-2.5 text-left min-w-[240px]">विवरण</th>
                <th className="p-2.5 text-left whitespace-nowrap">IP ठेगाना</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="p-2.5 font-mono text-gray-600 whitespace-nowrap">{l.timestamp}</td>
                  <td className="p-2.5 font-bold text-[#0c2f55] whitespace-nowrap">{l.user}</td>
                  <td className="p-2.5 whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium">
                      {l.role}
                    </span>
                  </td>
                  <td className="p-2.5 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.action.includes('नयाँ') || l.action.includes('दर्ता')
                          ? 'bg-emerald-100 text-emerald-800'
                          : l.action.includes('सम्पादन')
                          ? 'bg-blue-100 text-blue-800'
                          : l.action.includes('मेटा')
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {l.action}
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-800 font-medium">{l.details}</td>
                  <td className="p-2.5 font-mono text-gray-400 whitespace-nowrap">{l.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
