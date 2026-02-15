import { create } from 'zustand';

const createId = () => {
  const anyGlobal = globalThis as any;
  const cryptoObj = anyGlobal?.crypto;
  if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export type NoticeType = 'success' | 'error' | 'warning' | 'info';

export interface Notice {
  id: string;
  message: string;
  type: NoticeType;
  duration?: number;
}

interface NoticeState {
  notices: Notice[];
  push: (message: string, type?: NoticeType, duration?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NoticeState>((set) => ({
  notices: [],
  push: (message, type = 'info', duration = 3000) =>
    set((s) => ({ notices: [...s.notices, { id: createId(), message, type, duration }] })),
  remove: (id) => set((s) => ({ notices: s.notices.filter((n) => n.id !== id) })),
  clear: () => set({ notices: [] }),
}));
