
import { useState } from "react";
import { Plus, Search, Boxes, AlertTriangle, X } from "lucide-react";
import { materials as initialMaterials } from "../data/mockData";

export default function Materials() {
  const [items, setItems] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Building Materials",
    quantity: "",
    unit: "pcs",
    supplier: "",
  });

  const filtered = items.filter((item) =>
    `${item.name || ""} ${item.category || ""} ${item.supplier || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const lowStock = items.filter((item) => Number(item.quantity) <= 10).length;

  function addMaterial(e) {
    e.preventDefault();
    setItems((previous) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category,
        quantity: Number(form.quantity),
        unit: form.unit,
        supplier: form.supplier.trim(),
      },
      ...previous,
    ]);
    setForm({ name: "", category: "Building Materials", quantity: "", unit: "pcs", supplier: "" });
    setShowModal(false);
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">INVENTORY</p><h1>Materials</h1><p>Track construction materials and stock availability.</p></div>
        <button className="primary-button" onClick={() => setShowModal(true)}><Plus size={18} /> Add Material</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><Boxes size={21} /></div><p>Material Types</p><h2>{items.length}</h2></div>
        <div className="stat-card"><div className="stat-icon"><AlertTriangle size={21} /></div><p>Low Stock Items</p><h2>{lowStock}</h2></div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Inventory List</h2><p>Search and review available construction materials.</p></div>
        </div>
        <div className="search-box">
          <Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search materials or suppliers..." />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Material</th><th>Category</th><th>Quantity</th><th>Supplier</th><th>Stock Status</th></tr></thead>
            <tbody>
              {filtered.map((item, index) => {
                const quantity = Number(item.quantity) || 0;
                return (
                  <tr key={item.id ?? index}>
                    <td><strong>{item.name || "Unnamed material"}</strong></td>
                    <td>{item.category || "General"}</td>
                    <td>{quantity} {item.unit || "units"}</td>
                    <td>{item.supplier || "—"}</td>
                    <td><span className={`status-badge ${quantity <= 10 ? "pending" : "active"}`}>{quantity <= 10 ? "Low stock" : "In stock"}</span></td>
                  </tr>
                );
              })}
              {!filtered.length && <tr><td colSpan="5">No materials found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div><h2>Add Material</h2><p>Enter a new inventory item.</p></div>
              <button className="icon-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <form className="form-stack" onSubmit={addMaterial}>
              <label>Material name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Cement" />
              </label>
              <label>Category
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Building Materials</option><option>Electrical</option><option>Plumbing</option><option>Finishing</option><option>Tools & Equipment</option>
                </select>
              </label>
              <div className="form-two-columns">
                <label>Quantity
                  <input required min="0" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                </label>
                <label>Unit
                  <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                    <option>pcs</option><option>bags</option><option>kg</option><option>tons</option><option>m³</option><option>liters</option>
                  </select>
                </label>
              </div>
              <label>Supplier
                <input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} placeholder="Supplier name" />
              </label>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-button"><Plus size={17} /> Save Material</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
