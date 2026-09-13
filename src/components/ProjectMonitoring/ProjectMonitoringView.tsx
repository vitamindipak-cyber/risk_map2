import React, { useState } from 'react';
import { ProjectMonitoringRecord } from '../../types';
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
  TrendingUp,
  AlertOctagon,
  CheckCircle,
  Save,
  Building2
} from 'lucide-react';

interface ProjectMonitoringViewProps {
  records: ProjectMonitoringRecord[];
  onAddRecord: (record: ProjectMonitoringRecord) => void;
  onUpdateRecord: (record: ProjectMonitoringRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const ProjectMonitoringView: React.FC<ProjectMonitoringViewProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ProjectMonitoringRecord | null>(null);
  const [viewRecord, setViewRecord] = useState<ProjectMonitoringRecord | null>(null);

  // Form states
  const [projectName, setProjectName] = useState('');
  const [province, setProvince] = useState('लुम्बिनी प्रदेश');
  const [district, setDistrict] = useState('बर्दिया');
  const [ministry, setMinistry] = useState('ऊर्जा, जलस्रोत तथा सिंचाइ मन्त्रालय');
  const [estimatedCost, setEstimatedCost] = useState('६,५०,००,००,०००');
  const [physicalProgress, setPhysicalProgress] = useState(72);
  const [financialProgress, setFinancialProgress] = useState(65);
  const [majorObstacles, setMajorObstacles] = useState('');
  const [lastMonitoredDate, setLastMonitoredDate] = useState('२०८३-०३-१२');
  const [monitoringTeam, setMonitoringTeam] = useState('उपसचिव नारायण भण्डारी');
  const [status, setStatus] = useState<'on_track' | 'delayed' | 'critical'>('on_track');

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      r.projectName.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.ministry.toLowerCase().includes(q) ||
      r.monitoringTeam.toLowerCase().includes(q)
    );
  });

  const total = records.length;
  const delayedCount = records.filter((r) => r.status === 'delayed' || r.status === 'critical').length;
  const onTrackCount = records.filter((r) => r.status === 'on_track').length;

  const openNewModal = () => {
    setEditingRecord(null);
    setProjectName('');
    setProvince('लुम्बिनी प्रदेश');
    setDistrict('दाङ');
    setMinistry('भौतिक पूर्वाधार तथा यातायात मन्त्रालय');
    setEstimatedCost('१२,००,००,०००');
    setPhysicalProgress(60);
    setFinancialProgress(55);
    setMajorObstacles('');
    setLastMonitoredDate('२०८३-०४-०५');
    setMonitoringTeam('प्राविधिक अनुगमन टोली');
    setStatus('on_track');
    setIsModalOpen(true);
  };

  const openEditModal = (rec: ProjectMonitoringRecord) => {
    setEditingRecord(rec);
    setProjectName(rec.projectName);
    setProvince(rec.province);
    setDistrict(rec.district);
    setMinistry(rec.ministry);
    setEstimatedCost(rec.estimatedCost);
    setPhysicalProgress(rec.physicalProgress);
    setFinancialProgress(rec.financialProgress);
    setMajorObstacles(rec.majorObstacles);
    setLastMonitoredDate(rec.lastMonitoredDate);
    setMonitoringTeam(rec.monitoringTeam);
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
        ministry,
        estimatedCost,
        physicalProgress: Number(physicalProgress),
        financialProgress: Number(financialProgress),
        majorObstacles,
        lastMonitoredDate,
        monitoringTeam,
        status
      });
    } else {
      const newRec: ProjectMonitoringRecord = {
        id: `PM-${Date.now()}`,
        sn: records.length + 1,
        projectName,
        province,
        district,
        ministry,
        estimatedCost,
        physicalProgress: Number(physicalProgress),
        financialProgress: Number(financialProgress),
        majorObstacles,
        lastMonitoredDate,
        monitoringTeam,
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
        <div className="bg-gradient-to-r from-[#0c2f55] to-[#1e40af] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-blue-200 font-bold">कूल राष्ट्रिय गौरव आयोजना</div>
          <div className="text-xl font-black">{toNepaliDigits(total)}</div>
          <div className="text-[9px] text-blue-100">सघन निगरानीमा</div>
        </div>
        <div className="bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-teal-200 font-bold">चालु आ.व.को अनुगमन</div>
          <div className="text-xl font-black">{toNepaliDigits(records.length)}</div>
          <div className="text-[9px] text-teal-100">२०८३/८४</div>
        </div>
        <div className="bg-gradient-to-r from-[#4f46e5] to-[#818cf8] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-indigo-200 font-bold">गत आ.व.को अ.ल्या.</div>
          <div className="text-xl font-black">{toNepaliDigits(9)}</div>
          <div className="text-[9px] text-indigo-100">२०८२/८३</div>
        </div>
        <div className="bg-gradient-to-r from-[#16a34a] to-[#4ade80] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-emerald-200 font-bold">समयमै सञ्चालित (On Track)</div>
          <div className="text-xl font-black">{toNepaliDigits(onTrackCount)}</div>
          <div className="text-[9px] text-emerald-100">प्रगति सन्तोषजनक</div>
        </div>
        <div className="bg-gradient-to-r from-[#dc2626] to-[#f87171] text-white p-3 rounded-xl shadow-xs">
          <div className="text-[10px] text-rose-200 font-bold">ढिलाइ भएका आयोजना</div>
          <div className="text-xl font-black">{toNepaliDigits(delayedCount)}</div>
          <div className="text-[9px] text-rose-100">विशेष पहल आवश्यक</div>
        </div>
      </div>

      {/* Map */}
      <NepalMap title="राष्ट्रिय विकास आयोजनाहरूको भौगोलिक अवस्थिति तथा अनुगमन" height={210} />

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
                placeholder="आयोजना, जिल्ला, मन्त्रालय खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
              />
            </div>
          </div>

          <button
            onClick={openNewModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2f55] hover:bg-[#124275] text-white rounded font-bold cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>नयाँ आयोजना अनुगमन</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-center w-10">क.सं.</th>
                <th className="p-2.5 text-left min-w-[200px]">आयोजनाको नाम</th>
                <th className="p-2.5 text-left whitespace-nowrap">स्थान</th>
                <th className="p-2.5 text-left whitespace-nowrap">मन्त्रालय</th>
                <th className="p-2.5 text-right whitespace-nowrap">लागत (रू)</th>
                <th className="p-2.5 text-center min-w-[120px]">भौतिक प्रगति</th>
                <th className="p-2.5 text-center min-w-[120px]">वित्तीय प्रगति</th>
                <th className="p-2.5 text-left min-w-[180px]">मुख्य अवरोध / समस्या</th>
                <th className="p-2.5 text-center whitespace-nowrap">अवस्था</th>
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
                    <td className="p-2.5 whitespace-nowrap text-gray-700">{r.ministry}</td>
                    <td className="p-2.5 text-right font-mono font-bold whitespace-nowrap">
                      रू {r.estimatedCost}
                    </td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${r.physicalProgress}%` }}
                            className="bg-blue-600 h-full rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold w-9 text-right">
                          {toNepaliDigits(r.physicalProgress)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${r.financialProgress}%` }}
                            className="bg-emerald-600 h-full rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold w-9 text-right">
                          {toNepaliDigits(r.financialProgress)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5 text-gray-700 max-w-[200px] truncate" title={r.majorObstacles}>
                      {r.majorObstacles || 'कुनै गम्भीर अवरोध नदेखिएको'}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {r.status === 'on_track' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          समयमै
                        </span>
                      ) : r.status === 'delayed' ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          ढिलाइ
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                          अवरुद्ध
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
                    कुनै आयोजना फेला परेन।
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
                {editingRecord ? 'आयोजना सम्पादन' : 'नयाँ राष्ट्रिय आयोजना अनुगमन प्रविष्टि'}
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
                  <label className="block text-gray-700 font-bold mb-1">सम्बन्धित मन्त्रालय</label>
                  <input
                    type="text"
                    value={ministry}
                    onChange={(e) => setMinistry(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">अनुमानित लागत (रू)</label>
                  <input
                    type="text"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">भौतिक प्रगति (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={physicalProgress}
                    onChange={(e) => setPhysicalProgress(Number(e.target.value))}
                    className="w-full p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">वित्तीय प्रगति (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={financialProgress}
                    onChange={(e) => setFinancialProgress(Number(e.target.value))}
                    className="w-full p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">स्थिति</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-1.5 border rounded bg-white"
                  >
                    <option value="on_track">समयमै (On Track)</option>
                    <option value="delayed">ढिलाइ (Delayed)</option>
                    <option value="critical">गम्भीर (Critical)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">मुख्य अवरोध / समस्याहरू</label>
                <textarea
                  rows={2}
                  value={majorObstacles}
                  onChange={(e) => setMajorObstacles(e.target.value)}
                  placeholder="जग्गा प्राप्ति, मुआब्जा विवाद, वन फँडानी स्वीकृति..."
                  className="w-full p-1.5 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">पछिल्लो अनुगमन मिति</label>
                  <input
                    type="text"
                    value={lastMonitoredDate}
                    onChange={(e) => setLastMonitoredDate(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">अनुगमन टोली</label>
                  <input
                    type="text"
                    value={monitoringTeam}
                    onChange={(e) => setMonitoringTeam(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
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
                  <span className="text-gray-500 block">सम्बन्धित मन्त्रालय</span>
                  <span className="font-bold">{viewRecord.ministry}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">लागत</span>
                  <span className="font-bold font-mono">रू {viewRecord.estimatedCost}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">स्थान</span>
                  <span className="font-bold">
                    {viewRecord.district}, {viewRecord.province}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">अनुगमन टोली</span>
                  <span className="font-bold">{viewRecord.monitoringTeam}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-700 font-bold block mb-1">प्रगति अवस्था</span>
                <div className="space-y-1">
                  <div>
                    भौतिक: {toNepaliDigits(viewRecord.physicalProgress)}%
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${viewRecord.physicalProgress}%` }}
                        className="bg-blue-600 h-full rounded-full"
                      ></div>
                    </div>
                  </div>
                  <div>
                    वित्तीय: {toNepaliDigits(viewRecord.financialProgress)}%
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${viewRecord.financialProgress}%` }}
                        className="bg-emerald-600 h-full rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-red-700 font-bold block">अवरोध / समस्याहरू</span>
                <p className="mt-1 text-gray-800">
                  {viewRecord.majorObstacles || 'कुनै गम्भीर समस्या नरहेको।'}
                </p>
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
