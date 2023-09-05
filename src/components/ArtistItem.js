import React from "react";
import "./ArtistItem.css";

function ArtistItem({ artistImage, artistURL, artistRank, artistName }) {
    return (
        <div className="artist-container">
            <a href={artistURL} target="_blank">
                <img src={artistImage} className="artist-image"></img>
            </a>
            <div className="artist-rank-name-container">
                {artistRank}. {artistName}
            </div>
        </div>
    );
}

export default ArtistItem;
