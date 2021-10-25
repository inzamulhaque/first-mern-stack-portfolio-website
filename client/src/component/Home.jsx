import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Send } from '@material-ui/icons';
import "./css/home.css";

const Home = () => {
    useEffect(() => {
        document.title = "MD IH Alif || Home";
    }, []);
    return (
        <>
           <div className="container mt-5">
               <div className="row home_main_div">
                   <div className="col-12 col-md-8 col-lg-6 order-2 order-lg-1">
                       <h1 className="my_font" style={{ fontWeight: 700 }}> MD IH <span style={{ color: "#274BFC" }}> Alif </span> </h1>
                       <h3>
                           <span style={{ letterSpacing: "3px" }}>
                               <span style={{ color: "#3E9F43" }}>M</span>
                               <span style={{ color: "#CB7C74" }}>E</span>
                               <span style={{ color: "#6DD2EC" }}>R</span>
                               <span style={{ color: "#9CBC5C" }}>N</span>
                           </span>
                           <span className="my_font" style={{ fontWeight: 700, letterSpacing: "1px" }}>
                               <span style={{ color: "#274BFC" }}> Stack </span>
                               <span> Developer </span>
                           </span>
                       </h3>
                       <NavLink to="/contact">
                           <button className="home_page_btn"> Get In Touch <Send/> </button>
                       </NavLink>
                   </div>

                   <div className="col-12 col-md-8 col-lg-6 order-1 order-lg-2">
                        <figure>
                            <img src="website_image/mern.jpg" alt="MERN Image" className="img-fluid img-responsive home_img" />
                        </figure>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Home;
