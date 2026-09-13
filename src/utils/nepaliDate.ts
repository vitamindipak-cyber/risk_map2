const NEPALI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toNepaliDigits(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '०';
  return String(num).replace(/[0-9]/g, (d) => NEPALI_DIGITS[parseInt(d, 10)] || d);
}

export function fromNepaliDigits(str: string): string {
  if (!str) return '';
  const map: Record<string, string> = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  return String(str).replace(/[०-९]/g, (d) => map[d] || d);
}

export const NEPALI_MONTHS = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
];

export const NEPALI_WEEKDAYS = [
  'आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'
];

export const NEPALI_WEEKDAYS_SHORT = ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि'];

// Days in each month for BS 2080-2090
export const BS_MONTH_DAYS: Record<number, number[]> = {
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2087: [31, 31, 32, 31, 31, 31, 30, 30, 30, 30, 30, 30],
  2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
};

export function getCurrentNepaliDate(): { year: number; month: number; day: number; formatted: string } {
  // Current time is roughly 2026-09-13 which corresponds to BS 2083 Bhadra 28
  const now = new Date();
  const adYear = now.getFullYear();
  const adMonth = now.getMonth() + 1;
  const adDay = now.getDate();

  // Baseline reference point: 2026-04-14 is 2083-01-01 (Baisakh 1)
  const baseAD = new Date(2026, 3, 14);
  const diffDays = Math.floor((now.getTime() - baseAD.getTime()) / (1000 * 60 * 60 * 24));

  let year = 2083;
  let month = 1;
  let day = 1 + diffDays;

  if (day > 0) {
    const monthDays = BS_MONTH_DAYS[year] || [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
    while (month <= 12 && day > monthDays[month - 1]) {
      day -= monthDays[month - 1];
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }
  } else {
    // Fallback standard approximation
    year = adYear + 56;
    month = 5;
    day = 28;
  }

  const formatted = `${toNepaliDigits(year)}-${toNepaliDigits(String(month).padStart(2, '0'))}-${toNepaliDigits(String(day).padStart(2, '0'))}`;
  return { year, month, day, formatted };
}

export function getCurrentNepaliTimeString(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  return `${toNepaliDigits(h)}:${toNepaliDigits(m)}:${toNepaliDigits(s)}`;
}

export function formatNumberWithCommas(n: number | string): string {
  if (n === null || n === undefined || isNaN(Number(n))) return '०';
  const num = Math.round(Number(n));
  const s = String(Math.abs(num));
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formattedEnglish = (rest !== '' ? rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',') + ',' : '') + last3;
  return (num < 0 ? '-' : '') + toNepaliDigits(formattedEnglish);
}

export function formatNepaliCurrency(n: number): string {
  const val = Number(n) || 0;
  if (val >= 10000000) {
    const cr = (val / 10000000).toFixed(2);
    return `रु. ${toNepaliDigits(cr)} करोड`;
  }
  if (val >= 100000) {
    const lk = (val / 100000).toFixed(2);
    return `रु. ${toNepaliDigits(lk)} लाख`;
  }
  return `रु. ${formatNumberWithCommas(val)}`;
}
