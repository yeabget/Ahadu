
import { useState } from "react";
import { Plus, Search, Users, X, Phone, Mail } from "lucide-react";
import { contractors as initialContractors } from "../data/mockData";

const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function Contractors() {
  const [items, setItems] = useState(initialContractors);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    contractAmount: "",
    status: "Active",
  });

  const filtered = items.filter((item) =>
    `${item.name || ""} ${item.specialty || item.trade || ""} ${item.email || ""} ${item.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addContractor(e) {
    e.preventDefault();
    setItems((previous) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        specialty: form.specialty.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        contractAmount: Number(form.contractAmount) || 0,
        status: form.status,
      },
      ...previous,
    ]);
    setForm({ name: "", specialty: "", phone: "", email: "", contractAmount: "", status: "Active" });
    setShowModal(false);
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">TEAM MANAGEMENT</p><h1>Contractors</h1><p>Manage contractor information and agreements.</p></div>
        <button className="primary-button" onClick={() => setShowModal(true)}><Plus size={18} /> Add Contractor</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><Users size={21} /></div><p>Total Contractors</p><h2>{items.length}</h2></div>
        <div className="stat-card"><div className="stat-icon"><Users size={21} /></div><p>Active Contractors</p><h2>{items.filter((c) => (c.status || "Active") === "Active").length}</h2></div>
        <div className="stat-card"><div className="stat-icon"><Users size={21} /></div><p>Total Contract Value</p><h2>{money(items.reduce((sum, c) => sum + Number(c.contractAmount || c.amount || 0), 0))}</h2></div>
      </div>

      <section className="panel">
        <div className="panel-heading"><div><h2>Contractor Directory</h2><p>Find contractors and review their contact details.</p></div></div>
        <div className="search-box"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contractors..." /></div>

        <div className="contractor-grid">
          {filtered.map((contractor, index) => (
            <article className="contractor-card" key={contractor.id ?? index}>
              <div className="contractor-avatar">{(contractor.name || "C").charAt(0).toUpperCase()}</div>
              <div className="contractor-title">
                <h3>{contractor.name || "Unnamed contractor"}</h3>
                <span className="status-badge">{contractor.status || "Active"}</span>
              </div>
              <p className="muted">{contractor.specialty || contractor.trade || "General contractor"}</p>
              <div className="contractor-contact">
                <p><Phone size={15} /> {contractor.phone || "No phone provided"}</p>
                <p><Mail size={15} /> {contractor.email || "No email provided"}</p>
              </div>
              <div className="contractor-value">
                <span>Contract amount</span>
                <strong>{money(contractor.contractAmount ?? contractor.amount)}</strong>
              </div>
            </article>
          ))}
        </div>

        {!filtered.length && <div className="empty-state"><h3>No contractors found</h3><p>Add a contractor or try another search.</p></div>}
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div><h2>Add Contractor</h2><p>Enter contractor information.</p></div>
              <button className="icon-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <form className="form-stack" onSubmit={addContractor}>
              <label>Full name or company
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>Specialty / Trade
                <input required value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} placeholder="e.g. Electrical" />
              </label>
              <label>Phone
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label>Email
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>Contract amount (ETB)
                <input type="number" min="0" value={form.contractAmount} onChange={(e) => setForm({ ...form, contractAmount: e.target.value })} />
              </label>
              <label>Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Inactive</option><option>Completed</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-button"><Plus size={17} /> Save Contractor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
