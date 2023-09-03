import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setTokenParent }) {
  const CLIENT_ID = "d1e5cf41421b4d5d83301601c6fe2ee1";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const link = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`;

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.localStorage.setItem("token", token);
    }

    window.location.hash = "";
    setToken(token);
    setTokenParent(token);
  }, []);

  function logout() {
    setToken("");
    setTokenParent("");
    window.localStorage.removeItem("token");
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">Spotify Stats</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/top-tracks">Top Tracks</Link>
        <Link to="/top-artists">Top Artists</Link>
        <Link to="/recently-played">Recently Played</Link>
        <Link to="/recommended">Recommended</Link>
        {!token ? (
          <a href={link}>Log In</a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
