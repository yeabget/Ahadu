
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import BudgetExpenses from "./pages/BudgetExpenses";
import Schedule from "./pages/Schedule";
import Materials from "./pages/Materials";
import Contractors from "./pages/Contractors";
import Reports from "./pages/Reports";
import SitePhotos from "./pages/SitePhotos";
import Settings from "./pages/Settings";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-layout">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/budget" element={<BudgetExpenses />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/contractors" element={<Contractors />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/photos" element={<SitePhotos />} />
            <Route path="/settings" element={<Settings />} />

            <Route
              path="*"
              element={
                <section className="panel empty-state">
                  <h2>Page not found</h2>
                  <p>The page you requested does not exist.</p>
                </section>
              }
            />
          </Routes>

          <footer className="app-footer">
            <span>© 2026 BuildTrack</span>
            <span>Construction Budget &amp; Progress Tracker</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
