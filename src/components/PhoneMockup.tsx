// 微信小程序手机外壳模拟
// 还原 iPhone 风格的边框、刘海、状态栏，内部为小程序内容区
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className }: Props) {
  return (
    <div
      className={`relative mx-auto ${className ?? ""}`}
      style={{ width: "min(300px, 80vw)" }}
    >
      {/* 外框 */}
      <div className="relative rounded-[2.6rem] border-[10px] border-soil-700 bg-soil-900 p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
        {/* 屏幕区 */}
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-soil-900">
          {/* 刘海 */}
          <div className="absolute left-1/2 top-0 z-30 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-soil-700">
            <div className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-soil-600" />
          </div>
          {/* 状态栏 */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-1.5 text-[10px] font-medium text-cream/80">
            <span className="font-mono">9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-3 rounded-sm border border-cream/60" />
              <span className="inline-block h-2 w-1 rounded-sm bg-cream/60" />
            </span>
          </div>
          {/* 微信小程序顶栏 */}
          <div className="absolute inset-x-0 top-7 z-20 flex items-center justify-between border-b border-white/5 bg-soil-900/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] text-cream/40">‹</span>
            <span className="text-[11px] font-medium text-cream">柑橘 AI 植保</span>
            <span className="text-[12px] text-cream/40">···</span>
          </div>
          {/* 内容区 */}
          <div className="absolute inset-0 top-[3.6rem] bottom-3 overflow-hidden">
            {children}
          </div>
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 z-30 h-0.5 w-24 -translate-x-1/2 rounded-full bg-cream/30" />
        </div>
        {/* 侧边按钮 */}
        <div className="absolute -left-[12px] top-24 h-8 w-1 rounded-l bg-soil-600" />
        <div className="absolute -left-[12px] top-36 h-12 w-1 rounded-l bg-soil-600" />
        <div className="absolute -left-[12px] top-52 h-12 w-1 rounded-l bg-soil-600" />
        <div className="absolute -right-[12px] top-32 h-16 w-1 rounded-r bg-soil-600" />
      </div>
    </div>
  );
}
