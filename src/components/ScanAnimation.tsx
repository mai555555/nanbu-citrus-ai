// AI 识别扫描动画 + 进度文案
import { useEffect, useState } from "react";
import { ScanLine, Leaf, Bug, Microscope, Sparkles } from "lucide-react";

interface Props {
  imageSrc: string;
  onComplete: () => void;
  duration?: number; // ms
}

const STEPS = [
  { icon: Leaf, text: "正在分析叶片纹理…" },
  { icon: Bug, text: "比对虫害特征库…" },
  { icon: Microscope, text: "识别病斑形态与颜色…" },
  { icon: Sparkles, text: "生成识别结果…" },
];

export default function ScanAnimation({
  imageSrc,
  onComplete,
  duration = 2600,
}: Props) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p * 100);
      setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  const currentStep = STEPS[step] ?? STEPS[STEPS.length - 1];
  const CurrentIcon = currentStep.icon;

  return (
    <div className="mx-auto max-w-md animate-fade-up">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-citrus-500/40 bg-soil-900">
        {/* 模拟照片 */}
        <img
          src={imageSrc}
          alt="待识别样本"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        {/* 暗化遮罩 */}
        <div className="absolute inset-0 bg-soil-900/30" />
        {/* 取景框四角 */}
        <span className="viewfinder-corner tl" />
        <span className="viewfinder-corner tr" />
        <span className="viewfinder-corner bl" />
        <span className="viewfinder-corner br" />
        {/* 扫描线 */}
        <div className="absolute inset-x-0 top-0 h-[2px] animate-scan-line bg-gradient-to-r from-transparent via-citrus-400 to-transparent shadow-[0_0_12px_#FBB225]" />
        {/* 扫描光晕 */}
        <div className="absolute inset-x-0 top-0 h-16 -translate-y-8 animate-scan-line bg-gradient-to-b from-citrus-400/20 to-transparent" />
      </div>

      {/* 进度文案 */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-citrus-200">
          <CurrentIcon className="h-5 w-5 animate-pulse" />
          <span className="font-medium">{currentStep.text}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-citrus-400 to-citrus-600 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-cream/50">
          <span>多模态视觉模型 · 本地样本匹配</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-cream/40">
        <ScanLine className="h-3.5 w-3.5" />
        本 Demo 为本地 Mock 识别，实际项目将接入多模态视觉模型接口
      </p>
    </div>
  );
}
