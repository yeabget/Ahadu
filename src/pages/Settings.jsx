
import { useEffect, useState } from "react";
import { Save, UserRound, Building2, Bell, RotateCcw } from "lucide-react";

const defaultSettings = {
  fullName: "BuildTrack Admin",
  email: "admin@example.com",
  company: "BuildTrack Construction",
  currency: "ETB",
  emailNotifications: true,
  budgetAlerts: true,
  deadlineAlerts: true,
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("buildtrack-settings");
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      }
    } catch {
      setMessage("Could not load saved settings.");
    }
  }, []);

  function updateField(field, value) {
    setSettings((previous) => ({ ...previous, [field]: value }));
    setMessage("");
  }

  function saveSettings(e) {
    e.preventDefault();

    try {
      localStorage.setItem("buildtrack-settings", JSON.stringify(settings));
      setMessage("Settings saved successfully.");
    } catch {
      setMessage("Settings could not be saved in this browser.");
    }
  }

  function resetSettings() {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem("buildtrack-settings");
      setMessage("Settings restored to defaults.");
    } catch {
      setMessage("Could not reset saved settings.");
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PREFERENCES</p>
          <h1>Settings</h1>
          <p>Manage your profile, company information, and preferences.</p>
        </div>
      </div>

      {message && <p className="inline-message" role="status">{message}</p>}

      <form onSubmit={saveSettings} className="settings-form">
        <section className="panel settings-panel">
          <div className="settings-section-heading">
            <div className="settings-icon"><UserRound size={21} /></div>
            <div><h2>Profile Information</h2><p>Update your account details.</p></div>
          </div>

          <div className="form-two-columns">
            <label>Full name
              <input
                required
                value={settings.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </label>
            <label>Email address
              <input
                required
                type="email"
                value={settings.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="panel settings-panel">
          <div className="settings-section-heading">
            <div className="settings-icon"><Building2 size={21} /></div>
            <div><h2>Company Settings</h2><p>Set your construction company details.</p></div>
          </div>

          <div className="form-two-columns">
            <label>Company name
              <input
                required
                value={settings.company}
                onChange={(e) => updateField("company", e.target.value)}
              />
            </label>
            <label>Currency
              <select
                value={settings.currency}
                onChange={(e) => updateField("currency", e.target.value)}
              >
                <option value="ETB">ETB — Ethiopian Birr</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
              </select>
            </label>
          </div>
        </section>

        <section className="panel settings-panel">
          <div className="settings-section-heading">
            <div className="settings-icon"><Bell size={21} /></div>
            <div><h2>Notifications</h2><p>Choose which reminders you want to enable.</p></div>
          </div>

          <div className="settings-options">
            <label className="settings-option">
              <div><strong>Email notifications</strong><p>Receive general project updates by email.</p></div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => updateField("emailNotifications", e.target.checked)}
              />
            </label>

            <label className="settings-option">
              <div><strong>Budget alerts</strong><p>Get notified when spending approaches the budget.</p></div>
              <input
                type="checkbox"
                checked={settings.budgetAlerts}
                onChange={(e) => updateField("budgetAlerts", e.target.checked)}
              />
            </label>

            <label className="settings-option">
              <div><strong>Deadline reminders</strong><p>Keep track of upcoming construction deadlines.</p></div>
              <input
                type="checkbox"
                checked={settings.deadlineAlerts}
                onChange={(e) => updateField("deadlineAlerts", e.target.checked)}
              />
            </label>
          </div>
        </section>

        <div className="settings-actions">
          <button type="button" className="secondary-button" onClick={resetSettings}>
            <RotateCcw size={17} /> Reset Settings
          </button>
          <button type="submit" className="primary-button">
            <Save size={17} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
