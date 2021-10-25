import React, { useEffect, useState, useContext  } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from "../App";
import { Button } from "@material-ui/core";
import { Lock } from '@material-ui/icons';
import "./css/profile.css";

const Profile = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callProfile = async() => {
        try {
            const res = await fetch("/checklogin", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  credentials: "include"
            });
            const data = await res.json();
            setUserData(data);

        } catch (error) {
            console.log(error);
            history.push("/signin");
        }
    }

    useEffect(() => {
        callProfile();
        document.title = "MD IH Alif || Profile";
    }, []);

    const logout = async() => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  credentials: "include"
            });

            dispatch({type: "USER", payload: false});

            const data = await res.json();

            if (data) {
                history.push("/signin");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const logoutalldevices = async() => {
        try {
            const res = await fetch("/logoutall", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  credentials: "include"
            });

            dispatch({type: "USER", payload: false});

            const data = await res.json();

            if (data) {
                history.push("/signin");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row profile_div">

                    <div className="col-12 col-md-12 col-lg-12">
                        <h3> Name: {userData.name} </h3>
                        <h5> Email: {userData.email} </h5>
                        <p> Phone Number: {userData.phone} </p>
                        <p> Address: {userData.address} </p>

                        <Button onClick={logout} type="submit" className="forgot_btn mt-2"> <Lock/> LogOut </Button>
                        <br/>
                        <Button onClick={logoutalldevices} type="submit" className="forgot_btn mt-2"> <Lock/> LogOut All Devices </Button>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Profile;
