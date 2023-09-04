import React from "react";
import "./TrackItem.css";
import spotifyIcon from "../assets/Spotify_icon.png";

function TrackItem({
    trackRank,
    trackImage,
    trackAlbumURL,
    trackTitle,
    trackArtist,
    trackURL,
}) {
    return (
        <div className="track-container">
            <div className="track-rank">{trackRank}.</div>
            <a href={trackAlbumURL} target="_blank">
                <img
                    className="track-image"
                    src={trackImage}
                    href={trackAlbumURL}
                ></img>
            </a>
            <div className="track-details">
                <div className="track-title">{trackTitle}</div>
                <div className="track-artist">{trackArtist.join(", ")}</div>
            </div>
            <div className="track-url">
                <a href={trackURL} target="_blank">
                    <img
                        className="spotify-icon"
                        src={spotifyIcon}
                        target="_blank"
                    ></img>
                </a>
            </div>
        </div>
    );
}

export default TrackItem;
