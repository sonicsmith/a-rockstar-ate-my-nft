import { create, useStore } from "zustand";

interface UserWalletState {
  dialogMessage: string;
  setDialogMessage: (dialogMessage: string) => void;
}

const store = create<UserWalletState>()((set) => ({
  dialogMessage: "",
  setDialogMessage: (dialogMessage: string) => { set({ dialogMessage }); },
}));

export const useAppStore = () => useStore(store);
