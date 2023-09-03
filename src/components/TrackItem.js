import React from "react";

function TrackItem({ trackTitle, trackArtist, trackImage }) {
    return (
        <div>
            <div>{trackTitle}</div>
            <div>{trackArtist}</div>
            <div>{trackImage}</div>
        </div>
    );
}

export default TrackItem;
