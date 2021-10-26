import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./css/emailVerify.css";

const EmailVerify = () => {
    const history = useHistory();
    const [otp, setOtp] = useState();
    const [otpData, setOtpData] = useState({});

    const callEmailVerify = async () => {
        try {
            const res =  await fetch("/emailverAuth",{
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
            setOtpData(data);
            if (data.error || !data || data.status === 401) {
                history.push("/signup");
            }

        } catch (error) {
            console.log(`this is error: ${error}`);
            history.push("/signup");
        }
    }

    const otpVerifed = async() => {
        try {
            const res =  await fetch("/verifed",{
                
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "include",
                method: "PATCH"
            });

            history.push("/signin");
            

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callEmailVerify();
        document.title = "MD IH Alif || Email Verify";
    }, []);

    const checkOTP = (event) => {
        event.preventDefault();
        let time = otpData.extime - Date.now();
        if (time > 0) {
            if (otpData.otp == otp){
                otpVerifed();
            } else {
                alert("Invalid OTP! Please Enter Valid OTP");
            }

        } else {
            alert("Time Over! Please Resent OTP");
        }
        
    }

    const reSent = async() => {
        try {
            const res =  await fetch("/reSent",{
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "include",
                method: "PATCH"
            });

            const data = await res.json();

        } catch (error) {
            console.log(`this is error: ${error}`);
        }
        callEmailVerify();
    }

    return (
        <>
            <div className="container mt-5">
                <div className="emailVerify_div">
                    <h3> Check Your Email & Spam File </h3> 
                    <form onSubmit={checkOTP}>

                        <TextField type="number" name="otp" label="Enter Your Otp" required  onChange={(e)=>setOtp(e.target.value)} value={otp}/>

                        <Button type="submit" className="verifyEmail_btn"> Verify Email </Button>

                        <Button className="resent_otp_btn" onClick={reSent}> Resent Otp </Button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EmailVerify;
