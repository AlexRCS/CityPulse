import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : {};
  });

  const updateUserData = (data) => {
    setUserData({
      ...data,
      id: Math.floor(Math.random() * 99999),
    });
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log('data do obj', userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserContext);
}
