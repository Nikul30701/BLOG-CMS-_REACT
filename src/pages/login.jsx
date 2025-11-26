import React, {useState, useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Login = () => {
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("password")
    const [error, setError] = useState("")

    const {login} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e) => { // Made async in anticipation of real API calls
        e.preventDefault();
        setError(""); // Clear previous errors
        
        // Ensure the login function exists before calling
        if (!login) {
            setError("Authentication service is unavailable. Please check AuthContext.");
            return;
        }

        try {
            const result = await login(email, password); 
            
            if (!result.success) {
                setError(result.message || "Login failed. Please check your credentials.");
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError("An unexpected error occurred during login.");
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-white">Login</h1>
                <p className="text-sm text-slate-400">
                Use demo credentials to access the dashboard and CMS features.
                </p>
            </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs text-slate-400 mb-3">
                emo credentials:{" "}
            <span className="font-mono text-slate-200">
                admin@blog.com / password
            </span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
                autoComplete="on"
            >
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-200">Email</label>
                <input
                    type="email"
                    value={email}
                    autoComplete="username"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-200">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {error && (
                <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
                {error}
                </p>
            )}

            <button
                type="submit"
                className="w-full inline-flex justify-center items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Login
            </button>
            </form>

            <p className="mt-3 text-xs text-slate-500">
            After login you will be redirected to:{" "}
            <span className="font-mono text-slate-300">{from}</span>
            </p>
        </div>
    </div>
    )
}

export default Login
