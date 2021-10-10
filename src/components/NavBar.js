import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({title}) =>{
    return (
        <nav className="navbar bg-primary">
            <h1>
                {title}
            </h1>
            <ul>
                <li>
                    <Link to='/options'>Options</Link>
                </li>
                <li>
                    <Link to='/waivers'>Waivers</Link>
                </li>
                <li>
                    <Link to='/plan'>Plan</Link>
                </li>
                <li>
                    <Link to='/'>Home</Link>
                </li>
            </ul>
        </nav>
    )
}

Navbar.defaultProps={
    title:'MS Advisor'
};

export default Navbar