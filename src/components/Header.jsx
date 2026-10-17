import { useLocation } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";

const pageNames = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/budget": "Budget & Expenses",
  "/schedule": "Project Schedule",
  "/materials": "Materials & Inventory",
  "/contractors": "Contractors",
  "/reports": "Reports & Analytics",
  "/photos": "Site Photos",
  "/settings": "Settings",
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const title = pageNames[location.pathname] || "Project Details";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <div className="breadcrumb">Workspace / {title}</div>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button search-button"
          onClick={() => document.getElementById("global-search")?.focus()}
          aria-label="Focus search"
        >
          <Search size={20} />
        </button>

        <div className="header-search">
          <Search size={17} />
          <input id="global-search" placeholder="Search projects..." />
          <kbd>⌘ K</kbd>
        </div>

        <button
          className="icon-button notification-button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => alert("You're all caught up!")}
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="profile-avatar">BT</div>
        <div className="profile-info">
          <strong>Project Manager</strong>
          <span>Administrator</span>
        </div>
      </div>
    </header>
  );
}