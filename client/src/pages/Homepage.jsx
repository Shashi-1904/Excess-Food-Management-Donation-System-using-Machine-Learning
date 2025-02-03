import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Homepage() {
    return (
        <div>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>Together, we can make a difference!</p>
                            <h1>Welcome to  ServeSurplus</h1>
                            <p>Join our mission to reduce food waste and fight hunger by connecting surplus food with those in need. Our platform uses machine learning to optimize donations and ensure that every meal reaches the right place at the right time.</p>
                            <div className="btn btn-group">
                                <NavLink to={"/donatefood"}>
                                    <button className="btn btn-lg btn-success">Donate Food!</button>
                                </NavLink>
                                <NavLink to={"/about"}>
                                    <button className="btn btn-lg btn-success">Learn More</button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hero-image">
                            <img src="./images/img3.png" alt="Food Donation" width="650" height="450" />
                        </div>
                    </div>
                </section>
            </main>

            {/* Second section: Impact analytics */}

            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>10,000+</h2>
                        <p>Meals Distributed</p>
                    </div>
                    <div className="div1">
                        <h2>500+</h2>
                        <p>Volunteers</p>
                    </div>
                    <div className="div1">
                        <h2>200+</h2>
                        <p>Partnered Restaurants</p>
                    </div>
                    <div className="div1" id='last-child'>
                        <h2>24/7</h2>
                        <p>Donation Support</p>
                    </div>
                </div>
            </section>

            {/* Third section: Call to action */}

            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img src="./images/delivery.png" alt="Volunteering" width="650" height="400" />
                    </div>

                    <div className="hero-content">
                        <p>Be part of the change</p>
                        <h1>Are You Ready?</h1>
                        <p>Join us in tackling food waste and hunger. Whether you're a restaurant, a volunteer, or someone in need, we make it easy to contribute and receive excess food. Let’s make sure no meal goes to waste!</p>
                        <div className="btn btn-group">
                            <NavLink to={"/contact"}>
                                <button className="btn btn-lg btn-success">Contact Us</button>
                            </NavLink>
                            <NavLink to={"/about"}>
                                <button className="btn btn-lg btn-success">Read More</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
