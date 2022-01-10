import './sidebars.css'
import CompanyLogo from "../../assets/svg/CompanyLogo/CompanyLogo";
import routes from '../../routes';
import {NavLink} from "react-router-dom";
import {useState} from "react";
import UserService from "../../services/UserService";
import SubMenu from "./SubMenu";
import {Col} from "react-bootstrap";
const SideBar = ()=>{

    const [activeSiteName,setActiveSiteName] = useState();
    // const handleLogout = () => UserService.logout();

    return (
        <>
            <div className="flex-column flex-shrink-0 text-white bg-dark" style={{height:"100%",paddingLeft:1+"vw",paddingTop:1+"vw"}}>

                <CompanyLogo width={50} height={50}/>
                    <span className="fs-4" style={{paddingLeft:1+"vw"}}>{activeSiteName ? activeSiteName:"Dashboard"}</span>


                <ul className="nav nav-pills flex-column mb-auto" style={{paddingTop:5+"vh"}}>
                    {routes.map((prop,key)=>{
                        if (prop.redirect)
                            return null;
                        if (!UserService.hasRealmRole(prop.type))
                            return  null;
                        // if(prop.submenu.length !== 0 && UserService.hasRealmRole(prop.type))
                        //     return <SubMenu key={key} title={prop.name} icon={prop.icon} items={prop.submenu} setActiveSiteName={setActiveSiteName}/>
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
            </div>

        </>

    )
}

export default SideBar;