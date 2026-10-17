export const projects = [
  {
    id: 1,
    name: "Modern Family House",
    location: "Bole, Addis Ababa",
    status: "In Progress",
    progress: 68,
    budget: 4500000,
    spent: 3120000,
    startDate: "2026-02-01",
    endDate: "2026-12-30",
  },
  {
    id: 2,
    name: "Commercial Building",
    location: "Kazanchis, Addis Ababa",
    status: "In Progress",
    progress: 42,
    budget: 8000000,
    spent: 3650000,
    startDate: "2026-03-15",
    endDate: "2027-04-15",
  },
  {
    id: 3,
    name: "Apartment Renovation",
    location: "Megenagna, Addis Ababa",
    status: "Planning",
    progress: 10,
    budget: 1200000,
    spent: 180000,
    startDate: "2026-09-01",
    endDate: "2027-01-30",
  },
];

export const expenses = [
  { id: 1, project: "Modern Family House", category: "Materials", description: "Cement purchase", amount: 125000, date: "2026-10-12" },
  { id: 2, project: "Modern Family House", category: "Labor", description: "Foundation workers", amount: 45000, date: "2026-10-11" },
  { id: 3, project: "Commercial Building", category: "Materials", description: "Steel reinforcement", amount: 210000, date: "2026-10-10" },
  { id: 4, project: "Commercial Building", category: "Equipment", description: "Excavator rental", amount: 65000, date: "2026-10-08" },
  { id: 5, project: "Modern Family House", category: "Transport", description: "Material delivery", amount: 12000, date: "2026-10-07" },
];

export const materials = [
  { id: 1, name: "Cement", quantity: 120, unit: "bags", minimum: 50, price: 950, supplier: "Ethio Cement Supply" },
  { id: 2, name: "Steel Bars", quantity: 35, unit: "pieces", minimum: 40, price: 1800, supplier: "Addis Steel Traders" },
  { id: 3, name: "Sand", quantity: 18, unit: "m³", minimum: 10, price: 2200, supplier: "Bole Building Supplies" },
  { id: 4, name: "Bricks", quantity: 2500, unit: "pieces", minimum: 1000, price: 18, supplier: "Horizon Construction" },
  { id: 5, name: "Gravel", quantity: 8, unit: "m³", minimum: 12, price: 2400, supplier: "Bole Building Supplies" },
];

export const contractors = [
  { id: 1, name: "Abebe Construction", specialty: "General Contractor", phone: "+251 911 123 456", project: "Modern Family House", status: "Active" },
  { id: 2, name: "Meron Electrical Works", specialty: "Electrical", phone: "+251 922 234 567", project: "Commercial Building", status: "Active" },
  { id: 3, name: "Dawit Plumbing", specialty: "Plumbing", phone: "+251 933 345 678", project: "Modern Family House", status: "Pending" },
];

export const tasks = [
  { id: 1, name: "Foundation work", project: "Modern Family House", start: "2026-10-01", end: "2026-10-15", status: "Completed" },
  { id: 2, name: "Ground floor walls", project: "Modern Family House", start: "2026-10-16", end: "2026-11-05", status: "In Progress" },
  { id: 3, name: "Electrical installation", project: "Commercial Building", start: "2026-10-20", end: "2026-11-12", status: "Upcoming" },
  { id: 4, name: "Roof installation", project: "Modern Family House", start: "2026-11-06", end: "2026-11-25", status: "Upcoming" },
];