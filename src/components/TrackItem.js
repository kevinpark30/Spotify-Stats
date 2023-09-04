import React from "react";
import "./TrackItem.css";

function TrackItem({ trackRank, trackImage, trackTitle, trackArtist }) {
    return (
        <div className="track-container">
            <div className="track-name-container">
                <div className="track-rank">{trackRank}.</div>
                <img className="track-image" src={trackImage}></img>
                <div className="track-title">{trackTitle}</div>
            </div>
            <div className="track-artist">{trackArtist}</div>
        </div>
    );
}

export default TrackItem;
