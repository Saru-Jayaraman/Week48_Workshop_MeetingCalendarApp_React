import React from 'react';
import { FcCalendar } from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { MdOutlineSettings } from "react-icons/md";

const Navbar = () => {
    const navItems = [
        {id: 1, name: "Home", href: "#"},
        {id: 2, name: "About", href: "#"},
        {id: 3, name: "Services", href: "#"},
        {id: 4, name: "Contact", href: "#"}
    ];
    const navDemoDropdownItems = [
        {id:1, name: "Signout", href: "#", icon: <VscSignOut />},
        {id:2, name: "Settings", href: "#", icon: <MdOutlineSettings />}
    ];
    return (
    <div className='container-fluid'>
        <nav className="navbar navbar-expand-sm bg-dark" style={{height: "40px"}}>
            <FcCalendar className='mx-2' style={{width: '30px', height: '30px'}}/>
            <ul className='navbar-nav'>
                {
                    navItems.map((item) => {
                        const liItem = 
                            <li className='nav-item' key={item.id}>
                                <a className='nav-link text-light' href={item.href}>{item.name}</a>
                            </li>
                        return liItem;
                    })
                }
            </ul>
            <div className="ms-auto text-light dropdown">
                <span className='px-1'><FaCircleUser /></span>
                <button className='btn btn-dark mx-5 px-1 dropdown-toggle' type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" aria-expanded="false">Demo</button>
                <ul className="dropdown-menu bg-secondary" aria-labelledby="dropdownMenuButton">
                    {
                        navDemoDropdownItems.map((item) => {
                            const liItem = 
                                <li className='border rounded bg-light m-1' key={item.id} >
                                    <a className="dropdown-item" href={item.href}>
                                        <span>{item.icon}</span> <b>{item.name}</b>
                                    </a>
                                </li>
                            return liItem;
                        })
                    }
                </ul>
            </div>
        </nav>
    </div>
    );
};

export default Navbar;