# Finio — Finance Dashboard

A clean, responsive personal finance dashboard built with React + Vite. Track income, expenses, and savings across multiple months with interactive charts, smart insights, and role-based access control.

---

## ✨ Features

- **Dashboard Overview** — Net balance, total income, expenses, and savings rate at a glance
- **Interactive Charts** — Monthly bar chart, spending donut chart, and net savings trend line (powered by Recharts)
- **Transactions** — Full list with search, filter by type/category, and sort controls
- **Add / Edit / Delete** — Full CRUD for transactions (Admin role only)
- **Insights Page** — Top spending category, savings rate gauge, monthly comparison, category breakdown, income sources, and auto-generated observations
- **Role-Based UI** — Toggle between Admin (edit access) and Viewer (read-only) modes
- **Dark Mode** — Full light/dark theme toggle
- **40 Mock Transactions** — Realistic Indian rupee data across Jan–Mar 2026

---

## 🗂 Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── data/
│   └── transactions.js          # Mock data + color constants
├── context/
│   └── AppContext.jsx            # Global state (transactions, role, theme)
├── components/
│   ├── Layout/
│   │   └── Header.jsx
│   ├── Dashboard/
│   │   ├── StatCards.jsx
│   │   ├── MonthlyChart.jsx
│   │   ├── SpendingPie.jsx
│   │   ├── SavingsTrend.jsx
│   │   └── RecentTransactions.jsx
│   ├── Transactions/
│   │   ├── TransactionFilters.jsx
│   │   ├── TransactionList.jsx
│   │   ├── TransactionModal.jsx
│   │   └── TransactionRow.jsx
│   └── Insights/
│       ├── TopCategory.jsx
│       ├── SavingsRate.jsx
│       ├── MonthlyComparison.jsx
│       ├── CategoryBreakdown.jsx
│       ├── IncomeSources.jsx
│       └── Observations.jsx
└── pages/
    ├── Dashboard.jsx
    ├── Transactions.jsx
    └── Insights.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aman7828/Finio.git
cd Finio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy.

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Recharts](https://recharts.org) | Charts (bar, pie, line) |
| [Context API](https://react.dev/reference/react/createContext) | Global state management |
| Google Fonts (DM Sans + DM Serif Display) | Typography |

---

## 🔐 Role-Based Access

Switch roles using the dropdown in the top-right corner of the header:

| Feature | Admin | Viewer |
|---|---|---|
| View dashboard & charts | ✅ | ✅ |
| View all transactions | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |

---

## 📊 Pages

### Dashboard
Overview with 4 stat cards, a monthly income vs. expense bar chart, a spending category donut chart, a net savings trend line, and the 5 most recent transactions.

### Transactions
Full transaction list with live search, type filter (income/expense), category filter, and sort options. Admins can add, edit, or delete transactions via a modal.

### Insights
Six insight panels: top spending category, savings rate gauge, month-by-month comparison, category breakdown bars, income source breakdown, and 5 auto-generated financial observations.

---

## 📦 Deployment

This project is deployed on Vercel:

**Live URL:** [https://finio.vercel.app](https://finio.vercel.app) *(update with your actual URL)*

To deploy your own copy:

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → Select this repo
3. Vercel auto-detects Vite — click **Deploy**

---

## 👤 Author

**Aman Kumar Gupta**
- GitHub: [@aman7828](https://github.com/aman7828)
- Email: agupta54145@gmail.com

---

## 📄 License

This project was built as part of a Frontend Developer Internship assignment.
