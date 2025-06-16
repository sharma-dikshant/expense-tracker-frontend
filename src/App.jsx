import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./ui/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ExpenseTrackingPage from "./pages/ExpenseTrackingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Transactions from "./pages/Transactions";
import ErrorFallBack from "./ui/ErrorFallBack";
import { protectedLoader } from "./utils/protectedLoader";
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>Something went wrong!</div>,
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
        loader: protectedLoader,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
        loader: protectedLoader,
      },
      {
        path: "/transactions",
        element: <Transactions />,
        loader: protectedLoader,
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
