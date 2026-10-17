import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { projects, expenses } from "../data/mockData";
import StatCard from "../components/StatCard";

const monthlyData = [
  { month: "May", planned: 420000, actual: 390000 },
  { month: "Jun", planned: 510000, actual: 470000 },
  { month: "Jul", planned: 620000, actual: 650000 },
  { month: "Aug", planned: 580000, actual: 540000 },
  { month: "Sep", planned: 730000, actual: 690000 },
  { month: "Oct", planned: 680000, actual: 710000 },
];

const categoryData = [
  { name: "Materials", value: 48, color: "#247653" },
  { name: "Labor", value: 27, color: "#D8A34D" },
  { name: "Equipment", value: 15, color: "#6687C5" },
  { name: "Other", value: 10, color: "#B7C5BC" },
];

const formatMoney = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default function Dashboard() {
  const navigate = useNavigate();

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const remaining = totalBudget - totalSpent;
  const averageProgress = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  );

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">YOUR CONSTRUCTION OVERVIEW</p>
          <h2>Good evening! 👋</h2>
          <p className="muted">
            Here's what's happening across your construction projects.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/projects")}
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Projects"
          value={projects.length}
          subtitle="Across your workspace"
          icon={Building2}
          color="green"
        />
        <StatCard
          title="Total Budget"
          value={formatMoney(totalBudget)}
          subtitle="Combined project budgets"
          icon={Wallet}
          color="blue"
        />
        <StatCard
          title="Total Spent"
          value={formatMoney(totalSpent)}
          subtitle={`${Math.round((totalSpent / totalBudget) * 100)}% of total budget`}
          icon={Banknote}
          color="orange"
        />
        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          subtitle="Across all projects"
          icon={CheckCircle2}
          color="purple"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <h3>Budget vs. Actual Spending</h3>
              <p>Compare planned costs against actual expenses</p>
            </div>
            <span className="period-label">Last 6 months</span>
          </div>

          <div className="chart-legend">
            <span><i className="legend-dot planned-dot" /> Planned budget</span>
            <span><i className="legend-dot actual-dot" /> Actual spending</span>
          </div>

          <div className="area-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#86B99A" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#86B99A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D8A34D" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#D8A34D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EEE9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#849187", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#849187", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                  width={45}
                />
                <Tooltip formatter={(v) => formatMoney(v)} />
                <Area type="monotone" dataKey="planned" name="Planned" stroke="#4F9871" strokeWidth={2.5} fill="url(#plannedGradient)" />
                <Area type="monotone" dataKey="actual" name="Actual" stroke="#D8A34D" strokeWidth={2.5} fill="url(#actualGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel spending-panel">
          <div className="panel-header">
            <div>
              <h3>Expense Breakdown</h3>
              <p>Spending by category</p>
            </div>
          </div>

          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={57}
                  outerRadius={78}
                  paddingAngle={4}
                  stroke="none"
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <strong>100%</strong>
              <span>Total spend</span>
            </div>
          </div>

          <div className="category-list">
            {categoryData.map((category) => (
              <div className="category-row" key={category.name}>
                <span><i className="legend-dot" style={{ background: category.color }} />{category.name}</span>
                <strong>{category.value}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid lower-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Active Projects</h3>
              <p>Track progress and budget consumption</p>
            </div>
            <button className="text-button" onClick={() => navigate("/projects")}>
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              const spentPercent = Math.round((project.spent / project.budget) * 100);
              const overBudget = project.spent > project.budget;

              return (
                <div className="project-row" key={project.id}>
                  <div className="project-symbol"><Building2 size={21} /></div>
                  <div className="project-main">
                    <div className="project-name-line">
                      <strong>{project.name}</strong>
                      <span className={`status-badge ${project.status === "Planning" ? "status-planning" : "status-active"}`}>
                        {project.status}
                      </span>
                    </div>
                    <p>{project.location}</p>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="project-meta">
                      <span>{project.progress}% complete</span>
                      <span>{formatMoney(project.spent)} / {formatMoney(project.budget)}</span>
                    </div>
                    {overBudget && <span className="overrun-text">Budget exceeded</span>}
                    {!overBudget && spentPercent >= 80 && (
                      <span className="warning-text">Approaching budget limit</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Recent Expenses</h3>
              <p>Latest recorded transactions</p>
            </div>
            <button className="text-button" onClick={() => navigate("/budget")}>
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="expense-list">
            {expenses.slice(0, 4).map((expense) => (
              <div className="expense-row" key={expense.id}>
                <div className="expense-symbol">
                  {expense.category === "Labor" ? <UsersIcon /> : <Wallet size={19} />}
                </div>
                <div className="expense-main">
                  <strong>{expense.description}</strong>
                  <span>{expense.project} · {expense.date}</span>
                </div>
                <strong className="expense-amount">−{formatMoney(expense.amount)}</strong>
              </div>
            ))}
          </div>

          <button className="secondary-button full-button" onClick={() => navigate("/budget")}>
            Manage expenses <ArrowRight size={16} />
          </button>
        </section>
      </div>

      <div className="budget-summary">
        <div className="budget-summary-icon"><Wallet size={24} /></div>
        <div className="budget-summary-copy">
          <strong>Remaining combined budget</strong>
          <span>Available across all projects</span>
        </div>
        <div className="budget-summary-amount">
          <strong>{formatMoney(remaining)}</strong>
          <span><ArrowDownRight size={15} /> Available funds</span>
        </div>
      </div>

      <div className="quick-links">
        <button onClick={() => navigate("/budget")}><Banknote size={18} /> Record an expense <ArrowUpRight size={15} /></button>
        <button onClick={() => navigate("/schedule")}><CalendarDays size={18} /> Update schedule <ArrowUpRight size={15} /></button>
        <button onClick={() => navigate("/materials")}><Clock3 size={18} /> Check materials <ArrowUpRight size={15} /></button>
      </div>
    </div>
  );
}

function UsersIcon() {
  return <Clock3 size={19} />;
}