import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function TopTracksPage({ token }) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        async function searchTopTracks() {
            if (token) {
                const { data } = await axios.get(
                    "https://api.spotify.com/v1/me/top/tracks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            time_range: "medium_term",
                            limit: 50,
                            offset: 5,
                        },
                    }
                );
                setTracks(data.items);
            }
        }
        searchTopTracks();
    }, [token]);

    return (
        <div>
            <div>This is Top Tracks Page</div>
            <div>Token {token}</div>
        </div>
    );
}

export default TopTracksPage;
