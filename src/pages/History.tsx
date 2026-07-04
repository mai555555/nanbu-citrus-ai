// 历史记录页：识别记录列表 + 按病虫害筛选
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  History,
  Filter,
  Trash2,
  MapPin,
  Camera,
  ChevronRight,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useScanStore } from "@/store/useScanStore";
import { PESTS, PEST_MAP } from "@/data/pests";

export default function HistoryPage() {
  const { records, removeRecord, clearRecords } = useScanStore();
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return records;
    return records.filter((r) => r.pestId === filter);
  }, [records, filter]);

  // 趋势提示：最近 3 条记录中同一病虫害出现 2 次以上
  const trendAlert = useMemo(() => {
    if (records.length < 2) return null;
    const recent = records.slice(0, 3);
    const counts: Record<string, number> = {};
    recent.forEach((r) => {
      counts[r.pestId] = (counts[r.pestId] ?? 0) + 1;
    });
    for (const [pestId, count] of Object.entries(counts)) {
      if (count >= 2) {
        const pest = PEST_MAP[pestId];
        if (pest) {
          return {
            pest,
            count,
            message:
              count >= 3
                ? `近期连续 ${count} 次识别到${pest.name}，建议立即整园排查并联系农技人员`
                : `近期多次识别到${pest.name}（${count} 次），建议重点排查果园`,
          };
        }
      }
    }
    return null;
  }, [records]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = Date.now();
    const diff = now - ts;
    const day = 24 * 60 * 60 * 1000;
    if (diff < day) {
      return `${d.getHours().toString().padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
    if (diff < 7 * day) {
      return `${Math.floor(diff / day)} 天前`;
    }
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  };

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* 标题 */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl text-cream sm:text-4xl">
              历史记录
            </h1>
            <p className="mt-1 text-sm text-cream/60">
              共 {records.length} 条识别记录
            </p>
          </div>
          {records.length > 0 && (
            <button
              onClick={() => {
                if (confirm("确定清空所有历史记录？")) clearRecords();
              }}
              className="btn-ghost text-xs text-red-400/80 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              清空
            </button>
          )}
        </div>

        {/* 筛选 */}
        {records.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-cream/50">
              <Filter className="h-3.5 w-3.5" />
              筛选：
            </div>
            <button
              onClick={() => setFilter("all")}
              className={`chip transition-colors ${
                filter === "all"
                  ? "bg-citrus-500 text-soil-900"
                  : "bg-white/5 text-cream/70 hover:bg-white/10"
              }`}
            >
              全部
            </button>
            {PESTS.map((p) => {
              const count = records.filter((r) => r.pestId === p.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={p.id}
                  onClick={() => setFilter(p.id)}
                  className={`chip transition-colors ${
                    filter === p.id
                      ? "text-soil-900"
                      : "bg-white/5 text-cream/70 hover:bg-white/10"
                  }`}
                  style={
                    filter === p.id
                      ? { background: p.accentColor }
                      : undefined
                  }
                >
                  {p.name} · {count}
                </button>
              );
            })}
          </div>
        )}

        {/* 趋势提示 */}
        {trendAlert && (
          <div
            className="mb-5 flex items-start gap-3 rounded-2xl border p-4"
            style={{
              borderColor:
                trendAlert.count >= 3 ? "#DC262655" : "#F59E0B55",
              background:
                trendAlert.count >= 3 ? "#DC262611" : "#F59E0B11",
            }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  trendAlert.count >= 3 ? "#DC262622" : "#F59E0B22",
              }}
            >
              {trendAlert.count >= 3 ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : (
                <TrendingUp className="h-5 w-5 text-amber-400" />
              )}
            </div>
            <div className="flex-1">
              <p
                className="text-sm font-medium"
                style={{
                  color:
                    trendAlert.count >= 3 ? "#FCA5A5" : "#FCD34D",
                }}
              >
                趋势预警
              </p>
              <p className="mt-1 text-sm text-cream/80">
                {trendAlert.message}
              </p>
              <Link
                to={`/advice/${trendAlert.pest.id}`}
                className="mt-2 inline-flex items-center gap-1 text-xs text-citrus-300 hover:text-citrus-200"
              >
                查看{trendAlert.pest.name}防治建议
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}

        {/* 列表 */}
        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <History className="h-8 w-8 text-cream/30" />
            </div>
            <div>
              <p className="text-cream/70">还没有识别记录</p>
              <p className="mt-1 text-xs text-cream/40">
                去拍一张照片，开始第一次识别吧
              </p>
            </div>
            <Link to="/scan" className="btn-primary">
              <Camera className="h-4 w-4" />
              开始识别
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r, i) => {
              const pest = PEST_MAP[r.pestId];
              return (
                <div
                  key={r.id}
                  className="card flex items-center gap-4 py-4 animate-fade-up"
                  style={{ animationDelay: `${0.04 * i}s` }}
                >
                  {/* 缩略图 */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-soil-900">
                    {r.thumbnail ? (
                      <img
                        src={r.thumbnail}
                        alt={r.pestName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Camera className="h-6 w-6 text-cream/30" />
                      </div>
                    )}
                  </div>

                  {/* 信息 */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: pest?.accentColor }}
                      />
                      <span className="font-display text-lg text-cream">
                        {r.pestName}
                      </span>
                      <span className="text-xs text-cream/40">
                        {r.category}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-cream/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatTime(r.createdAt)}
                      </span>
                      {r.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {r.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 置信度 */}
                  <div className="shrink-0 text-right">
                    <div
                      className={`font-mono text-lg font-bold ${
                        r.confidence >= 80
                          ? "text-leaf-400"
                          : r.confidence >= 60
                          ? "text-citrus-300"
                          : "text-red-400"
                      }`}
                    >
                      {r.confidence}%
                    </div>
                    <div className="text-[10px] text-cream/40">置信度</div>
                  </div>

                  {/* 操作 */}
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      to={`/advice/${r.pestId}`}
                      className="rounded-lg p-2 text-cream/50 transition-colors hover:bg-white/5 hover:text-citrus-300"
                      title="查看防治参考"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => removeRecord(r.id)}
                      className="rounded-lg p-2 text-cream/50 transition-colors hover:bg-white/5 hover:text-red-400"
                      title="删除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
