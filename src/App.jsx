import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./ui/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ExpenseTrackingPage from "./pages/ExpenseTrackingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/expense-tracker",
        element: <ExpenseTrackingPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
