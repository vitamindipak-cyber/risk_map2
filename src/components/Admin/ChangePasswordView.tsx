import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  AlertTriangle,
  Lock
} from 'lucide-react';

export const ChangePasswordView: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Password policy check
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const isValid =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!currentPassword) {
      setErrorMessage('कृपया हालको पासवर्ड प्रविष्टि गर्नुहोस्।');
      return;
    }

    if (!isValid) {
      setErrorMessage('पासवर्ड नीति अनुसार सबै सर्तहरू पूरा भएको हुनुपर्छ।');
      return;
    }

    // Success simulation
    setSuccessMessage('तपाईंको पासवर्ड सफलतापूर्वक परिवर्तन भयो।');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-2xl mx-auto my-4 space-y-4 p-1 text-xs">
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0c2f55] to-[#1e40af] text-white p-4 flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <KeyRound className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <h2 className="text-base font-extrabold m-0">पासवर्ड परिवर्तन (Security Settings)</h2>
            <p className="text-blue-200 text-[11px] m-0">
              नेपाल सरकारको सूचना प्रविधि सुरक्षा मापदण्ड बमोजिम पासवर्ड सुरक्षित राख्नुहोस्
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">हालको पासवर्ड *</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="हालको पासवर्ड प्रविष्टि गर्नुहोस्"
                className="w-full p-2 pr-9 border border-[#cfdbe8] rounded-lg bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">नयाँ पासवर्ड *</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="नयाँ कडा पासवर्ड प्रविष्टि गर्नुहोस्"
                className="w-full p-2 pr-9 border border-[#cfdbe8] rounded-lg bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">नयाँ पासवर्ड पुनः प्रविष्टि *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="पुनः सोही पासवर्ड टाइप गर्नुहोस्"
              className="w-full p-2 border border-[#cfdbe8] rounded-lg bg-white"
              required
            />
          </div>

          {/* Password Strength Checklist */}
          <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-1.5">
            <span className="font-bold text-gray-700 block text-[11px] mb-1">
              सुरक्षा मापदण्ड (Cybersecurity Guidelines):
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="flex items-center gap-1.5">
                {hasMinLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className={hasMinLength ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                  कम्तिमा ८ क्यारेक्टर लामो
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {hasUpperCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className={hasUpperCase ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                  कम्तिमा १ ठूलो अक्षर (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {hasLowerCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className={hasLowerCase ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                  कम्तिमा १ सानो अक्षर (a-z)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {hasNumber ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className={hasNumber ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                  कम्तिमा १ अंक (०-९ / 0-9)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {hasSpecialChar ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className={hasSpecialChar ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                  कम्तिमा १ विशेष संकेत (@, #, $, आदि)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {isMatch ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className={isMatch ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                  दुवै पासवर्ड मिलेको
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <button
              type="submit"
              disabled={!isValid}
              className="px-5 py-2 bg-[#0c2f55] hover:bg-[#124275] disabled:opacity-50 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>पासवर्ड सुरक्षित गर्नुहोस्</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
