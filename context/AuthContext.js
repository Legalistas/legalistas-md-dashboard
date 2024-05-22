import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(null);

  useEffect(() => {
    // Accede a localStorage solo en el lado del cliente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      _setUser(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    _setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
