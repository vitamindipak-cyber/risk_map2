import React, { useState } from 'react';
import { CalendarEvent } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Clock,
  MapPin,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
}

const MONTHS_NP = [
  'बैशाख',
  'जेठ',
  'असार',
  'श्रावण',
  'भाद्र',
  'आश्विन',
  'कार्तिक',
  'मंसिर',
  'पौष',
  'माघ',
  'फाल्गुन',
  'चैत्र'
];

const WEEKDAYS_NP = ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि'];

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3); // श्रावण (Shrawan)
  const currentYear = 2083;

  const [selectedDate, setSelectedDate] = useState<number | null>(18);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState<'monitoring' | 'meeting' | 'hearing' | 'holiday'>('monitoring');
  const [eventDate, setEventDate] = useState('२०८३-०४-१८');
  const [eventTime, setEventTime] = useState('११:००');
  const [eventLocation, setEventLocation] = useState('राष्ट्रिय सतर्कता केन्द्र, काठमाडौं');
  const [eventDescription, setEventDescription] = useState('');

  // Generate 32 days for Shrawan
  const daysInMonth = 32;
  const startDayOffset = 2; // Tuesday start

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      alert('कार्यक्रमको नाम अनिवार्य छ।');
      return;
    }

    const newEvent: CalendarEvent = {
      id: `EV-${Date.now()}`,
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      type: eventType,
      location: eventLocation,
      description: eventDescription
    };

    onAddEvent(newEvent);
    setIsModalOpen(false);
    setEventTitle('');
  };

  const selectedDayEvents = events.filter((ev) => {
    if (!selectedDate) return false;
    const formattedDay = selectedDate < 10 ? `०${toNepaliDigits(selectedDate)}` : toNepaliDigits(selectedDate);
    return ev.date.includes(formattedDay);
  });

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* Calendar Top Header */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-[#0c2f55] rounded-lg">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#0c2f55] m-0">
              राष्ट्रिय सतर्कता केन्द्र कार्यतालिका (वि.सं. {toNepaliDigits(currentYear)})
            </h2>
            <p className="text-gray-500 text-[11px] m-0">
              अनुगमन, छड्के जाँच, समिति बैठक तथा सार्वजनिक सुनुवाई कार्यक्रमहरू
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1]">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-white rounded text-gray-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-black text-sm text-[#0c2f55]">
              {MONTHS_NP[currentMonthIndex]} {toNepaliDigits(currentYear)}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-white rounded text-gray-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-2 bg-[#0c2f55] hover:bg-[#124275] text-white rounded-lg font-bold cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>नयाँ कार्यक्रम थप्नुहोस्</span>
          </button>
        </div>
      </div>

      {/* Main Grid & Side Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar Grid (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 bg-[#0c2f55] text-white text-center py-2 font-bold text-[11px]">
            {WEEKDAYS_NP.map((d, i) => (
              <div key={d} className={i === 6 ? 'text-red-300' : ''}>
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 border-t border-gray-200">
            {/* Empty slots for offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20 bg-gray-50/70 border-b border-r border-gray-100"></div>
            ))}

            {/* Actual Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSaturday = (dayNum + startDayOffset - 1) % 7 === 6;
              const isSelected = selectedDate === dayNum;
              const dayFormatted = dayNum < 10 ? `०${toNepaliDigits(dayNum)}` : toNepaliDigits(dayNum);
              const dayEvents = events.filter((ev) => ev.date.includes(dayFormatted));

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDate(dayNum)}
                  className={`h-20 p-1.5 border-b border-r border-gray-200 transition-all cursor-pointer relative ${
                    isSaturday ? 'bg-red-50/40' : 'bg-white hover:bg-blue-50/40'
                  } ${isSelected ? 'ring-2 ring-[#0c2f55] bg-blue-50/60 z-10' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isSaturday ? 'text-red-600' : isSelected ? 'text-[#0c2f55]' : 'text-gray-700'
                      }`}
                    >
                      {toNepaliDigits(dayNum)}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    )}
                  </div>

                  {/* Micro event pills */}
                  <div className="mt-1 space-y-0.5 overflow-hidden max-h-12">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] px-1 py-0.5 rounded truncate font-medium ${
                          ev.type === 'monitoring'
                            ? 'bg-amber-100 text-amber-800'
                            : ev.type === 'meeting'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events Panel (1 col) */}
        <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-4 space-y-4">
          <div className="border-b pb-3">
            <span className="text-[10px] text-gray-500 font-bold uppercase">चयनित मितिका कार्यक्रमहरू</span>
            <h3 className="text-sm font-extrabold text-[#0c2f55] m-0">
              {MONTHS_NP[currentMonthIndex]} {selectedDate ? toNepaliDigits(selectedDate) : '—'}, {toNepaliDigits(currentYear)}
            </h3>
          </div>

          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1.5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ev.type === 'monitoring'
                          ? 'bg-amber-100 text-amber-800'
                          : ev.type === 'meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {ev.type === 'monitoring'
                        ? 'छड्के / अनुगमन'
                        : ev.type === 'meeting'
                        ? 'समिति बैठक'
                        : 'कार्यक्रम'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                      <Clock className="w-3 h-3" />
                      {ev.time}
                    </span>
                  </div>

                  <h4 className="font-bold text-gray-800 text-xs m-0">{ev.title}</h4>

                  <div className="flex items-center gap-1 text-[10px] text-gray-600">
                    <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                    <span>{ev.location}</span>
                  </div>

                  {ev.description && (
                    <p className="text-[11px] text-gray-500 m-0 pt-1 border-t border-gray-200">
                      {ev.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>यस मितिमा कुनै विशेष कार्यक्रम तालिकाबद्ध छैन।</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 text-xs space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-[#0c2f55]">नयाँ कार्यक्रम तालिका प्रविष्टि</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">कार्यक्रमको शीर्षक *</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="जस्तै: काठमाडौं उपत्यका छड्के अनुगमन"
                  className="w-full p-1.5 border rounded font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">प्रकार</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full p-1.5 border rounded bg-white"
                  >
                    <option value="monitoring">छड्के / अनुगमन</option>
                    <option value="meeting">समिति बैठक</option>
                    <option value="hearing">सार्वजनिक सुनुवाई</option>
                    <option value="holiday">बिदा / उत्सव</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">मिति (वि.सं.)</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">समय</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">स्थान</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">थप विवरण</label>
                <textarea
                  rows={2}
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
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
    </div>
  );
};
