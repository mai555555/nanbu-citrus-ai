// 关于页：项目初心、与 TRAE 结合、使用边界、公益承诺
import { Link } from "react-router-dom";
import {
  Heart,
  ShieldCheck,
  Wrench,
  Code2,
  MessagesSquare,
  ClipboardList,
  RefreshCw,
  Camera,
  Sparkles,
  HandHeart,
  Users,
  TrendingDown,
  Database,
  Lightbulb,
  Globe,
} from "lucide-react";

const TRAE_STEPS = [
  {
    icon: Code2,
    title: "Builder 模式生成代码",
    desc: "直接描述\"拍照上传、结果展示、历史记录\"等页面和功能需求，让 TRAE Builder 辅助生成 WXML、WXSS、JS 以及后端接口代码，再根据实际运行情况继续修改。",
  },
  {
    icon: MessagesSquare,
    title: "AI 问答帮助调试",
    desc: "遇到图像上传失败、接口返回格式不一致、识别结果解析、异常提示和页面状态更新等问题，都可以在 TRAE 中边问边改，减少重复试错。",
  },
  {
    icon: ClipboardList,
    title: "TRAE Work 管理过程",
    desc: "用 TRAE Work 整理需求文档、用户调研问卷、开发任务拆解和迭代记录，把一个公益想法变成可推进的产品计划。",
  },
  {
    icon: RefreshCw,
    title: "快速响应农户反馈",
    desc: "如果农户反馈\"这个按钮看不懂\"或\"建议太专业\"，借助 AI 重构能力快速调整交互和文案，让试用反馈尽快变成产品改进。",
  },
];

const VALUES = [
  {
    icon: Users,
    title: "社会价值",
    desc: "把专业植保能力装进农民手机，缓解基层农技服务\"最后一公里\"的难题。",
  },
  {
    icon: TrendingDown,
    title: "经济价值",
    desc: "减少误诊误治带来的农药浪费和减产损失，帮农民少花冤枉钱、少打冤枉药。",
  },
  {
    icon: Database,
    title: "管理价值",
    desc: "后续接入数据看板，县农业局和园区管理者能更早发现病虫害高发区域。",
  },
  {
    icon: Lightbulb,
    title: "技术价值",
    desc: "证明 TRAE 能帮助个人开发者快速做出面向乡村场景的小工具，而不是只服务城市办公场景。",
  },
  {
    icon: Globe,
    title: "推广价值",
    desc: "一旦在南部县柑橘场景跑通，类似方法可以扩展到周边县区和其他经济作物。",
  },
  {
    icon: Heart,
    title: "公益价值",
    desc: "让 AI 更接地气，把技术能力变成农户能马上打开、马上使用的帮助。",
  },
];

export default function About() {
  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* 头部 */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-citrus-500/30 bg-citrus-500/10 px-4 py-1.5 text-xs text-citrus-200">
            <HandHeart className="h-3.5 w-3.5" />
            TRAE 公益 AI 创意
          </div>
          <h1 className="font-display text-3xl text-cream sm:text-5xl">
            把 AI 装进农民的口袋里
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">
            从一张病叶照片开始，让柑橘病虫害初步判断变得更及时、更容易看懂。
          </p>
        </div>

        {/* 创意初心 */}
        <section className="card mb-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl text-cream">
            <Sparkles className="h-6 w-6 text-citrus-300" />
            创意初心
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-cream/70">
            <p>
              果园里一片叶子发黄、一个果子长斑，对农户来说可能就是一整年收成的风险。
              我目前在<strong className="text-citrus-200">成都天工智序科技有限公司</strong>实习，
              虽然不是南部县本地人，但在接触当地产业和农户的过程中，
              我发现很多种柑橘的农户特别不容易。
            </p>
            <p>
              病虫害一来，大家常常只能凭经验判断，或者去问农资店。
              问不到专业人员时，药买了、也打了，但有时候没效果，甚至还可能错过最佳防治期。
              所以我想做一个农民揣在兜里就能用的小助手：
              对着异常叶片或果实拍一张照片，
              就能获得病虫害初步判断和防治参考。
            </p>
            <p className="border-l-2 border-citrus-500 pl-3 italic text-citrus-200">
              AI 不该只是城里人玩的工具，农民也应该用得上。
              趁着实习，把刚学到的技术和 TRAE 用起来，为农村办一点实事。
            </p>
          </div>
        </section>

        {/* 目标用户与痛点 */}
        <section className="card mb-6">
          <h2 className="mb-4 font-display text-2xl text-cream">目标用户与真实痛点</h2>
          <p className="mb-4 text-sm text-cream/70">
            这个工具首先服务<strong className="text-citrus-200">南部县柑橘种植户</strong>，
            尤其是缺乏专业植保知识的中老年农户，也面向基层农技推广员和柑橘产业园区管理者。
          </p>
          <div className="space-y-3">
            {[
              {
                num: "01",
                title: "不懂分辨",
                desc: "很多农户无法准确区分病害、虫害和药害，只能靠经验或农资店推荐判断，用药容易偏。",
              },
              {
                num: "02",
                title: "找人问太难",
                desc: "基层植保技术人员有限，难以及时跑到每个村、每片果园，农户最需要帮助时常常等不到人。",
              },
              {
                num: "03",
                title: "误判代价高",
                desc: "柑橘一年一季，错过最佳防治期，或者药打错了，可能带来减产、药害和额外成本。",
              },
            ].map((p) => (
              <div
                key={p.num}
                className="flex gap-4 rounded-xl bg-soil-900/40 p-4"
              >
                <div className="font-mono text-2xl font-bold text-citrus-500/60">
                  {p.num}
                </div>
                <div>
                  <h4 className="font-medium text-cream">{p.title}</h4>
                  <p className="mt-1 text-sm text-cream/60">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 与 TRAE 结合 */}
        <section className="mb-6">
          <div className="mb-5 text-center">
            <h2 className="font-display text-2xl text-cream sm:text-3xl">
              与 TRAE 的结合
            </h2>
            <p className="mt-2 text-sm text-cream/60">
              TRAE 是这个创意从 0 到 1 的关键助力
            </p>
          </div>
          <div className="relative">
            {/* 时间线竖线 */}
            <div className="absolute left-5 top-2 h-full w-px bg-gradient-to-b from-citrus-500/50 via-citrus-500/20 to-transparent sm:left-6" />
            <div className="space-y-4">
              {TRAE_STEPS.map((s, i) => (
                <div
                  key={s.title}
                  className="relative flex gap-4 animate-fade-up"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-citrus-400 to-citrus-600 shadow-citrus sm:h-12 sm:w-12">
                    <s.icon className="h-5 w-5 text-soil-900" />
                  </div>
                  <div className="flex-1 rounded-xl border border-white/10 bg-soil-800/60 p-4">
                    <h3 className="font-display text-lg text-cream">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream/60">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 创意价值 */}
        <section className="mb-6">
          <div className="mb-5">
            <h2 className="font-display text-2xl text-cream sm:text-3xl">
              创意价值
            </h2>
            <p className="mt-2 text-sm text-cream/60">
              它的价值不只在识别一张病叶照片
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="card animate-fade-up"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-citrus-500/15 text-citrus-300">
                    <v.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-cream">{v.title}</h3>
                    <p className="mt-1 text-sm text-cream/60">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 使用边界 */}
        <section className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
          <h2 className="mb-3 flex items-center gap-2 font-display text-xl text-cream">
            <ShieldCheck className="h-5 w-5 text-red-400" />
            使用边界
          </h2>
          <p className="text-sm leading-relaxed text-cream/70">
            工具定位为农户的<strong className="text-cream">辅助判断入口</strong>，
            不替代专业农技人员诊断。对于严重病害、大面积传播或用药不确定的情况，
            页面会提醒农户联系农技人员或正规农资服务点确认。
          </p>
        </section>

        {/* 公益承诺 */}
        <section className="mb-8 rounded-2xl border border-leaf-500/30 bg-gradient-to-br from-leaf-500/10 to-citrus-500/10 p-6 text-center">
          <Heart className="mx-auto mb-3 h-10 w-10 text-leaf-400" />
          <h2 className="font-display text-2xl text-cream">公益承诺</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cream/70">
            基础识别功能长期免费面向农民开放。
            让不会技术、没有专业资源的农户也能享受到 AI 工具带来的便利。
          </p>
          <p className="mt-3 text-sm italic text-citrus-200">
            "如果 AI 能帮城里人写代码、做方案，它也应该能帮农民看懂一片病叶。"
          </p>
        </section>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/scan" className="btn-primary flex-1">
            <Camera className="h-5 w-5" />
            立即体验识别
          </Link>
          <Link to="/dashboard" className="btn-secondary flex-1">
            <Wrench className="h-4 w-4" />
            查看数据看板
          </Link>
        </div>
      </div>
    </div>
  );
}
