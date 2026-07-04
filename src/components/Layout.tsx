// 顶部导航 + 底部页脚的布局包裹
import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Camera,
  History,
  BarChart3,
  Info,
  Leaf,
} from "lucide-react";

interface Props {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: "/", label: "首页", icon: Home },
  { to: "/scan", label: "拍照识别", icon: Camera },
  { to: "/history", label: "历史", icon: History },
  { to: "/dashboard", label: "看板", icon: BarChart3 },
  { to: "/about", label: "关于", icon: Info },
];

export default function Layout({ children }: Props) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-soil-900/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-citrus-400 to-citrus-600 shadow-citrus">
              <Leaf className="h-5 w-5 text-soil-900" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base text-cream">
                柑橘 AI 植保
              </div>
              <div className="text-[10px] text-cream/50">
                南部县公益 Demo
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-citrus-500/15 text-citrus-200"
                      : "text-cream/70 hover:bg-white/5 hover:text-cream"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/scan" className="btn-primary hidden !px-4 !py-2 text-sm md:inline-flex">
            <Camera className="h-4 w-4" />
            开始识别
          </Link>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      {/* 移动端底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-soil-900/95 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around px-2 py-1.5">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-2 text-[11px] transition-colors ${
                  active ? "text-citrus-300" : "text-cream/60"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 页脚 */}
      <footer className="hidden border-t border-white/5 bg-soil-900/60 py-8 text-center text-xs text-cream/40 md:block">
        <div className="container space-y-2">
          <p>
            南部县AI柑橘病虫害识别工具 · 公益 Demo · 用 TRAE 给农民做一个揣兜里的 AI 植保小助手
          </p>
          <p>
            本工具仅作辅助判断，不替代专业农技人员诊断 · 基础识别功能长期免费面向农民开放
          </p>
        </div>
      </footer>
    </div>
  );
}
