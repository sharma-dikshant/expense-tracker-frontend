// Mock data for the expense tracker app

export const categories = [
  { id: 1, name: 'Food & Dining', color: '#3B82F6', icon: 'restaurant' },
  { id: 2, name: 'Transportation', color: '#10B981', icon: 'directions_car' },
  { id: 3, name: 'Shopping', color: '#F59E0B', icon: 'shopping_bag' },
  { id: 4, name: 'Entertainment', color: '#8B5CF6', icon: 'movie' },
  { id: 5, name: 'Healthcare', color: '#EF4444', icon: 'local_hospital' },
  { id: 6, name: 'Utilities', color: '#6B7280', icon: 'lightbulb' },
  { id: 7, name: 'Housing', color: '#059669', icon: 'home' },
  { id: 8, name: 'Education', color: '#7C3AED', icon: 'school' },
];

export const expenses = [
  {
    id: 1,
    amount: 45.50,
    category: 'Food & Dining',
    description: 'Lunch at Chipotle',
    date: '2024-01-15',
    budgetId: 1,
  },
  {
    id: 2,
    amount: 120.00,
    category: 'Transportation',
    description: 'Gas station',
    date: '2024-01-14',
    budgetId: 2,
  },
  {
    id: 3,
    amount: 89.99,
    category: 'Shopping',
    description: 'New headphones',
    date: '2024-01-13',
    budgetId: 3,
  },
  {
    id: 4,
    amount: 25.00,
    category: 'Entertainment',
    description: 'Movie tickets',
    date: '2024-01-12',
    budgetId: 4,
  },
  {
    id: 5,
    amount: 15.75,
    category: 'Food & Dining',
    description: 'Coffee and pastry',
    date: '2024-01-11',
    budgetId: 1,
  },
  {
    id: 6,
    amount: 200.00,
    category: 'Healthcare',
    description: 'Doctor appointment',
    date: '2024-01-10',
    budgetId: 5,
  },
  {
    id: 7,
    amount: 85.00,
    category: 'Utilities',
    description: 'Electricity bill',
    date: '2024-01-09',
    budgetId: 6,
  },
  {
    id: 8,
    amount: 1500.00,
    category: 'Housing',
    description: 'Rent payment',
    date: '2024-01-01',
    budgetId: 7,
  },
];

export const budgets = [
  {
    id: 1,
    name: 'Food & Dining',
    limit: 500,
    spent: 245.50,
    category: 'Food & Dining',
    period: 'monthly',
  },
  {
    id: 2,
    name: 'Transportation',
    limit: 300,
    spent: 120.00,
    category: 'Transportation',
    period: 'monthly',
  },
  {
    id: 3,
    name: 'Shopping',
    limit: 200,
    spent: 89.99,
    category: 'Shopping',
    period: 'monthly',
  },
  {
    id: 4,
    name: 'Entertainment',
    limit: 150,
    spent: 25.00,
    category: 'Entertainment',
    period: 'monthly',
  },
  {
    id: 5,
    name: 'Healthcare',
    limit: 500,
    spent: 200.00,
    category: 'Healthcare',
    period: 'monthly',
  },
  {
    id: 6,
    name: 'Utilities',
    limit: 200,
    spent: 85.00,
    category: 'Utilities',
    period: 'monthly',
  },
  {
    id: 7,
    name: 'Housing',
    limit: 2000,
    spent: 1500.00,
    category: 'Housing',
    period: 'monthly',
  },
];

export const recurringExpenses = [
  {
    id: 1,
    amount: 1500,
    category: 'Housing',
    description: 'Monthly rent',
    frequency: 'monthly',
    nextDue: '2024-02-01',
    isActive: true,
  },
  {
    id: 2,
    amount: 85,
    category: 'Utilities',
    description: 'Electricity bill',
    frequency: 'monthly',
    nextDue: '2024-02-15',
    isActive: true,
  },
  {
    id: 3,
    amount: 45,
    category: 'Transportation',
    description: 'Monthly parking',
    frequency: 'monthly',
    nextDue: '2024-02-01',
    isActive: true,
  },
  {
    id: 4,
    amount: 200,
    category: 'Healthcare',
    description: 'Gym membership',
    frequency: 'monthly',
    nextDue: '2024-02-01',
    isActive: false,
  },
];

export const loans = [
  {
    id: 1,
    type: 'lent',
    name: 'John Smith',
    amount: 500,
    date: '2024-01-10',
    status: 'pending',
    notes: 'For car repair',
  },
  {
    id: 2,
    type: 'borrowed',
    name: 'Sarah Johnson',
    amount: 200,
    date: '2024-01-05',
    status: 'settled',
    notes: 'Emergency funds',
  },
  {
    id: 3,
    type: 'lent',
    name: 'Mike Wilson',
    amount: 150,
    date: '2024-01-12',
    status: 'pending',
    notes: 'Lunch money',
  },
  {
    id: 4,
    type: 'borrowed',
    name: 'Emily Davis',
    amount: 75,
    date: '2024-01-08',
    status: 'pending',
    notes: 'Movie tickets',
  },
];

export const monthlyExpenses = [
  { month: 'Jan', amount: 2250 },
  { month: 'Feb', amount: 2100 },
  { month: 'Mar', amount: 2400 },
  { month: 'Apr', amount: 1950 },
  { month: 'May', amount: 2300 },
  { month: 'Jun', amount: 2200 },
  { month: 'Jul', amount: 2500 },
  { month: 'Aug', amount: 2350 },
  { month: 'Sep', amount: 2100 },
  { month: 'Oct', amount: 2400 },
  { month: 'Nov', amount: 2250 },
  { month: 'Dec', amount: 2600 },
];

export const categoryBreakdown = [
  { name: 'Food & Dining', value: 245.50, color: '#3B82F6' },
  { name: 'Transportation', value: 120.00, color: '#10B981' },
  { name: 'Shopping', value: 89.99, color: '#F59E0B' },
  { name: 'Entertainment', value: 25.00, color: '#8B5CF6' },
  { name: 'Healthcare', value: 200.00, color: '#EF4444' },
  { name: 'Utilities', value: 85.00, color: '#6B7280' },
  { name: 'Housing', value: 1500.00, color: '#059669' },
];

export const budgetUsage = [
  { name: 'Food & Dining', limit: 500, spent: 245.50 },
  { name: 'Transportation', limit: 300, spent: 120.00 },
  { name: 'Shopping', limit: 200, spent: 89.99 },
  { name: 'Entertainment', limit: 150, spent: 25.00 },
  { name: 'Healthcare', limit: 500, spent: 200.00 },
  { name: 'Utilities', limit: 200, spent: 85.00 },
  { name: 'Housing', limit: 2000, spent: 1500.00 },
];

export const aiInsights = [
  {
    id: 1,
    type: 'warning',
    message: 'You spent 20% more on food this month compared to last month.',
    category: 'Food & Dining',
  },
  {
    id: 2,
    type: 'success',
    message: 'Great job staying under your entertainment budget!',
    category: 'Entertainment',
  },
  {
    id: 3,
    type: 'info',
    message: 'Your transportation expenses are 15% below average.',
    category: 'Transportation',
  },
  {
    id: 4,
    type: 'warning',
    message: 'Housing expenses are at 75% of your monthly budget.',
    category: 'Housing',
  },
]; 