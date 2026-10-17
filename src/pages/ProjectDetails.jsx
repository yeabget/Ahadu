
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, CalendarDays, Wallet, TrendingUp } from "lucide-react";
import { projects, expenses, tasks } from "../data/mockData";

const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return (
      <div className="page">
        <section className="panel empty-state">
          <h2>Project not found</h2>
          <p>The requested project may have been removed or its ID is invalid.</p>
          <Link className="primary-button" to="/projects">Back to Projects</Link>
        </section>
      </div>
    );
  }

  const budget = Number(project.budget) || 0;
  const spent = Number(project.spent) || 0;
  const remaining = Math.max(budget - spent, 0);
  const progress = Math.min(Math.max(Number(project.progress) || 0, 0), 100);

  const projectExpenses = expenses.filter(
    (expense) =>
      String(expense.projectId) === String(project.id) ||
      expense.projectName === project.name ||
      expense.project === project.name
  );

  const projectTasks = tasks.filter(
    (task) =>
      String(task.projectId) === String(project.id) ||
      task.projectName === project.name ||
      task.project === project.name
  );

  return (
    <div className="page">
      <Link to="/projects" className="back-link"><ArrowLeft size={17} /> All Projects</Link>

      <div className="page-heading project-detail-heading">
        <div>
          <p className="eyebrow">PROJECT OVERVIEW</p>
          <h1>{project.name}</h1>
          <p className="muted"><MapPin size={16} /> {project.location || "Location not specified"}</p>
        </div>
        <span className="status-badge">{project.status || "Active"}</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Wallet size={21} /></div>
          <p>Total Budget</p><h2>{money(budget)}</h2>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={21} /></div>
          <p>Amount Spent</p><h2>{money(spent)}</h2>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Wallet size={21} /></div>
          <p>Remaining Budget</p><h2>{money(remaining)}</h2>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={21} /></div>
          <p>Progress</p><h2>{progress}%</h2>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Construction Progress</h2><p>Current project completion.</p></div>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track large-progress">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="project-detail-dates">
          <span><CalendarDays size={16} /> Start: {project.startDate || "Not set"}</span>
          <span><CalendarDays size={16} /> End: {project.endDate || "Not set"}</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Project Tasks</h2><p>Tasks associated with this project.</p></div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Task</th><th>Due Date</th><th>Status</th></tr></thead>
            <tbody>
              {projectTasks.map((task, index) => (
                <tr key={task.id ?? index}>
                  <td>{task.title || task.name || "Task"}</td>
                  <td>{task.dueDate || task.date || "—"}</td>
                  <td><span className="status-badge">{task.status || "Pending"}</span></td>
                </tr>
              ))}
              {!projectTasks.length && <tr><td colSpan="3">No tasks linked to this project yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Project Expenses</h2><p>Expenses associated with this project.</p></div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th></tr></thead>
            <tbody>
              {projectExpenses.map((expense, index) => (
                <tr key={expense.id ?? index}>
                  <td>{expense.title || expense.description || "Expense"}</td>
                  <td>{expense.category || "General"}</td>
                  <td>{expense.date || "—"}</td>
                  <td><strong>{money(expense.amount)}</strong></td>
                </tr>
              ))}
              {!projectExpenses.length && <tr><td colSpan="4">No expenses linked to this project yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
