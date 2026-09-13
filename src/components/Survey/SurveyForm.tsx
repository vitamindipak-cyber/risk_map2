import React, { useState } from 'react';
import { CitizenSurveyRecord } from '../../types';
import {
  NEPAL_PROVINCES,
  NEPAL_DISTRICTS_BY_PROVINCE,
  NEPAL_MUNICIPALITIES
} from '../../data/nepalData';
import { getCurrentNepaliDate, toNepaliDigits } from '../../utils/nepaliDate';
import {
  Save,
  CheckCircle,
  HelpCircle,
  Users,
  Smile,
  Frown,
  Mic,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface SurveyFormProps {
  onSave: (record: CitizenSurveyRecord) => void;
  onCancel: () => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ onSave, onCancel }) => {
  const { formatted: curBsDate } = getCurrentNepaliDate();

  const [provinceId, setProvinceId] = useState(3);
  const [district, setDistrict] = useState('काठमाडौं');
  const [localLevel, setLocalLevel] = useState('काठमाडौं महानगरपालिका');
  const [fullAddress, setFullAddress] = useState('');
  const [gender, setGender] = useState<'पुरुष' | 'महिला' | 'अन्य'>('पुरुष');

  const [officeVisited, setOfficeVisited] = useState('');
  const [office2, setOffice2] = useState('');
  const [office3, setOffice3] = useState('');

  // Core Survey Metrics
  const [knowsCitizenCharter, setKnowsCitizenCharter] = useState(true);
  const [knowsFeeAndTime, setKnowsFeeAndTime] = useState(true);
  const [receivedServiceInTime, setReceivedServiceInTime] = useState(true);
  const [delayReason, setDelayReason] = useState('');

  const [tookOutsideHelp, setTookOutsideHelp] = useState(false);
  const [outsideHelper, setOutsideHelper] = useState('');

  const [paidBribe, setPaidBribe] = useState(false);
  const [bribeRecipient, setBribeRecipient] = useState('');

  const [isSatisfied, setIsSatisfied] = useState(true);
  const [satisfactionReason, setSatisfactionReason] = useState('समयमै काम भएको');
  const [dissatisfactionReason, setDissatisfactionReason] = useState('');

  const [serviceQuality, setServiceQuality] = useState<'राम्रो' | 'मध्यम' | 'कमजोर'>('राम्रो');
  const [goodOffices, setGoodOffices] = useState('');
  const [weakOffices, setWeakOffices] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const [knowsRightToInformation, setKnowsRightToInformation] = useState(true);
  const [filedComplaint, setFiledComplaint] = useState(false);
  const [attendedPublicHearing, setAttendedPublicHearing] = useState(false);

  const availableDistricts = NEPAL_DISTRICTS_BY_PROVINCE[provinceId] || [];
  const availableMunicipalities = NEPAL_MUNICIPALITIES[district] || [`${district} नगरपालिका`];

  // Calculate completion percentage
  const totalFields = 12;
  let filledFields = 0;
  if (provinceId) filledFields++;
  if (district) filledFields++;
  if (gender) filledFields++;
  if (officeVisited) filledFields++;
  if (knowsCitizenCharter !== undefined) filledFields++;
  if (receivedServiceInTime !== undefined) filledFields++;
  if (tookOutsideHelp !== undefined) filledFields++;
  if (paidBribe !== undefined) filledFields++;
  if (isSatisfied !== undefined) filledFields++;
  if (serviceQuality) filledFields++;
  if (knowsRightToInformation !== undefined) filledFields++;
  if (suggestions) filledFields++;
  const progressPct = Math.round((filledFields / totalFields) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeVisited.trim()) {
      alert('कृपया विवरण दिन चाहेको कार्यालयको नाम अनिवार्य भर्नुहोस्।');
      return;
    }

    const newRecord: CitizenSurveyRecord = {
      id: `CS-${Date.now()}`,
      surveyDate: curBsDate,
      province: NEPAL_PROVINCES[provinceId] || 'बागमती प्रदेश',
      district,
      localLevel,
      fullAddress,
      gender,
      officeVisited,
      office2,
      office3,
      overallSatisfaction: isSatisfied ? 4 : 2,
      isSatisfied,
      satisfactionReasons: isSatisfied ? [satisfactionReason] : [],
      dissatisfactionReasons: !isSatisfied ? [dissatisfactionReason || 'समयमै काम नभएको'] : [],
      serviceQuality,
      tookOutsideHelp,
      outsideHelper: tookOutsideHelp ? outsideHelper : undefined,
      paidBribe,
      bribeRecipient: paidBribe ? bribeRecipient : undefined,
      knowsCitizenCharter,
      receivedServiceInTime,
      delayReason: !receivedServiceInTime ? delayReason : undefined,
      filedComplaint,
      attendedPublicHearing,
      knowsRightToInformation,
      goodOffices,
      weakOffices,
      suggestions
    };

    onSave(newRecord);
  };

  return (
    <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden max-w-4xl mx-auto my-2 text-xs">
      {/* Top Header with Progress */}
      <div className="bg-gradient-to-r from-[#0c2f55] via-[#16416a] to-[#255f9e] text-white px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">
              राष्ट्रिय सतर्कता केन्द्र • नागरिक प्रतिक्रिया प्रणाली
            </div>
            <h2 className="text-lg font-black m-0 font-['Noto_Serif_Devanagari',serif]">
              सेवाग्राही सन्तुष्टि तथा सुशासन सर्वेक्षण फाराम
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md font-bold cursor-pointer"
          >
            रद्द गर्नुहोस्
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-blue-100 font-bold">
            <span>फारम पूर्णता सूचकांक</span>
            <span>{toNepaliDigits(progressPct)}% पूरा भयो</span>
          </div>
          <div className="w-full bg-black/25 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPct}%` }}
              className="bg-[#10b981] h-full transition-all duration-300 rounded-full"
            ></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Section 1: व्यक्तिगत तथा ठेगाना */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="text-sm font-bold text-[#0c2f55] border-b pb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2563eb]" />
            <span>१. व्यक्तिगत तथा ठेगाना विवरण</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">प्रदेश</label>
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
              <label className="block font-bold text-gray-700 mb-1">जिल्ला</label>
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
              <label className="block font-bold text-gray-700 mb-1">स्थानीय तह</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">पूर्ण ठेगाना (टोल/गाउँ)</label>
              <input
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="जस्तै: काठमाडौं-१०, बानेश्वर"
                className="w-full p-1.5 border rounded bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">उत्तरदाताको लिङ्ग</label>
              <div className="flex gap-4 pt-1">
                {['पुरुष', 'महिला', 'अन्य'].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === g}
                      onChange={() => setGender(g as any)}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: सेवा लिएको कार्यालय */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="text-sm font-bold text-[#0c2f55] border-b pb-2">
            २. विवरण दिन चाहेको कार्यालय
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              कार्यालयको नाम <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={officeVisited}
              onChange={(e) => setOfficeVisited(e.target.value)}
              placeholder="जस्तै: यातायात व्यवस्था कार्यालय, मालपोत कार्यालय, नापी..."
              className="w-full p-2 border rounded bg-white font-bold text-[#0c2f55]"
              required
            />
          </div>
        </div>

        {/* Section 3: बडापत्र, समय र दस्तुर */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="text-sm font-bold text-[#0c2f55] border-b pb-2">
            ३. नागरिक बडापत्र तथा सेवा सम्बन्धी जानकारी
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="font-semibold">नागरिक बडापत्रबारे जानकारी छ?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="charter"
                    checked={knowsCitizenCharter}
                    onChange={() => setKnowsCitizenCharter(true)}
                  />
                  <span>छ</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="charter"
                    checked={!knowsCitizenCharter}
                    onChange={() => setKnowsCitizenCharter(false)}
                  />
                  <span>छैन</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="font-semibold">तोकिएको समयमा सेवा प्राप्त भयो?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="inTime"
                    checked={receivedServiceInTime}
                    onChange={() => setReceivedServiceInTime(true)}
                  />
                  <span>भयो</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="inTime"
                    checked={!receivedServiceInTime}
                    onChange={() => setReceivedServiceInTime(false)}
                  />
                  <span>भएन</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: बिचौलिया र अतिरिक्त रकम (घुस) */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="text-sm font-bold text-[#0c2f55] border-b pb-2">
            ४. बिचौलिया तथा अतिरिक्त रकम (घुस) सम्बन्धी
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded border space-y-2">
              <span className="font-semibold block">सेवा प्राप्त गर्न बाहिरी व्यक्तिको सहयोग लिनुपर्‍यो?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="outside"
                    checked={tookOutsideHelp}
                    onChange={() => setTookOutsideHelp(true)}
                  />
                  <span className="text-red-600">पर्‍यो</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="outside"
                    checked={!tookOutsideHelp}
                    onChange={() => setTookOutsideHelp(false)}
                  />
                  <span className="text-emerald-700">परेन</span>
                </label>
              </div>
              {tookOutsideHelp && (
                <input
                  type="text"
                  value={outsideHelper}
                  onChange={(e) => setOutsideHelper(e.target.value)}
                  placeholder="कसको सहयोग? (जस्तै: लेखापढी, बिचौलिया)"
                  className="w-full p-1.5 border rounded"
                />
              )}
            </div>

            <div className="p-3 bg-white rounded border space-y-2">
              <span className="font-semibold block">अतिरिक्त रकम (घुस) दिनुपर्‍यो?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="bribe"
                    checked={paidBribe}
                    onChange={() => setPaidBribe(true)}
                  />
                  <span className="text-red-600">पर्‍यो</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="bribe"
                    checked={!paidBribe}
                    onChange={() => setPaidBribe(false)}
                  />
                  <span className="text-emerald-700">परेन</span>
                </label>
              </div>
              {paidBribe && (
                <input
                  type="text"
                  value={bribeRecipient}
                  onChange={(e) => setBribeRecipient(e.target.value)}
                  placeholder="कसलाई दिनुभयो? (सोझै कर्मचारी / बिचौलिया)"
                  className="w-full p-1.5 border rounded"
                />
              )}
            </div>
          </div>
        </div>

        {/* Section 5: समग्र सन्तुष्टि र गुणस्तर */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="text-sm font-bold text-[#0c2f55] border-b pb-2">
            ५. समग्र सन्तुष्टि, सेवा गुणस्तर तथा सुधारका सुझावहरू
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">समग्र सन्तुष्टि</label>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-emerald-700">
                  <input
                    type="radio"
                    name="satisfaction"
                    checked={isSatisfied}
                    onChange={() => setIsSatisfied(true)}
                  />
                  <Smile className="w-4 h-4" />
                  <span>सन्तुष्ट</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-rose-700">
                  <input
                    type="radio"
                    name="satisfaction"
                    checked={!isSatisfied}
                    onChange={() => setIsSatisfied(false)}
                  />
                  <Frown className="w-4 h-4" />
                  <span>असन्तुष्ट</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">सेवाको गुणस्तर</label>
              <div className="flex gap-4 pt-1">
                {['राम्रो', 'मध्यम', 'कमजोर'].map((q) => (
                  <label key={q} className="flex items-center gap-1 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="quality"
                      checked={serviceQuality === q}
                      onChange={() => setServiceQuality(q as any)}
                    />
                    <span>{q}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              सेवा प्रवाहमा सुधारका लागि नागरिक सुझाव (बढीमा १०० शब्द)
            </label>
            <textarea
              rows={3}
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="तपाईंको स्पष्ट तथा रचनात्मक सुझाव यहाँ लेख्नुहोस्..."
              className="w-full p-2 border rounded bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded bg-white font-bold text-gray-700 cursor-pointer"
          >
            रद्द गर्नुहोस्
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>सर्वेक्षण सुरक्षित गर्नुहोस्</span>
          </button>
        </div>
      </form>
    </div>
  );
};
