// 首页：Hero、拍照入口、常见病虫害卡片、公益承诺
import { Link } from "react-router-dom";
import {
  Camera,
  ChevronRight,
  Leaf,
  Heart,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Wrench,
} from "lucide-react";
import { PESTS } from "@/data/pests";
import PestIllustration from "@/components/PestIllustration";
import PhoneMockup from "@/components/PhoneMockup";
import PhoneDemoLoop from "@/components/PhoneDemoLoop";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-citrus-radial" />
        <div className="grain-overlay absolute inset-0" />
        {/* 浮动叶片装饰 */}
        <div className="pointer-events-none absolute -left-10 top-20 animate-float-leaf opacity-30">
          <Leaf className="h-24 w-24 text-leaf-500" />
        </div>
        <div
          className="pointer-events-none absolute right-10 top-40 animate-float-leaf opacity-20"
          style={{ animationDelay: "1.5s" }}
        >
          <Leaf className="h-16 w-16 text-citrus-400" />
        </div>

        <div className="container relative py-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* 左：文案 */}
            <div className="text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-citrus-500/30 bg-citrus-500/10 px-4 py-1.5 text-xs text-citrus-200 animate-fade-up">
                <Sparkles className="h-3.5 w-3.5" />
                TRAE 公益 AI 创意 · 南部县柑橘
              </div>
              <h1
                className="font-display text-4xl leading-tight text-cream sm:text-6xl animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                把 AI 装进农民的
                <span className="bg-gradient-to-r from-citrus-300 to-citrus-500 bg-clip-text text-transparent">
                  口袋
                </span>
                里
              </h1>
              <p
                className="mx-auto mt-6 max-w-xl text-base text-cream/70 sm:text-lg lg:mx-0 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                一张病叶照片，变成看得懂的初步判断和处理方向。
                让南部县柑橘农户遇到红蜘蛛、炭疽病、潜叶蛾、溃疡病时，
                少花冤枉钱，少错过防治期。
              </p>
              <div
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <Link to="/scan" className="btn-primary w-full sm:w-auto">
                  <Camera className="h-5 w-5" />
                  拍照识别病虫害
                </Link>
                <Link to="/about" className="btn-secondary w-full sm:w-auto">
                  了解项目初心
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* 关键指标 */}
              <div
                className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 animate-fade-up lg:mx-0"
                style={{ animationDelay: "0.4s" }}
              >
                {[
                  { num: "4", label: "常见病虫害" },
                  { num: "100%", label: "基础功能免费" },
                  { num: "0", label: "使用门槛" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-soil-800/40 px-3 py-4 backdrop-blur-sm"
                  >
                    <div className="font-mono text-xl font-bold text-citrus-300 sm:text-2xl">
                      {s.num}
                    </div>
                    <div className="mt-1 text-[11px] text-cream/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右：手机演示 */}
            <div
              className="relative flex justify-center animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              {/* 装饰光晕 */}
              <div className="pointer-events-none absolute inset-0 bg-citrus-radial opacity-60" />
              {/* 标签气泡 */}
              <div className="absolute -left-2 top-12 z-20 hidden rotate-[-6deg] rounded-xl border border-citrus-500/40 bg-soil-800/90 px-3 py-1.5 text-xs text-citrus-200 shadow-card backdrop-blur-sm sm:block">
                微信小程序 · 即开即用
              </div>
              <div className="absolute -right-2 bottom-24 z-20 hidden rotate-[5deg] rounded-xl border border-leaf-500/40 bg-soil-800/90 px-3 py-1.5 text-xs text-leaf-300 shadow-card backdrop-blur-sm sm:block">
                公益免费 · 长期开放
              </div>
              <PhoneMockup>
                <PhoneDemoLoop />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* 三步使用流程 */}
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h2 className="section-title">三步就能用</h2>
          <p className="mt-2 text-sm text-cream/60">
            农户不用学复杂流程，打开微信就能开始
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "发现异常",
              desc: "果园里看到叶片发黄、卷曲、斑点、虫洞或果面异常。",
              icon: Leaf,
            },
            {
              step: "02",
              title: "拍照上传",
              desc: "打开小程序，拍摄清晰照片并提交识别。",
              icon: Camera,
            },
            {
              step: "03",
              title: "获得参考",
              desc: "返回可能病虫害、识别依据、防治方向和用药注意事项。",
              icon: Sparkles,
            },
          ].map((s, i) => (
            <div
              key={s.step}
              className="card relative animate-fade-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="absolute right-5 top-5 font-mono text-4xl font-bold text-white/5">
                {s.step}
              </div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-citrus-500/15 text-citrus-300">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-cream">{s.title}</h3>
              <p className="mt-2 text-sm text-cream/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 常见病虫害卡片 */}
      <section className="container py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="section-title">南部县常见柑橘病虫害</h2>
            <p className="mt-2 text-sm text-cream/60">
              点击卡片查看示例识别结果与防治参考
            </p>
          </div>
          <Link
            to="/scan"
            className="hidden items-center gap-1 text-sm text-citrus-300 hover:text-citrus-200 sm:flex"
          >
            开始识别 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PESTS.map((pest, i) => (
            <Link
              key={pest.id}
              to={`/advice/${pest.id}`}
              className="card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-citrus-500/40 animate-fade-up"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: pest.accentColor }}
              />
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-soil-700 to-soil-900">
                <PestIllustration
                  type={pest.illustration}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg text-cream">{pest.name}</h3>
                <span
                  className="chip"
                  style={{
                    background: `${pest.accentColor}22`,
                    color: pest.accentColor,
                  }}
                >
                  {pest.category}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-cream/60">
                {pest.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-citrus-300">
                查看防治参考 <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 产品核心四要素 */}
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h2 className="section-title">AI 负责判断，TRAE 负责把想法快速变成工具</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Sparkles,
              title: "AI 辅助识别",
              desc: "接入适合农业图像识别场景的多模态视觉模型，结合本地样本优化 Prompt。",
              color: "text-citrus-300",
            },
            {
              icon: Wrench,
              title: "TRAE 极速开发",
              desc: "用 TRAE IDE 推进前端页面、后端接口、模型调用与异常处理。",
              color: "text-leaf-400",
            },
            {
              icon: Smartphone,
              title: "手机即用",
              desc: "通过微信小程序降低门槛，农户不用安装复杂软件。",
              color: "text-citrus-300",
            },
            {
              icon: Heart,
              title: "公益属性",
              desc: "基础识别功能长期免费开放，让农户也能用上 AI。",
              color: "text-leaf-400",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="card animate-fade-up"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <f.icon className={`mb-3 h-7 w-7 ${f.color}`} />
              <h3 className="font-display text-lg text-cream">{f.title}</h3>
              <p className="mt-2 text-sm text-cream/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 公益承诺 */}
      <section className="container py-12">
        <div className="relative overflow-hidden rounded-3xl border border-citrus-500/30 bg-gradient-to-br from-citrus-500/10 via-soil-800/60 to-leaf-500/10 p-8 sm:p-12">
          <div className="grain-overlay absolute inset-0" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-leaf-500/15 px-3 py-1 text-xs text-leaf-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                公益承诺
              </div>
              <h2 className="font-display text-2xl text-cream sm:text-3xl">
                基础识别功能长期免费面向农民开放
              </h2>
              <p className="mt-3 text-sm text-cream/70">
                让 AI 更接地气，把技术能力变成农户能马上打开、马上使用的帮助。
                不把技术门槛挡在田埂外。
              </p>
            </div>
            <Link to="/scan" className="btn-primary shrink-0">
              <Camera className="h-5 w-5" />
              立即体验识别
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
