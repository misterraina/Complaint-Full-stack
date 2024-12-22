import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to wait for the token validation
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Validate token and fetch user details on initial render
  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/users/verify-token", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await response.json();
          if (response.ok && data.valid) {
            setUser(data.user);  // Set user data if valid
            setIsAuthenticated(true);
          } else {
            logout();  // Clear cookies if token is invalid
          }
        } catch (error) {
          console.error("Error validating token:", error);
          logout();
        }
      } else {
        setLoading(false); // Finish loading if no token is present
      }

      // Ensure loading is set to false even if the token check fails
      setLoading(false);
    };

    validateToken();
  }, []);

  // Login function
  const login = (userData, token) => {
    setUser(userData);
    Cookies.set("token", token, { expires: 7 }); // Set token with 7 days expiration
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {/* Render the children only after loading is finished */}
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
