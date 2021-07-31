import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storagedUser = sessionStorage.getItem('@App:user');
  //   const storagedToken = sessionStorage.getItem('@App:token');

  //   if (storagedToken && storagedUser) {
  //     setUser(JSON.parse(storagedUser));
  //     api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
  //   }
  // }, []);

  async function Login(userData) {
    const response = await api.post('https://localhost:3000', userData);

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
    // sessionStorage.setItem('@App:token', response.data.token);
  }

  function Logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}