import axios from "axios";

export async function urlToFileWithAxios(
  imageUrl: string | undefined,
  fileName: string,
): Promise<File> {
  if (!imageUrl) {
    throw new Error("Invalid URL: The provided URL is undefined or empty.");
  }

  const response = await axios.get(imageUrl, {
    responseType: "blob",
  });

  const blob = response.data;

  return new File([blob], fileName, { type: blob.type });
}
