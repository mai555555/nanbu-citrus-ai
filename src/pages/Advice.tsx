// 防治参考页：防治方向、用药注意、风险提示
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  FlaskConical,
  AlertTriangle,
  Sprout,
  Calendar,
  ShieldAlert,
  Info,
} from "lucide-react";
import { PEST_MAP } from "@/data/pests";
import PestIllustration from "@/components/PestIllustration";

export default function Advice() {
  const { id } = useParams<{ id: string }>();
  const pest = id ? PEST_MAP[id] : undefined;

  if (!pest) {
    return (
      <div className="container py-20 text-center">
        <p className="text-cream/60">未找到该病虫害信息</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* 返回 */}
        <Link
          to="/scan"
          className="mb-6 inline-flex items-center gap-1 text-sm text-cream/60 hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" />
          返回识别
        </Link>

        {/* 头部 */}
        <div
          className="card relative mb-6 overflow-hidden"
          style={{ borderColor: `${pest.accentColor}55` }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ background: pest.accentColor }}
          />
          <div className="grid gap-5 md:grid-cols-[160px_1fr]">
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-soil-700 to-soil-900">
              <PestIllustration
                type={pest.illustration}
                className="h-full w-full"
              />
            </div>
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
                  严重程度：{pest.severity}
                </span>
              </div>
              <h1 className="mt-2 font-display text-3xl text-cream">
                {pest.name}
              </h1>
              <p className="text-sm text-cream/50">
                俗称：{pest.alias} · 高发：{pest.season}
              </p>
              <p className="mt-3 text-sm text-cream/70">{pest.description}</p>
            </div>
          </div>
        </div>

        {/* 典型症状 */}
        <section className="card mb-5">
          <h2 className="mb-3 flex items-center gap-2 font-display text-xl text-cream">
            <Info className="h-5 w-5 text-citrus-300" />
            典型症状
          </h2>
          <ul className="space-y-2">
            {pest.symptoms.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-cream/70"
              >
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 农业防治 */}
        <section className="card mb-5 border-leaf-500/20">
          <h2 className="mb-3 flex items-center gap-2 font-display text-xl text-cream">
            <Sprout className="h-5 w-5 text-leaf-400" />
            农业防治
          </h2>
          <p className="mb-3 text-xs text-cream/50">
            优先采用农业措施，从源头减少病虫害发生
          </p>
          <ul className="space-y-2">
            {pest.prevention.agricultural.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg bg-leaf-500/5 p-3 text-sm text-cream/80"
              >
                <span className="font-mono text-xs text-leaf-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 化学防治 */}
        <section className="card mb-5 border-citrus-500/20">
          <h2 className="mb-3 flex items-center gap-2 font-display text-xl text-cream">
            <FlaskConical className="h-5 w-5 text-citrus-300" />
            化学防治
          </h2>
          <p className="mb-3 text-xs text-cream/50">
            农业防治不足时，可在关键期合理用药
          </p>
          <ul className="space-y-2">
            {pest.prevention.chemical.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg bg-citrus-500/5 p-3 text-sm text-cream/80"
              >
                <span className="font-mono text-xs text-citrus-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 用药注意 */}
        <section className="card mb-5">
          <h2 className="mb-3 flex items-center gap-2 font-display text-xl text-cream">
            <Calendar className="h-5 w-5 text-citrus-300" />
            用药注意事项
          </h2>
          <ul className="space-y-2">
            {pest.prevention.cautions.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-cream/70"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-citrus-400" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 用药安全期警示 */}
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
            <ShieldAlert className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg text-red-300">
                采果前 {pest.safetyPeriod} 天
              </span>
              <span className="text-xs text-cream/60">禁止使用化学农药</span>
            </div>
            <p className="mt-0.5 text-xs text-cream/50">
              采前用药会导致农药残留超标，影响果实安全上市，请合理安排防治时间
            </p>
          </div>
        </div>

        {/* 风险提示 */}
        <section
          className="rounded-2xl border p-5"
          style={{
            borderColor: `${pest.accentColor}55`,
            background: `${pest.accentColor}11`,
          }}
        >
          <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-cream">
            <ShieldAlert className="h-5 w-5" style={{ color: pest.accentColor }} />
            风险提示与人工确认
          </h2>
          <p className="text-sm leading-relaxed text-cream/70">
            {pest.riskNote}
          </p>
          <div className="mt-4 rounded-lg bg-soil-900/40 p-3 text-xs text-cream/60">
            本工具定位为农户的辅助判断入口，不替代专业农技人员诊断。
            严重病害、大面积传播或用药不确定时，请及时联系当地农技人员或正规农资服务点确认。
          </div>
        </section>

        {/* 底部操作 */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/scan" className="btn-secondary flex-1">
            再识别一张
          </Link>
          <Link to="/history" className="btn-primary flex-1">
            查看历史记录
          </Link>
        </div>
      </div>
    </div>
  );
}
