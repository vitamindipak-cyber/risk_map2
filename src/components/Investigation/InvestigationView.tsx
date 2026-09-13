import React, { useState } from 'react';
import { InvestigationRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import {
  Search,
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  X,
  FileCheck,
  SearchCheck,
  Calendar,
  Save,
  FileText,
  Upload
} from 'lucide-react';

interface InvestigationViewProps {
  records: InvestigationRecord[];
  onAddRecord: (record: InvestigationRecord) => void;
  onUpdateRecord: (record: InvestigationRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const InvestigationView: React.FC<InvestigationViewProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<InvestigationRecord | null>(null);
  const [viewRecord, setViewRecord] = useState<InvestigationRecord | null>(null);

  // Form fields
  const [regNo, setRegNo] = useState('');
  const [regDate, setRegDate] = useState('२०८३-०४-०५');
  const [complainant, setComplainant] = useState('');
  const [respondent, setRespondent] = useState('');
  const [office, setOffice] = useState('');
  const [details, setDetails] = useState('');
  const [investigationDate, setInvestigationDate] = useState('२०८३-०४-२५');
  const [reportDate, setReportDate] = useState('');
  const [reportSummary, setReportSummary] = useState('');
  const [status, setStatus] = useState<'completed' | 'ongoing'>('ongoing');

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      r.regNo.toLowerCase().includes(q) ||
      r.complainant.toLowerCase().includes(q) ||
      r.respondent.toLowerCase().includes(q) ||
      r.office.toLowerCase().includes(q) ||
      r.details.toLowerCase().includes(q)
    );
  });

  const total = records.length;
  const completed = records.filter((r) => r.status === 'completed' || Boolean(r.reportDate)).length;
  const ongoing = records.filter((r) => r.status === 'ongoing' && !r.reportDate).length;

  const openNewModal = () => {
    setEditingRecord(null);
    setRegNo(`NVC-छानबिन-${toNepaliDigits(records.length + 1)}/२०८३`);
    setRegDate('२०८३-०४-१५');
    setComplainant('');
    setRespondent('');
    setOffice('');
    setDetails('');
    setInvestigationDate('२०८३-०४-२८');
    setReportDate('');
    setReportSummary('');
    setStatus('ongoing');
    setIsModalOpen(true);
  };

  const openEditModal = (rec: InvestigationRecord) => {
    setEditingRecord(rec);
    setRegNo(rec.regNo);
    setRegDate(rec.regDate);
    setComplainant(rec.complainant);
    setRespondent(rec.respondent);
    setOffice(rec.office);
    setDetails(rec.details);
    setInvestigationDate(rec.investigationDate);
    setReportDate(rec.reportDate);
    setReportSummary(rec.reportSummary);
    setStatus(rec.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo.trim() || !complainant.trim()) {
      alert('उजुरी दर्ता नं र उजुरकर्ताको नाम अनिवार्य छ।');
      return;
    }

    if (editingRecord) {
      onUpdateRecord({
        ...editingRecord,
        regNo,
        regDate,
        complainant,
        respondent,
        office,
        details,
        investigationDate,
        reportDate,
        reportSummary,
        status: reportDate ? 'completed' : status
      });
    } else {
      const newRec: InvestigationRecord = {
        id: `INV-${Date.now()}`,
        sn: records.length + 1,
        regNo,
        regDate,
        complainant,
        respondent,
        office,
        details,
        investigationDate,
        reportDate,
        reportSummary,
        status: reportDate ? 'completed' : 'ongoing'
      };
      onAddRecord(newRec);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* 5 Themed Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div className="bg-gradient-to-r from-[#1a3a6b] to-[#1e5799] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-blue-200 font-bold">कूल छानविन/अन्वेषण</div>
          <div className="text-xl font-black">{toNepaliDigits(total)}</div>
          <div className="text-[9px] text-blue-100">सम्पूर्ण अभिलेख</div>
        </div>
        <div className="bg-gradient-to-r from-[#065f5f] to-[#0d9488] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-teal-200 font-bold">चालु आ.व.को छानविन</div>
          <div className="text-xl font-black">{toNepaliDigits(records.length)}</div>
          <div className="text-[9px] text-teal-100">२०८३/८४</div>
        </div>
        <div className="bg-gradient-to-r from-[#3730a3] to-[#6366f1] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-indigo-200 font-bold">गत आ.व.को अ.ल्या.</div>
          <div className="text-xl font-black">{toNepaliDigits(18)}</div>
          <div className="text-[9px] text-indigo-100">२०८२/८३</div>
        </div>
        <div className="bg-gradient-to-r from-[#14532d] to-[#16a34a] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-emerald-200 font-bold">सम्पन्न भएका</div>
          <div className="text-xl font-black">{toNepaliDigits(completed)}</div>
          <div className="text-[9px] text-emerald-100">प्रतिवेदन पेश</div>
        </div>
        <div className="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-rose-200 font-bold">चालु छानविन/अन्वेषण</div>
          <div className="text-xl font-black">{toNepaliDigits(ongoing)}</div>
          <div className="text-[9px] text-rose-100">टोली खटिएको</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b flex flex-wrap items-center justify-between gap-2 bg-[#f8fafc]">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="दर्ता नं, उजुरकर्ता, विपक्षी, कार्यालय खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <button
            onClick={openNewModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>नयाँ छानविन/अन्वेषण</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-center w-10">क.सं.</th>
                <th className="p-2.5 text-left whitespace-nowrap">उजुरी दर्ता नं</th>
                <th className="p-2.5 text-left whitespace-nowrap">दर्ता मिति</th>
                <th className="p-2.5 text-left whitespace-nowrap">उजुरकर्ता</th>
                <th className="p-2.5 text-left whitespace-nowrap">विपक्षी</th>
                <th className="p-2.5 text-left whitespace-nowrap">सम्बन्धित निकाय</th>
                <th className="p-2.5 text-left min-w-[200px]">उजुरीको विवरण</th>
                <th className="p-2.5 text-left whitespace-nowrap">छानविन मिति</th>
                <th className="p-2.5 text-left whitespace-nowrap">प्रतिवेदन मिति</th>
                <th className="p-2.5 text-left min-w-[180px]">प्रतिवेदनको सार</th>
                <th className="p-2.5 text-center whitespace-nowrap">कार्य</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {filtered.length > 0 ? (
                filtered.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-2.5 text-center font-bold text-gray-500">{toNepaliDigits(idx + 1)}</td>
                    <td className="p-2.5 font-mono font-bold text-[#1d4ed8] whitespace-nowrap">{r.regNo}</td>
                    <td className="p-2.5 font-mono whitespace-nowrap">{r.regDate}</td>
                    <td className="p-2.5 font-semibold whitespace-nowrap">{r.complainant}</td>
                    <td className="p-2.5 font-bold text-[#0c2f55] whitespace-nowrap">{r.respondent}</td>
                    <td className="p-2.5 whitespace-nowrap text-gray-600">{r.office}</td>
                    <td className="p-2.5 text-gray-700 max-w-[220px] line-clamp-2" title={r.details}>
                      {r.details}
                    </td>
                    <td className="p-2.5 font-mono whitespace-nowrap">{r.investigationDate}</td>
                    <td className="p-2.5 font-mono whitespace-nowrap">
                      {r.reportDate ? (
                        <span className="text-emerald-700 font-bold">{r.reportDate}</span>
                      ) : (
                        <span className="text-amber-600 font-bold">प्रक्रिया जारी</span>
                      )}
                    </td>
                    <td className="p-2.5 text-gray-700 max-w-[200px] truncate" title={r.reportSummary}>
                      {r.reportSummary || 'प्रारम्भिक अनुसन्धान भइरहेको।'}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setViewRecord(r)}
                          className="p-1 rounded text-blue-600 hover:bg-blue-100"
                          title="हेर्नुहोस्"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(r)}
                          className="p-1 rounded text-amber-600 hover:bg-amber-100"
                          title="सम्पादन"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`के तपाईं निश्चित हुनुहुन्छ? दर्ता नं: ${r.regNo}`)) {
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
                  <td colSpan={11} className="text-center py-6 text-gray-400">
                    कुनै छानविन/अन्वेषण अभिलेख फेला परेन।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-xs">
            <div className="bg-[#0c2f55] text-white p-4 flex justify-between items-center sticky top-0">
              <h3 className="font-bold text-sm">
                {editingRecord ? 'छानविन/अन्वेषण सम्पादन' : 'नयाँ छानविन/अन्वेषण प्रविष्टि'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">उजुरी दर्ता नं *</label>
                  <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">दर्ता मिति</label>
                  <input
                    type="text"
                    value={regDate}
                    onChange={(e) => setRegDate(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">उजुरकर्ताको नाम *</label>
                  <input
                    type="text"
                    value={complainant}
                    onChange={(e) => setComplainant(e.target.value)}
                    className="w-full p-1.5 border rounded font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">विपक्षी</label>
                  <input
                    type="text"
                    value={respondent}
                    onChange={(e) => setRespondent(e.target.value)}
                    className="w-full p-1.5 border rounded font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">सम्बन्धित निकाय / कार्यालय</label>
                <input
                  type="text"
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  placeholder="जस्तै: खानेपानी डिभिजन, नापी शाखा..."
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">उजुरीको विवरण</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="उजुरीको पूर्ण व्यहोरा..."
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">छानविन/अन्वेषण मिति</label>
                  <input
                    type="text"
                    value={investigationDate}
                    onChange={(e) => setInvestigationDate(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">प्रतिवेदन मिति (सम्पन्न भएमा)</label>
                  <input
                    type="text"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    placeholder="२०८३-०५-०१"
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">प्रतिवेदनको सार / निष्कर्ष</label>
                <textarea
                  rows={2}
                  value={reportSummary}
                  onChange={(e) => setReportSummary(e.target.value)}
                  placeholder="छानविनको प्रतिवेदन तथा सिफारिस..."
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border rounded bg-white font-bold"
                >
                  रद्द
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0c2f55] text-white rounded font-bold flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>सुरक्षित गर्नुहोस्</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-5 text-xs space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-[#0c2f55]">
                छानविन विवरण: {viewRecord.regNo}
              </h3>
              <button onClick={() => setViewRecord(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 bg-gray-50 p-3 rounded border">
              <div>
                <span className="text-gray-500 block">उजुरकर्ता / विपक्षी</span>
                <span className="font-bold">
                  {viewRecord.complainant} विरुद्ध {viewRecord.respondent}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">सम्बन्धित कार्यालय</span>
                <span className="font-bold">{viewRecord.office}</span>
              </div>
              <div>
                <span className="text-gray-500 block">उजुरीको व्यहोरा</span>
                <p className="mt-1 text-gray-800">{viewRecord.details}</p>
              </div>
              {viewRecord.reportSummary && (
                <div>
                  <span className="text-emerald-700 font-bold block">प्रतिवेदनको निष्कर्ष</span>
                  <p className="mt-1 text-gray-800">{viewRecord.reportSummary}</p>
                </div>
              )}
            </div>

            <div className="text-right pt-2 border-t">
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
