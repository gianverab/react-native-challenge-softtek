export function calcAge(birthDayStr?: string): number {
  if (!birthDayStr) return 99;
  const parts = birthDayStr.split('-');
  if (parts.length !== 3) return 99;
  const [dd, mm, yyyy] = parts;
  const b = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  const diff = Date.now() - b.getTime();
  return new Date(diff).getUTCFullYear() - 1970;
}
