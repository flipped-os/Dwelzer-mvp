// stores/useStore.ts
import { create } from "zustand";

interface StoreState {
  user: {
    name: string;
    email: string;
    role: "FREE" | "PRO";
    verified: boolean;
  } | null;
  setUser: (user: StoreState["user"]) => void;
  kycVerified: boolean;
  setKycVerified: (status: boolean) => void;
  listingsPopup: boolean;
  setListingsPopup: (open: boolean) => void;
  marketplacePopup: boolean;
  setMarketplacePopup: (open: boolean) => void;
  legalPopup: boolean;
  setLegalPopup: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  kycVerified: false,
  setKycVerified: (status) => set({ kycVerified: status }),
  listingsPopup: false,
  setListingsPopup: (open) => set({ listingsPopup: open }),
  marketplacePopup: false,
  setMarketplacePopup: (open) => set({ marketplacePopup: open }),
  legalPopup: false,
  setLegalPopup: (open) => set({ legalPopup: open }),
}));
