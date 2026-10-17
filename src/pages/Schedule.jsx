
import { useState } from "react";
import { Plus, CalendarDays, Clock3, X } from "lucide-react";
import { tasks as initialTasks, projects } from "../data/mockData";

export default function Schedule() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    title: "",
    projectName: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const filtered = tasks.filter(
    (task) => filter === "All" || (task.status || "Pending") === filter
  );

  function addTask(e) {
    e.preventDefault();
    setTasks((previous) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        projectName: form.projectName,
        dueDate: form.dueDate,
        priority: form.priority,
        status: form.status,
      },
      ...previous,
    ]);
    setForm({ title: "", projectName: "", dueDate: "", priority: "Medium", status: "Pending" });
    setShowModal(false);
  }

  function updateStatus(id, status) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, status } : task));
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PLANNING</p>
          <h1>Construction Schedule</h1>
          <p>Organize activities and keep track of deadlines.</p>
        </div>
        <button className="primary-button" onClick={() => setShowModal(true)}><Plus size={18} /> Add Task</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><CalendarDays size={21} /></div><p>Total Tasks</p><h2>{tasks.length}</h2></div>
        <div className="stat-card"><div className="stat-icon"><Clock3 size={21} /></div><p>Pending</p><h2>{tasks.filter((t) => (t.status || "Pending") === "Pending").length}</h2></div>
        <div className="stat-card"><div className="stat-icon"><CalendarDays size={21} /></div><p>Completed</p><h2>{tasks.filter((t) => t.status === "Completed").length}</h2></div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Task Schedule</h2><p>Update each task as work progresses.</p></div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter tasks">
            <option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr><th>Task</th><th>Project</th><th>Due Date</th><th>Priority</th><th>Status</th><th>Update</th></tr></thead>
            <tbody>
              {filtered.map((task, index) => (
                <tr key={task.id ?? index}>
                  <td><strong>{task.title || task.name || "Untitled task"}</strong></td>
                  <td>{task.projectName || task.project || "—"}</td>
                  <td>{task.dueDate || task.date || "—"}</td>
                  <td><span className="status-badge">{task.priority || "Medium"}</span></td>
                  <td><span className="status-badge">{task.status || "Pending"}</span></td>
                  <td>
                    <select
                      value={task.status || "Pending"}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      aria-label={`Update ${task.title || "task"} status`}
                    >
                      <option>Pending</option><option>In Progress</option><option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan="6">No tasks to display.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div><h2>Add Schedule Task</h2><p>Create a construction activity.</p></div>
              <button className="icon-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <form className="form-stack" onSubmit={addTask}>
              <label>Task title
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Foundation work" />
              </label>
              <label>Project
                <select value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })}>
                  <option value="">Select project</option>
                  {projects.map((p, index) => <option key={p.id ?? index} value={p.name}>{p.name}</option>)}
                </select>
              </label>
              <label>Due date
                <input type="date" required value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </label>
              <label>Priority
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </label>
              <label>Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Pending</option><option>In Progress</option><option>Completed</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-button"><Plus size={17} /> Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
