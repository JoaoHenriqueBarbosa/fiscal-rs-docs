"use client";

import { BenchmarkBarChart, BenchmarkSpeedupChart } from "./benchmark-chart";

// Raw benchmark results (Docker: 1 CPU, 512MB RAM)
const RAW_DATA = {
  rust: [
    { name: "format_cents_2", ns_per_op: 72.3 },
    { name: "format_rate_4", ns_per_op: 124.9 },
    { name: "escape_xml_clean", ns_per_op: 39.7 },
    { name: "escape_xml_dirty", ns_per_op: 87.0 },
    { name: "tag_simple_text", ns_per_op: 121.6 },
    { name: "get_state_code", ns_per_op: 14.8 },
    { name: "tag_nested_invoice_item", ns_per_op: 3033.0 },
    { name: "serialize_icms00", ns_per_op: 828.9 },
    { name: "create_icms_totals", ns_per_op: 0.2 },
    { name: "merge_icms_totals_10", ns_per_op: 12.8 },
    { name: "invoice_builder_simple", ns_per_op: 26719.8 },
    { name: "sign_xml", ns_per_op: 996029.3 },
  ],
  bun: [
    { name: "format_cents_2", ns_per_op: 69.7 },
    { name: "format_rate_4", ns_per_op: 59.6 },
    { name: "escape_xml_clean", ns_per_op: 110.5 },
    { name: "escape_xml_dirty", ns_per_op: 3.5 },
    { name: "tag_simple_text", ns_per_op: 223.8 },
    { name: "get_state_code", ns_per_op: 3.7 },
    { name: "tag_nested_invoice_item", ns_per_op: 6969.3 },
    { name: "serialize_icms00", ns_per_op: 1021.4 },
    { name: "create_icms_totals", ns_per_op: 3.8 },
    { name: "merge_icms_totals_10", ns_per_op: 60.9 },
    { name: "invoice_builder_simple", ns_per_op: 49223.4 },
    { name: "sign_xml", ns_per_op: 1917283.8 },
  ],
  php: [
    { name: "format_cents_2", ns_per_op: 178.0 },
    { name: "format_rate_4", ns_per_op: 64.2 },
    { name: "escape_xml_clean", ns_per_op: 124.0 },
    { name: "escape_xml_dirty", ns_per_op: 154.4 },
    { name: "tag_simple_text", ns_per_op: 1038.9 },
    { name: "get_state_code", ns_per_op: 267.8 },
    { name: "tag_nested_invoice_item", ns_per_op: 9678.4 },
    { name: "serialize_icms00", ns_per_op: 3325.4 },
    { name: "create_icms_totals", ns_per_op: 255.4 },
    { name: "merge_icms_totals_10", ns_per_op: 400.4 },
    { name: "invoice_builder_simple", ns_per_op: 426999.3 },
    { name: "sign_xml", ns_per_op: 3411058.3 },
  ],
};

const COMMON_NAMES = RAW_DATA.rust.map((r) => r.name);

function buildChartData() {
  return COMMON_NAMES.map((name) => ({
    name: name.replace(/_/g, " "),
    rust: RAW_DATA.rust.find((r) => r.name === name)?.ns_per_op ?? 0,
    bun: RAW_DATA.bun.find((r) => r.name === name)?.ns_per_op ?? 0,
    php: RAW_DATA.php.find((r) => r.name === name)?.ns_per_op ?? 0,
  }));
}

function buildSpeedupData() {
  return COMMON_NAMES.filter((name) => {
    const r = RAW_DATA.rust.find((x) => x.name === name)?.ns_per_op ?? 0;
    const b = RAW_DATA.bun.find((x) => x.name === name)?.ns_per_op ?? 0;
    // Only show where Rust is actually faster
    return r > 0 && b > 0 && b / r > 1;
  }).map((name) => {
    const r = RAW_DATA.rust.find((x) => x.name === name)!.ns_per_op;
    const b = RAW_DATA.bun.find((x) => x.name === name)!.ns_per_op;
    const p = RAW_DATA.php.find((x) => x.name === name)!.ns_per_op;
    return {
      name: name.replace(/_/g, " "),
      vsBun: Math.round((b / r) * 10) / 10,
      vsPHP: Math.round((p / r) * 10) / 10,
    };
  });
}

export function BenchmarkFastOps() {
  const data = buildChartData().filter((d) => d.rust < 200);
  return <BenchmarkBarChart data={data} title="Operações rápidas (< 200 ns)" />;
}

export function BenchmarkMediumOps() {
  const data = buildChartData().filter((d) => d.rust >= 200 && d.rust < 50000);
  return <BenchmarkBarChart data={data} title="Operações médias (200 ns — 50 µs)" />;
}

export function BenchmarkHeavyOps() {
  const data = buildChartData().filter((d) => d.rust >= 50000);
  return <BenchmarkBarChart data={data} title="Operações pesadas (> 50 µs)" />;
}

export function BenchmarkSpeedup() {
  const data = buildSpeedupData();
  return <BenchmarkSpeedupChart data={data} title="Speedup do Rust (onde Rust é mais rápido)" />;
}
