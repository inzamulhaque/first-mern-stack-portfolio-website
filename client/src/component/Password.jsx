import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import { VpnKey } from '@material-ui/icons';
import "./css/signin.css";

const Password = () => {
    const history = useHistory();
    const [userdata, setUserData] = useState();
    const [password, setPassword] = useState({
        newpassword: "",
        cpassword: ""
    });

    const visitPass = async() => {
        try {
            const res =  await fetch("/passpagecheck", {
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

            const userData = await res.json();
            if (userData.error || !userData || userData.status === 401) {
                history.push("/signin");
            }

            setUserData(userData);

        } catch (error) {
            console.log(`this is error: ${error}`);
            history.push("/signin");
        }
    }

    useEffect(() => {
        visitPass();
        document.title = "MD IH Alif || Rewrite Password";
    }, []);

    const dataSubmit = async(event) => {
        event.preventDefault();
        const { newpassword, cpassword } = password;
        if (newpassword === cpassword) {
            try {
                const res = await fetch("/updatepass", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userdata, newpassword
                    })
                });

                history.push("/signin");
                
            } catch (error) {
                console.log(error);
                alert("Server Error!");
            }

        } else {
            alert("Password And Confirm Password Are Not Match!");
        }
    }
    
    return (
        <>
            <div className="container mt-5">
                <div className="row login_div">
                    <div className="col-12 col-md-8 col-lg-4">
                        <figure>
                            <img src="website_image/password.jpg" alt="Login Image" className="img-fluid img-responsive login_img" />
                        </figure>
                        <p> ac: {userdata} </p>
                    </div>

                    <div className="col-12 col-md-12 col-lg-8">
                        <h1> Set Password </h1>
                        <hr />
                        <div style={{ width: "100%" }}>
                            <form onSubmit={dataSubmit} style={{ width: "50%", margin: "auto" }}>
                                <TextField type="password" name="newpassword" label="Password" required className="login_input" onChange={(event)=> {
                                    const {name, value} = event.target;
                                    setPassword({...password, [name]: value});
                                }} value={password.password}/>

                                <TextField type="password" name="cpassword" label="confirm Password" required className="login_input" onChange={(event)=> {
                                    const {name, value} = event.target;
                                    setPassword({...password, [name]: value});
                                }} value={password.cpassword}/>

                                <Button type="submit" className="signin_btn mt-2"> <VpnKey/> Set Password </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Password;
