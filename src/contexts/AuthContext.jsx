// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getLoggedInUser } from "../services/authApi";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Check before calling API

    if (!token) {
      setLoading(false);
      return; // No API call if no token
    }

    getLoggedInUser()
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        toast.error("Please login to continue");
        localStorage.removeItem("token"); // clear invalid token
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
