import React from 'react'
import { useState } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';

//default form content
const defaultContactForm = {
    username: "",
    email: "",
    message: ""
}

export default function Contact() {

    const [contact, setContact] = useState(defaultContactForm);
    const [userData, setUserData] = useState(true);

    const { user, API } = useAuth();

    const URL = `${API}/api/form/contact`;

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });



    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        //backend connection
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {

                setContact(defaultContactForm);
                const data = await response.json();
                toast.success("Message sent Successful")
                console.log(data);

            }



        } catch (error) {
            console.log("contact", error);
        }


    };

    return (
        <div>

            <section className="section-content">
                <div className="contact-content container">
                    <h1 className='main-heading'>Contact us</h1>
                </div>

                {/* contact page */}
                <div className="container grid grid-two-cols">
                    <div className="contact-image">
                        <img src="./images/contact.png" alt="Contact image" width="600" height='500' />
                    </div>


                    {/* content */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' id='username' autoComplete='off' required value={contact.username} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' autoComplete='off' required value={contact.email} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" cols="30" rows="5" autoComplete='off' required value={contact.message} onChange={handleInput}></textarea>
                            </div>

                            <div>
                                <button type='submit'>
                                    Submit
                                </button>
                            </div>


                        </form>
                    </section>

                </div>
            </section>
        </div>
    )
}
