// 置信度环形进度条（SVG 实现 + 动画填充）
import { useEffect, useState } from "react";

interface Props {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label?: string;
}

export default function ConfidenceRing({
  value,
  size = 140,
  stroke = 12,
  label = "置信度",
}: Props) {
  const [display, setDisplay] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));

  // 颜色根据置信度区间
  const color =
    clamped >= 80 ? "#16A34A" : clamped >= 60 ? "#F59E0B" : "#DC2626";

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1100;
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(clamped * eased);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [clamped]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke 0.4s ease",
            filter: `drop-shadow(0 0 6px ${color}66)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-mono text-3xl font-bold"
          style={{ color }}
        >
          {Math.round(display)}%
        </span>
        <span className="mt-0.5 text-xs text-cream/60">{label}</span>
      </div>
    </div>
  );
}
