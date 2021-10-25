import React, { useEffect } from 'react';
import { Box, Button } from "@material-ui/core";
import { GitHub } from '@material-ui/icons';
import ProgressLable from './ProgressLable';
import "./css/skills.css";

const Skills = () => {
    
    useEffect(() => {
        document.title = "MD IH Alif || Skills";
    }, []);

    return (
        <>
           <div className="container mt-5">
                <div className="row skills_div">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h3 className="my_font"> I'm a Web Designer, Developer & MERN Stack Developer </h3>
                        <h5 style={{ textTransform: "capitalize" }}> I Have Skill In Html5, Css3, Javascript, ES6, React JS, Express JS, Node JS, MongoDB, Bootstrap 4 & 5, Etc. </h5>
                        <h5 style={{ textTransform: "capitalize" }}> i have some knowledge in PHP also </h5>
                        <p style={{ textTransform: "capitalize" }}> i have basic knowledge in wordpress & Deployment on Heroku </p>
                        <a href="https://github.com/inzamulhaque" target="_black" style={{ textDecoration: "none" }}>
                            <Button variant="contained"> Check My Github Account <GitHub/> </Button>
                        </a>
                    </div>

                    <div className="col-12 col-md-8 col-lg-6">
                        <p>
                            HTML5
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={93} />
                            </Box>
                        </p>
                        <p>
                            CSS3
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={83} color="secondary" />
                            </Box>
                        </p>
                        <p>
                            JavaScript
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={75} />
                            </Box>
                        </p>
                        <p>
                            Bootstrap
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={80} color="secondary" />
                            </Box>
                        </p>
                        <p>
                            React JS
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={65} />
                            </Box>
                        </p>
                        <p>
                            Node Js
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={73} color="secondary" />
                            </Box>
                        </p>
                        <p>
                            Express JS
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={70} />
                            </Box>
                        </p>
                        <p>
                            MongoDB
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={60} color="secondary" />
                            </Box>
                        </p>
                        <p>
                            PHP
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={80} />
                            </Box>
                        </p>
                        <p>
                            MySQL
                            <Box sx={{ width: '100%' }}>
                                <ProgressLable value={85} color="secondary" />
                            </Box>
                        </p>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Skills;
