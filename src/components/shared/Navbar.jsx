import React from 'react';
import { FcCalendar } from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
    const navItems = [
        {id: 1, name: "Home", href: "#"},
        {id: 2, name: "About", href: "#"},
        {id: 3, name: "Services", href: "#"},
        {id: 4, name: "Contact", href: "#"}
    ];
    return (
    <div className='container-fluid'>
        <nav className="navbar navbar-expand-sm bg-dark">
            <FcCalendar className='mx-2' style={{width: '30px', height: '30px'}}/>
            <ul className='navbar-nav'>
                {
                    navItems.map((item) => {
                        const liItem = 
                            <li className='nav-item' key={item.id}>
                                <a className='nav-link text-light' href={item.href}>{item.name}</a>
                            </li>
                        return liItem;
                    }
                    )
                }
            </ul>
            <div className="ms-auto mx-2 text-light dropdown">
                <span className='px-1'><FaCircleUser /></span>
                <button className='btn btn-dark px-1 dropdown-toggle' type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" aria-expanded="false">Demo</button>
                <ul className="dropdown-menu text-primary" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#">Signout</a></li>
                </ul>
            </div>
        </nav>
    </div>
    );
};

export default Navbar;