import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./css/emailVerify.css";

const OtpForgot = () => {
    const history = useHistory();
    const [otp, setOtp] = useState();
    
    const callForgotCheck = async () => {
        try {
            const res =  await fetch("/forgotvelidcheck",{
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }

            const data = await res.json();
            if (data.error || !data || data.status === 401) {
                history.push("/forgot");
            }

        } catch (error) {
            console.log(`this is error: ${error}`);
            history.push("/forgot");
        }
    }

    useEffect(() => {
        callForgotCheck();
        document.title = "MD IH Alif || OTP Verify";
    }, []);

    const reSent = async() => {
        try {
            const res =  await fetch("/reSentOtp",{
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "include",
                method: "PATCH"
            });

        } catch (error) {
            console.log(`this is error: ${error}`);
        }
    }

    const checkOTP = async(event)=> {
        event.preventDefault();
        try {
            const res = await fetch("/ceckOTP", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    otp
                })
            });
    
            const data = await res.json();
            console.log(`data: ${data}`);
    
            if (data.timeOut) {
                alert(data.timeOut);
                console.log("time");
            } else if (data.message) {
                history.push("/PasswordWrite");
                console.log("ok");
            } else if (data.error) {
                alert(data.error);
                console.log("server");
            } else {
                alert("Server Down");
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="emailVerify_div">
                    <h3> Check Your Email & Spam File </h3> 
                    <form onSubmit={checkOTP} method="POST">

                        <TextField type="number" name="otp" label="Enter Your Otp" required  onChange={(e)=>setOtp(e.target.value)} value={otp}/>

                        <Button type="submit" className="verifyEmail_btn"> Check OTP </Button>

                        <Button className="resent_otp_btn" onClick={reSent}> Resent Otp </Button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default OtpForgot;
