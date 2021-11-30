import React from "react";
import { Link } from "react-router-dom";
import INavBar from "../interfaces/iNavBar";

const Navbar = ({title}: INavBar) =>{
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
                    <Link to='/planner'>Planner</Link>
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