// 识别历史记录管理（zustand + localStorage 持久化）
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ScanRecord {
  id: string;
  pestId: string;
  pestName: string;
  category: string;
  confidence: number;
  thumbnail: string; // data URI
  createdAt: number;
  location?: string;
}

interface ScanStore {
  records: ScanRecord[];
  addRecord: (record: Omit<ScanRecord, "id" | "createdAt">) => ScanRecord;
  removeRecord: (id: string) => void;
  clearRecords: () => void;
}

// 首次访问注入的示例数据，使看板与历史页不为空
const seedRecords = (): ScanRecord[] => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  return [
    {
      id: "seed-1",
      pestId: "red-spider",
      pestName: "红蜘蛛",
      category: "虫害",
      confidence: 88,
      thumbnail: "",
      createdAt: now - 1 * day,
      location: "南部县长坪镇",
    },
    {
      id: "seed-2",
      pestId: "anthracnose",
      pestName: "炭疽病",
      category: "病害",
      confidence: 84,
      thumbnail: "",
      createdAt: now - 2 * day,
      location: "南部县建兴镇",
    },
    {
      id: "seed-3",
      pestId: "leafminer",
      pestName: "潜叶蛾",
      category: "虫害",
      confidence: 91,
      thumbnail: "",
      createdAt: now - 3 * day,
      location: "南部县定水镇",
    },
    {
      id: "seed-4",
      pestId: "red-spider",
      pestName: "红蜘蛛",
      category: "虫害",
      confidence: 76,
      thumbnail: "",
      createdAt: now - 4 * day,
      location: "南部县楠木镇",
    },
    {
      id: "seed-5",
      pestId: "canker",
      pestName: "溃疡病",
      category: "病害",
      confidence: 79,
      thumbnail: "",
      createdAt: now - 5 * day,
      location: "南部县河东镇",
    },
    {
      id: "seed-6",
      pestId: "anthracnose",
      pestName: "炭疽病",
      category: "病害",
      confidence: 90,
      thumbnail: "",
      createdAt: now - 6 * day,
      location: "南部县长坪镇",
    },
  ];
};

export const useScanStore = create<ScanStore>()(
  persist(
    (set) => ({
      records: seedRecords(),
      addRecord: (record) => {
        const newRecord: ScanRecord = {
          ...record,
          id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
        };
        set((state) => ({ records: [newRecord, ...state.records] }));
        return newRecord;
      },
      removeRecord: (id) =>
        set((state) => ({ records: state.records.filter((r) => r.id !== id) })),
      clearRecords: () => set({ records: [] }),
    }),
    {
      name: "citrus-scan-records",
      // 仅持久化 records 字段
      partialize: (state) => ({ records: state.records }),
    }
  )
);
