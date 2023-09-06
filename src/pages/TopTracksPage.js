import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TrackItem from "../components/TrackItem";
import "./TopTracksPage.css";

function TopTracksPage({ token }) {
    const [shortTermTracksInfo, setShortTermTracksInfo] = useState([]);
    const [mediumTermTracksInfo, setMediumTermTracksInfo] = useState([]);
    const [longTermTracksInfo, setLongTermTracksInfo] = useState([]);
    const [tracksInfo, setTracksInfo] = useState([]);

    const [timeWindow, setTimeWindow] = useState("short_term");

    useEffect(() => {
        async function searchTopTracks(term) {
            if (token) {
                const { data } = await axios.get(
                    "https://api.spotify.com/v1/me/top/tracks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            time_range: term,
                            limit: 50,
                            offset: 0,
                        },
                    }
                );
                const items = data.items;
                const tracksInfo = [];

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

                if (term == "short_term") {
                    setShortTermTracksInfo(tracksInfo);
                } else if (term == "medium_term") {
                    setMediumTermTracksInfo(tracksInfo);
                } else if (term == "long_term") {
                    setLongTermTracksInfo(tracksInfo);
                }
            }
        }
        searchTopTracks("short_term");
        searchTopTracks("medium_term");
        searchTopTracks("long_term");
    }, [token]);

    useEffect(() => {
        if (timeWindow == "short_term") {
            setTracksInfo(shortTermTracksInfo);
        } else if (timeWindow == "medium_term") {
            setTracksInfo(mediumTermTracksInfo);
        } else if (timeWindow == "long_term") {
            setTracksInfo(longTermTracksInfo);
        }
    }, [
        timeWindow,
        shortTermTracksInfo,
        mediumTermTracksInfo,
        longTermTracksInfo,
    ]);

    return (
        <div className="top-tracks-container">
            {!token && <div>Log in to view your top tracks</div>}
            {token && (
                <div className="button-container">
                    <div
                        className={
                            timeWindow == "short_term"
                                ? "selected"
                                : "unselected"
                        }
                    >
                        <button onClick={() => setTimeWindow("short_term")}>
                            4 WEEKS
                        </button>
                    </div>
                    <div
                        className={
                            timeWindow == "medium_term"
                                ? "selected"
                                : "unselected"
                        }
                    >
                        <button onClick={() => setTimeWindow("medium_term")}>
                            6 MONTHS
                        </button>
                    </div>
                    <div
                        className={
                            timeWindow == "long_term"
                                ? "selected"
                                : "unselected"
                        }
                    >
                        <button onClick={() => setTimeWindow("long_term")}>
                            ALL TIME
                        </button>
                    </div>
                </div>
            )}
            {token &&
                tracksInfo.map((trackInfo) => (
                    <TrackItem
                        trackRank={trackInfo[0]}
                        albumImage={trackInfo[1]}
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
