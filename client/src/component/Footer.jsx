import React from 'react'
import { Copyright } from '@material-ui/icons';
import "./css/footer.css";

const Footer = () => {
    return (
        <>
            <footer>
                <p> MD IH Alif <Copyright/> Copyright { new Date().getFullYear() } </p>
            </footer> 
        </>
    )
}

export default Footer;
