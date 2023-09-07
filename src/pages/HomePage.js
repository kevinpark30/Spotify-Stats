import React from "react";
import "./HomePage.css";

function HomePage({ token }) {
    return (
        <div className="HomePage-container">
            {!token && (
                <div>
                    Welcome to Spotify Stats! Login to view your top songs and
                    top artists you have listened to for the past 4 weeks, 6
                    months, and all-time. You can also view your recently played
                    songs and get song recommendations based on the songs you
                    have recently listened to.
                </div>
            )}

            {token && (
                <div>
                    Click the tabs on the navigation bar to check your stats!
                </div>
            )}
        </div>
    );
}

export default HomePage;
