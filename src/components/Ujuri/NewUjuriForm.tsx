import React, { useState } from 'react';
import { UjuriRecord } from '../../types';
import {
  NEPAL_MINISTRIES,
  NEPAL_PROVINCES,
  NEPAL_DISTRICTS_BY_PROVINCE,
  NEPAL_MUNICIPALITIES
} from '../../data/nepalData';
import {
  getCurrentNepaliDate,
  toNepaliDigits,
  NEPALI_MONTHS
} from '../../utils/nepaliDate';
import {
  Save,
  X,
  FileText,
  Building,
  MapPin,
  Mic,
  Upload,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface NewUjuriFormProps {
  onSave: (record: Partial<UjuriRecord>) => void;
  onCancel: () => void;
}

export const NewUjuriForm: React.FC<NewUjuriFormProps> = ({ onSave, onCancel }) => {
  const { year: curYear, month: curMonth, day: curDay } = getCurrentNepaliDate();

  const [formData, setFormData] = useState({
    registrationNumber: `NVC-२०८३-${Math.floor(1000 + Math.random() * 9000)}`,
    year: curYear,
    month: curMonth,
    day: curDay,
    complainantName: '',
    opponentName: '',
    ministry: '',
    provinceId: 3, // Default Bagmati
    district: 'काठमाडौं',
    municipality: '',
    complaintType: 'सेवा प्रवाह',
    complaintSource: 'केन्द्रमा दर्ता भएका उजुरी',
    priority: 'मध्यम' as 'उच्च' | 'मध्यम' | 'सामान्य' | 'न्यून',
    complaintDescription: '',
    committeeDecision: '',
    status: 'pending' as 'pending' | 'in_progress' | 'resolved' | 'closed',
    remarks: ''
  });

  const [attachments, setAttachments] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Available districts based on selected province
  const availableDistricts = NEPAL_DISTRICTS_BY_PROVINCE[formData.provinceId] || [];
  const availableMunicipalities = NEPAL_MUNICIPALITIES[formData.district] || [
    `${formData.district} नगरपालिका`,
    `${formData.district} गाउँपालिका`
  ];

  const handleProvinceChange = (pId: number) => {
    const districts = NEPAL_DISTRICTS_BY_PROVINCE[pId] || [];
    const firstDist = districts[0] || '';
    setFormData((prev) => ({
      ...prev,
      provinceId: pId,
      district: firstDist,
      municipality: ''
    }));
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate speech-to-text placeholder
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          complaintDescription:
            prev.complaintDescription +
            (prev.complaintDescription ? ' ' : '') +
            'तोकिएको कार्यालयमा समयमै सेवा प्राप्त नभएको र थप दस्तुर माग गरिएको सम्बन्धमा।'
        }));
        setIsRecording(false);
      }, 2500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileNames = Array.from(e.target.files).map((f: File) => f.name);
      setAttachments((prev) => [...prev, ...fileNames]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.opponentName.trim()) {
      setErrorMsg('कृपया विपक्षीको नाम अनिवार्य रूपमा भर्नुहोस्।');
      return;
    }
    if (!formData.complaintDescription.trim()) {
      setErrorMsg('कृपया उजुरीको संक्षिप्त विवरण भर्नुहोस्।');
      return;
    }

    const regDate = `${toNepaliDigits(formData.year)}-${toNepaliDigits(
      String(formData.month).padStart(2, '0')
    )}-${toNepaliDigits(String(formData.day).padStart(2, '0'))}`;

    const provinceName = NEPAL_PROVINCES[formData.provinceId] || 'बागमती प्रदेश';

    onSave({
      id: `UJ-${Date.now()}`,
      registrationNumber: formData.registrationNumber,
      registrationDate: regDate,
      complainantName: formData.complainantName || 'बेनामी (नागरिक)',
      opponentName: formData.opponentName,
      ministry: formData.ministry || 'सङ्घीय मामिला तथा सामान्य प्रशासन मन्त्रालय',
      province: provinceName,
      district: formData.district,
      municipality: formData.municipality || availableMunicipalities[0],
      complaintType: formData.complaintType,
      complaintSource: formData.complaintSource,
      priority: formData.priority,
      complaintDescription: formData.complaintDescription,
      committeeDecision: formData.committeeDecision || 'प्रारम्भिक छानबिनका लागि पेश गरिएको।',
      finalDecisionType: 'कारबाही प्रक्रियामा',
      finalDecision: '',
      assignedDepartment: 'सूचना सङ्‍कलन तथा उजुरी व्यवस्थापन शाखा',
      status: formData.status,
      remarks: formData.remarks,
      attachments
    });
  };

  return (
    <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden max-w-4xl mx-auto my-2">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#0c2f55] via-[#124275] to-[#1c5591] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">
            राष्ट्रिय सतर्कता केन्द्र • उजुरी दर्ता प्रणाली
          </div>
          <h2 className="text-lg font-black m-0 font-['Noto_Serif_Devanagari',serif]">
            नयाँ उजुरी दर्ता फाराम
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section 1: मूल दर्ता र उजुरकर्ता विवरण */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span>उजुरी तथा उजुरकर्ताको मूल विवरण</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                दर्ता नं <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg font-mono font-bold text-[#1e3a8a] bg-white"
                required
              />
            </div>

            {/* Nepali Date selectors */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                दर्ता मिति (वि.सं.) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="px-1 py-1.5 border border-[#cfdbe8] rounded-lg bg-white text-xs font-bold"
                >
                  {[2080, 2081, 2082, 2083, 2084, 2085].map((y) => (
                    <option key={y} value={y}>
                      {toNepaliDigits(y)}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                  className="px-1 py-1.5 border border-[#cfdbe8] rounded-lg bg-white text-xs font-bold"
                >
                  {NEPALI_MONTHS.map((m, idx) => (
                    <option key={m} value={idx + 1}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: Number(e.target.value) })}
                  className="px-1 py-1.5 border border-[#cfdbe8] rounded-lg bg-white text-xs font-bold"
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {toNepaliDigits(d)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">उजुरकर्ताको नाम</label>
              <input
                type="text"
                value={formData.complainantName}
                onChange={(e) => setFormData({ ...formData, complainantName: e.target.value })}
                placeholder="उजुरकर्ताको नाम (वा बेनामी)"
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                विपक्षी (कार्यालय वा व्यक्ति) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.opponentName}
                onChange={(e) => setFormData({ ...formData, opponentName: e.target.value })}
                placeholder="विपक्षी निकाय वा कर्मचारीको नाम"
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">सम्बन्धित मन्त्रालय / निकाय</label>
              <select
                value={formData.ministry}
                onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white"
              >
                <option value="">मन्त्रालय छान्नुहोस्</option>
                {NEPAL_MINISTRIES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: ठेगाना विवरण */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span>स्थान तथा ठेगाना विवरण</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">प्रदेश</label>
              <select
                value={formData.provinceId}
                onChange={(e) => handleProvinceChange(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white font-semibold"
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
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value, municipality: '' })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white font-semibold"
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
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white"
              >
                <option value="">स्थानीय तह छान्नुहोस्</option>
                {availableMunicipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: उजुरीको विषय, प्रकृति र विवरण */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0c2f55] border-b border-[#e2e8f0] pb-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            <span>उजुरीको विषय, प्रकृति तथा प्राथमिकता</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">उजुरीको प्रकृति</label>
              <select
                value={formData.complaintType}
                onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white"
              >
                <option value="सेवा प्रवाह">सेवा प्रवाह</option>
                <option value="सार्वजनिक खरिद">सार्वजनिक खरिद</option>
                <option value="पूर्वाधार निर्माण">पूर्वाधार निर्माण</option>
                <option value="घुस/रिसवत">घुस/रिसवत</option>
                <option value="कर्मचारी आचरण">कर्मचारी आचरण</option>
                <option value="नीति/निर्णय प्रक्रिया">नीति/निर्णय प्रक्रिया</option>
                <option value="अन्य">अन्य</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">उजुरीको स्रोत</label>
              <select
                value={formData.complaintSource}
                onChange={(e) => setFormData({ ...formData, complaintSource: e.target.value })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white"
              >
                <option value="केन्द्रमा दर्ता भएका उजुरी">केन्द्रमा दर्ता भएका उजुरी</option>
                <option value="हेलो सरकारबाट प्राप्त उजुरी">हेलो सरकारबाट प्राप्त उजुरी</option>
                <option value="हटलाइन उजुरी">हटलाइन उजुरी</option>
                <option value="अनलाइन उजुरी">अनलाइन उजुरी</option>
                <option value="हुलाक / फ्याक्स">हुलाक / फ्याक्स</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">प्राथमिकता</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-1.5 border border-[#cfdbe8] rounded-lg bg-white font-bold text-[#0c2f55]"
              >
                <option value="उच्च">उच्च</option>
                <option value="मध्यम">मध्यम</option>
                <option value="सामान्य">सामान्य</option>
                <option value="न्यून">न्यून</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-gray-700 font-bold">
                उजुरीको संक्षिप्त विवरण <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isRecording ? 'सुन्दैछ...' : 'आवाजबाट भर्नुहोस्'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={formData.complaintDescription}
              onChange={(e) => setFormData({ ...formData, complaintDescription: e.target.value })}
              placeholder="उजुरीको स्पष्ट तथा तथ्यपरक विवरण यहाँ लेख्नुहोस्..."
              className="w-full px-3 py-2 border border-[#cfdbe8] rounded-lg bg-white focus:outline-none focus:border-[#2563eb]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              उजुरी व्यवस्थापन समितिको प्रारम्भिक निर्णय / राय
            </label>
            <textarea
              rows={2}
              value={formData.committeeDecision}
              onChange={(e) => setFormData({ ...formData, committeeDecision: e.target.value })}
              placeholder="उजुरी व्यवस्थापन समितिको प्रारम्भिक निर्णय..."
              className="w-full px-3 py-2 border border-[#cfdbe8] rounded-lg bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Section 4: फाइल संलग्नता */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2">
            <div className="text-sm font-bold text-[#0c2f55] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
              <span>कागजात / प्रमाण संलग्न गर्नुहोस्</span>
            </div>
            <label className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563eb] text-white font-bold cursor-pointer hover:bg-[#1d4ed8] transition-colors text-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>फाइल थप्नुहोस्</span>
              <input type="file" multiple onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {attachments.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-white border border-[#cfdbe8] px-2.5 py-1 rounded-md text-xs shadow-2xs text-[#1e293b]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span className="max-w-[180px] truncate">{file}</span>
                  <button
                    type="button"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                    className="text-gray-400 hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-3 text-gray-400 border border-dashed border-[#cfdbe8] rounded-lg bg-white text-xs">
              कुनै फाइल संलग्न गरिएको छैन (Word, PDF, JPG फाइलहरू समर्थित)
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e2e8f0]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#cfdbe8] rounded-lg font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            रद्द गर्नुहोस्
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#0c2f55] hover:bg-[#124275] text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>उजुरी सुरक्षित गर्नुहोस्</span>
          </button>
        </div>
      </form>
    </div>
  );
};
