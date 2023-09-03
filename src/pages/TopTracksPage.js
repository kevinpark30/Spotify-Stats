import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TrackItem from "../components/TrackItem";

function TopTracksPage({ token }) {
    const [tracksInfo, setTracksInfo] = useState([]);

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
                const items = data.items;
                const tracksInfo = [];

                console.log(data.items);

                for (let i = 0; i < items.length; i++) {
                    const trackInfo = [];
                    trackInfo.push(items[i].name);
                    trackInfo.push(items[i].artists.map((obj) => obj.name));
                    trackInfo.push(items[i].album.images[2].url);
                    trackInfo.push(i);
                    tracksInfo.push(trackInfo);
                }
                setTracksInfo(tracksInfo);
            }
        }
        searchTopTracks();
    }, [token]);

    return (
        <div>
            <div>This is Top Tracks Page</div>
            {tracksInfo.map((trackInfo) => (
                <TrackItem
                    trackTitle={trackInfo[0]}
                    trackArtist={trackInfo[1]}
                    trackImage={trackInfo[2]}
                    key={trackInfo[3]}
                ></TrackItem>
            ))}
        </div>
    );
}

export default TopTracksPage;
