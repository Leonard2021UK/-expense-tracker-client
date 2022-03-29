import React, { useState } from "react";

import {  NavLink } from "react-router-dom";
import UserService from "../../services/UserService";

import "./sidebars.css"


const SubMenu = (props) => {
    const {items,setActiveSiteName } = props;
    return (
        <ul className="nav nav-pills flex-column mb-auto" >
            {items.map((prop,key)=>{
                if (prop.redirect)
                    return null;
                if (!UserService.hasRealmRole(prop.type))
                    return  null;
                return(
                    <li className="nav-item" key={key}>
                        <NavLink
                            to={prop.layout + prop.path}
                            className="nav-link"
                            activeClassName="active"
                            isActive={(match,location)=>{
                                if(match){
                                    setActiveSiteName(prop.name)
                                }
                            }}
                        >
                            <svg className="bi me-2" width="16" height="16" style={{fill:"#FFF"}} >
                                <use xlinkHref={prop.icon}/>
                            </svg>
                            <span className="sideBar-menuItem-text">
                                {prop.name}
                            </span>
                        </NavLink>
                    </li>
                )
            })}
        </ul>






        // <div>
        //     <div className="dropdown-toggle" onClick={toggle}>
        //         <svg className="bi me-2" width="16" height="16" style={{fill:"#FFF"}} >
        //             <use xlinkHref={icon}/>
        //         </svg>
        //         <span className="sideBar-menuItem-text">
        //             {title}
        //         </span>
        //     </div>
        //     <div className={classNames("collapse", { "show": !collapsed })} >
        //         {items.map((item, index) => (
        //            (UserService.hasRealmRole(item.type)) ?
        //                <>
        //                    <span key={index} className="btn-toggle-nav">
        //
        //                        <NavLink
        //                            className="nav-link"
        //                            to={item.layout + item.path}
        //                            isActive={(match,location)=>{
        //                                if(match){
        //                                    setActiveSiteName(title)
        //                                }
        //                            }}
        //                        >
        //                            <svg className="bi me-2" width="16" height="16" style={{fill:"#FFF"}} >
        //                        <use xlinkHref={icon}/>
        //                    </svg>
        //                            {item.name}
        //                        </NavLink>
        //                    </span>
        //                </>:null
        //         ))}
        //     </div>
        // </div>
    );
};

export default SubMenu;
