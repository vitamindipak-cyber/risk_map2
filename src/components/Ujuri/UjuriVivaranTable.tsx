import React, { useState, useMemo } from 'react';
import { UjuriRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import { NEPAL_MINISTRIES, NEPAL_PROVINCES, NEPAL_DISTRICTS_BY_PROVINCE } from '../../data/nepalData';
import {
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  Eye,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  RotateCcw,
  Printer
} from 'lucide-react';

interface UjuriVivaranTableProps {
  records: UjuriRecord[];
  onUpdateRecord: (record: UjuriRecord) => void;
  onDeleteRecord: (id: string) => void;
  onAddNew: () => void;
}

export const UjuriVivaranTable: React.FC<UjuriVivaranTableProps> = ({
  records,
  onUpdateRecord,
  onDeleteRecord,
  onAddNew
}) => {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ministryFilter, setMinistryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection & Modal states
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewRecord, setViewRecord] = useState<UjuriRecord | null>(null);
  const [editRecord, setEditRecord] = useState<UjuriRecord | null>(null);

  // Filter logic
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !q ||
        r.registrationNumber.toLowerCase().includes(q) ||
        r.complainantName.toLowerCase().includes(q) ||
        r.opponentName.toLowerCase().includes(q) ||
        r.complaintDescription.toLowerCase().includes(q) ||
        r.ministry.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q);

      const matchProv = !provinceFilter || r.province === provinceFilter;
      const matchDist = !districtFilter || r.district === districtFilter;
      const matchStatus = !statusFilter || r.status === statusFilter;
      const matchMinistry = !ministryFilter || r.ministry === ministryFilter;
      const matchPriority = !priorityFilter || r.priority === priorityFilter;

      return matchSearch && matchProv && matchDist && matchStatus && matchMinistry && matchPriority;
    });
  }, [records, searchTerm, provinceFilter, districtFilter, statusFilter, ministryFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const currentRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Computed stat counts
  const totalCount = records.length;
  const resolvedCount = records.filter((r) => r.status === 'resolved' || r.status === 'closed').length;
  const inProgressCount = records.filter((r) => r.status === 'in_progress').length;
  const pendingCount = records.filter((r) => r.status === 'pending').length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(currentRecords.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    const updated = new Set(selectedIds);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setSelectedIds(updated);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setProvinceFilter('');
    setDistrictFilter('');
    setStatusFilter('');
    setMinistryFilter('');
    setPriorityFilter('');
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['दर्ता नं', 'मिति', 'उजुरकर्ता', 'विपक्षी', 'मन्त्रालय/निकाय', 'जिल्ला', 'स्थिति', 'प्रकृति', 'विवरण'];
    const rows = filteredRecords.map((r) => [
      r.registrationNumber,
      r.registrationDate,
      r.complainantName,
      r.opponentName,
      r.ministry,
      r.district,
      r.status,
      r.complaintType,
      `"${r.complaintDescription.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nvc_ujuri_list_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3 p-1">
      {/* 6 Executive Stat Cards in Compact Nepal Government Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-2.5 shadow-2xs text-left">
          <div className="text-[10px] text-[#64748b] font-bold">कूल उजुरी दर्ता</div>
          <div className="text-lg font-black text-[#1e40af]">{toNepaliDigits(totalCount)}</div>
          <div className="text-[9px] text-gray-400">सम्पूर्ण अभिलेख</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-2.5 shadow-2xs text-left">
          <div className="text-[10px] text-[#0d9488] font-bold">चालु आ.व.को उजुरी</div>
          <div className="text-lg font-black text-[#0d9488]">{toNepaliDigits(records.length)}</div>
          <div className="text-[9px] text-emerald-600 font-semibold">२०८३/८४</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-2.5 shadow-2xs text-left">
          <div className="text-[10px] text-[#6366f1] font-bold">गत आ.व.को अ.ल्या.</div>
          <div className="text-lg font-black text-[#4338ca]">{toNepaliDigits(142)}</div>
          <div className="text-[9px] text-indigo-500 font-semibold">२०८२/८३</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-2.5 shadow-2xs text-left">
          <div className="text-[10px] text-[#16a34a] font-bold">फछ्र्यौट भएका</div>
          <div className="text-lg font-black text-[#15803d]">{toNepaliDigits(resolvedCount)}</div>
          <div className="text-[9px] text-green-600 font-semibold">
            {toNepaliDigits(totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0)}% फछ्र्यौट दर
          </div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-2.5 shadow-2xs text-left">
          <div className="text-[10px] text-[#d97706] font-bold">चालु उजुरी</div>
          <div className="text-lg font-black text-[#b45309]">{toNepaliDigits(inProgressCount)}</div>
          <div className="text-[9px] text-amber-600 font-semibold">छानबिन प्रक्रियामा</div>
        </div>
        <div className="bg-white border border-[#dbe4ef] rounded-lg p-2.5 shadow-2xs text-left">
          <div className="text-[10px] text-[#e11d48] font-bold">फछ्र्यौट हुन बाँकी</div>
          <div className="text-lg font-black text-[#be123c]">{toNepaliDigits(pendingCount)}</div>
          <div className="text-[9px] text-rose-500 font-semibold">प्रारम्भिक चरण</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        {/* Table Top Header & Controls */}
        <div className="p-3 border-b border-[#edf2f7] flex flex-wrap items-center justify-between gap-3 bg-[#f8fafc]">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="दर्ता नं, उजुरकर्ता, विपक्षी, मन्त्रालय, विवरण खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded-md bg-white focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
                isFilterOpen || provinceFilter || districtFilter || statusFilter || ministryFilter || priorityFilter
                  ? 'bg-[#1e40af] text-white border-[#1e40af]'
                  : 'bg-white text-gray-700 border-[#cfdbe8] hover:bg-gray-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>फिल्टर</span>
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold bg-[#10b981] hover:bg-[#059669] text-white transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold bg-white border border-[#cfdbe8] text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिन्ट</span>
            </button>

            <button
              onClick={onAddNew}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#0c2f55] hover:bg-[#124275] text-white transition-colors cursor-pointer shadow-2xs"
            >
              <span>+ नयाँ उजुरी दर्ता</span>
            </button>
          </div>
        </div>

        {/* Collapsible Filter Bar */}
        {isFilterOpen && (
          <div className="p-3 bg-[#f1f5f9] border-b border-[#e2e8f0] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs animate-slide-down">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-0.5">प्रदेश</label>
              <select
                value={provinceFilter}
                onChange={(e) => {
                  setProvinceFilter(e.target.value);
                  setDistrictFilter('');
                }}
                className="w-full p-1.5 border border-[#cfdbe8] rounded bg-white"
              >
                <option value="">सबै प्रदेश</option>
                {Object.values(NEPAL_PROVINCES).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-0.5">स्थिति</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-1.5 border border-[#cfdbe8] rounded bg-white"
              >
                <option value="">सबै स्थिति</option>
                <option value="pending">काम बाँकी</option>
                <option value="in_progress">चालु</option>
                <option value="resolved">फछ्र्यौट</option>
                <option value="closed">बन्द</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-0.5">प्राथमिकता</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full p-1.5 border border-[#cfdbe8] rounded bg-white"
              >
                <option value="">सबै प्राथमिकता</option>
                <option value="उच्च">उच्च</option>
                <option value="मध्यम">मध्यम</option>
                <option value="सामान्य">सामान्य</option>
                <option value="न्यून">न्यून</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-0.5">मन्त्रालय</label>
              <select
                value={ministryFilter}
                onChange={(e) => setMinistryFilter(e.target.value)}
                className="w-full p-1.5 border border-[#cfdbe8] rounded bg-white"
              >
                <option value="">सबै मन्त्रालय</option>
                {NEPAL_MINISTRIES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 flex items-end gap-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100 font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>रिसेट</span>
              </button>
              <span className="text-[11px] text-gray-500 pb-1">
                नतिजा: <b>{toNepaliDigits(filteredRecords.length)}</b> वटा उजुरी
              </span>
            </div>
          </div>
        )}

        {/* The Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b border-[#cbd5e1] font-bold text-[11px]">
                <th className="p-2.5 text-center w-8">
                  <input
                    type="checkbox"
                    checked={currentRecords.length > 0 && currentRecords.every((r) => selectedIds.has(r.id))}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="p-2.5 text-left whitespace-nowrap">दर्ता नं</th>
                <th className="p-2.5 text-left whitespace-nowrap">मिति</th>
                <th className="p-2.5 text-left whitespace-nowrap">उजुरकर्ता</th>
                <th className="p-2.5 text-left whitespace-nowrap">विपक्षी</th>
                <th className="p-2.5 text-left whitespace-nowrap">मन्त्रालय / निकाय</th>
                <th className="p-2.5 text-left min-w-[200px]">उजुरीको व्यहोरा</th>
                <th className="p-2.5 text-left whitespace-nowrap">समितिको निर्णय</th>
                <th className="p-2.5 text-left whitespace-nowrap">अन्तिम निर्णय</th>
                <th className="p-2.5 text-center whitespace-nowrap">स्थिति</th>
                <th className="p-2.5 text-center whitespace-nowrap">कार्य</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {currentRecords.length > 0 ? (
                currentRecords.map((r) => {
                  const isSelected = selectedIds.has(r.id);
                  return (
                    <tr
                      key={r.id}
                      className={`hover:bg-[#f8fafc] transition-colors ${
                        isSelected ? 'bg-blue-50/70' : ''
                      }`}
                    >
                      <td className="p-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(r.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="p-2.5 font-mono font-bold text-[#1d4ed8] whitespace-nowrap">
                        {r.registrationNumber}
                      </td>
                      <td className="p-2.5 text-gray-600 whitespace-nowrap font-mono">{r.registrationDate}</td>
                      <td className="p-2.5 font-semibold text-gray-800 whitespace-nowrap">{r.complainantName}</td>
                      <td className="p-2.5 font-bold text-[#0c2f55] whitespace-nowrap">{r.opponentName}</td>
                      <td className="p-2.5 text-gray-600 whitespace-nowrap">{r.ministry}</td>
                      <td className="p-2.5 text-gray-700 max-w-[220px] line-clamp-2" title={r.complaintDescription}>
                        {r.complaintDescription}
                      </td>
                      <td className="p-2.5 text-gray-600 max-w-[150px] truncate" title={r.committeeDecision}>
                        {r.committeeDecision}
                      </td>
                      <td className="p-2.5 text-gray-600 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px]">
                          {r.finalDecisionType || 'तामेली'}
                        </span>
                      </td>
                      <td className="p-2.5 text-center whitespace-nowrap">
                        {r.status === 'resolved' || r.status === 'closed' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle className="w-2.5 h-2.5" /> फछ्र्यौट
                          </span>
                        ) : r.status === 'in_progress' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            <Clock className="w-2.5 h-2.5" /> चालु
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-800">
                            काम बाँकी
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setViewRecord(r)}
                            className="p-1 rounded text-blue-600 hover:bg-blue-100 transition-colors"
                            title="विवरण हेर्नुहोस्"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditRecord(r)}
                            className="p-1 rounded text-amber-600 hover:bg-amber-100 transition-colors"
                            title="सम्पादन गर्नुहोस्"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`के तपाईं निश्चित हुनुहुन्छ? दर्ता नं: ${r.registrationNumber}`)) {
                                onDeleteRecord(r.id);
                              }
                            }}
                            className="p-1 rounded text-red-600 hover:bg-red-100 transition-colors"
                            title="मेटाउनुहोस्"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-8 text-gray-500 text-xs">
                    कुनै उजुरी फेला परेन।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-3 border-t border-[#edf2f7] flex items-center justify-between text-xs text-gray-600 bg-[#f8fafc]">
          <div className="flex items-center gap-2">
            <span>प्रति पृष्ठ:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-1 border border-gray-300 rounded bg-white text-xs font-bold"
            >
              <option value={10}>१०</option>
              <option value={25}>२५</option>
              <option value={50}>५०</option>
            </select>
            <span>
              कुल: <b>{toNepaliDigits(filteredRecords.length)}</b> वटा उजुरी
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1 rounded border border-gray-300 bg-white disabled:opacity-40 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold text-gray-800">
              पृष्ठ {toNepaliDigits(currentPage)} / {toNepaliDigits(totalPages)}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1 rounded border border-gray-300 bg-white disabled:opacity-40 hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-xs animate-scale-up">
            <div className="bg-[#0c2f55] text-white p-4 flex justify-between items-center sticky top-0">
              <h3 className="font-bold text-sm">उजुरी पूर्ण विवरण: {viewRecord.registrationNumber}</h3>
              <button onClick={() => setViewRecord(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <span className="text-gray-500 block">दर्ता मिति</span>
                  <span className="font-bold">{viewRecord.registrationDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">स्थिति</span>
                  <span className="font-bold text-[#1d4ed8]">{viewRecord.status}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">उजुरकर्ता</span>
                  <span className="font-bold">{viewRecord.complainantName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">विपक्षी</span>
                  <span className="font-bold text-red-600">{viewRecord.opponentName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">मन्त्रालय</span>
                  <span className="font-bold">{viewRecord.ministry}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">स्थान</span>
                  <span className="font-bold">
                    {viewRecord.district}, {viewRecord.province}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">उजुरीको विवरण</h4>
                <p className="p-3 bg-blue-50/50 rounded border border-blue-100 text-gray-800 leading-relaxed">
                  {viewRecord.complaintDescription}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">समितिको निर्णय</h4>
                <p className="p-3 bg-amber-50/50 rounded border border-amber-100 text-gray-800 leading-relaxed">
                  {viewRecord.committeeDecision || 'निर्णय प्रक्रियामा रहेको।'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">अन्तिम निर्णय र आदेश</h4>
                <p className="p-3 bg-emerald-50/50 rounded border border-emerald-100 text-gray-800 leading-relaxed">
                  {viewRecord.finalDecision || 'सम्बन्धित निकायलाई निर्देशन पठाइएको।'}
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

      {/* Edit Modal */}
      {editRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-xs animate-scale-up">
            <div className="bg-[#1e40af] text-white p-4 flex justify-between items-center sticky top-0">
              <h3 className="font-bold text-sm">उजुरी विवरण सम्पादन: {editRecord.registrationNumber}</h3>
              <button onClick={() => setEditRecord(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">विपक्षी</label>
                  <input
                    type="text"
                    value={editRecord.opponentName}
                    onChange={(e) => setEditRecord({ ...editRecord, opponentName: e.target.value })}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">स्थिति</label>
                  <select
                    value={editRecord.status}
                    onChange={(e) => setEditRecord({ ...editRecord, status: e.target.value as any })}
                    className="w-full p-1.5 border rounded"
                  >
                    <option value="pending">काम बाँकी</option>
                    <option value="in_progress">चालु</option>
                    <option value="resolved">फछ्र्यौट</option>
                    <option value="closed">बन्द</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">उजुरीको व्यहोरा</label>
                <textarea
                  rows={3}
                  value={editRecord.complaintDescription}
                  onChange={(e) => setEditRecord({ ...editRecord, complaintDescription: e.target.value })}
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">समितिको निर्णय</label>
                <textarea
                  rows={2}
                  value={editRecord.committeeDecision}
                  onChange={(e) => setEditRecord({ ...editRecord, committeeDecision: e.target.value })}
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">अन्तिम निर्णय</label>
                <textarea
                  rows={2}
                  value={editRecord.finalDecision || ''}
                  onChange={(e) => setEditRecord({ ...editRecord, finalDecision: e.target.value })}
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">कैफियत</label>
                <input
                  type="text"
                  value={editRecord.remarks || ''}
                  onChange={(e) => setEditRecord({ ...editRecord, remarks: e.target.value })}
                  className="w-full p-1.5 border rounded"
                />
              </div>
            </div>
            <div className="p-3 bg-gray-100 flex justify-end gap-2 border-t">
              <button onClick={() => setEditRecord(null)} className="px-3 py-1.5 border rounded bg-white">
                रद्द
              </button>
              <button
                onClick={() => {
                  onUpdateRecord(editRecord);
                  setEditRecord(null);
                }}
                className="px-4 py-1.5 bg-[#10b981] text-white rounded font-bold"
              >
                सुरक्षित गर्नुहोस्
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
