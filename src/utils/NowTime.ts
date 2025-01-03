export const NowDate = (timeString : string): string=>{
    const date = new Date(timeString);
    const options : Intl.DateTimeFormatOptions = {
        hour : "numeric",
        minute : "numeric",
        hour12 : true,
    };
    return date.toLocaleString("ko-KR", options)
}