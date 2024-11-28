import React from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCalendarPlus } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";

const Dashboard = () => {
    const dashboardItems = [
        {id: 1, name: "Schedule Meeting", icon: <FaCalendarPlus />, href: "#"},
        {id: 2, name: "Manage Meetings", icon: <FaCalendar />, href: "#"},
        {id: 3, name: "Users & Permissions", icon: <FaUsers />, href: "#"},
        {id: 4, name: "Notifications", icon: <IoIosNotifications />, href: "#"},
        {id: 5, name: "Analytics", icon: <BsGraphUpArrow />, href: "#"},
        {id: 6, name: "Settings", icon: <IoSettingsSharp />, href: "#"}
    ];

    const displayDashboardItems = () => {
        let liElements = dashboardItems.map((item) => {
            const liElement = 
                <li className="list-group-item" id={item.id} key={item.id}>
                    <a href={item.href} className="list-group-item list-group-item-action" onClick={() => handleDashboardClick(item.id, item.href)}>{item.icon} {item.name}</a>
                </li>
            return liElement;
        });
        return liElements;
    };
    
    const handleDashboardClick = (id) => {
        const appendClassName = "active";
        for(let i=1; i<=dashboardItems.length; i++) {
            document.getElementById(i).classList.remove(appendClassName);
        }
        document.getElementById(id).classList.add(appendClassName);

        // const showElementId = href.split("#");
        // const displayId = showElementId[1] ? showElementId[1] : href;
        // if(displayId !== "#")
        //     document.getElementsByClassName('displayDiv')[0].style.display = 'block';
        // else
        //     document.getElementsByClassName('displayDiv')[0].style.display = 'none';
    };

    return (
    <div className='card'>
        <div className='card-header bg-dark text-light'>
            <h4 className='text-center'><span><AiOutlineDashboard /></span> Dashboard</h4>
        </div>
        <ul className="list-group list-group-flush inActive">
            {displayDashboardItems()}
        </ul>
    </div>
    );
};

export default Dashboard;