import NepaliDate from "nepali-date-converter";

function parseDateParts(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day, 12);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return { year, month, day };
}

export function formatAdDateAsBs(value: string) {
  const parts = parseDateParts(value);
  if (!parts) return "";

  const nepaliDate = NepaliDate.fromAD(new Date(parts.year, parts.month - 1, parts.day, 12));
  return nepaliDate.format("YYYY-MM-DD");
}

export function convertBsDateToAd(value: string) {
  const parts = parseDateParts(value);
  if (!parts || parts.year < 2000 || parts.year > 2200) return null;

  try {
    const nepaliDate = new NepaliDate(value);
    const ad = nepaliDate.getAD();
    return `${ad.year}-${String(ad.month + 1).padStart(2, "0")}-${String(ad.date).padStart(2, "0")}`;
  } catch {
    return null;
  }
}
