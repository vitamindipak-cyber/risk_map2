import React, { useState } from 'react';
import { PromotionalRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import {
  Search,
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  X,
  Megaphone,
  Users,
  Calendar,
  Save,
  CheckCircle2
} from 'lucide-react';

interface PromotionalViewProps {
  records: PromotionalRecord[];
  onAddRecord: (record: PromotionalRecord) => void;
  onUpdateRecord: (record: PromotionalRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const PromotionalView: React.FC<PromotionalViewProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PromotionalRecord | null>(null);
  const [viewRecord, setViewRecord] = useState<PromotionalRecord | null>(null);

  // Form states
  const [programName, setProgramName] = useState('');
  const [programType, setProgramType] = useState('अन्तरक्रिया कार्यक्रम');
  const [targetGroup, setTargetGroup] = useState('सार्वजनिक पदाधिकारीहरू');
  const [location, setLocation] = useState('काठमाडौं');
  const [date, setDate] = useState('२०८३-०४-२५');
  const [participantsCount, setParticipantsCount] = useState(60);
  const [budget, setBudget] = useState('१,५०,०००');
  const [objectives, setObjectives] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [status, setStatus] = useState<'completed' | 'upcoming'>('completed');

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      r.programName.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.programType.toLowerCase().includes(q) ||
      r.targetGroup.toLowerCase().includes(q)
    );
  });

  const total = records.length;
  const completed = records.filter((r) => r.status === 'completed').length;
  const upcoming = records.filter((r) => r.status === 'upcoming').length;

  const openNewModal = () => {
    setEditingRecord(null);
    setProgramName('');
    setProgramType('अन्तरक्रिया कार्यक्रम');
    setTargetGroup('स्थानीय तहका जनप्रतिनिधिहरू');
    setLocation('पोखरा');
    setDate('२०८३-०५-१०');
    setParticipantsCount(80);
    setBudget('२,००,०००');
    setObjectives('');
    setOutcomes('');
    setStatus('upcoming');
    setIsModalOpen(true);
  };

  const openEditModal = (rec: PromotionalRecord) => {
    setEditingRecord(rec);
    setProgramName(rec.programName);
    setProgramType(rec.programType);
    setTargetGroup(rec.targetGroup);
    setLocation(rec.location);
    setDate(rec.date);
    setParticipantsCount(rec.participantsCount);
    setBudget(rec.budget);
    setObjectives(rec.objectives);
    setOutcomes(rec.outcomes);
    setStatus(rec.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programName.trim()) {
      alert('कार्यक्रमको नाम अनिवार्य छ।');
      return;
    }

    if (editingRecord) {
      onUpdateRecord({
        ...editingRecord,
        programName,
        programType,
        targetGroup,
        location,
        date,
        participantsCount: Number(participantsCount),
        budget,
        objectives,
        outcomes,
        status
      });
    } else {
      const newRec: PromotionalRecord = {
        id: `PR-${Date.now()}`,
        sn: records.length + 1,
        programName,
        programType,
        targetGroup,
        location,
        date,
        participantsCount: Number(participantsCount),
        budget,
        objectives,
        outcomes,
        status
      };
      onAddRecord(newRec);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* 5 Themed Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-blue-200 font-bold">कूल प्रवर्द्धनात्मक कार्यक्रम</div>
          <div className="text-xl font-black">{toNepaliDigits(total)}</div>
          <div className="text-[9px] text-blue-100">सचेतना तथा अभिमुखीकरण</div>
        </div>
        <div className="bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-teal-200 font-bold">चालु आ.व.का कार्यक्रम</div>
          <div className="text-xl font-black">{toNepaliDigits(records.length)}</div>
          <div className="text-[9px] text-teal-100">२०८३/८४</div>
        </div>
        <div className="bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-indigo-200 font-bold">गत आ.व.को अ.ल्या.</div>
          <div className="text-xl font-black">{toNepaliDigits(14)}</div>
          <div className="text-[9px] text-indigo-100">२०८२/८३</div>
        </div>
        <div className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-emerald-200 font-bold">सम्पन्न भएका</div>
          <div className="text-xl font-black">{toNepaliDigits(completed)}</div>
          <div className="text-[9px] text-emerald-100">लक्ष्य हासिल</div>
        </div>
        <div className="bg-gradient-to-r from-[#d97706] to-[#fbbf24] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-amber-100 font-bold">आगामी कार्यक्रम</div>
          <div className="text-xl font-black text-white">{toNepaliDigits(upcoming)}</div>
          <div className="text-[9px] text-amber-100">तालिकाबद्ध</div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b flex flex-wrap items-center justify-between gap-2 bg-[#f8fafc]">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="कार्यक्रमको नाम, स्थान, लक्षित समूह खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <button
            onClick={openNewModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>नयाँ कार्यक्रम प्रविष्टि</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-center w-10">क.सं.</th>
                <th className="p-2.5 text-left min-w-[200px]">कार्यक्रमको नाम</th>
                <th className="p-2.5 text-left whitespace-nowrap">प्रकार</th>
                <th className="p-2.5 text-left whitespace-nowrap">लक्षित समूह</th>
                <th className="p-2.5 text-left whitespace-nowrap">स्थान</th>
                <th className="p-2.5 text-left whitespace-nowrap">मिति</th>
                <th className="p-2.5 text-center whitespace-nowrap">सहभागी संख्या</th>
                <th className="p-2.5 text-right whitespace-nowrap">बजेट (रू)</th>
                <th className="p-2.5 text-center whitespace-nowrap">स्थिति</th>
                <th className="p-2.5 text-center whitespace-nowrap">कार्य</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {filtered.length > 0 ? (
                filtered.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-2.5 text-center font-bold text-gray-500">{toNepaliDigits(idx + 1)}</td>
                    <td className="p-2.5 font-bold text-[#0c2f55]">{r.programName}</td>
                    <td className="p-2.5 whitespace-nowrap text-gray-700">{r.programType}</td>
                    <td className="p-2.5 whitespace-nowrap text-gray-600">{r.targetGroup}</td>
                    <td className="p-2.5 whitespace-nowrap font-semibold">{r.location}</td>
                    <td className="p-2.5 font-mono whitespace-nowrap">{r.date}</td>
                    <td className="p-2.5 text-center font-bold">{toNepaliDigits(r.participantsCount)} जना</td>
                    <td className="p-2.5 text-right font-mono font-bold whitespace-nowrap">रू {r.budget}</td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {r.status === 'completed' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          सम्पन्न
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          आगामी
                        </span>
                      )}
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
                            if (confirm(`के तपाईं निश्चित हुनुहुन्छ? ${r.programName}`)) {
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
                  <td colSpan={10} className="text-center py-6 text-gray-400">
                    कुनै कार्यक्रम फेला परेन।
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
                {editingRecord ? 'कार्यक्रम सम्पादन' : 'नयाँ प्रवर्द्धनात्मक कार्यक्रम'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">कार्यक्रमको नाम *</label>
                <input
                  type="text"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full p-1.5 border rounded font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">कार्यक्रमको प्रकार</label>
                  <select
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value)}
                    className="w-full p-1.5 border rounded bg-white"
                  >
                    <option value="अन्तरक्रिया कार्यक्रम">अन्तरक्रिया कार्यक्रम</option>
                    <option value="सचेतनामूलक गोष्ठी">सचेतनामूलक गोष्ठी</option>
                    <option value="अभिमुखीकरण तालिम">अभिमुखीकरण तालिम</option>
                    <option value="विद्यार्थी निबन्ध प्रतियोगिता">विद्यार्थी निबन्ध प्रतियोगिता</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">लक्षित समूह</label>
                  <input
                    type="text"
                    value={targetGroup}
                    onChange={(e) => setTargetGroup(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">स्थान / जिल्ला</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">मिति (वि.सं.)</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">सहभागी संख्या</label>
                  <input
                    type="number"
                    value={participantsCount}
                    onChange={(e) => setParticipantsCount(Number(e.target.value))}
                    className="w-full p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">बजेट (रू)</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">स्थिति</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-1.5 border rounded bg-white"
                  >
                    <option value="completed">सम्पन्न</option>
                    <option value="upcoming">आगामी</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">मुख्य उद्देश्य</label>
                <textarea
                  rows={2}
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="कार्यक्रमको मुख्य उद्देश्य..."
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
              <h3 className="font-bold text-sm text-[#0c2f55]">{viewRecord.programName}</h3>
              <button onClick={() => setViewRecord(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 bg-gray-50 p-3 rounded border">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-500 block">प्रकार</span>
                  <span className="font-bold">{viewRecord.programType}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">लक्षित समूह</span>
                  <span className="font-bold">{viewRecord.targetGroup}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">स्थान तथा मिति</span>
                  <span className="font-bold">
                    {viewRecord.location} ({viewRecord.date})
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">सहभागी / बजेट</span>
                  <span className="font-bold">
                    {toNepaliDigits(viewRecord.participantsCount)} जना / रू {viewRecord.budget}
                  </span>
                </div>
              </div>
              {viewRecord.objectives && (
                <div>
                  <span className="text-gray-700 font-bold block">उद्देश्य</span>
                  <p className="mt-1 text-gray-800">{viewRecord.objectives}</p>
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
