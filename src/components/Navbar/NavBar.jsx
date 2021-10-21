import CompanyLogo from "../../assets/svg/CompanyLogo/CompanyLogo";
import UserService from "../../services/UserService";
import PublicRenderer from "../../utilityComponents/PublicRenderer";
import AuthRenderer from "../../utilityComponents/AuthRenderer";

import './navbar.css';
const NavBar = (props)=>{

    const {handleShowLogin,handleShowRegister} = props;

    const handleLogin = () => UserService.login();

    const handleRegister= () => UserService.register();

    const handleLogout = () => UserService.logout();

    return(
          <>

              <header className="p-3 bg-dark text-white">
                  <div className="container">
                      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                          <PublicRenderer>
                              <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                                  <CompanyLogo width={25} height={25}/>
                              </a>
                          </PublicRenderer>


                          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                              <PublicRenderer>
                                  <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
                                  <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                                  <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                                  <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                                  <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                              </PublicRenderer>
                          </ul>

                          <div className="text-end">
                              <PublicRenderer>
                                  <button className="btn btn-outline-light me-2" onClick={handleShowLogin}>Login</button>
                                  <button className="btn btn-warning" onClick={handleShowRegister}>Register</button>
                                  {/*<a href={"/login"} className="btn btn-outline-light me-2">Login</a>*/}
                                  {/*<a href={"/logout"} className="btn btn-warning">Register</a>*/}

                              </PublicRenderer>
                              <AuthRenderer>
                                  <div className="dropdown">
                                      <a href="#"
                                         className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                         id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                          <img src="https://github.com/mdo.png" alt="" width="32" height="32"
                                               className="rounded-circle me-2"/>
                                          <strong id="avatar-title">mdo</strong>
                                      </a>
                                      <ul className="dropdown-menu dropdown-menu-dark text-small shadow"
                                          aria-labelledby="dropdownUser1">
                                          <li><a className="dropdown-item" href="#">New project...</a></li>
                                          <li><a className="dropdown-item" href="#">Settings</a></li>
                                          <li><a className="dropdown-item" href="#">Profile</a></li>
                                          <li>
                                              <hr className="dropdown-divider"/>
                                          </li>
                                          <li><button className="sign-out-btn" onClick={handleLogout}>Sign out</button></li>
                                      </ul>
                                  </div>
                              </AuthRenderer>
                          </div>
                      </div>
                  </div>
              </header>
          </>

    )
}

export default NavBar;