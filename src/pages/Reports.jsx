
import { useMemo } from "react";
import { Download, FileText, Wallet, Building2, TrendingUp } from "lucide-react";
import { projects, expenses, materials } from "../data/mockData";

const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

function downloadCSV(filename, rows) {
  const csv = rows.map((row) =>
    row.map((value) => {
      const safe = String(value ?? "").replace(/"/g, '""');
      return `"${safe}"`;
    }).join(",")
  ).join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const totals = useMemo(() => {
    const budget = projects.reduce((sum, p) => sum + Number(p.budget || 0), 0);
    const spent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const remaining = Math.max(budget - spent, 0);
    const progress = projects.length
      ? projects.reduce((sum, p) => sum + Number(p.progress || 0), 0) / projects.length
      : 0;

    return { budget, spent, remaining, progress };
  }, []);

  function exportProjects() {
    downloadCSV("buildtrack-project-report.csv", [
      ["Project", "Location", "Status", "Budget ETB", "Spent ETB", "Progress %", "Start Date", "End Date"],
      ...projects.map((p) => [
        p.name, p.location, p.status, p.budget, p.spent,
        p.progress, p.startDate, p.endDate,
      ]),
    ]);
  }

  function exportExpenses() {
    downloadCSV("buildtrack-expense-report.csv", [
      ["Description", "Project", "Category", "Date", "Amount ETB"],
      ...expenses.map((e) => [
        e.title || e.description,
        e.projectName || e.project,
        e.category,
        e.date,
        e.amount,
      ]),
    ]);
  }

  function exportMaterials() {
    downloadCSV("buildtrack-materials-report.csv", [
      ["Material", "Category", "Quantity", "Unit", "Supplier"],
      ...materials.map((m) => [m.name, m.category, m.quantity, m.unit, m.supplier]),
    ]);
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">ANALYTICS</p><h1>Reports</h1><p>Review construction performance and export records.</p></div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><Building2 size={21} /></div><p>Total Projects</p><h2>{projects.length}</h2></div>
        <div className="stat-card"><div className="stat-icon"><Wallet size={21} /></div><p>Total Budget</p><h2>{money(totals.budget)}</h2></div>
        <div className="stat-card"><div className="stat-icon"><TrendingUp size={21} /></div><p>Total Expenses</p><h2>{money(totals.spent)}</h2></div>
        <div className="stat-card"><div className="stat-icon"><TrendingUp size={21} /></div><p>Average Progress</p><h2>{totals.progress.toFixed(0)}%</h2></div>
      </div>

      <section className="panel">
        <div className="panel-heading"><div><h2>Financial Summary</h2><p>Budget allocation compared with recorded expenses.</p></div></div>
        <div className="report-summary-grid">
          <div><span>Total budget</span><strong>{money(totals.budget)}</strong></div>
          <div><span>Recorded spending</span><strong>{money(totals.spent)}</strong></div>
          <div><span>Remaining budget</span><strong>{money(totals.remaining)}</strong></div>
        </div>
        <div className="progress-track large-progress">
          <div className="progress-fill" style={{ width: `${totals.budget ? Math.min((totals.spent / totals.budget) * 100, 100) : 0}%` }} />
        </div>
        <p className="muted">{totals.budget ? ((totals.spent / totals.budget) * 100).toFixed(1) : "0.0"}% of total budget spent, based on current records.</p>
      </section>

      <section className="panel">
        <div className="panel-heading"><div><h2>Export Reports</h2><p>Download your current records as spreadsheet-compatible CSV files.</p></div></div>
        <div className="export-list">
          <div className="export-row">
            <div className="export-icon"><FileText size={22} /></div>
            <div><h3>Project Report</h3><p>Project names, budgets, status, and progress.</p></div>
            <button className="secondary-button" onClick={exportProjects}><Download size={16} /> Export CSV</button>
          </div>
          <div className="export-row">
            <div className="export-icon"><Wallet size={22} /></div>
            <div><h3>Expense Report</h3><p>Recorded expenses, categories, and amounts.</p></div>
            <button className="secondary-button" onClick={exportExpenses}><Download size={16} /> Export CSV</button>
          </div>
          <div className="export-row">
            <div className="export-icon"><Building2 size={22} /></div>
            <div><h3>Materials Report</h3><p>Material inventory, quantities, and suppliers.</p></div>
            <button className="secondary-button" onClick={exportMaterials}><Download size={16} /> Export CSV</button>
          </div>
        </div>
      </section>
    </div>
  );
}
