import AuthService from '../services/auth.js/auth';
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (username, password) => {
        let data = {
            email: username,
            password: password
        }
        return AuthService.login(data);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('tokenNodeJs');
        localStorage.removeItem('userNodeJs');
    };

    const value = {
        currentUser, login, logout, setCurrentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}