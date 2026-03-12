"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface BenchmarkEntry {
  name: string;
  rust: number;
  bun: number;
  php: number;
}

const COLORS = {
  rust: "#f74c00",
  bun: "#f5c542",
  php: "#7A86B8",
};

function formatNs(ns: number): string {
  if (ns >= 1_000_000) return `${(ns / 1_000_000).toFixed(1)}ms`;
  if (ns >= 1_000) return `${(ns / 1_000).toFixed(1)}µs`;
  return `${ns.toFixed(1)}ns`;
}

export function BenchmarkBarChart({
  data,
  title,
  logScale = false,
}: {
  data: BenchmarkEntry[];
  title: string;
  logScale?: boolean;
}) {
  return (
    <div className="my-8">
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <ResponsiveContainer width="100%" height={Math.max(300, data.length * 60)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            type="number"
            scale={logScale ? "log" : "auto"}
            domain={logScale ? ["auto", "auto"] : [0, "auto"]}
            tickFormatter={formatNs}
            stroke="#666"
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#666"
            tick={{ fontSize: 12 }}
            width={130}
          />
          <Tooltip
            formatter={(value: unknown, name: unknown) => [formatNs(value as number), String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
            contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Bar dataKey="rust" name="Rust" fill={COLORS.rust} radius={[0, 4, 4, 0]} />
          <Bar dataKey="bun" name="Bun" fill={COLORS.bun} radius={[0, 4, 4, 0]} />
          <Bar dataKey="php" name="PHP" fill={COLORS.php} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BenchmarkSpeedupChart({
  data,
  title,
}: {
  data: { name: string; vsBun: number; vsPHP: number }[];
  title: string;
}) {
  return (
    <div className="my-8">
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <ResponsiveContainer width="100%" height={Math.max(300, data.length * 50)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" stroke="#666" tickFormatter={(v) => `${v}x`} />
          <YAxis type="category" dataKey="name" stroke="#666" tick={{ fontSize: 12 }} width={130} />
          <Tooltip
            formatter={(value: unknown, name: unknown) => [`${(value as number).toFixed(1)}x mais rápido`, String(name)]}
            contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Bar dataKey="vsBun" name="Rust vs Bun" fill={COLORS.rust} radius={[0, 4, 4, 0]} />
          <Bar dataKey="vsPHP" name="Rust vs PHP" fill={COLORS.php} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
