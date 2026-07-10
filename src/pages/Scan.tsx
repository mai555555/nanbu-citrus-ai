// 拍照识别页：选择示例 / 上传 → AI 识别动画 → 识别结果 → 保存到历史
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Save,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Info,
  MapPin,
} from "lucide-react";
import { PEST_MAP, PESTS, mockScan, type ScanResult } from "@/data/pests";
import { SAMPLE_IMAGES, sampleSvgDataUri } from "@/data/samples";
import { useScanStore } from "@/store/useScanStore";
import ScanAnimation from "@/components/ScanAnimation";
import ConfidenceRing from "@/components/ConfidenceRing";
import PestIllustration from "@/components/PestIllustration";

type Stage = "select" | "scanning" | "result";

export default function Scan() {
  const [stage, setStage] = useState<Stage>("select");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [selectedPestId, setSelectedPestId] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [location, setLocation] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addRecord = useScanStore((s) => s.addRecord);

  const handleSample = useCallback((key: string) => {
    const pest = PEST_MAP[key];
    if (!pest) return;
    setSelectedPestId(key);
    setImageSrc(sampleSvgDataUri(pest.illustration));
    setResult(null);
    setSaved(false);
    setStage("scanning");
  }, []);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setSelectedPestId(null);
      setImageSrc(src);
      setResult(null);
      setSaved(false);
      setStage("scanning");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleScanComplete = useCallback(() => {
    const pestId =
      selectedPestId ?? PESTS[Math.floor(Math.random() * PESTS.length)].id;
    setResult(mockScan(pestId));
    setStage("result");
  }, [selectedPestId]);

  const handleSave = useCallback(() => {
    if (!result) return;
    const pest = PEST_MAP[result.pestId];
    addRecord({
      pestId: pest.id,
      pestName: pest.name,
      category: pest.category,
      confidence: result.confidence,
      thumbnail: imageSrc,
      location: location || undefined,
    });
    setSaved(true);
  }, [result, imageSrc, location, addRecord]);

  const handleReset = useCallback(() => {
    setStage("select");
    setSelectedPestId(null);
    setImageSrc("");
    setResult(null);
    setSaved(false);
    setLocation("");
  }, []);

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* 标题 */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl text-cream sm:text-4xl">
            拍照识别病虫害
          </h1>
          <p className="mt-2 text-sm text-cream/60">
            选择一张示例图片，或上传本地照片，体验完整识别流程
          </p>
        </div>

        {/* 阶段指示器 */}
        <div className="mb-8 flex items-center justify-center gap-2 text-xs">
          {[
            { key: "select", label: "选择图片" },
            { key: "scanning", label: "AI 识别" },
            { key: "result", label: "查看结果" },
          ].map((s, i) => {
            const active = stage === s.key;
            const done =
              (stage === "scanning" && s.key === "select") ||
              (stage === "result" && s.key !== "result");
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    active
                      ? "bg-citrus-500 text-soil-900"
                      : done
                      ? "bg-leaf-500/20 text-leaf-300"
                      : "bg-white/5 text-cream/40"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={
                    active ? "text-citrus-200" : "text-cream/40"
                  }
                >
                  {s.label}
                </span>
                {i < 2 && <div className="h-px w-6 bg-white/10" />}
              </div>
            );
          })}
        </div>

        {/* 阶段 1：选择图片 */}
        {stage === "select" && (
          <div className="animate-fade-up space-y-6">
            {/* 模拟相机 */}
            <div className="card relative overflow-hidden">
              <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-2xl border border-citrus-500/30 bg-gradient-to-br from-soil-700 to-soil-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream/40">
                  <Camera className="h-12 w-12" />
                  <p className="text-sm">点击下方按钮拍照或上传</p>
                </div>
                <span className="viewfinder-corner tl" />
                <span className="viewfinder-corner tr" />
                <span className="viewfinder-corner bl" />
                <span className="viewfinder-corner br" />
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  className="btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5" />
                  上传照片
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </div>
            </div>

            {/* 示例图片快捷选择 */}
            <div className="card">
              <div className="mb-4 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-citrus-300" />
                <h3 className="font-display text-lg text-cream">
                  或选择示例图片快速体验
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SAMPLE_IMAGES.map((s) => {
                  const pest = PEST_MAP[s.key];
                  if (!pest) return null;
                  return (
                    <button
                      key={s.key}
                      onClick={() => handleSample(s.key)}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-soil-900 text-left transition-all hover:-translate-y-0.5 hover:border-citrus-500/40"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-soil-700 to-soil-900">
                        <PestIllustration
                          type={pest.illustration}
                          className="h-full w-full transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-medium text-cream">
                          {s.label}
                        </div>
                        <div className="mt-0.5 text-[11px] text-cream/50">
                          {s.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-citrus-500/5 p-3 text-xs text-cream/50">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-citrus-400" />
                Demo 使用插画式示例图模拟"病叶照片"。实际项目中农户通过手机拍照上传真实叶片/果实照片。
              </p>
            </div>
          </div>
        )}

        {/* 阶段 2：AI 识别动画 */}
        {stage === "scanning" && (
          <div className="animate-fade-up">
            <ScanAnimation
              imageSrc={imageSrc}
              onComplete={handleScanComplete}
            />
          </div>
        )}

        {/* 阶段 3：识别结果 */}
        {stage === "result" && result && (
          <ResultView
            result={result}
            imageSrc={imageSrc}
            saved={saved}
            location={location}
            onLocationChange={setLocation}
            onSave={handleSave}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

// 结果展示子组件
interface ResultViewProps {
  result: ScanResult;
  imageSrc: string;
  saved: boolean;
  location: string;
  onLocationChange: (v: string) => void;
  onSave: () => void;
  onReset: () => void;
}

function ResultView({
  result,
  imageSrc,
  saved,
  location,
  onLocationChange,
  onSave,
  onReset,
}: ResultViewProps) {
  const pest = PEST_MAP[result.pestId];
  if (!pest) return null;
  const needConfirm = result.confidence < 80;

  return (
    <div className="animate-fade-up space-y-5">
      {/* 主结果卡片 */}
      <div className="card relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ background: pest.accentColor }}
        />
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          {/* 左：样本图 + 置信度 */}
          <div className="flex flex-col items-center gap-4">
            <div className="aspect-[4/3] w-48 overflow-hidden rounded-xl border border-white/10 bg-soil-900">
              <img
                src={imageSrc}
                alt="识别样本"
                className="h-full w-full object-cover"
              />
            </div>
            <ConfidenceRing value={result.confidence} size={130} />
          </div>

          {/* 右：病虫害信息 */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="chip"
                style={{
                  background: `${pest.accentColor}22`,
                  color: pest.accentColor,
                }}
              >
                {pest.category}
              </span>
              <span className="chip bg-white/5 text-cream/70">
                高发：{pest.season}
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl text-cream">
              {pest.name}
            </h2>
            <p className="text-sm text-cream/50">俗称：{pest.alias}</p>

            {/* 风险等级警示条 */}
            <div
              className="mt-4 flex items-center gap-3 rounded-xl border p-3"
              style={{
                borderColor:
                  pest.severity === "重"
                    ? "#DC262655"
                    : pest.severity === "中"
                    ? "#F59E0B55"
                    : "#16A34A55",
                background:
                  pest.severity === "重"
                    ? "#DC262611"
                    : pest.severity === "中"
                    ? "#F59E0B11"
                    : "#16A34A11",
              }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg"
                style={{
                  background:
                    pest.severity === "重"
                      ? "#DC262622"
                      : pest.severity === "中"
                      ? "#F59E0B22"
                      : "#16A34A22",
                }}
              >
                {pest.severity === "重" ? "🔴" : pest.severity === "中" ? "🟡" : "🟢"}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-base"
                    style={{
                      color:
                        pest.severity === "重"
                          ? "#FCA5A5"
                          : pest.severity === "中"
                          ? "#FCD34D"
                          : "#86EFAC",
                    }}
                  >
                    风险等级：{pest.severity}
                  </span>
                  <span className="text-xs text-cream/50">
                    {pest.severity === "重"
                      ? "需立即处理，建议联系农技人员"
                      : pest.severity === "中"
                      ? "及时防治，避免扩散"
                      : "可观察后处理，注意监测"}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-cream/70">{pest.description}</p>

            {/* 识别依据 */}
            <div className="mt-5">
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-citrus-200">
                <CheckCircle2 className="h-4 w-4" />
                AI 识别依据
              </h4>
              <ul className="space-y-1.5">
                {pest.recognitionBasis.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-cream/70"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-citrus-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 置信度提醒 */}
      {needConfirm && (
        <div className="flex items-start gap-3 rounded-2xl border border-citrus-500/30 bg-citrus-500/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-citrus-300" />
          <div className="text-sm">
            <p className="font-medium text-citrus-200">建议人工确认</p>
            <p className="mt-1 text-cream/70">
              当前置信度低于 80%，识别结果仅供参考。建议结合实际症状再次比对，或联系农技人员确认。
            </p>
          </div>
        </div>
      )}

      {/* 备选结果 */}
      {result.alternatives.length > 0 && (
        <div className="card">
          <h4 className="mb-3 text-sm font-medium text-cream/80">
            其他可能（备选）
          </h4>
          <div className="space-y-2">
            {result.alternatives.map((alt) => {
              const p = PEST_MAP[alt.pestId];
              if (!p) return null;
              return (
                <Link
                  key={alt.pestId}
                  to={`/advice/${alt.pestId}`}
                  className="flex items-center justify-between rounded-lg bg-soil-900/50 px-4 py-2.5 transition-colors hover:bg-soil-900"
                >
                  <span className="text-sm text-cream/80">{p.name}</span>
                  <span className="font-mono text-xs text-cream/50">
                    {alt.confidence}%
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 保存到历史 */}
      <div className="card space-y-3">
        <h4 className="text-sm font-medium text-cream/80">保存到历史记录</h4>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="可选：填写果园位置（如南部县长坪镇）"
              className="w-full rounded-xl border border-white/10 bg-soil-900 py-2.5 pl-10 pr-3 text-sm text-cream placeholder-cream/30 focus:border-citrus-500/50 focus:outline-none"
            />
          </div>
          <button
            className="btn-primary"
            onClick={onSave}
            disabled={saved}
          >
            <Save className="h-4 w-4" />
            {saved ? "已保存" : "保存记录"}
          </button>
        </div>
        {saved && (
          <p className="flex items-center gap-1.5 text-xs text-leaf-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            已保存到历史记录，可在"历史"页查看
          </p>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="btn-secondary flex-1" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          再识别一张
        </button>
        <Link to={`/advice/${pest.id}`} className="btn-primary flex-1">
          查看防治参考
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
