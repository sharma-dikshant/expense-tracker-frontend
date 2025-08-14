# Expense Tracker Frontend

A mobile-first expense tracking web application built with React, Vite, and Material UI. This application helps users track their expenses, manage budgets, monitor recurring expenses, and keep track of loans and lending.

## 🚀 Features

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Clean, minimal interface with soft color palette
- Bottom navigation for easy mobile navigation

### 💰 Expense Tracking
- **Calendar View**: Visual calendar with expense indicators
- **Add Expenses**: Quick expense entry with category and budget assignment
- **Toggle Amount Display**: Show/hide expense amounts on calendar

### 📊 Budget Management
- **Budget Creation**: Set up budgets for different categories
- **Progress Tracking**: Visual progress bars with color-coded status
- **Budget Assignment**: Link expenses to specific budgets

### 🔄 Recurring Expenses
- **Recurring Setup**: Configure monthly, weekly, or yearly recurring expenses
- **Status Management**: Activate/deactivate recurring expenses
- **Due Date Tracking**: Monitor upcoming recurring payments

### 📈 Analytics & Insights
- **Expense Breakdown**: Pie chart showing spending by category
- **Monthly Trends**: Line chart tracking spending over time
- **Budget Usage**: Bar chart comparing budget limits vs. spending
- **AI Insights**: Mock AI-generated spending insights and recommendations
- **Export Options**: Download reports as PDF or CSV

### 💸 Loan & Lending Tracker
- **Dual Tracking**: Separate tabs for money lent and borrowed
- **Status Management**: Track pending and settled loans
- **Summary Cards**: Quick overview of total amounts and pending balances
- **Notes & Details**: Add context and notes to each loan entry

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Material UI v5** - Component library with custom theme
- **React Router** - Client-side routing
- **Recharts** - Chart library for analytics
- **Date-fns** - Date manipulation utilities
- **MUI X Date Pickers** - Date selection components

## 🎨 Design System

### Color Palette
- **Primary**: Soft blue (`#3B82F6`)
- **Background**: Light grey (`#F9FAFB`)
- **Text**: Dark grey (`#111827`) and medium grey (`#6B7280`)
- **Borders**: Light grey (`#E5E7EB`)

### Typography
- **Font Family**: Inter (with Roboto fallback)
- **Clean, minimal design** with generous padding and subtle shadows

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart components (Pie, Line, Bar)
│   ├── Layout.jsx      # Main layout with navigation
│   ├── Calendar.jsx    # Calendar component
│   ├── BudgetSection.jsx
│   ├── RecurringExpenses.jsx
│   ├── AiInsights.jsx
│   └── modals/         # Modal components
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ExpensePage.jsx
│   ├── AnalyticsPage.jsx
│   └── LoanPage.jsx
├── data/               # Mock data
│   └── mockData.js
├── theme.js            # Material UI theme configuration
├── App.jsx             # Main app component
└── main.jsx           # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Usage

### Navigation
- **Home**: Landing page with app overview
- **Login/Signup**: Authentication pages (mock)
- **Expenses**: Main expense tracking with calendar view
- **Analytics**: Charts and insights
- **Loans**: Track money lent and borrowed

### Adding Expenses
1. Click on any date in the calendar
2. Fill in amount, category, and description
3. Optionally assign to a budget
4. Save the expense

### Managing Budgets
1. Click "Add Budget" in the budget section
2. Set budget name, limit, and category
3. Monitor progress with visual indicators

### Tracking Loans
1. Switch between "Lent" and "Borrowed" tabs
2. Click "Add Lent" or "Add Borrowed"
3. Enter person name, amount, and notes
4. Mark as settled when paid back

## 🎯 Key Features in Detail

### Calendar Integration
- Visual expense indicators on dates
- Toggle between amount display and dots
- Click any date to add new expenses
- Month navigation with previous/next buttons

### Budget Tracking
- Real-time progress bars
- Color-coded status (green: good, yellow: warning, red: over budget)
- Percentage and remaining amount display
- Category-based budget organization

### Analytics Dashboard
- Interactive charts with tooltips
- Filter by month/quarter/year
- Export functionality (mock)
- AI-powered insights (mock data)

### Mobile Optimization
- Touch-friendly interface
- Bottom navigation for thumb access
- Responsive grid layouts
- Optimized form inputs

## 🔧 Customization

### Theme Customization
Edit `src/theme.js` to modify:
- Color palette
- Typography settings
- Component styling
- Border radius and shadows

### Adding New Categories
Update `src/data/mockData.js` to add:
- New expense categories
- Category colors and icons
- Budget limits and periods

### Mock Data
All data is currently mock data stored in `src/data/mockData.js`. In a real application, this would be replaced with:
- API calls to backend services
- Local storage for offline functionality
- Real-time data synchronization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository to Vercel or Netlify
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Note**: This is a frontend-only application with mock data. In a production environment, you would need to integrate with a backend API for data persistence and user authentication. 