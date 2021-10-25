import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { KeyboardArrowRight, GitHub, Facebook, Email } from '@material-ui/icons';
import { ButtonGroup, Button } from "@material-ui/core";
import "./css/about.css";

const About = () => {

  useEffect(() => {
    document.title = "MD IH Alif || About";
  }, []);
  
    return (
        <>
          <div className="container mt-5">
            <div className="row main_about">
              <div className="col-12 col-md-8 col-lg-6">
                <figure>
                    <img src="website_image/alif.jpg" alt="About Image" className="img-fluid img-responsive about_img" />
                </figure>
              </div>
              <div className="col-12 col-md-8 col-lg-6">
                <h1 className="my_font" style={{ fontWeight: 700 }}> MD. Inzamul Haque </h1>
                <h2 className="my_font"> ( MD IH  Alif ) </h2>
                <h3 className="my_font">
                  I'm a <span style={{ fontWeight: 700, letterSpacing: "3px" }}>
                               <span style={{ color: "#3E9F43" }}>M</span>
                               <span style={{ color: "#CB7C74" }}>E</span>
                               <span style={{ color: "#6DD2EC" }}>R</span>
                               <span style={{ color: "#9CBC5C" }}>N</span>
                           </span>
                  Stack Developer
                </h3>
                <p>
                  <NavLink to="/skills">
                      <button className="home_page_btn"> Skills <KeyboardArrowRight/> </button>
                  </NavLink>
                </p>
                <ButtonGroup variant="contained" aria-label="primary button group">
                  <a href="https://github.com/inzamulhaque" target="_black">
                    <Button> <GitHub/> </Button>
                  </a>
                  <a href="https://web.facebook.com/mdihalif.2002" target="_black">
                    <Button> <Facebook/> </Button>
                  </a>
                  <a href="mailto:mdihalif@yahoo.com" target="_black">
                    <Button> <Email/> </Button>
                  </a>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </>
    )
}

export default About;
