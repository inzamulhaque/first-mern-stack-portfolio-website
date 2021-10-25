import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../App";
import "./css/navbar.css";

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">MD IH <span style={{ color: "#274BFC" }}>  Alif </span> </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 px-3 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" aria-current="page" to="/"> Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/about"> About Us </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/skills"> Skills </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/contact"> Contact Us </NavLink>
                        </li>
                        { state? null :
                        <>
                            <li className="nav-item">
                                <NavLink exact activeClassName="active" className="nav-link" to="/signin"> Sign In </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact activeClassName="active" className="nav-link" to="/signup"> Sign Up </NavLink>
                            </li>
                        </>
                        }
                        { state? 
                            <li className="nav-item">
                                <NavLink exact activeClassName="active" className="nav-link" to="/profile"> Profile </NavLink>
                            </li>
                        : null 
                        }
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;
