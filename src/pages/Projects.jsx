
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, MapPin, ArrowUpRight, X } from "lucide-react";
import { projects as initialProjects } from "../data/mockData";

const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function Projects() {
  const [items, setItems] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const filtered = items.filter((p) =>
    `${p.name || ""} ${p.location || ""} ${p.status || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addProject(e) {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      name: form.name.trim(),
      location: form.location.trim(),
      budget: Number(form.budget) || 0,
      spent: 0,
      progress: 0,
      status: "Active",
      startDate: form.startDate,
      endDate: form.endDate,
    };

    setItems((previous) => [newProject, ...previous]);
    setForm({ name: "", location: "", budget: "", startDate: "", endDate: "" });
    setShowModal(false);
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PROJECT MANAGEMENT</p>
          <h1>Projects</h1>
          <p>Manage your construction projects in one place.</p>
        </div>
        <button className="primary-button" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="toolbar panel">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
          />
        </div>
        <span>{filtered.length} projects</span>
      </div>

      <div className="project-grid">
        {filtered.map((project, index) => {
          const progress = Math.min(Math.max(Number(project.progress) || 0, 0), 100);
          const spent = Number(project.spent) || 0;
          const budget = Number(project.budget) || 0;

          return (
            <article className="project-card panel" key={project.id ?? index}>
              <div className="project-card-top">
                <span className="project-symbol">BT</span>
                <span className={`status-badge ${(project.status || "active").toLowerCase()}`}>
                  {project.status || "Active"}
                </span>
              </div>

              <h2>{project.name || "Untitled project"}</h2>
              <p className="muted"><MapPin size={15} /> {project.location || "Location not specified"}</p>

              <div className="project-budget-row">
                <div><span>Budget</span><strong>{money(budget)}</strong></div>
                <div><span>Spent</span><strong>{money(spent)}</strong></div>
              </div>

              <div className="progress-label">
                <span>Completion</span><strong>{progress}%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <Link className="project-open-link" to={`/projects/${project.id}`}>
                View project details <ArrowUpRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>

      {!filtered.length && (
        <div className="panel empty-state">
          <h3>No projects found</h3>
          <p>Try another search or create a new project.</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div><h2>Add Project</h2><p>Enter your new project details.</p></div>
              <button className="icon-button" onClick={() => setShowModal(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={addProject} className="form-stack">
              <label>Project name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Residential Building" />
              </label>
              <label>Location
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Project location" />
              </label>
              <label>Budget (ETB)
                <input required min="0" type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
              </label>
              <div className="form-two-columns">
                <label>Start date
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </label>
                <label>End date
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="primary-button" type="submit"><Plus size={17} /> Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
