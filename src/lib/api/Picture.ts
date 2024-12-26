//사진 저장api(추후 수정될 예정)
export const PutImage = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return fetch("/picture", {
    method: "PUT",
    body: formData,
  });
};
