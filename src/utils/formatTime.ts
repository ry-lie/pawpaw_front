export const formatTime = (timeString: string, showDate = true): string => {
  const date = new Date(timeString);

  if (isNaN(date.getTime())) {
    return "Invalid Time";
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (showDate) {
    // 날짜와 시간 모두 표시
    return `${date.toLocaleDateString("ko-KR", dateOptions)} ${date.toLocaleTimeString(
      "ko-KR",
      timeOptions,
    )}`;
  }

  // 시간만 표시
  return date.toLocaleTimeString("ko-KR", timeOptions);
};
