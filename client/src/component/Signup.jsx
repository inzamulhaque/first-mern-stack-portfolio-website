import React, { useState, useEffect } from 'react';
import { NavLink, useHistory  } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import { HowToReg } from '@material-ui/icons';
import "./css/signin.css";

const Signup = () => {
    const history = useHistory();
    const [userVal, setUserVal] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirm_password: ""
    });

    useEffect(() => {
        document.title = "MD IH Alif || Sign Up";
    }, []);

    const inputEvent = (event) => {
        const {name, value} = event.target;
        setUserVal({...userVal, [name]: value});
    }

    const PostData = async(event) => {
        event.preventDefault();
        const { name, email, phone, address, password, confirm_password } = userVal;
        try {
            if (password === confirm_password) {
                const sendData = await fetch("/userSignup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, email, phone, address, password, confirm_password
                    })
                });

                const res = await sendData.json();
                console.log(res);

                if (res.error || !res) {
                    alert(`sorry ${name}, SignUp failed!, ${res.error}`);
                } else {
                    history.push("/EmailVerify");
                }

            } else {
                alert("your password and confirm password are not same")
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
                            <img src="website_image/signup.jpg" alt="Login Image" className="img-fluid img-responsive login_img" />
                        </figure>
                        <h3 style={{ textAlign: "center" }}> <NavLink to="/signin" style={{ textDecoration: "none" }}> I've Account </NavLink> </h3>
                    </div>

                    <div className="col-12 col-md-12 col-lg-8">
                        <h1> Sign Up </h1>
                        <hr />
                        <div style={{ width: "100%" }}>
                            <form method="POST" onSubmit={PostData} style={{ width: "50%", margin: "auto" }}>
                                <TextField type="text" name="name" label="Name" required className="login_input" onChange={inputEvent} value={userVal.name}/>

                                <TextField type="email" name="email" label="Email" required className="login_input" onChange={inputEvent} value={userVal.email}/>

                                <TextField type="number" name="phone" label="Phone Number" required className="login_input" onChange={inputEvent} value={userVal.phone}/>

                                <TextField type="text" name="address" label="Address" required className="login_input" onChange={inputEvent} value={userVal.address}/>

                                <TextField type="password" name="password" label="Password" required className="login_input" onChange={inputEvent} value={userVal.password}/>

                                <TextField type="password" name="confirm_password" label="Confirm Password" required className="login_input" onChange={inputEvent} value={userVal.confirm_password}/>

                                <Button type="submit" className="signin_btn mt-2"> <HowToReg/> SignUp </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
