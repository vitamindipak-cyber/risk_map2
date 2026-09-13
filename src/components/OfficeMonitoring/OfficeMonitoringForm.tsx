import React, { useState } from 'react';
import { OfficeMonitoringRecord, FacilityCheck } from '../../types';
import {
  NEPAL_PROVINCES,
  NEPAL_DISTRICTS_BY_PROVINCE,
  NEPAL_MUNICIPALITIES
} from '../../data/nepalData';
import { getCurrentNepaliDate, toNepaliDigits } from '../../utils/nepaliDate';
import {
  Save,
  Building,
  CheckCircle2,
  AlertTriangle,
  Users,
  MapPin,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

interface OfficeMonitoringFormProps {
  onSave: (record: OfficeMonitoringRecord) => void;
  onCancel: () => void;
}

const DEFAULT_FACILITIES: FacilityCheck[] = [
  { name: 'सेवाग्राही सहायता कक्ष (Help Desk)', status: 'cha' },
  { name: 'अपाङ्गमैत्री कार्यस्थल (Ramp/Access)', status: 'samanya' },
  { name: 'प्रतिक्षालय तथा बस्ने व्यवस्था', status: 'cha' },
  { name: 'महिला/पुरुष छुट्टाछुट्टै शौचालय', status: 'cha' },
  { name: 'शुद्ध पिउने पानीको व्यवस्था', status: 'cha' },
  { name: 'स्तनपान कक्ष / बालमैत्री स्थान', status: 'samanya' },
  { name: 'धुम्रपान निषेध संकेत तथा पालना', status: 'cha' },
  { name: 'उजुरी पेटिका तथा नियमित खोल्ने व्यवस्था', status: 'cha' },
  { name: 'वेबसाइट तथा डिजिटल डिस्प्ले बोर्ड', status: 'samanya' }
];

export const OfficeMonitoringForm: React.FC<OfficeMonitoringFormProps> = ({ onSave, onCancel }) => {
  const { formatted: curBsDate } = getCurrentNepaliDate();

  const [provinceId, setProvinceId] = useState(3);
  const [district, setDistrict] = useState('काठमाडौं');
  const [municipality, setMunicipality] = useState('काठमाडौं महानगरपालिका');
  const [officeName, setOfficeName] = useState('');
  const [officeType, setOfficeType] = useState('प्रशासन');
  const [monitoringDate, setMonitoringDate] = useState(curBsDate);
  const [monitoringTeam, setMonitoringTeam] = useState('दिपक अधिकारी - शाखा अधिकृत');
  const [monitoringPosition, setMonitoringPosition] = useState('शाखा अधिकृत');
  const [address, setAddress] = useState('');

  // Service flow responses
  const [serviceFlow, setServiceFlow] = useState<Record<string, string>>({
    q1: 'स्पष्ट बुझिने',
    q2: 'स्पष्ट उल्लेख भएको',
    q3: 'उल्लेख भएको',
    q4: 'भएको',
    q5: 'देखिएन',
    q6: 'भएको',
    q7: 'गरेको',
    q8: 'भएको',
    q9: 'ई-हाजिरी',
    q10: 'भेटियो',
    q11: 'भएको',
    q12: 'राम्रो'
  });

  const [facilities, setFacilities] = useState<FacilityCheck[]>(DEFAULT_FACILITIES);

  // Staffing
  const [totalStaff, setTotalStaff] = useState(25);
  const [workingStaff, setWorkingStaff] = useState(20);
  const [vacantStaff, setVacantStaff] = useState(5);

  const [mainServices, setMainServices] = useState('');
  const [issuesFound, setIssuesFound] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [remarks, setRemarks] = useState('');

  const availableDistricts = NEPAL_DISTRICTS_BY_PROVINCE[provinceId] || [];
  const availableMunicipalities = NEPAL_MUNICIPALITIES[district] || [`${district} नगरपालिका`];

  const handleFacilityChange = (index: number, status: 'cha' | 'chaina' | 'samanya') => {
    const updated = [...facilities];
    updated[index].status = status;
    setFacilities(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeName.trim()) {
      alert('कृपया कार्यालयको नाम भर्नुहोस्।');
      return;
    }

    const newRecord: OfficeMonitoringRecord = {
      id: `OM-${Date.now()}`,
      officeName,
      officeType,
      province: NEPAL_PROVINCES[provinceId] || 'बागमती प्रदेश',
      district,
      municipality,
      monitoringDate,
      monitoringTeam,
      monitoringPosition,
      address,
      serviceFlow,
      facilities,
      totalStaff: Number(totalStaff) || 0,
      workingStaff: Number(workingStaff) || 0,
      vacantStaff: Number(vacantStaff) || 0,
      mainServices,
      issuesFound,
      recommendations,
      remarks,
      status: issuesFound ? 'pending' : 'done'
    };

    onSave(newRecord);
  };

  return (
    <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden max-w-4xl mx-auto my-2 text-xs">
      <div className="bg-gradient-to-r from-[#0c2f55] via-[#16416a] to-[#255f9e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">
            राष्ट्रिय सतर्कता केन्द्र • कार्यालय अनुगमन शाखा
          </div>
          <h2 className="text-lg font-black m-0 font-['Noto_Serif_Devanagari',serif]">
            कार्यालय तथा नागरिक बडापत्र अनुगमन फाराम
          </h2>
        </div>
        <button onClick={onCancel} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md font-bold cursor-pointer">
          रद्द गर्नुहोस्
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Section 1: अनुगमन र कार्यालय विवरण */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <Building className="w-4 h-4 text-[#2563eb]" />
            <span>१. अनुगमन तथा कार्यालयको विवरण</span>
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
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                कार्यालयको नाम <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                placeholder="जस्तै: जिल्ला प्रशासन कार्यालय, मालपोत, यातायात"
                className="w-full p-1.5 border rounded bg-white font-bold text-[#0c2f55]"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">अनुगमनकर्ताको नाम / टोली</label>
              <input
                type="text"
                value={monitoringTeam}
                onChange={(e) => setMonitoringTeam(e.target.value)}
                className="w-full p-1.5 border rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">अनुगमनकर्ताको पद</label>
              <input
                type="text"
                value={monitoringPosition}
                onChange={(e) => setMonitoringPosition(e.target.value)}
                className="w-full p-1.5 border rounded bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: नागरिक बडापत्र तथा सेवा प्रवाह प्रश्नावली */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <span>२. नागरिक बडापत्र तथा सेवा प्रवाहको अवस्था (प्रश्नावली)</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white rounded border">
              <span className="text-gray-800 font-medium">१. नागरिक बडापत्र (डिजिटल/अडियो/बोर्ड)</span>
              <div className="flex gap-3 text-xs">
                {['स्पष्ट बुझिने', 'स्पष्ट नबुझिने', 'पढ्न झन्झटिलो', 'नभएको'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="q1"
                      checked={serviceFlow.q1 === opt}
                      onChange={() => setServiceFlow({ ...serviceFlow, q1: opt })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white rounded border">
              <span className="text-gray-800 font-medium">२. सेवा प्रक्रिया, लागत र समय तालिका</span>
              <div className="flex gap-3 text-xs">
                {['स्पष्ट उल्लेख भएको', 'आंशिक', 'उल्लेख नभएको'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="q2"
                      checked={serviceFlow.q2 === opt}
                      onChange={() => setServiceFlow({ ...serviceFlow, q2: opt })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white rounded border">
              <span className="text-gray-800 font-medium">५. कार्यालय परिसरमा मध्यस्थकर्ता (बिचौलिया) को प्रवेश</span>
              <div className="flex gap-4 text-xs font-bold">
                {['देखियो', 'देखिएन'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="q5"
                      checked={serviceFlow.q5 === opt}
                      onChange={() => setServiceFlow({ ...serviceFlow, q5: opt })}
                    />
                    <span className={opt === 'देखियो' ? 'text-red-600' : 'text-emerald-700'}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white rounded border">
              <span className="text-gray-800 font-medium">९. कर्मचारीहरूको दैनिक हाजिरीको अवस्था</span>
              <div className="flex gap-3 text-xs">
                {['ई-हाजिरी', 'रजिष्टर', 'दुवै प्रणाली'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="q9"
                      checked={serviceFlow.q9 === opt}
                      onChange={() => setServiceFlow({ ...serviceFlow, q9: opt })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white rounded border">
              <span className="text-gray-800 font-medium">१२. कार्यालयको सरसफाइ र स्वच्छता</span>
              <div className="flex gap-3 text-xs">
                {['राम्रो', 'ठीकै', 'नराम्रो'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="q12"
                      checked={serviceFlow.q12 === opt}
                      onChange={() => setServiceFlow({ ...serviceFlow, q12: opt })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: सेवाग्राही सुविधा तालिका */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <Users className="w-4 h-4 text-[#8b5cf6]" />
            <span>३. सेवाग्राही सुविधाका व्यवस्थाहरू (चेकलिस्ट)</span>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b">
                  <th className="p-2 text-left">सुविधा / पूर्वाधार</th>
                  <th className="p-2 text-center w-20">छ</th>
                  <th className="p-2 text-center w-20">छैन</th>
                  <th className="p-2 text-center w-20">सामान्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {facilities.map((fac, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2 text-gray-800 font-medium">{fac.name}</td>
                    <td className="p-2 text-center">
                      <input
                        type="radio"
                        name={`fac-${idx}`}
                        checked={fac.status === 'cha'}
                        onChange={() => handleFacilityChange(idx, 'cha')}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="radio"
                        name={`fac-${idx}`}
                        checked={fac.status === 'chaina'}
                        onChange={() => handleFacilityChange(idx, 'chaina')}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="radio"
                        name={`fac-${idx}`}
                        checked={fac.status === 'samanya'}
                        onChange={() => handleFacilityChange(idx, 'samanya')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: दरबन्दी र निष्कर्ष */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <Users className="w-4 h-4 text-[#d97706]" />
            <span>४. दरबन्दी, देखिएका समस्या तथा सुधारका उपायहरू</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">कुल दरबन्दी संख्या</label>
              <input
                type="number"
                value={totalStaff}
                onChange={(e) => setTotalStaff(Number(e.target.value))}
                className="w-full p-1.5 border rounded bg-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">हाल कार्यरत कर्मचारी</label>
              <input
                type="number"
                value={workingStaff}
                onChange={(e) => setWorkingStaff(Number(e.target.value))}
                className="w-full p-1.5 border rounded bg-white text-center font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">रिक्त दरबन्दी</label>
              <input
                type="number"
                value={vacantStaff}
                onChange={(e) => setVacantStaff(Number(e.target.value))}
                className="w-full p-1.5 border rounded bg-white text-center font-bold text-rose-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">अनुगमनमा देखिएका मूलभूत समस्या / कमजोरीहरू</label>
            <textarea
              rows={2}
              value={issuesFound}
              onChange={(e) => setIssuesFound(e.target.value)}
              placeholder="सेवा प्रवाहमा ढिलाइ, टोकन बिग्रिएको, बिचौलिया गतिविधि..."
              className="w-full p-2 border rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">कार्यालयलाई दिइएको निर्देशन तथा सुधारका उपायहरू</label>
            <textarea
              rows={2}
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              placeholder="तुरुन्त विद्युतीय टोकन प्रणाली सुचारु गर्ने, सीसीटीभी चुस्त राख्ने..."
              className="w-full p-2 border rounded bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded bg-white font-bold text-gray-700">
            रद्द गर्नुहोस्
          </button>
          <button type="submit" className="px-5 py-2 bg-[#0c2f55] text-white rounded font-bold flex items-center gap-1.5">
            <Save className="w-4 h-4" />
            <span>अनुगमन प्रतिवेदन सुरक्षित गर्नुहोस्</span>
          </button>
        </div>
      </form>
    </div>
  );
};
