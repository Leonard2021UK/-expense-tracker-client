import './sidebars.css'
import CompanyLogo from "../../assets/svg/CompanyLogo/CompanyLogo";
import routes from '../../routes';
import {NavLink} from "react-router-dom";
import {useState} from "react";
import UserService from "../../services/UserService";
import SubMenu from "./SubMenu";
const SideBar = ()=>{

    const [activeSiteName,setActiveSiteName] = useState();
    console.log(UserService.getToken())
    // const handleLogout = () => UserService.logout();

    return (
        <>
        <div className="sideBarContainer">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{height:"100%"}}>

                <CompanyLogo width={50} height={50}/>
                    <span className="fs-4">{activeSiteName}</span>

                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    {routes.map((prop,key)=>{
                        if (prop.redirect)
                            return null;
                        if (!UserService.hasRealmRole(prop.type))
                            return  null;
                        if(prop.submenu.length !== 0 && UserService.hasRealmRole(prop.type))
                            return <SubMenu key={key} title={prop.name} icon={prop.icon} items={prop.submenu}/>
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

        </div>
        </>

    )
}

export default SideBar;