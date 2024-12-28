/**
 * 파일을 Base64로 변환하는 유틸 함수
 * @param file 파일 객체
 * @returns Promise<string> Base64 문자열
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("파일을 Base64로 변환할 수 없습니다."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * 기본 이미지를 Base64로 변환하는 유틸 함수
 * @param imageUrl 이미지 경로(URL)
 * @returns Promise<string> Base64 문자열
 */
export const convertImageToBase64 = async (
  imageUrl: string,
): Promise<string> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return await convertFileToBase64(blob as File);
};
