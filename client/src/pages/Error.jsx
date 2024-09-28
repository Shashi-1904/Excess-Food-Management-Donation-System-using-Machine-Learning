import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
    return (
        <div>
            <section id='error-page'>
                <div className="content">
                    <h2 className="header">
                        404
                    </h2>
                    <h4>Sorry! Page not found</h4>
                    <p>
                        Oops! It seems you've reached a page that doesn't exist.

                        We're sorry, but the page you're looking for might have been moved, deleted, or never existed.
                        <br /><br />
                        We apologize for the inconvenience. Thank you for your patience and understanding
                        - ServeSurplus Team

                    </p>
                    <div className="btns">
                        <NavLink to="/">Return home</NavLink>
                        <NavLink to="/contact">Report problem</NavLink>
                    </div>
                </div>
            </section>
        </div>
    )
}
