import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import { Search } from '@material-ui/icons';
import "./css/signin.css";

const Forgot = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");

    useEffect(() => {
        document.title = "MD IH Alif || Forgot Your Password";
    }, []);

    const sendOTP = async(event) => {
        event.preventDefault();
        try {
            const res = await fetch("/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
            } else if (data.message) {
                history.push("/OtpForgot");
            } else {
                alert("Server Down");
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
                            <img src="website_image/forgot.jpg" alt="Login Image" className="img-fluid img-responsive login_img" />
                        </figure>
                    </div>

                    <div className="col-12 col-md-12 col-lg-8">
                        <h1> Search Your Acoount </h1>
                        <hr />
                        <div style={{ width: "100%" }}>
                            <form onSubmit={sendOTP} style={{ width: "50%", margin: "auto" }}>
                                <TextField type="email" name="email" label="Email" required className="login_input" onChange={(event) => setEmail(event.target.value)} value={email}/>

                                <Button type="submit" className="signin_btn mt-2"> <Search/> Search And Send OTP </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot;
