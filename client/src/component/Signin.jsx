import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from "../App";
import { TextField, Button } from "@material-ui/core";
import { VpnKey } from '@material-ui/icons';
import "./css/signin.css";

const Signin = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        document.title = "MD IH Alif || Sign In";
    }, []);

    const dataSubmit = async(event) => {
        event.preventDefault();
        const { email, password } = loginData;
        try {
            const res = await fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();
            if (!data) {
                alert("server Down");
            } else if (data.error) {
                alert(data.error);
            } else if (data.resent) {
                history.push("/EmailVerify");
            } else if (data.message) {
                dispatch({type: "USER", payload: true});
                history.push("/profile");
            } else {
                alert("Internal Problem");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row login_div">
                    <div className="col-12 col-md-8 col-lg-4">
                        <figure>
                            <img src="website_image/login.png" alt="Login Image" className="img-fluid img-responsive login_img" />
                        </figure>
                        <h3 style={{ textAlign: "center" }}> <NavLink to="/signup" style={{ textDecoration: "none" }}> I've No Account </NavLink> </h3>
                    </div>

                    <div className="col-12 col-md-12 col-lg-8">
                        <h1> Sign In </h1>
                        <hr />
                        <div style={{ width: "100%" }}>
                            <form onSubmit={dataSubmit} style={{ width: "50%", margin: "auto" }}>
                                <TextField type="email" name="email" label="Email" required className="login_input" onChange={(event)=> {
                                    const {name, value} = event.target;
                                    setLoginData({...loginData, [name]: value});
                                }} value={loginData.email}/>

                                <TextField type="password" name="password" label="Password" required className="login_input" onChange={(event)=> {
                                    const {name, value} = event.target;
                                    setLoginData({...loginData, [name]: value});
                                }} value={loginData.password}/>

                                <Button type="submit" className="signin_btn mt-2"> <VpnKey/> SignIn </Button>

                                <NavLink to="/forgot" style={{ textDecoration: "none" }}>
                                    <Button type="submit" className="forgot_btn mt-2"> FORGOT Password </Button>
                                </NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;
