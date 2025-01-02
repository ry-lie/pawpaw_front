/**
 * 날짜 형식을 지정된 형식으로 변환하는 함수
 * @param isoDate - ISO 8601 형식의 날짜 문자열
 * @param format - 변환할 날짜 형식 (기본값: 'YYYY-MM-DD HH:mm:ss')
 * @returns 변환된 날짜 문자열
 */
export function formatDate(
  isoDate: string,
  format: string = "YYYY-MM-DD HH:mm:ss",
): string {
  const date = new Date(isoDate);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const replacements: Record<string, string | number> = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    SSS: date.getMilliseconds().toString().padStart(3, "0"),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, (match) =>
    replacements[match].toString(),
  );
}
