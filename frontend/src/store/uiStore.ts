import { create } from "zustand";

type UiStore = {
  toast: string;
  setToast: (message: string) => void;
  clearToast: () => void;
};

let toastTimer: number | undefined;

export const useUiStore = create<UiStore>((set) => ({
  toast: "",
  setToast: (message) => {
    if (toastTimer) window.clearTimeout(toastTimer);
    set({ toast: message });
    toastTimer = window.setTimeout(() => set({ toast: "" }), 2400);
  },
  clearToast: () => {
    if (toastTimer) window.clearTimeout(toastTimer);
    set({ toast: "" });
  }
}));
