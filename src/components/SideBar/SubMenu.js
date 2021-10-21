import React, { useState } from "react";
import classNames from "classnames";

import { Link, NavLink } from "react-router-dom";
import UserService from "../../services/UserService";

import "./sidebars.css"


const SubMenu = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => setCollapsed(!collapsed);
    const { icon, title, items,show } = props;
    return (
        <div>
            <div className="dropdown-toggle" onClick={toggle}>
                <svg className="bi me-2" width="16" height="16" style={{fill:"#FFF"}} >
                    <use xlinkHref={icon}/>
                </svg>
                <span className="sideBar-menuItem-text">
                    {title}
                </span>
            </div>
            <div className={classNames("collapse", { "show": !collapsed })} >
                {items.map((item, index) => (
                   (UserService.hasRealmRole(item.type)) ?
                       <>
                           <span key={index} className="btn-toggle-nav">

                               <NavLink className={"nav-item"} to={item.layout + item.path}>
                                   <svg className="bi me-2" width="16" height="16" style={{fill:"#FFF"}} >
                               <use xlinkHref={icon}/>
                           </svg>
                                   {item.name}
                               </NavLink>
                           </span>
                       </>:null
                ))}
            </div>
        </div>
    );
};

export default SubMenu;
