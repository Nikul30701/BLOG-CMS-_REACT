import React, {useState, createContext} from 'react'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (email, password) => {
        if (email === "admin@gmail.com" && password === "password"){
            const loggedInUser = {name: "Admin User",email,  role: "Admin"};
            setUser(loggedInUser);
            navigate("/dashboard");
            return {success: true};
        }
        return {success:false, message: "Invalid email or password"}
    }

    const logout = () => {
        setUser(null);
        navigate("/");
    }

    const value = {
        user,
        isAuthenticated: !!user, //  !!convert any value into a boolean
        login,
        logout,   
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
