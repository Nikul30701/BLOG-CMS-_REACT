import React, {use, useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const linkStyle = ({isActive}) => ({
    marginRight: "1rem",
    textDecoration: isActive ? "underline" : "none",
    color: isActive ? "blue" : "black",
})

const NavBar = () => {

    const {isAuthenticated, user, logout} = useContext(AuthContext);

    return (
        <nav>
            <div>
                <Link to='/' style={{marginRight: "1rem", fontWeight:"bold" }}>
                    Blog CMS
                </Link>
                <NavLink to="/" style={linkStyle}>
                    Home
                </NavLink>
                {isAuthenticated && (
                    <>
                <NavLink to="/dashbord" style={linkStyle}>
                    Dashboard
                </NavLink>
                <NavLink to='/create' style={linkStyle}>
                    New Post
                </NavLink>
                </>
                )}
            </div>
            <div>
            {isAuthenticated ? (
                <>
                    <span>
                        Welcome, {user?.name || user?.email}
                    </span>
                    <button onClick={logout}>Logout</button>
                </>
            ): (
                <NavLink to='/login' style={linkStyle}>
                    Login
                </NavLink>
            )}   
        </div>
    </nav>
    );
}

export default NavBar
