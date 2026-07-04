// 数据看板页：统计卡片 + 病虫害占比饼图 + 近7天趋势
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Bug,
  TrendingUp,
  PieChart as PieIcon,
  Leaf,
  AlertCircle,
  CalendarClock,
  ChevronRight,
} from "lucide-react";
import { useScanStore } from "@/store/useScanStore";
import { PESTS, PEST_MAP } from "@/data/pests";
import { getSeasonAlerts, getCurrentMonthLabel } from "@/utils/season";

export default function Dashboard() {
  const records = useScanStore((s) => s.records);

  const stats = useMemo(() => {
    const total = records.length;
    const byPest = PESTS.map((p) => ({
      pest: p,
      count: records.filter((r) => r.pestId === p.id).length,
    })).filter((x) => x.count > 0);

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const weekAgo = now - 7 * day;
    const weekNew = records.filter((r) => r.createdAt >= weekAgo).length;

    // 近 7 天每日计数
    const daily = Array.from({ length: 7 }).map((_, i) => {
      const start = now - (6 - i) * day;
      const startDay = new Date(start);
      startDay.setHours(0, 0, 0, 0);
      const end = startDay.getTime() + day;
      const count = records.filter(
        (r) => r.createdAt >= startDay.getTime() && r.createdAt < end
      ).length;
      return {
        label: `${startDay.getMonth() + 1}/${startDay.getDate()}`,
        count,
      };
    });

    const avgConfidence = total
      ? Math.round(
          records.reduce((s, r) => s + r.confidence, 0) / total
        )
      : 0;

    return { total, byPest, weekNew, daily, avgConfidence };
  }, [records]);

  const cards = [
    {
      label: "累计识别",
      value: stats.total,
      icon: Camera,
      color: "text-citrus-300",
    },
    {
      label: "覆盖病虫害",
      value: stats.byPest.length,
      suffix: "种",
      icon: Bug,
      color: "text-leaf-400",
    },
    {
      label: "本周新增",
      value: stats.weekNew,
      icon: TrendingUp,
      color: "text-citrus-300",
    },
    {
      label: "平均置信度",
      value: stats.avgConfidence,
      suffix: "%",
      icon: Leaf,
      color: "text-leaf-400",
    },
  ];

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* 标题 */}
        <div className="mb-6">
          <h1 className="font-display text-3xl text-cream sm:text-4xl">
            数据看板
          </h1>
          <p className="mt-1 text-sm text-cream/60">
            基于历史识别记录的统计与趋势 · Demo 数据
          </p>
        </div>

        {/* 季节性预警 */}
        <section className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-citrus-300" />
            <h2 className="text-sm font-medium text-cream">
              {getCurrentMonthLabel()} 季节性预警
            </h2>
            <span className="text-xs text-cream/40">
              根据高发期自动提示
            </span>
          </div>
          <SeasonalAlerts />
        </section>

        {/* 统计卡片 */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className="card animate-fade-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <c.icon className={`mb-3 h-6 w-6 ${c.color}`} />
              <div className="font-mono text-3xl font-bold text-cream">
                {c.value}
                {c.suffix && (
                  <span className="text-base text-cream/50">{c.suffix}</span>
                )}
              </div>
              <div className="mt-1 text-xs text-cream/50">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* 饼图：病虫害占比 */}
          <div className="card">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-cream">
              <PieIcon className="h-5 w-5 text-citrus-300" />
              病虫害识别占比
            </h3>
            <PieChart data={stats.byPest} total={stats.total} />
          </div>

          {/* 趋势图：近7天 */}
          <div className="card">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-cream">
              <TrendingUp className="h-5 w-5 text-citrus-300" />
              近 7 天识别趋势
            </h3>
            <TrendChart data={stats.daily} />
          </div>
        </div>

        {/* 病虫害分布详情 */}
        <div className="card mt-5">
          <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-cream">
            <Bug className="h-5 w-5 text-citrus-300" />
            病虫害分布详情
          </h3>
          {stats.byPest.length === 0 ? (
            <p className="py-8 text-center text-sm text-cream/40">
              暂无识别记录
            </p>
          ) : (
            <div className="space-y-3">
              {stats.byPest
                .sort((a, b) => b.count - a.count)
                .map(({ pest, count }) => {
                  const pct = stats.total
                    ? Math.round((count / stats.total) * 100)
                    : 0;
                  return (
                    <Link
                      key={pest.id}
                      to={`/advice/${pest.id}`}
                      className="block rounded-lg p-2 transition-colors hover:bg-white/5"
                    >
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-cream">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: pest.accentColor }}
                          />
                          {pest.name}
                          <span className="text-xs text-cream/40">
                            {pest.category}
                          </span>
                        </span>
                        <span className="font-mono text-cream/60">
                          {count} 次 · {pct}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: pest.accentColor,
                          }}
                        />
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>

        {/* 提示 */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-citrus-500/20 bg-citrus-500/5 p-4 text-sm text-cream/60">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-citrus-300" />
          <div>
            <p className="text-cream/80">
              后续若接入县农业局或园区数据看板，可更早发现病虫害高发区域。
            </p>
            <p className="mt-1 text-xs text-cream/50">
              当前 Demo 数据来自本地历史记录，含首次访问注入的示例数据。每次识别都会自动汇总到这里。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// SVG 饼图
function PieChart({
  data,
  total,
}: {
  data: { pest: (typeof PESTS)[number]; count: number }[];
  total: number;
}) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const innerR = 38;

  let acc = 0;
  const arcs = data.map(({ pest, count }) => {
    const startAngle = (acc / total) * 2 * Math.PI - Math.PI / 2;
    acc += count;
    const endAngle = (acc / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const xi1 = cx + innerR * Math.cos(startAngle);
    const yi1 = cy + innerR * Math.sin(startAngle);
    const xi2 = cx + innerR * Math.cos(endAngle);
    const yi2 = cy + innerR * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const path = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${xi2} ${yi2}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi1} ${yi1}`,
      "Z",
    ].join(" ");
    return { path, color: pest.accentColor, pest, count };
  });

  if (total === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-cream/40">
        暂无数据
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((a, i) => (
          <path
            key={i}
            d={a.path}
            fill={a.color}
            opacity={0.85}
            className="transition-opacity hover:opacity-100"
          >
            <title>
              {a.pest.name}: {a.count} 次
            </title>
          </path>
        ))}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-cream font-mono text-lg font-bold"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          className="fill-cream/50 text-[8px]"
        >
          总识别
        </text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {arcs.map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: a.color }}
            />
            <span className="text-cream/80">{a.pest.name}</span>
            <span className="font-mono text-cream/40">{a.count} 次</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// SVG 折线/柱状趋势图
function TrendChart({
  data,
}: {
  data: { label: string; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const width = 320;
  const height = 180;
  const padding = { top: 16, right: 16, bottom: 28, left: 28 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const stepX = chartW / (data.length - 1 || 1);

  const points = data.map((d, i) => ({
    x: padding.left + i * stepX,
    y: padding.top + chartH - (d.count / max) * chartH,
    ...d,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath =
    `M ${points[0].x} ${padding.top + chartH} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x} ${padding.top + chartH} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[320px]"
      >
        <defs>
          <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* 网格线 */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <line
            key={p}
            x1={padding.left}
            y1={padding.top + chartH * p}
            x2={padding.left + chartW}
            y2={padding.top + chartH * p}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}
        {/* 区域 */}
        <path d={areaPath} fill="url(#trendArea)" />
        {/* 折线 */}
        <path
          d={linePath}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 数据点 */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#1C1410"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              className="fill-citrus-200 font-mono text-[9px]"
            >
              {p.count}
            </text>
            <text
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              className="fill-cream/40 text-[8px]"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// 季节性预警组件
function SeasonalAlerts() {
  const alerts = getSeasonAlerts();

  if (alerts.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-leaf-500/30 bg-leaf-500/5 p-4">
        <Leaf className="h-5 w-5 text-leaf-400" />
        <p className="text-sm text-cream/70">
          当前月份暂无高发病虫害预警，可持续监测果园状态
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {alerts.map((alert) => (
        <Link
          key={alert.pest.id}
          to={`/advice/${alert.pest.id}`}
          className="group flex items-start gap-3 rounded-2xl border p-4 transition-colors hover:bg-white/5"
          style={{
            borderColor: `${alert.pest.accentColor}40`,
            background: `${alert.pest.accentColor}08`,
          }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: `${alert.pest.accentColor}22` }}
          >
            <AlertCircle
              className="h-5 w-5"
              style={{ color: alert.pest.accentColor }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span
                className="font-display text-base"
                style={{ color: alert.pest.accentColor }}
              >
                {alert.pest.name}
              </span>
              <span className="text-xs text-cream/50">
                · {alert.pest.season}
              </span>
            </div>
            <p className="mt-1 text-xs text-cream/70">{alert.message}</p>
          </div>
          <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-cream/30 group-hover:text-cream/60" />
        </Link>
      ))}
    </div>
  );
}
