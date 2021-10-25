import React, { useEffect, useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { Facebook, Email, WhatsApp, PermPhoneMsg, LocationOn, Send } from '@material-ui/icons';
import "./css/contact.css";

const Contact = () => {

    const [userMsg, setUserMsg] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        document.title = "MD IH Alif || Contact";
    }, []);

    const inputChange = (event) => {
        const {name, value} = event.target;

        setUserMsg({...userMsg, [name]: value});
    }

    const sendMsg = async(event) => {
        event.preventDefault();
        const { name, email, phone, subject, message } = userMsg;
        try {
            const res = await fetch("/sendmsg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, subject, message
                })
            });

            if (res) {
                setUserMsg({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
                alert("Contact Successful!");
            } else {
                alert("Server Down!");
            }

        } catch (error) {
            console.log(error);
            alert("Something wrong!");
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row contact_div">
                    <div className="col-12">
                        <div className="row p-5" style={{ boxShadow: "3px 5px 7px #000" }}>
                            <div className="col-12 col-md-6 col-lg-4 mt-3 mb-3 contact_icons">
                                <p className="mt-1">
                                    <a href="https://web.facebook.com/mdihalif.2002" target="_black" style={{ textDecoration: "none", color: "#000" }}>
                                        <Facebook/> MD IH Alif
                                    </a>
                                </p>
                                <hr />
                                <p className="mt-1">
                                    <Email/> mdihalif@yahoo.com
                                </p>
                                <hr />
                                <p className="mt-1">
                                    <WhatsApp/> +8801789708582
                                </p>
                                <hr />
                                <p className="mt-1">
                                    <PermPhoneMsg/> +8801789708582
                                </p>
                                <hr />
                                <p className="mt-1">
                                    <LocationOn/> Sadhupara, Pabna, Bangladesh
                                </p>
                                <hr />
                            </div>

                            <div className="col-12 col-md-10 col-lg-8 mt-3 mb-3">
                                <h3 style={{ textShadow: "1px 3px 3px #000" }}> Get In Touch </h3>
                                <hr />
                                <form onSubmit={sendMsg}>
                                    <TextField type="text" name="name" label="Name" required onChange={inputChange} value={userMsg.name} className="contact_input"/>

                                    <TextField type="email" name="email" label="Email" required onChange={inputChange} value={userMsg.email} className="contact_input"/>

                                    <TextField type="number" name="phone" label="Phone" required onChange={inputChange} value={userMsg.phone} className="contact_input"/>

                                    <TextField type="text" name="subject" label="Subject" required onChange={inputChange} value={userMsg.subject} className="contact_input"/>

                                    <TextField type="text" name="message" label="Message" required onChange={inputChange} value={userMsg.message} className="contact_msg"/>

                                    <Button type="submit" className="msg_btn">
                                        <Send/> Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;
