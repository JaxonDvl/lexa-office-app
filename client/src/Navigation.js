import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

const Navigation = props => {
    if (props.loggedIn) {
        return (
            <nav className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">

                        <Link to="/reports" className="nav-link">Reports</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Register
						</Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link" onClick={props._logout}>
                            Logout
						</Link>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
						</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
						</Link>
                    </li>
                   
                </ul>
            </nav>
        )
    }
}

export default Navigation