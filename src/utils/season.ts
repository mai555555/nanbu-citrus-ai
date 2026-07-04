// 季节性预警工具
// 根据当前月份判断病虫害高发情况
import { PESTS, type Pest } from "@/data/pests";

export interface SeasonAlert {
  pest: Pest;
  isPeak: boolean; // 当前是否高发
  message: string;
}

// 获取当前月份的病虫害预警
export function getSeasonAlerts(date: Date = new Date()): SeasonAlert[] {
  const month = date.getMonth() + 1; // 1-12
  const alerts: SeasonAlert[] = [];

  for (const pest of PESTS) {
    const isPeak = pest.peakMonths.includes(month);
    if (isPeak) {
      alerts.push({
        pest,
        isPeak: true,
        message: `当前是${pest.name}高发期，建议重点排查${
          pest.category === "虫害" ? "叶背与枝梢" : "叶片与果实"
        }`,
      });
    }
  }

  return alerts;
}

// 获取当前月份中文
export function getCurrentMonthLabel(date: Date = new Date()): string {
  const month = date.getMonth() + 1;
  return `${month} 月`;
}
