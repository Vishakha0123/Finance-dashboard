# FINIO – Finance Dashboard

A modern, dark-themed finance dashboard built with **React**, **Vite**, and **Tailwind CSS**. Track income, expenses, and category trends with an intuitive interface featuring real-time balance visualization and smart filtering.

## Features

- **Landing Page** – Beautiful intro with balance trend preview
- **Dashboard Overview** – Key metrics: net balance, total income, total expenses
- **Balance Chart** – Interactive bar chart visualization of monthly trends (October 2023 – April 2024)
- **Spending Breakdown** – Donut chart showing expense distribution by category
- **Transaction Management** – Add, edit, delete, filter, and sort transactions
- **Category Insights** – Spend analysis with category breakdowns, monthly comparisons, and savings rate
- **Role-Based Access** – Admin (full control) and Viewer (read-only) modes
- **Dark Theme** – Tailwind-powered modern dark interface with smooth interactions

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx       # Hero landing page with balance chart preview
│   └── DashboardPage.jsx     # Main dashboard with all views
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── BalanceChart.jsx      # Monthly balance bar chart
│   ├── DonutChart.jsx        # Category spending donut chart
│   ├── LineChart.jsx         # Line chart utility (optional)
│   └── TxModal.jsx           # Transaction form modal
├── data/
│   └── financeData.js        # Transaction data, categories, icons, colors
├── utils/
│   └── formatters.js         # Currency, date, amount formatting helpers
├── App.jsx                   # Root component (landing/dashboard router)
└── index.css                 # Tailwind imports and base styles
```

## Installation

```bash
npm install
```

### Dependencies

- **React** – UI library
- **Vite** – Build tool
- **Tailwind CSS** – Utility-first CSS framework
- **PostCSS** – Autoprefixer support
- **ESLint** – Code quality

## Usage

### Development

Start the dev server on `http://localhost:5173`:

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Key Components

### LandingPage
Entry point with brand intro, feature highlights, and a live balance chart preview. User can click "Open dashboard" to enter the app.

### DashboardPage
Full dashboard with:
- **Dashboard** tab – Summary cards and chart widgets
- **Transactions** tab – Full transaction table with search, filter, sort
- **Insights** tab – Category analysis and monthly comparisons

### BalanceChart
Bar chart showing monthly balance progression. Replaces the previous line graph for cleaner visualization.

### DonutChart
Interactive pie/donut chart of expense categories. Hover to highlight individual segments.

### TxModal
Modal form for adding/editing transactions. Type toggle, category select, amount input, and date picker.

## Data Format

Each transaction has the structure:

```js
{
  id: number,
  date: "YYYY-MM-DD",
  desc: string,
  category: string,
  amount: number,
  type: "income" | "expense"
}
```

Categories: Food, Transport, Shopping, Utilities, Health, Entertainment, Salary, Freelance, Investment

## Styling

Built entirely with **Tailwind CSS** utility classes. Color palette:

- **Background**: Slate 950 (dark)
- **Surfaces**: Slate 900/800
- **Accent**: Indigo 500 → Violet 500 (gradient)
- **Income**: Emerald 300
- **Expense**: Rose 300/400
- **Text**: Slate 100–400

## Browser Support

Modern browsers supporting ES6 and CSS Grid. Tested on Chrome, Firefox, Safari, Edge.

---

Built with ❤️ using React, Vite, and Tailwind CSS.
