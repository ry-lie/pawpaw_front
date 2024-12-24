export const handleImamgeUploading =
  (onConfilm: (file: File) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onConfilm(file);
  };
