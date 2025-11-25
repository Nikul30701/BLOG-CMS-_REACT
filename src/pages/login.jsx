import React, {useState, useContext} from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const login = () => {
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("password")
    const [error, setError] = useState("")
    const login = useContext(AuthContext)
    const loaction = useLocation()

    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (!result.success) {
            setError(result.message)
        } else {
            // if need we create later
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form 
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
            <label>
                Email
                <input 
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    autoComplete='Username'
                />
            </label>

            <label>
                Password
                <input 
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    autoComplete='Password'
                />
            </label>
            </form>
        </div>
    )
}

export default login
