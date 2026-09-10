import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  uid: string;
  kycVerified: boolean;
  role: 'trader' | 'pro' | 'vip';
  joinedDate: string;
}

interface AuthState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup';
  
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  connectWallet: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'usr-1',
    name: 'Shazzed Shuvo',
    email: 'trader@nextrade.pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    uid: 'NX-894201',
    kycVerified: true,
    role: 'pro',
    joinedDate: 'January 2026',
  },
  isLoggedIn: true,
  isAuthModalOpen: false,
  authMode: 'login',

  openAuthModal: (mode = 'login') => set({ isAuthModalOpen: true, authMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  login: (email, name) =>
    set({
      isLoggedIn: true,
      user: {
        id: `usr-${Date.now()}`,
        name: name || email.split('@')[0],
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        uid: `NX-${Math.floor(100000 + Math.random() * 900000)}`,
        kycVerified: true,
        role: 'trader',
        joinedDate: 'Today',
      },
      isAuthModalOpen: false,
    }),

  signup: (email, name) =>
    set({
      isLoggedIn: true,
      user: {
        id: `usr-${Date.now()}`,
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        uid: `NX-${Math.floor(100000 + Math.random() * 900000)}`,
        kycVerified: false,
        role: 'trader',
        joinedDate: 'Today',
      },
      isAuthModalOpen: false,
    }),

  logout: () => set({ isLoggedIn: false, user: null }),

  connectWallet: () =>
    set({
      isLoggedIn: true,
      user: {
        id: `usr-wallet-${Date.now()}`,
        name: '0x71C...a49B',
        email: 'wallet@web3.eth',
        avatar: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=100&auto=format&fit=crop&q=80',
        uid: `NX-W3-${Math.floor(1000 + Math.random() * 9000)}`,
        kycVerified: true,
        role: 'pro',
        joinedDate: 'Web3 Instant',
      },
      isAuthModalOpen: false,
    }),
}));
