import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TrackItem from "../components/TrackItem";
import "./TopTracksPage.css";

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
                    trackInfo.push(i + 1);
                    trackInfo.push(items[i].album.images[2].url);
                    trackInfo.push(items[i].album.external_urls.spotify);
                    trackInfo.push(items[i].name);
                    trackInfo.push(items[i].artists.map((obj) => obj.name));
                    trackInfo.push(items[i].external_urls.spotify);
                    tracksInfo.push(trackInfo);
                }
                setTracksInfo(tracksInfo);
            }
        }
        searchTopTracks();
    }, [token]);

    return (
        <div className="top-tracks-container">
            {!token && <div>Log in to view your top tracks</div>}
            {token &&
                tracksInfo.map((trackInfo) => (
                    <TrackItem
                        trackRank={trackInfo[0]}
                        trackImage={trackInfo[1]}
                        trackAlbumURL={trackInfo[2]}
                        trackTitle={trackInfo[3]}
                        trackArtist={trackInfo[4]}
                        trackURL={trackInfo[5]}
                        key={trackInfo[0]}
                    ></TrackItem>
                ))}
        </div>
    );
}

export default TopTracksPage;
