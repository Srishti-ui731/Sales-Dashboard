import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

// ---- Sample data (exactly what your Postman call returned) ----
const SAMPLE = [
  {
    daily_metrics: [
      { order_date: "2026-05-01", no_of_sales: 23, total_revenue: 19980.5 },
      { order_date: "2026-05-02", no_of_sales: 28, total_revenue: 20654.1 },
      { order_date: "2026-05-03", no_of_sales: 12, total_revenue: 8888.11 },
      { order_date: "2026-05-04", no_of_sales: 29, total_revenue: 21161.8 },
      { order_date: "2026-05-05", no_of_sales: 31, total_revenue: 23525.3 },
      { order_date: "2026-05-06", no_of_sales: 12, total_revenue: 10566.3 },
      { order_date: "2026-05-07", no_of_sales: 13, total_revenue: 14167.3 },
      { order_date: "2026-05-08", no_of_sales: 28, total_revenue: 21654.4 },
      { order_date: "2026-05-09", no_of_sales: 45, total_revenue: 29907.3 },
      { order_date: "2026-05-10", no_of_sales: 33, total_revenue: 24565.5 },
      { order_date: "2026-05-11", no_of_sales: 34, total_revenue: 22671.2 },
      { order_date: "2026-05-12", no_of_sales: 45, total_revenue: 32900 },
      { order_date: "2026-05-13", no_of_sales: 26, total_revenue: 22055.4 },
      { order_date: "2026-05-14", no_of_sales: 31, total_revenue: 26763.1 },
      { order_date: "2026-05-15", no_of_sales: 48, total_revenue: 34810.2 },
      { order_date: "2026-05-16", no_of_sales: 43, total_revenue: 41202.6 },
      { order_date: "2026-05-17", no_of_sales: 28, total_revenue: 22494.6 },
      { order_date: "2026-05-18", no_of_sales: 24, total_revenue: 24895.7 },
      { order_date: "2026-05-19", no_of_sales: 27, total_revenue: 20215 },
      { order_date: "2026-05-20", no_of_sales: 34, total_revenue: 29006.4 },
      { order_date: "2026-05-21", no_of_sales: 41, total_revenue: 30975.2 },
      { order_date: "2026-05-22", no_of_sales: 30, total_revenue: 24670.6 },
      { order_date: "2026-05-23", no_of_sales: 39, total_revenue: 28604.9 },
      { order_date: "2026-05-24", no_of_sales: 31, total_revenue: 25720.5 },
      { order_date: "2026-05-25", no_of_sales: 44, total_revenue: 47642.8 },
    ],
    monthly_metrics: [
      { year: 2026, month: 1, no_of_sales: 322 },
      { year: 2026, month: 2, no_of_sales: 402 },
      { year: 2026, month: 3, no_of_sales: 464 },
      { year: 2026, month: 4, no_of_sales: 673 },
      { year: 2026, month: 5, no_of_sales: 970 },
    ],
    kpi_cards: [
      {
        PM_SALES: 673,
        mtd_sales: 779,
        PMSD_SALES: 540,
        PM_REVENUE: 459264,
        MTD_REVENUE: 629703,
        TODAY_SALES: 44,
        PMSD_REVENUE: 361152,
        TODAY_REVENUE: 47642.8,
      },
    ],
    leaderboard_metrics: [
      { mtd_sales: 231, mtd_revenue: 177317, today_sales: 10, today_revenue: 7925.06, sales_representative: "Faizan" },
      { mtd_sales: 118, mtd_revenue: 97715, today_sales: 5, today_revenue: 4572.02, sales_representative: "Prabhat" },
      { mtd_sales: 115, mtd_revenue: 103473, today_sales: 12, today_revenue: 19498.5, sales_representative: "Talha" },
      { mtd_sales: 110, mtd_revenue: 83573.2, today_sales: 3, today_revenue: 1777.12, sales_representative: "Sanika" },
      { mtd_sales: 84, mtd_revenue: 64813.1, today_sales: 4, today_revenue: 4488.14, sales_representative: "Bhageshri" },
      { mtd_sales: 71, mtd_revenue: 59612.4, today_sales: 8, today_revenue: 7265.06, sales_representative: "Nidhi" },
      { mtd_sales: 49, mtd_revenue: 42263.7, today_sales: 2, today_revenue: 2116.95, sales_representative: "Karishma" },
      { mtd_sales: 1, mtd_revenue: 931.36, today_sales: 0, today_revenue: 0, sales_representative: "Rahul" },
    ],
  },
];

// Final Sunset Peach Theme Constants
const PEACH = {
  bg: "linear-gradient(135deg, #FFF9F6 0%, #FFECD9 50%, #FFDFCB 100%)",
  panel: "rgba(255, 255, 255, 0.8)",
  panelBorder: "rgba(226, 92, 62, 0.12)",
  panelBorderHover: "rgba(226, 92, 62, 0.25)",
  text: "#2D2522",
  textDim: "#7A6D68",
  accent: "#E25C3E",
  accentHover: "#C84B2F",
  accentGlow: "rgba(226, 92, 62, 0.08)",
  accent2: "#A35252",
  up: "#2E7D32",
  down: "#C62828",
  gridColor: "rgba(226, 92, 62, 0.06)",
  cardShadow: "0 1px 3px rgba(45, 37, 34, 0.03), 0 8px 24px rgba(226, 92, 62, 0.05)",
  cardShadowHover: "0 12px 32px rgba(226, 92, 62, 0.12)",
  chartBarSecondary: "rgba(226, 92, 62, 0.15)",
  barColors: ["#E25C3E", "#F08D75", "#F5B09E", "#FAD3CA", "#A35252", "#BFA090", "#D3C2BC", "#EAE3E0"],
};

const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtINR(n) {
  if (n === undefined || n === null) return "-";
  return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
function fmtNum(n) {
  if (n === undefined || n === null) return "-";
  return Number(n).toLocaleString("en-IN");
}
function pctChange(curr, prev) {
  if (!prev) return null;
  return ((curr - prev) / prev) * 100;
}
function shortDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function KpiCard({ label, value, sub, deltaPct }) {
  const up = deltaPct !== null && deltaPct !== undefined && deltaPct >= 0;
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub-row">
        {sub && <span className="kpi-sub">{sub}</span>}
        {deltaPct !== null && deltaPct !== undefined && (
          <span className={"kpi-delta " + (up ? "up" : "down")}>
            {up ? "▲" : "▼"} {Math.abs(deltaPct).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, money }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="tooltip-box">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row" style={{ color: p.color }}>
          {p.name}: {money && p.dataKey === "total_revenue" ? fmtINR(p.value) : fmtNum(p.value)}
        </div>
      ))}
    </div>
  );
}

function InitialsAvatar({ name }) {
  const initials = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
    
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "rgba(226, 92, 62, 0.12)",
    "rgba(163, 82, 82, 0.12)",
    "rgba(181, 124, 62, 0.12)",
    "rgba(120, 100, 90, 0.12)",
  ];
  const bg = colors[Math.abs(hash) % colors.length];

  return (
    <div className="rep-avatar" style={{ background: bg, color: PEACH.accent }}>
      {initials}
    </div>
  );
}

export default function SalesDashboard() {
  const [raw, setRaw] = useState(SAMPLE);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usingLive, setUsingLive] = useState(false);

  const data = raw[0];

  const kpi = data.kpi_cards[0];
  const salesDelta = useMemo(() => pctChange(kpi.MTD_REVENUE, kpi.PM_REVENUE), [kpi]);
  const salesCountDelta = useMemo(() => pctChange(kpi.mtd_sales, kpi.PM_SALES), [kpi]);
  const todayVsPmsd = useMemo(() => pctChange(kpi.TODAY_REVENUE, kpi.PMSD_REVENUE), [kpi]);

  const monthlyChartData = useMemo(
    () =>
      data.monthly_metrics.map((m) => ({
        label: MONTH_NAMES[m.month] + " " + m.year,
        no_of_sales: m.no_of_sales,
      })),
    [data]
  );

  const dailyChartData = useMemo(
    () =>
      data.daily_metrics.map((d) => ({
        ...d,
        label: shortDate(d.order_date),
      })),
    [data]
  );

  const leaderboardSorted = useMemo(
    () => [...data.leaderboard_metrics].sort((a, b) => b.mtd_revenue - a.mtd_revenue),
    [data]
  );

  async function fetchLive() {
    setLoading(true);
    setError("");
    try {
      const headers = {
        "Content-Type": "application/json",
        apikey: apiKey,
      };
      if (apiKey.startsWith("eyJ")) {
        headers["Authorization"] = "Bearer " + apiKey;
      }
      const res = await fetch(
        "https://tvhvzgkabuynenzofbpn.supabase.co/rest/v1/rpc/get_sales_dashboard",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({}),
        }
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt.slice(0, 200)}`);
      }
      const json = await res.json();
      const arr = Array.isArray(json) ? json : [json];
      if (!arr[0] || !arr[0].kpi_cards) throw new Error("Unexpected response shape from endpoint.");
      setRaw(arr);
      setUsingLive(true);
    } catch (e) {
      setError(e.message || "Fetch failed. Check your API key and network/CORS settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dash-root">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dash-root {
          --bg: ${PEACH.bg};
          --panel: ${PEACH.panel};
          --panel-border: ${PEACH.panelBorder};
          --panel-border-hover: ${PEACH.panelBorderHover};
          --text: ${PEACH.text};
          --text-dim: ${PEACH.textDim};
          --accent: ${PEACH.accent};
          --accent-hover: ${PEACH.accentHover};
          --accent-glow: ${PEACH.accentGlow};
          --accent2: ${PEACH.accent2};
          --up: ${PEACH.up};
          --down: ${PEACH.down};
          --card-shadow: ${PEACH.cardShadow};
          --card-shadow-hover: ${PEACH.cardShadowHover};

          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: var(--bg);
          color: var(--text);
          padding: 40px;
          border-radius: 0;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .dash-root * { box-sizing: border-box; }
        
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .dash-title-group {
          display: flex;
          flex-direction: column;
        }

        .dash-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dash-subtitle {
          font-size: 13px;
          color: var(--text-dim);
          margin-top: 4px;
          font-weight: 600;
          letter-spacing: -0.015em;
        }
        .live-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--accent-glow);
          color: var(--accent);
          border: 1px solid var(--panel-border-hover);
        }

        .settings-btn {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          color: var(--text);
          padding: 10px 20px;
          border-radius: 24px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.2s ease;
          box-shadow: var(--card-shadow);
        }
        .settings-btn:hover {
          background: var(--accent-glow);
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-1px);
        }
        
        .settings-panel {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 24px;
          padding: 24px;
          margin-bottom: 32px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(12px);
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .settings-panel input {
          flex: 1;
          min-width: 280px;
          background: var(--panel);
          border: 1px solid var(--panel-border-hover);
          color: var(--text);
          padding: 12px 18px;
          border-radius: 20px;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s ease;
          font-weight: 500;
        }
        .settings-panel input:focus {
          border-color: var(--accent);
        }
        .fetch-btn {
          background: var(--accent);
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          border-radius: 24px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .fetch-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: scale(1.02);
        }
        .fetch-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .error-text {
          color: var(--down);
          font-size: 13px;
          font-weight: 600;
          width: 100%;
          margin-top: 6px;
        }
        .hint-text {
          color: var(--text-dim);
          font-size: 12px;
          width: 100%;
          line-height: 1.6;
          margin-top: 8px;
        }

        .kpi-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .kpi-card {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--card-shadow);
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .kpi-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-shadow-hover);
          border-color: var(--panel-border-hover);
        }
        .kpi-label {
          font-size: 12px;
          color: var(--text-dim);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
        }
        .kpi-value {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text);
        }
        .kpi-sub-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          font-size: 13px;
        }
        .kpi-sub {
          font-size: 12px;
          color: var(--text-dim);
          font-weight: 600;
        }
        .kpi-delta {
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 4px 10px;
          border-radius: 12px;
        }
        .kpi-delta.up { color: var(--up); background: rgba(46, 125, 50, 0.08); }
        .kpi-delta.down { color: var(--down); background: rgba(198, 40, 40, 0.08); }

        .panel {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: var(--card-shadow);
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .panel:hover {
          box-shadow: var(--card-shadow-hover);
          border-color: var(--panel-border-hover);
        }
        .panel-title {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        
        .grid-2 {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .grid-2 { grid-template-columns: 1fr; }
        }

        .tooltip-box {
          background: var(--panel);
          border: 1px solid var(--panel-border-hover);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          box-shadow: var(--card-shadow-hover);
          color: var(--text);
          backdrop-filter: blur(8px);
        }
        .tooltip-label {
          color: var(--text-dim);
          margin-bottom: 4px;
          font-weight: 700;
        }
        .tooltip-row {
          font-weight: 700;
          margin-top: 3px;
        }

        /* Leaderboard table enhancements */
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        th {
          text-align: left;
          color: var(--text-dim);
          font-weight: 700;
          padding: 14px 16px;
          border-bottom: 2px solid var(--panel-border);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--panel-border);
          color: var(--text);
          font-weight: 500;
          vertical-align: middle;
        }
        tr {
          transition: background-color 0.2s ease;
        }
        tr:hover td {
          background: var(--accent-glow);
        }
        tr:last-child td {
          border-bottom: none;
        }
        .rank-cell {
          width: 50px;
          text-align: center;
        }
        .rank-badge {
          font-size: 18px;
          display: inline-block;
        }
        .rank-num {
          font-size: 13px;
          color: var(--text-dim);
          font-weight: 700;
        }
        .rep-cell {
          font-weight: 700;
          color: var(--text);
        }
        .rep-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          margin-right: 12px;
          flex-shrink: 0;
          border: 1px solid rgba(0, 0, 0, 0.03);
          letter-spacing: -0.02em;
        }
        .num-cell {
          text-align: right;
          font-variant-numeric: tabular-nums;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .dash-root {
            padding: 20px;
          }
          .dash-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .settings-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <div className="dash-header">
        <div className="dash-title-group">
          <div className="dash-title">
            <span style={{ fontSize: "28px", marginRight: "2px" }}></span> Sunset Sales Dashboard
            {usingLive && <span className="live-tag">● Live data</span>}
          </div>
          <div className="dash-subtitle">get_sales_dashboard · Supabase RPC</div>
        </div>

        <button className="settings-btn" onClick={() => setShowSettings((s) => !s)}>
          {showSettings ? "Hide Settings" : "Connect live data"}
        </button>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <input
            type="password"
            placeholder="Paste Supabase anon/API key here"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button className="fetch-btn" onClick={fetchLive} disabled={loading || !apiKey}>
            {loading ? "Fetching..." : "Fetch live"}
          </button>
          {error && <div className="error-text">{error}</div>}
          <div className="hint-text">
            This is the same header Postman sends as "apikey" (and "Authorization: Bearer ...").
            Find it in Supabase → Project Settings → API → anon public key. It never leaves your browser.
          </div>
        </div>
      )}

      <div className="kpi-row">
        <KpiCard label="MTD Sales" value={fmtNum(kpi.mtd_sales)} sub={`Prev month: ${fmtNum(kpi.PM_SALES)}`} deltaPct={salesCountDelta} />
        <KpiCard label="MTD Revenue" value={fmtINR(kpi.MTD_REVENUE)} sub={`Prev month: ${fmtINR(kpi.PM_REVENUE)}`} deltaPct={salesDelta} />
        <KpiCard label="Today's Sales" value={fmtNum(kpi.TODAY_SALES)} sub="orders today" />
        <KpiCard label="Today's Revenue" value={fmtINR(kpi.TODAY_REVENUE)} sub={`vs same day last month`} deltaPct={todayVsPmsd} />
        <KpiCard label="Prev Month Same Day" value={fmtNum(kpi.PMSD_SALES)} sub={fmtINR(kpi.PMSD_REVENUE)} />
      </div>

      <div className="panel">
        <div className="panel-title">Daily Sales & Revenue — May 2026</div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={dailyChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={PEACH.gridColor} vertical={false} />
            <XAxis dataKey="label" tick={{ fill: PEACH.textDim, fontSize: 11 }} interval={2} axisLine={{ stroke: PEACH.panelBorder }} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: PEACH.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: PEACH.textDim, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip money />} />
            <Legend wrapperStyle={{ fontSize: 12, color: PEACH.textDim, paddingTop: 10 }} />
            <Bar yAxisId="left" dataKey="no_of_sales" name="Orders" fill={PEACH.accent} radius={[4, 4, 0, 0]} barSize={14} />
            <Line yAxisId="right" type="monotone" dataKey="total_revenue" name="Revenue" stroke={PEACH.accent2} strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-title">Monthly Sales Trend</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={PEACH.gridColor} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: PEACH.textDim, fontSize: 12 }} axisLine={{ stroke: PEACH.panelBorder }} tickLine={false} />
              <YAxis tick={{ fill: PEACH.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="no_of_sales" name="Orders" radius={[6, 6, 0, 0]} barSize={38}>
                {monthlyChartData.map((_, i) => (
                  <Cell key={i} fill={i === monthlyChartData.length - 1 ? PEACH.accent : PEACH.chartBarSecondary} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="panel-title">Top Reps — MTD Revenue</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart layout="vertical" data={leaderboardSorted} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={PEACH.gridColor} horizontal={false} />
              <XAxis type="number" tick={{ fill: PEACH.textDim, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="sales_representative" width={70} tick={{ fill: PEACH.text, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip money />} />
              <Bar dataKey="mtd_revenue" name="Revenue" radius={[0, 6, 6, 0]} barSize={16}>
                {leaderboardSorted.map((_, i) => (
                  <Cell key={i} fill={PEACH.barColors[i % PEACH.barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">Leaderboard</div>
        <table>
          <thead>
            <tr>
              <th className="rank-cell">#</th>
              <th>Representative</th>
              <th style={{ textAlign: "right" }}>MTD Sales</th>
              <th style={{ textAlign: "right" }}>MTD Revenue</th>
              <th style={{ textAlign: "right" }}>Today Sales</th>
              <th style={{ textAlign: "right" }}>Today Revenue</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardSorted.map((r, i) => (
              <tr key={r.sales_representative}>
                <td className="rank-cell">
                  {i === 0 ? <span className="rank-badge">🥇</span> :
                   i === 1 ? <span className="rank-badge">🥈</span> :
                   i === 2 ? <span className="rank-badge">🥉</span> :
                   <span className="rank-num">{i + 1}</span>}
                </td>
                <td className="rep-cell">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InitialsAvatar name={r.sales_representative} />
                    <span>{r.sales_representative.trim()}</span>
                  </div>
                </td>
                <td className="num-cell">{fmtNum(r.mtd_sales)}</td>
                <td className="num-cell">{fmtINR(r.mtd_revenue)}</td>
                <td className="num-cell">{fmtNum(r.today_sales)}</td>
                <td className="num-cell">{fmtINR(r.today_revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
