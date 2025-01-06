import { toast, ToastOptions } from "react-toastify";

export const infoToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 2000,
    ...options,
    type: "info",
    className: "text-sm pt-12 pr-3 mb-1",
  });
};

export const errorToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 800,
    ...options,
    type: "error",
    className: "text-sm pt-12 pr-3 mb-1",
  });
};

export const successToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 800,
    ...options,
    type: "success",
    className: "text-sm pt-12 pr-3 mb-1",
  });
};

export const warningToast = (content: string, options?: ToastOptions) => {
  toast(content, {
    position: "top-right",
    autoClose: 800,
    ...options,
    type: "warning",
    className: "text-sm pt-12 pr-3 mb-1",
  });
};
