// 手机内自动循环播放的识别流程演示
// 阶段：拍照 → AI 扫描 → 结果展示 → 循环
import { useEffect, useState, useCallback } from "react";
import { Camera, CheckCircle2, Sparkles } from "lucide-react";
import { PESTS, type Pest } from "@/data/pests";
import { sampleSvgDataUri } from "@/data/samples";
import PestIllustration from "@/components/PestIllustration";

type Stage = "capture" | "scanning" | "result";

const STAGE_DURATION: Record<Stage, number> = {
  capture: 1600,
  scanning: 2200,
  result: 2800,
};

// 轮播的病虫害列表（选取 4 种有代表性的）
const DEMO_PESTS: Pest[] = [
  PESTS[0], // 红蜘蛛
  PESTS[1], // 炭疽病
  PESTS[2], // 潜叶蛾
  PESTS[4], // 介壳虫
];

export default function PhoneDemoLoop() {
  const [pestIndex, setPestIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("capture");
  const [progress, setProgress] = useState(0);
  const [displayConf, setDisplayConf] = useState(0);

  const currentPest = DEMO_PESTS[pestIndex];

  // 进入下一病虫害
  const nextPest = useCallback(() => {
    setPestIndex((prev) => (prev + 1) % DEMO_PESTS.length);
    setStage("capture");
    setProgress(0);
    setDisplayConf(0);
  }, []);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = STAGE_DURATION[stage];
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        // 进入下一阶段或下一个病虫害
        if (stage === "result") {
          nextPest();
        } else {
          const next: Stage = stage === "capture" ? "scanning" : "result";
          setStage(next);
          setProgress(0);
          setDisplayConf(0);
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, nextPest]);

  // 结果阶段置信度动画
  useEffect(() => {
    if (stage !== "result") {
      setDisplayConf(0);
      return;
    }
    let raf: number;
    const start = performance.now();
    // 不同病虫害设置不同置信度，让演示更真实
    const targets = [88, 84, 91, 78]; // 红蜘蛛、炭疽病、潜叶蛾、介壳虫
    const target = targets[pestIndex] ?? 80;
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayConf(target * eased);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [stage, pestIndex]);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-soil-800 to-soil-900">
      {stage === "capture" && <CaptureStage pest={currentPest} />}
      {stage === "scanning" && <ScanningStage pest={currentPest} progress={progress} />}
      {stage === "result" && (
        <ResultStage pest={currentPest} confidence={Math.round(displayConf)} />
      )}
    </div>
  );
}

// 阶段1：拍照取景
function CaptureStage({ pest }: { pest: Pest }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center p-3">
      <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-xl border border-citrus-500/50 bg-gradient-to-br from-soil-700 to-soil-900">
        <PestIllustration
          type={pest.illustration}
          className="h-full w-full opacity-80"
        />
        <span className="viewfinder-corner tl !w-5 !h-5 !border-t-2 !border-l-2" />
        <span className="viewfinder-corner tr !w-5 !h-5 !border-t-2 !border-r-2" />
        <span className="viewfinder-corner bl !w-5 !h-5 !border-b-2 !border-l-2" />
        <span className="viewfinder-corner br !w-5 !h-5 !border-b-2 !border-r-2" />
        {/* 中心提示 */}
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1 rounded-full bg-soil-900/70 py-1 text-[9px] text-citrus-200 backdrop-blur-sm">
          <Camera className="h-2.5 w-2.5" />
          对准叶片拍照
        </div>
      </div>
      {/* 拍照按钮 */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full border-2 border-cream/40" />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-citrus-400 to-citrus-600 shadow-citrus">
          <Camera className="h-4 w-4 text-soil-900" />
        </div>
        <div className="h-8 w-8 rounded-full border-2 border-cream/40" />
      </div>
    </div>
  );
}

// 阶段2：AI 扫描
function ScanningStage({ pest, progress }: { pest: Pest; progress: number }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center p-3">
      <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-xl border border-citrus-500/50">
        <img
          src={sampleSvgDataUri(pest.illustration)}
          alt="扫描中"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-soil-900/30" />
        <span className="viewfinder-corner tl !w-5 !h-5 !border-t-2 !border-l-2" />
        <span className="viewfinder-corner tr !w-5 !h-5 !border-t-2 !border-r-2" />
        <span className="viewfinder-corner bl !w-5 !h-5 !border-b-2 !border-l-2" />
        <span className="viewfinder-corner br !w-5 !h-5 !border-b-2 !border-r-2" />
        {/* 扫描线 */}
        <div className="absolute inset-x-0 top-0 h-0.5 animate-scan-line bg-citrus-400 shadow-[0_0_8px_#FBB225]" />
        <div className="absolute inset-x-0 top-0 h-10 animate-scan-line bg-gradient-to-b from-citrus-400/25 to-transparent" />
      </div>
      <div className="mt-3 w-full max-w-[200px] space-y-1.5">
        <div className="flex items-center gap-1.5 text-[9px] text-citrus-200">
          <Sparkles className="h-2.5 w-2.5 animate-pulse" />
          正在分析叶片纹理…
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-citrus-400 to-citrus-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right font-mono text-[8px] text-cream/40">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

// 阶段3：识别结果
function ResultStage({ pest, confidence }: { pest: Pest; confidence: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;
  const color =
    confidence >= 80 ? "#16A34A" : confidence >= 60 ? "#F59E0B" : "#DC2626";

  return (
    <div className="flex h-full flex-col p-3">
      {/* 标题 */}
      <div className="mb-2 flex items-center gap-1 text-[10px] text-citrus-300">
        <CheckCircle2 className="h-3 w-3" />
        识别完成
      </div>
      {/* 置信度环 */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="80" height="80" className="-rotate-90">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-mono text-base font-bold"
              style={{ color }}
            >
              {confidence}%
            </span>
          </div>
        </div>
      </div>
      {/* 病虫害名 */}
      <div className="mt-2 text-center">
        <div className="font-display text-lg text-cream">{pest.name}</div>
        <div className="text-[9px] text-cream/50">{pest.alias}</div>
        <span
          className="mt-1 inline-block rounded-full px-2 py-0.5 text-[8px]"
          style={{
            background: `${pest.accentColor}22`,
            color: pest.accentColor,
          }}
        >
          {pest.category}
        </span>
      </div>
      {/* 识别依据 */}
      <div className="mt-2 space-y-1">
        {pest.recognitionBasis.slice(0, 2).map((b, i) => (
          <div
            key={i}
            className="flex items-start gap-1 rounded bg-white/5 p-1.5 text-[8px] text-cream/70"
          >
            <span className="mt-0.5 h-0.5 w-0.5 shrink-0 rounded-full bg-citrus-400" />
            {b}
          </div>
        ))}
      </div>
      {/* 按钮 */}
      <button className="mt-2 w-full rounded-lg bg-gradient-to-br from-citrus-400 to-citrus-600 py-1.5 text-[10px] font-medium text-soil-900">
        查看防治参考
      </button>
    </div>
  );
}
