import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Check if a user is already logged in
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("currentUser");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  // Create a new account
  const signup = (name, email, password) => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check whether this email already exists
    const existingUser = savedUsers.find(
      (item) => item.email === email
    );

    if (existingUser) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    const updatedUsers = [
      ...savedUsers,
      newUser,
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  // Login
  const login = (email, password) => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = savedUsers.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    /*
      We don't keep the password inside the
      current logged-in user object.
    */
    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(loggedInUser)
    );

    return {
      success: true,
      message: "Login successful.",
    };
  };

  // Logout
  const logout = () => {
    /*
      Only remove the current login session.

      We DO NOT remove "carts".

      This means the user's cart remains saved
      and can be loaded again when they log in.
    */
    setUser(null);

    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;