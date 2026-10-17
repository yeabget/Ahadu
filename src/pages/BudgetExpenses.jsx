
import { useMemo, useState } from "react";
import { Plus, Search, Wallet, TrendingDown, X } from "lucide-react";
import { projects, expenses as initialExpenses } from "../data/mockData";

const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function BudgetExpenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    projectName: "",
    category: "Materials",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const totalBudget = projects.reduce((sum, p) => sum + Number(p.budget || 0), 0);
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const remaining = Math.max(totalBudget - totalSpent, 0);

  const filtered = useMemo(
    () =>
      expenses.filter((e) =>
        `${e.title || ""} ${e.description || ""} ${e.projectName || e.project || ""} ${e.category || ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [expenses, search]
  );

  function addExpense(e) {
    e.preventDefault();
    setExpenses((previous) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        projectName: form.projectName,
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
      },
      ...previous,
    ]);
    setForm({
      title: "",
      projectName: "",
      category: "Materials",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setShowModal(false);
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">FINANCIAL MANAGEMENT</p>
          <h1>Budget & Expenses</h1>
          <p>Monitor project budgets and record construction expenses.</p>
        </div>
        <button className="primary-button" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Expense
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Wallet size={21} /></div>
          <p>Total Project Budget</p><h2>{money(totalBudget)}</h2>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><TrendingDown size={21} /></div>
          <p>Recorded Expenses</p><h2>{money(totalSpent)}</h2>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Wallet size={21} /></div>
          <p>Budget Remaining</p><h2>{money(remaining)}</h2>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Project Budgets</h2><p>Spending against each project's budget.</p></div>
        </div>

        <div className="budget-project-list">
          {projects.map((project, index) => {
            const budget = Number(project.budget) || 0;
            const spent = Number(project.spent) || 0;
            const percentage = budget ? Math.min((spent / budget) * 100, 100) : 0;

            return (
              <div className="budget-project-item" key={project.id ?? index}>
                <div className="progress-label">
                  <span>{project.name || "Project"}</span>
                  <strong>{percentage.toFixed(0)}%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${percentage}%` }} />
                </div>
                <div className="budget-line-meta">
                  <span>Spent: {money(spent)}</span>
                  <span>Budget: {money(budget)}</span>
                </div>
              </div>
            );
          })}
          {!projects.length && <p>No projects have been created.</p>}
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Expense Records</h2><p>Search and review recorded expenses.</p></div>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expenses..." />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Description</th><th>Project</th><th>Category</th><th>Date</th><th>Amount</th></tr>
            </thead>
            <tbody>
              {filtered.map((expense, index) => (
                <tr key={expense.id ?? index}>
                  <td>{expense.title || expense.description || "Expense"}</td>
                  <td>{expense.projectName || expense.project || "—"}</td>
                  <td>{expense.category || "General"}</td>
                  <td>{expense.date || "—"}</td>
                  <td><strong>{money(expense.amount)}</strong></td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan="5">No matching expenses found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div><h2>Add Expense</h2><p>Record a new project cost.</p></div>
              <button className="icon-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <form className="form-stack" onSubmit={addExpense}>
              <label>Description
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Cement purchase" />
              </label>
              <label>Project
                <select value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })}>
                  <option value="">Select a project</option>
                  {projects.map((p, index) => <option key={p.id ?? index} value={p.name}>{p.name}</option>)}
                </select>
              </label>
              <label>Category
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Materials</option><option>Labor</option><option>Equipment</option><option>Transport</option><option>Other</option>
                </select>
              </label>
              <label>Amount (ETB)
                <input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </label>
              <label>Date
                <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="primary-button" type="submit"><Plus size={17} /> Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
