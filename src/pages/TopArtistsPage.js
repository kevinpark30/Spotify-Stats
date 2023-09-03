import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function TopArtistsPage({ token }) {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function searchTopArtists() {
            if (token) {
                const { data } = await axios.get(
                    "https://api.spotify.com/v1/me/top/artists",
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
                console.log(data.items);
                setArtists(data.items);
            }
        }
        searchTopArtists();
    }, [token]);

    return (
        <div>
            <div>This is Top Artists Page</div>
        </div>
    );
}

export default TopArtistsPage;
