import './carousel.css';
import carouselImg1 from '../../assets/img/bg2.jpg';
import carouselImg2 from '../../assets/img/bg3.jpg';
import carouselImg3 from '../../assets/img/bg4.jpg';
import LoginModal from "../../components/Modals/LoginModal/LoginModal";

import face1 from '../../assets/img/faces/kendall.jpg';
import face2 from '../../assets/img/faces/christian.jpg';
import face3 from '../../assets/img/faces/marc.jpg';
import NavBar from "../../components/Navbar/NavBar";
import React,{useState,useEffect} from 'react';
import RegisterModal from "../../components/Modals/RegisterModal/RegisterModal";


const IndexPage = (props) => {
    const {path,pathHandler} = props;

    useEffect(()=>{
        pathHandler(path)
    },[])

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggleLoginModal = () => setShowLogin(!showLogin);
    const toggleRegisterModal= () => setShowRegister(!showRegister);

    return (
        <>
            <NavBar toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal}/>
            <LoginModal handleClose={toggleLoginModal} show={showLogin} toggleRegisterModal={toggleRegisterModal}/>
            <RegisterModal toggleRegisterModal={toggleRegisterModal} show={showRegister}/>
            <main>

                <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"
                                aria-current="true" aria-label="Slide 1"/>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"
                                aria-label="Slide 2"/>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"
                                aria-label="Slide 3"/>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={carouselImg1} alt=""/>

                            <div className="container">
                                <div className="carousel-caption text-start">
                                    <h1>Example headline.</h1>
                                    <p>Some representative placeholder content for the first slide of the carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Sign up today</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImg2} alt=""/>

                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Another example headline.</h1>
                                    <p>Some representative placeholder content for the second slide of the carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImg3} alt=""/>

                            <div className="container">
                                <div className="carousel-caption text-end">
                                    <h1>One more for good measure.</h1>
                                    <p>Some representative placeholder content for the third slide of this carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                {/*// <!-- Marketing messaging and featurettes*/}
                {/*// ================================================== -->*/}
                {/*// <!-- Wrap the rest of the page in another container to center all the content. -->*/}

                <div className="container marketing">

                    {/*// <!-- Three columns of text below the carousel -->*/}
                    <div className="row">
                        <div className="col-lg-4">
                            <img src={face1} alt=""/>

                            <h2>Heading</h2>
                            <p>Some representative placeholder content for the three columns of text below the carousel.
                                This is the first column.</p>
                            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>
                        {/*// <!-- /.col-lg-4 -->*/}
                        <div className="col-lg-4">
                            <img src={face2} alt=""/>


                            <h2>Heading</h2>
                            <p>Another exciting bit of representative placeholder content. This time, we've moved on to
                                the second column.</p>
                            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>
                        {/*// <!-- /.col-lg-4 -->*/}
                        <div className="col-lg-4">
                            <img src={face3} alt=""/>


                            <h2>Heading</h2>
                            <p>And lastly this, the third column of representative placeholder content.</p>
                            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>
                        {/*// <!-- /.col-lg-4 -->*/}
                    </div>
                    {/*// <!-- /.row -->*/}


                    {/*// <!-- START THE FEATURETTES -->*/}

                    <hr className="featurette-divider"></hr>

                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading">First featurette heading. <span
                                className="text-muted">It’ll blow your mind.</span></h2>
                            <p className="lead">Some great placeholder content for the first featurette here.
                                Imagine some exciting prose here.</p>
                        </div>
                        <div className="col-md-5">
                            <svg
                                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                                aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice"
                                focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#eee"/>
                                <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                            </svg>

                        </div>
                    </div>

                    <hr className="featurette-divider"></hr>

                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading">Oh yeah, it’s that good. <span
                                className="text-muted">See for yourself.</span></h2>
                            <p className="lead">Another featurette? Of course. More placeholder content here to
                                give you an idea of how this layout would work with some actual real-world
                                content in place.</p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <svg
                                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                                aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice"
                                focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#eee"/>
                                <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                            </svg>

                        </div>
                    </div>

                    <hr className="featurette-divider"></hr>

                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading">And lastly, this one. <span
                                className="text-muted">Checkmate.</span></h2>
                            <p className="lead">And yes, this is the last block of representative
                                placeholder content. Again, not really intended to be actually read, simply
                                here to give you a better view of what this would look like with some actual
                                content. Your content.</p>
                        </div>
                        <div className="col-md-5">
                            <svg
                                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                                aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice"
                                focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#eee"/>
                                <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                            </svg>

                        </div>
                    </div>

                    <hr className="featurette-divider"></hr>

                    {/*// <!-- /END THE FEATURETTES -->*/}

                </div>
                {/*// <!-- /.container -->*/}


                {/*// <!-- FOOTER -->*/}
                <footer className="container">
                    <p className="float-end"><a href="#">Back to top</a></p>
                    <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
                    </p>
                </footer>
            </main>
        </>
    )

}

export default IndexPage;