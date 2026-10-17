import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Wallet,
  CalendarDays,
  Boxes,
  Users,
  ChartNoAxesCombined,
  Camera,
  Settings,
  HardHat,
  X,
} from "lucide-react";

const links = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Projects", path: "/projects", icon: Building2 },
  { label: "Budget & Expenses", path: "/budget", icon: Wallet },
  { label: "Schedule", path: "/schedule", icon: CalendarDays },
  { label: "Materials", path: "/materials", icon: Boxes },
  { label: "Contractors", path: "/contractors", icon: Users },
  { label: "Reports", path: "/reports", icon: ChartNoAxesCombined },
  { label: "Site Photos", path: "/photos", icon: Camera },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <HardHat size={25} />
          </div>
          <div>
            <h2>BuildTrack</h2>
            <span>Construction Manager</span>
          </div>
          <button className="mobile-close" onClick={onClose} aria-label="Close menu">
            <X size={21} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <HardHat size={20} />
            </div>
            <strong>Need help?</strong>
            <p>Keep your construction project organized.</p>
            <a href="mailto:support@buildtrack.example">Contact support</a>
          </div>

          <div className="sidebar-version">BUILDTRACK · VERSION 1.0</div>
        </div>
      </aside>
    </>
  );
}