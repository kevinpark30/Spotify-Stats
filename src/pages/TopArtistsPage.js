import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ArtistItem from "../components/ArtistItem";
import emptyProfilePicture from "../assets/empty_profile_picture.jpg";
import "./TopArtistsPage.css";

function TopArtistsPage({ token }) {
    const [shortTermArtistsInfo, setShortTermArtistsInfo] = useState([]);
    const [mediumTermArtistsInfo, setMediumTermArtistsInfo] = useState([]);
    const [longTermArtistsInfo, setLongTermArtistsInfo] = useState([]);
    const [artistsInfo, setArtistsInfo] = useState([]);

    const [timeWindow, setTimeWindow] = useState("short_term");

    useEffect(() => {
        async function searchTopArtists(term) {
            if (token) {
                const { data } = await axios.get(
                    "https://api.spotify.com/v1/me/top/artists",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            time_range: term,
                            limit: 35,
                            offset: 0,
                        },
                    }
                );
                const items = data.items;
                const artistsInfo = [];

                let artistsRow = [];

                for (let i = 0; i < items.length; i++) {
                    const artistInfo = [];
                    if (i != 0 && i % 3 == 0) {
                        artistsInfo.push(artistsRow);
                        artistsRow = [];
                    }
                    try {
                        artistInfo.push(items[i].images[2].url);
                    } catch (error) {
                        artistInfo.push(emptyProfilePicture);
                    } finally {
                        artistInfo.push(items[i].external_urls.spotify);
                        artistInfo.push(i + 1);
                        artistInfo.push(items[i].name);
                        artistsRow.push(artistInfo);
                    }
                }

                if (artistsRow.length != 0) {
                    artistsInfo.push(artistsRow);
                }

                if (term == "short_term") {
                    setShortTermArtistsInfo(artistsInfo);
                } else if (term == "medium_term") {
                    setMediumTermArtistsInfo(artistsInfo);
                } else if (term == "long_term") {
                    setLongTermArtistsInfo(artistsInfo);
                }
            }
        }
        searchTopArtists("short_term");
        searchTopArtists("medium_term");
        searchTopArtists("long_term");
    }, [token]);

    useEffect(() => {
        if (timeWindow == "short_term") {
            setArtistsInfo(shortTermArtistsInfo);
        } else if (timeWindow == "medium_term") {
            setArtistsInfo(mediumTermArtistsInfo);
        } else if (timeWindow == "long_term") {
            setArtistsInfo(longTermArtistsInfo);
        }
    }, [
        timeWindow,
        shortTermArtistsInfo,
        mediumTermArtistsInfo,
        longTermArtistsInfo,
    ]);

    return (
        <div className="top-artists-container">
            {!token && <div>Log in to view your top artists</div>}
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
            {token && (
                <table className="artists-table">
                    {artistsInfo.map((artistsRow) => (
                        <tr>
                            {artistsRow.length >= 1 && (
                                <th>
                                    <ArtistItem
                                        artistImage={artistsRow[0][0]}
                                        artistURL={artistsRow[0][1]}
                                        artistRank={artistsRow[0][2]}
                                        artistName={artistsRow[0][3]}
                                        key={artistsRow[0][2]}
                                    ></ArtistItem>
                                </th>
                            )}
                            {artistsRow.length >= 2 && (
                                <th>
                                    <ArtistItem
                                        artistImage={artistsRow[1][0]}
                                        artistURL={artistsRow[1][1]}
                                        artistRank={artistsRow[1][2]}
                                        artistName={artistsRow[1][3]}
                                        key={artistsRow[1][2]}
                                    ></ArtistItem>
                                </th>
                            )}
                            {artistsRow.length == 3 && (
                                <th>
                                    <ArtistItem
                                        artistImage={artistsRow[2][0]}
                                        artistURL={artistsRow[2][1]}
                                        artistRank={artistsRow[2][2]}
                                        artistName={artistsRow[2][3]}
                                        key={artistsRow[2][2]}
                                    ></ArtistItem>
                                </th>
                            )}
                        </tr>
                    ))}
                </table>
            )}
        </div>
    );
}

export default TopArtistsPage;
