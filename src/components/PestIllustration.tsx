// 柑橘病虫害简化 SVG 插画组件
import type { IllustrationKey } from "@/data/pests";

interface Props {
  type: IllustrationKey;
  className?: string;
}

export default function PestIllustration({ type, className }: Props) {
  const common = className ?? "w-full h-full";

  switch (type) {
    case "spider":
      return (
        <svg viewBox="0 0 120 120" className={common} fill="none">
          {/* 叶片背景 */}
          <path
            d="M20 60 Q60 20 100 60 Q60 100 20 60 Z"
            fill="#1F3D17"
            stroke="#16A34A"
            strokeWidth="1.5"
          />
          <path d="M30 60 L90 60" stroke="#0a1f05" strokeWidth="1" opacity="0.6" />
          {/* 失绿斑点 */}
          <g fill="#d4d4b8" opacity="0.85">
            <circle cx="40" cy="48" r="1.6" />
            <circle cx="55" cy="42" r="1.6" />
            <circle cx="70" cy="48" r="1.6" />
            <circle cx="85" cy="50" r="1.6" />
            <circle cx="45" cy="60" r="1.6" />
            <circle cx="60" cy="58" r="1.6" />
            <circle cx="75" cy="62" r="1.6" />
            <circle cx="42" cy="72" r="1.6" />
            <circle cx="58" cy="74" r="1.6" />
            <circle cx="72" cy="72" r="1.6" />
            <circle cx="86" cy="70" r="1.6" />
          </g>
          {/* 红蜘蛛虫体 */}
          <g fill="#DC2626">
            <circle cx="55" cy="60" r="2.4" />
            <circle cx="70" cy="55" r="2" />
            <circle cx="80" cy="65" r="2.2" />
          </g>
          {/* 蜘蛛腿 */}
          <g stroke="#DC2626" strokeWidth="0.8" strokeLinecap="round">
            <path d="M55 60 L50 56" />
            <path d="M55 60 L50 64" />
            <path d="M70 55 L66 51" />
            <path d="M70 55 L74 51" />
          </g>
        </svg>
      );
    case "anthracnose":
      return (
        <svg viewBox="0 0 120 120" className={common} fill="none">
          <path
            d="M20 60 Q60 20 100 60 Q60 100 20 60 Z"
            fill="#1F3D17"
            stroke="#16A34A"
            strokeWidth="1.5"
          />
          <path d="M30 60 L90 60" stroke="#0a1f05" strokeWidth="1" opacity="0.6" />
          {/* 病斑1 */}
          <g>
            <circle cx="55" cy="55" r="14" fill="#8a6d3b" stroke="#5c3a1a" strokeWidth="2" />
            <circle cx="55" cy="55" r="9" fill="#c9b88a" />
            <circle cx="55" cy="55" r="5" fill="#5c3a1a" />
            <circle cx="55" cy="55" r="2" fill="#2a1a08" />
          </g>
          {/* 病斑2 */}
          <g>
            <circle cx="75" cy="68" r="8" fill="#8a6d3b" stroke="#5c3a1a" strokeWidth="1.5" />
            <circle cx="75" cy="68" r="4" fill="#5c3a1a" />
          </g>
          {/* 孢子 */}
          <g fill="#f97316">
            <circle cx="52" cy="52" r="0.8" />
            <circle cx="58" cy="56" r="0.8" />
            <circle cx="55" cy="50" r="0.8" />
          </g>
        </svg>
      );
    case "leafminer":
      return (
        <svg viewBox="0 0 120 120" className={common} fill="none">
          <path
            d="M20 60 Q60 20 100 60 Q60 100 20 60 Z"
            fill="#2a5320"
            stroke="#16A34A"
            strokeWidth="1.5"
          />
          <path d="M30 60 L90 60" stroke="#0a1f05" strokeWidth="1" opacity="0.6" />
          {/* 银白虫道 */}
          <path
            d="M35 65 Q45 50 55 60 Q65 70 75 50 Q85 35 80 65"
            fill="none"
            stroke="#e5e5cc"
            strokeWidth="2"
            opacity="0.9"
          />
          <path
            d="M40 75 Q50 70 60 78"
            fill="none"
            stroke="#e5e5cc"
            strokeWidth="1.5"
            opacity="0.7"
          />
          {/* 末端蛹 */}
          <circle cx="80" cy="65" r="2" fill="#1a1a1a" />
        </svg>
      );
    case "canker":
      case "scaleInsect":
      case "rustMite":
      case "footRot":
      case "gummosis":
        // 新增的 4 种病虫害使用简化插画样式
        return (
          <svg viewBox="0 0 120 120" className={common} fill="none">
            <path
              d="M20 60 Q60 20 100 60 Q60 100 20 60 Z"
              fill="#1F3D17"
              stroke="#16A34A"
              strokeWidth="1.5"
            />
            <path d="M30 60 L90 60" stroke="#0a1f05" strokeWidth="1" opacity="0.6" />
            {/* 病斑标记 */}
            <circle cx="50" cy="55" r="12" fill={type === "scaleInsect" ? "#5a4a3a" : type === "rustMite" ? "#b8860b" : type === "footRot" ? "#3a2815" : "#6b4423"} opacity="0.8" />
            <circle cx="70" cy="68" r="8" fill={type === "scaleInsect" ? "#4a3a2a" : type === "rustMite" ? "#a07008" : type === "footRot" ? "#2a1810" : "#5c3a1a"} opacity="0.7" />
            {/* 病斑中心 */}
            <circle cx="50" cy="55" r="5" fill={type === "scaleInsect" ? "#3a2a1a" : type === "rustMite" ? "#8b5a05" : type === "footRot" ? "#1a1008" : "#2a1808"} />
            <circle cx="70" cy="68" r="3" fill={type === "scaleInsect" ? "#2a1a0a" : type === "rustMite" ? "#7a4a04" : type === "footRot" ? "#0a0604" : "#1a1006"} />
            {/* 边缘标记 */}
            <circle cx="50" cy="55" r="15" fill="none" stroke={type === "gummosis" ? "#A16207" : type === "footRot" ? "#DC2626" : type === "rustMite" ? "#D97706" : "#8B5CF6"} strokeWidth="1" opacity="0.4" />
          </svg>
        );
    default:
      return null;
  }
}
