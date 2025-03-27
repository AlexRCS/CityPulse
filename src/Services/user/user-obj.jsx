import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateUserData = (data) => {
    setUserData(data);
  };

  const clearUserData = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserDataContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserDataContext must be used within a UserDataProvider");
  }
  return context;
}
