import React from "react";
import "./RecentlyPlayedItem.css";
import spotifyIcon from "../assets/Spotify_icon.png";

function RecentlyPlayedItem({
    recentlyPlayedImage,
    recentlyPlayedAlbumURL,
    recentlyPlayedName,
    recentlyPlayedArtist,
    recentlyPlayedTimestamp,
    recentlyPlayedTrackURL,
}) {
    return (
        <div className="recently-played-container">
            <a href={recentlyPlayedAlbumURL} target="_blank">
                <img src={recentlyPlayedImage}></img>
            </a>
            <div>{recentlyPlayedName}</div>
            <div>{recentlyPlayedArtist}</div>
            <div>{recentlyPlayedTimestamp}</div>

            <a href={recentlyPlayedTrackURL}>
                <img className="spotify-icon" src={spotifyIcon}></img>
            </a>
        </div>
    );
}

export default RecentlyPlayedItem;
