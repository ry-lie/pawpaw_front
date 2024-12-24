export const PutImage = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return fetch("/picture", {
    method: "PUT",
    body: formData,
  });
};
