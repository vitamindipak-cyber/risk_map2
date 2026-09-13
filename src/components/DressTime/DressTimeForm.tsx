import React, { useState } from 'react';
import { DressTimeRecord, StaffViolationEntry } from '../../types';
import {
  NEPAL_PROVINCES,
  NEPAL_DISTRICTS_BY_PROVINCE,
  NEPAL_MUNICIPALITIES
} from '../../data/nepalData';
import { getCurrentNepaliDate, toNepaliDigits } from '../../utils/nepaliDate';
import {
  Save,
  Clock,
  PlusCircle,
  Trash2,
  Users,
  AlertCircle
} from 'lucide-react';

interface DressTimeFormProps {
  onSave: (record: DressTimeRecord) => void;
  onCancel: () => void;
}

export const DressTimeForm: React.FC<DressTimeFormProps> = ({ onSave, onCancel }) => {
  const { formatted: curBsDate } = getCurrentNepaliDate();

  const [provinceId, setProvinceId] = useState(3);
  const [district, setDistrict] = useState('काठमाडौं');
  const [localLevel, setLocalLevel] = useState('काठमाडौं महानगरपालिका');
  const [officeName, setOfficeName] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [monitoringDate, setMonitoringDate] = useState(curBsDate);
  const [monitoringTime, setMonitoringTime] = useState('१०:१५:००');

  const [totalStaff, setTotalStaff] = useState(35);
  const [activeStaff, setActiveStaff] = useState(28);
  const [vacantStaff, setVacantStaff] = useState(7);

  const [staffViolations, setStaffViolations] = useState<StaffViolationEntry[]>([
    {
      id: 'v-1',
      category: 'अनुपस्थिति',
      position: 'नायब सुब्बा',
      symbolNo: '१४२३०',
      employeeName: 'रामप्रसाद शर्मा',
      remarks: 'बिना जानकारी १०:३० सम्म अनुपस्थित'
    }
  ]);

  const [teamLeader, setTeamLeader] = useState('महेन्द्र पन्त');
  const [teamLeaderPost, setTeamLeaderPost] = useState('निर्देशक');
  const [officialName, setOfficialName] = useState('जनार्दन गौतम');
  const [officialPost] = useState('कार्यालय प्रमुख');

  const availableDistricts = NEPAL_DISTRICTS_BY_PROVINCE[provinceId] || [];
  const availableMunicipalities = NEPAL_MUNICIPALITIES[district] || [`${district} नगरपालिका`];

  const handleAddViolationRow = () => {
    setStaffViolations([
      ...staffViolations,
      {
        id: `v-${Date.now()}`,
        category: 'अनुपस्थिति',
        position: '',
        symbolNo: '',
        employeeName: '',
        remarks: ''
      }
    ]);
  };

  const handleRemoveViolationRow = (idx: number) => {
    setStaffViolations(staffViolations.filter((_, i) => i !== idx));
  };

  const handleUpdateRow = (idx: number, field: keyof StaffViolationEntry, value: any) => {
    const updated = [...staffViolations];
    updated[idx] = { ...updated[idx], [field]: value };
    setStaffViolations(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeName.trim()) {
      alert('कृपया कार्यालयको नाम भर्नुहोस्।');
      return;
    }

    const timeViolCount = staffViolations.filter((s) => s.category === 'अनुपस्थिति').length;
    const dressViolCount = staffViolations.filter((s) => s.category === 'पोशाक पालना नगरेका').length;

    const newRecord: DressTimeRecord = {
      id: `DT-${Date.now()}`,
      province: NEPAL_PROVINCES[provinceId] || 'बागमती प्रदेश',
      district,
      localLevel,
      officeName,
      officePhone,
      monitoringDate,
      monitoringTime,
      totalStaff: Number(totalStaff) || 0,
      activeStaff: Number(activeStaff) || 0,
      vacantStaff: Number(vacantStaff) || 0,
      staffViolations,
      teamLeader,
      teamLeaderPost,
      officialName,
      officialPost,
      timeViolationsCount: timeViolCount,
      dressViolationsCount: dressViolCount,
      totalViolations: timeViolCount + dressViolCount
    };

    onSave(newRecord);
  };

  return (
    <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden max-w-4xl mx-auto my-2 text-xs">
      <div className="bg-gradient-to-r from-[#0c2f55] via-[#16416a] to-[#255f9e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">
            राष्ट्रिय सतर्कता केन्द्र • अनुगमन शाखा
          </div>
          <h2 className="text-lg font-black m-0 font-['Noto_Serif_Devanagari',serif]">
            समय पालना / अनुपस्थिति तथा पोशाक अनुगमन फाराम
          </h2>
        </div>
        <button onClick={onCancel} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md font-bold cursor-pointer">
          रद्द गर्नुहोस्
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Section 1: स्थान र कार्यालय */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <Clock className="w-4 h-4 text-[#2563eb]" />
            <span>१. स्थान र कार्यालयको विवरण</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">प्रदेश</label>
              <select
                value={provinceId}
                onChange={(e) => {
                  const p = Number(e.target.value);
                  setProvinceId(p);
                  setDistrict(NEPAL_DISTRICTS_BY_PROVINCE[p]?.[0] || '');
                }}
                className="w-full p-1.5 border rounded bg-white"
              >
                {Object.entries(NEPAL_PROVINCES).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">जिल्ला</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-1.5 border rounded bg-white"
              >
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">स्थानीय तह</label>
              <select
                value={localLevel}
                onChange={(e) => setLocalLevel(e.target.value)}
                className="w-full p-1.5 border rounded bg-white"
              >
                {availableMunicipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                कार्यालयको नाम <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                placeholder="कार्यालयको नाम"
                className="w-full p-1.5 border rounded bg-white font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">अनुगमन मिति (वि.सं.)</label>
              <input
                type="text"
                value={monitoringDate}
                onChange={(e) => setMonitoringDate(e.target.value)}
                className="w-full p-1.5 border rounded bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">अनुगमन समय</label>
              <input
                type="text"
                value={monitoringTime}
                onChange={(e) => setMonitoringTime(e.target.value)}
                className="w-full p-1.5 border rounded bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: दरबन्दी विवरण */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <Users className="w-4 h-4 text-[#10b981]" />
            <span>२. दरबन्दीको अवस्था</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">कुल दरबन्दी</label>
              <input
                type="number"
                value={totalStaff}
                onChange={(e) => setTotalStaff(Number(e.target.value))}
                className="w-full p-1.5 border rounded bg-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">हाल कार्यरत</label>
              <input
                type="number"
                value={activeStaff}
                onChange={(e) => setActiveStaff(Number(e.target.value))}
                className="w-full p-1.5 border rounded bg-white text-center font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">रिक्त पद संख्या</label>
              <input
                type="number"
                value={vacantStaff}
                onChange={(e) => setVacantStaff(Number(e.target.value))}
                className="w-full p-1.5 border rounded bg-white text-center font-bold text-rose-700"
              />
            </div>
          </div>
        </div>

        {/* Section 3: अपरिपालना गर्ने कर्मचारीहरूको सूची */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2">
            <div className="text-sm font-bold text-[#0c2f55] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
              <span>३. अनुपस्थिति / पोशाक पालना नगरेका कर्मचारीहरूको विवरण</span>
            </div>
            <button
              type="button"
              onClick={handleAddViolationRow}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#2563eb] text-white rounded font-bold hover:bg-[#1d4ed8] cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>कर्मचारी थप्नुहोस्</span>
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b">
                  <th className="p-2 text-left w-36">विवरण प्रकार</th>
                  <th className="p-2 text-left">पद</th>
                  <th className="p-2 text-left w-24">संकेत नं</th>
                  <th className="p-2 text-left">कर्मचारीको नाम</th>
                  <th className="p-2 text-left">कैफियत</th>
                  <th className="p-2 text-center w-12">हटाउने</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staffViolations.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="p-2">
                      <select
                        value={row.category}
                        onChange={(e) => handleUpdateRow(idx, 'category', e.target.value)}
                        className="w-full p-1 border rounded bg-white font-semibold text-rose-700"
                      >
                        <option value="अनुपस्थिति">अनुपस्थिति</option>
                        <option value="पोशाक पालना नगरेका">पोशाक पालना नगरेका</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.position}
                        onChange={(e) => handleUpdateRow(idx, 'position', e.target.value)}
                        placeholder="पद"
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.symbolNo}
                        onChange={(e) => handleUpdateRow(idx, 'symbolNo', e.target.value)}
                        placeholder="संकेत नं"
                        className="w-full p-1 border rounded font-mono"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.employeeName}
                        onChange={(e) => handleUpdateRow(idx, 'employeeName', e.target.value)}
                        placeholder="कर्मचारीको नाम"
                        className="w-full p-1 border rounded font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.remarks}
                        onChange={(e) => handleUpdateRow(idx, 'remarks', e.target.value)}
                        placeholder="कारण वा कैफियत"
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveViolationRow(idx)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: टोली प्रमुख र कार्यालय अधिकृत */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <Users className="w-4 h-4 text-[#8b5cf6]" />
            <span>४. अनुगमन टोली र सम्बन्धित कार्यालय प्रमुख</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">अनुगमन टोली प्रमुखको नाम</label>
                <input
                  type="text"
                  value={teamLeader}
                  onChange={(e) => setTeamLeader(e.target.value)}
                  className="w-full p-1.5 border rounded bg-white font-bold"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">पद</label>
                <input
                  type="text"
                  value={teamLeaderPost}
                  onChange={(e) => setTeamLeaderPost(e.target.value)}
                  className="w-full p-1.5 border rounded bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">सम्बन्धित कार्यालय प्रमुख / अधिकृतको नाम</label>
                <input
                  type="text"
                  value={officialName}
                  onChange={(e) => setOfficialName(e.target.value)}
                  className="w-full p-1.5 border rounded bg-white font-bold"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">पद</label>
                <input
                  type="text"
                  value={officialPost}
                  disabled
                  className="w-full p-1.5 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded bg-white font-bold text-gray-700">
            रद्द गर्नुहोस्
          </button>
          <button type="submit" className="px-5 py-2 bg-[#0c2f55] text-white rounded font-bold flex items-center gap-1.5">
            <Save className="w-4 h-4" />
            <span>अनुगमन विवरण सुरक्षित गर्नुहोस्</span>
          </button>
        </div>
      </form>
    </div>
  );
};
