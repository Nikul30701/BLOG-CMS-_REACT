import React, {useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
        `text-sm font-medium transition ${
        isActive ? "text-white" : "text-slate-300 hover:text-white"
    }`;

const NavBar = () => {

    const {isAuthenticated, user, logout} = useContext(AuthContext);

    return (
        <nav className="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-20">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className="text-lg font-semibold text-white tracking-tight"
                >
                    Nikul's Blog
                </Link>
                <div className="flex items-center gap-4">
                    <NavLink to="/" className={linkClass}>
                    Home
                    </NavLink>
                    {isAuthenticated && (
                    <>
                        <NavLink to="/dashboard" className={linkClass}>
                        Dashboard
                        </NavLink>
                        <NavLink to="/create" className={linkClass}>
                        New Post
                        </NavLink>
                    </>
                    )}
                </div>
                </div>

                <div className="flex items-center gap-3">
                {isAuthenticated ? (
                    <>
                    <span className="text-xs sm:text-sm text-slate-300">
                        {user?.name || user?.email}
                    </span>
                    <button
                        onClick={logout}
                        className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition"
                    >
                        Logout
                    </button>
                    </>
                ) : (
                    <NavLink
                    to="/login"
                    className="text-sm font-medium text-slate-300 hover:text-white"
                    >
                    Login
                    </NavLink>
                )}
                </div>
            </div>
        </nav>    
    );
}

export default NavBar
