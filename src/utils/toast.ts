import { toast, ToastOptions } from "react-toastify";

export const infoToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 2000,
    ...options,
    type: "info",
  });
};

export const errorToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 800,
    ...options,
    type: "error",
  });
};

export const successToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 800,
    ...options,
    type: "success",
  });
};

export const warningToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 800,
    ...options,
    type: "warning",
  });
};
