// date-utils.ts
import { format } from "date-fns";

// Simple conversion between Nepali and English dates (for demo purposes)
// In a real app, you would use a proper conversion library
// date-utils.ts
export function toNepaliDate(date: Date) {
  // This is a simplified conversion for 2082 B.S. (2025 A.D.)
  // Note: This is not accurate for all dates, just for demonstration
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Approximate conversion for 2082 B.S.
  let nepaliYear = year + 56;
  let nepaliMonth = month + 8;
  let nepaliDay = day + 15;
  
  if (nepaliMonth > 12) {
    nepaliMonth -= 12;
    nepaliYear += 1;
  }
  
  // Simple day adjustment (not accounting for actual Nepali calendar days)
  if (nepaliDay > 32) {
    nepaliDay -= 32;
    nepaliMonth += 1;
  }
  
  return {
    year: nepaliYear,
    month: nepaliMonth,
    day: nepaliDay,
    toString: () => `${nepaliDay} ${getNepaliMonthName(nepaliMonth)} ${nepaliYear}`
  };
}

export function toEnglishDate(nepaliDate: {
  year: number;
  month: number;
  day: number;
}) {
  // Reverse of the above conversion
  let englishYear = nepaliDate.year - 56;
  let englishMonth = nepaliDate.month - 8;
  let englishDay = nepaliDate.day - 15;

  if (englishMonth < 1) {
    englishMonth += 12;
    englishYear -= 1;
  }

  if (englishDay < 1) {
    englishDay += 31;
    englishMonth -= 1;
  }

  return new Date(englishYear, englishMonth - 1, englishDay);
}

export function getNepaliMonthName(month: number) {
  const months = [
    "Baisakh",
    "Jestha",
    "Asadh",
    "Shrawan",
    "Bhadra",
    "Ashwin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];
  return months[month - 1] || "";
}

export function getEnglishMonthName(month: number) {
  return format(new Date(2000, month - 1, 1), "MMMM");
}

export function isNepaliDate(
  date: any
): date is { year: number; month: number; day: number } {
  return (
    date &&
    typeof date.year === "number" &&
    typeof date.month === "number" &&
    typeof date.day === "number"
  );
}
