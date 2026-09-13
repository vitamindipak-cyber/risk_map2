import React, { useState } from 'react';
import { TechnicalAuditRecord } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import { NEPAL_PROVINCES } from '../../data/nepalData';
import { NepalMap } from '../NepalMap';
import {
  Search,
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  X,
  HardHat,
  Save,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface TechnicalAuditViewProps {
  records: TechnicalAuditRecord[];
  onAddRecord: (record: TechnicalAuditRecord) => void;
  onUpdateRecord: (record: TechnicalAuditRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const TechnicalAuditView: React.FC<TechnicalAuditViewProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TechnicalAuditRecord | null>(null);
  const [viewRecord, setViewRecord] = useState<TechnicalAuditRecord | null>(null);

  // Form states
  const [projectName, setProjectName] = useState('');
  const [province, setProvince] = useState('बागमती प्रदेश');
  const [district, setDistrict] = useState('काठमाडौं');
  const [agency, setAgency] = useState('सडक विभाग');
  const [contractAmount, setContractAmount] = useState('४,५०,००,०००');
  const [auditDate, setAuditDate] = useState('२०८३-०३-१५');
  const [auditorName, setAuditorName] = useState('ई. रमेश अधिकारी');
  const [auditorPost, setAuditorPost] = useState('वरिष्ठ इन्जिनियर');
  const [keyFindings, setKeyFindings] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [status, setStatus] = useState<'completed' | 'ongoing'>('ongoing');

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      r.projectName.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.agency.toLowerCase().includes(q) ||
      r.auditorName.toLowerCase().includes(q)
    );
  });

  const total = records.length;
  const completed = records.filter((r) => r.status === 'completed').length;
  const ongoing = records.filter((r) => r.status === 'ongoing').length;

  const openNewModal = () => {
    setEditingRecord(null);
    setProjectName('');
    setProvince('बागमती प्रदेश');
    setDistrict('काठमाडौं');
    setAgency('सडक विभाग');
    setContractAmount('२,५०,००,०००');
    setAuditDate('२०८३-०४-१०');
    setAuditorName('ई. दिपेन्द्र श्रेष्ठ');
    setAuditorPost('सि.डि.ई.');
    setKeyFindings('');
    setRecommendations('');
    setStatus('ongoing');
    setIsModalOpen(true);
  };

  const openEditModal = (rec: TechnicalAuditRecord) => {
    setEditingRecord(rec);
    setProjectName(rec.projectName);
    setProvince(rec.province);
    setDistrict(rec.district);
    setAgency(rec.agency);
    setContractAmount(rec.contractAmount);
    setAuditDate(rec.auditDate);
    setAuditorName(rec.auditorName);
    setAuditorPost(rec.auditorPost);
    setKeyFindings(rec.keyFindings);
    setRecommendations(rec.recommendations);
    setStatus(rec.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      alert('आयोजनाको नाम अनिवार्य छ।');
      return;
    }

    if (editingRecord) {
      onUpdateRecord({
        ...editingRecord,
        projectName,
        province,
        district,
        agency,
        contractAmount,
        auditDate,
        auditorName,
        auditorPost,
        keyFindings,
        recommendations,
        status
      });
    } else {
      const newRec: TechnicalAuditRecord = {
        id: `TA-${Date.now()}`,
        sn: records.length + 1,
        projectName,
        province,
        district,
        agency,
        contractAmount,
        auditDate,
        auditorName,
        auditorPost,
        keyFindings,
        recommendations,
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
          <div className="text-[10px] text-blue-200 font-bold">कूल प्राविधिक परीक्षण</div>
          <div className="text-xl font-black">{toNepaliDigits(total)}</div>
          <div className="text-[9px] text-blue-100">भौतिक पूर्वाधार आयोजना</div>
        </div>
        <div className="bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-teal-200 font-bold">चालु आ.व.को परीक्षण</div>
          <div className="text-xl font-black">{toNepaliDigits(records.length)}</div>
          <div className="text-[9px] text-teal-100">२०८३/८४</div>
        </div>
        <div className="bg-gradient-to-r from-[#4338ca] to-[#6366f1] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-indigo-200 font-bold">गत आ.व.को अ.ल्या.</div>
          <div className="text-xl font-black">{toNepaliDigits(12)}</div>
          <div className="text-[9px] text-indigo-100">२०८२/८३</div>
        </div>
        <div className="bg-gradient-to-r from-[#15803d] to-[#22c55e] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-emerald-200 font-bold">सम्पन्न भएका</div>
          <div className="text-xl font-black">{toNepaliDigits(completed)}</div>
          <div className="text-[9px] text-emerald-100">प्रतिवेदन स्वीकृत</div>
        </div>
        <div className="bg-gradient-to-r from-[#b45309] to-[#f59e0b] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-amber-200 font-bold">चालु प्राविधिक परीक्षण</div>
          <div className="text-xl font-black">{toNepaliDigits(ongoing)}</div>
          <div className="text-[9px] text-amber-100">ल्याब टेस्ट प्रक्रियामा</div>
        </div>
      </div>

      {/* Map */}
      <NepalMap title="प्राविधिक परीक्षण गरिएका राष्ट्रिय आयोजनाहरू (नक्सा)" height={210} />

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
                placeholder="आयोजना, जिल्ला, निकाय, परीक्षक खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <button
            onClick={openNewModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>नयाँ प्राविधिक परीक्षण</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-center w-10">क.सं.</th>
                <th className="p-2.5 text-left min-w-[200px]">आयोजनाको नाम</th>
                <th className="p-2.5 text-left whitespace-nowrap">जिल्ला / प्रदेश</th>
                <th className="p-2.5 text-left whitespace-nowrap">सम्बन्धित निकाय</th>
                <th className="p-2.5 text-right whitespace-nowrap">सम्झौता रकम (रू)</th>
                <th className="p-2.5 text-left whitespace-nowrap">परीक्षण मिति</th>
                <th className="p-2.5 text-left whitespace-nowrap">प्राविधिक परीक्षक</th>
                <th className="p-2.5 text-left min-w-[180px]">मुख्य कैफियत / निष्कर्ष</th>
                <th className="p-2.5 text-center whitespace-nowrap">स्थिति</th>
                <th className="p-2.5 text-center whitespace-nowrap">कार्य</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {filtered.length > 0 ? (
                filtered.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-2.5 text-center font-bold text-gray-500">{toNepaliDigits(idx + 1)}</td>
                    <td className="p-2.5 font-bold text-[#0c2f55]">{r.projectName}</td>
                    <td className="p-2.5 whitespace-nowrap">
                      {r.district}, {r.province}
                    </td>
                    <td className="p-2.5 whitespace-nowrap text-gray-700">{r.agency}</td>
                    <td className="p-2.5 text-right font-mono font-bold whitespace-nowrap">
                      रू {r.contractAmount}
                    </td>
                    <td className="p-2.5 font-mono whitespace-nowrap">{r.auditDate}</td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span className="font-semibold text-gray-800">{r.auditorName}</span>
                      <span className="text-[10px] text-gray-400 block">{r.auditorPost}</span>
                    </td>
                    <td className="p-2.5 text-gray-700 max-w-[200px] truncate" title={r.keyFindings}>
                      {r.keyFindings}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {r.status === 'completed' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          सम्पन्न
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          परीक्षण जारी
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
                            if (confirm(`के तपाईं निश्चित हुनुहुन्छ? ${r.projectName}`)) {
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
                    कुनै प्राविधिक परीक्षण अभिलेख फेला परेन।
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
                {editingRecord ? 'प्राविधिक परीक्षण सम्पादन' : 'नयाँ प्राविधिक परीक्षण प्रविष्टि'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">आयोजनाको नाम *</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="जस्तै: मुग्लिन-पोखरा सडक खण्ड, पुल निर्माण आयोजना..."
                  className="w-full p-1.5 border rounded font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">प्रदेश</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-1.5 border rounded bg-white"
                  >
                    {Object.values(NEPAL_PROVINCES).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">जिल्ला</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">सम्बन्धित निकाय</label>
                  <input
                    type="text"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">सम्झौता रकम (रू)</label>
                  <input
                    type="text"
                    value={contractAmount}
                    onChange={(e) => setContractAmount(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">परीक्षण मिति</label>
                  <input
                    type="text"
                    value={auditDate}
                    onChange={(e) => setAuditDate(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">प्राविधिक परीक्षक</label>
                  <input
                    type="text"
                    value={auditorName}
                    onChange={(e) => setAuditorName(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">परीक्षकको पद</label>
                  <input
                    type="text"
                    value={auditorPost}
                    onChange={(e) => setAuditorPost(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">मुख्य कैफियत / प्राविधिक त्रुटिहरू</label>
                <textarea
                  rows={2}
                  value={keyFindings}
                  onChange={(e) => setKeyFindings(e.target.value)}
                  placeholder="कंक्रीटको गुणस्तर, ग्याबियन वाल, ढलानको मोटाइ..."
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">सुझाव तथा सुधारका उपायहरू</label>
                <textarea
                  rows={2}
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="गुणस्तर परीक्षण पुनः गर्ने, भुक्तानी रोक्का राख्ने..."
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
              <h3 className="font-bold text-sm text-[#0c2f55]">{viewRecord.projectName}</h3>
              <button onClick={() => setViewRecord(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 bg-gray-50 p-3 rounded border">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-500 block">सम्बन्धित निकाय</span>
                  <span className="font-bold">{viewRecord.agency}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">सम्झौता रकम</span>
                  <span className="font-bold font-mono">रू {viewRecord.contractAmount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">परीक्षक</span>
                  <span className="font-bold">
                    {viewRecord.auditorName} ({viewRecord.auditorPost})
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">परीक्षण मिति</span>
                  <span className="font-bold font-mono">{viewRecord.auditDate}</span>
                </div>
              </div>
              <div>
                <span className="text-red-700 font-bold block">प्राविधिक कैफियत</span>
                <p className="mt-1 text-gray-800">{viewRecord.keyFindings}</p>
              </div>
              <div>
                <span className="text-emerald-700 font-bold block">सुझाव</span>
                <p className="mt-1 text-gray-800">{viewRecord.recommendations}</p>
              </div>
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
