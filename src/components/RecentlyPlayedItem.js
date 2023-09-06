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
                <img className="album-image" src={recentlyPlayedImage}></img>
            </a>
            <div className="track-info-container">
                <div className="track-title">{recentlyPlayedName}</div>
                <div className="track-artist">
                    {recentlyPlayedArtist.join(", ")}
                </div>
                <div className="track-timestamp">{recentlyPlayedTimestamp}</div>
            </div>

            <a href={recentlyPlayedTrackURL} target="_blank">
                <img className="spotify-icon" src={spotifyIcon}></img>
            </a>
        </div>
    );
}

export default RecentlyPlayedItem;
