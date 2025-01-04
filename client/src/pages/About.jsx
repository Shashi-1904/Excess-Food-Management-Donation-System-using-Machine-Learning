import { NavLink } from "react-router-dom";
import React from 'react';
import { useAuth } from "../store/auth";

export function About() {

    const { user } = useAuth();
    return (
        <div>
            {/* section 1 */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Welcome {user ? user.username : `to ServeSurplus`}</p>
                        <h1>Why Choose Us</h1>
                        <p>
                            Welcome to ServeSurplus, your reliable platform for reducing food waste and providing surplus meals to those in need. At ServeSurplus, we aim to create a sustainable impact by bridging the gap between food donors and volunteers. Through our platform, we leverage machine learning to optimize food distribution, ensuring that excess food from hotels and restaurants reaches the right people in time.
                            <br /><br />
                            Our mission is to eliminate food wastage while tackling hunger, helping communities thrive with a more sustainable and responsible approach. With ServeSurplus, every meal counts, and together, we can make a significant difference by reducing food insecurity.
                            <br /><br />
                            Thank you for choosing ServeSurplus, where technology meets compassion in the fight against hunger.
                        </p>
                        <div className="btn btn-group">
                            <NavLink to={"/contact"}>
                                <button className='btn btn-lg btn-success'>Contact us</button>
                            </NavLink>
                            <NavLink to={"/"}>
                                <button className='btn btn-lg btn-success'>Back to home</button>
                            </NavLink>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src="./images/help.png" alt="Serving food" width="800" height="450" />
                    </div>

                </div>
            </section>
        </div>
    );
}
