import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import RecentlyPlayedItem from "../components/RecentlyPlayedItem";
import "./RecentlyPlayedPage.css";

function RecentlyPlayedPage({ token }) {
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);

    function formatTimestamp(timestamp) {
        let month = timestamp.getMonth() + 1;

        console.log("month", month, timestamp);

        let day = timestamp.getDate();
        let year = timestamp.getFullYear();

        let hours = timestamp.getHours();
        let minutes = timestamp.getMinutes();

        let formattedTimestamp =
            month + "/" + day + "/" + year + ", " + hours + ":" + minutes;

        // console.log("return", formattedTimestamp);

        return formattedTimestamp;
    }

    useEffect(() => {
        async function findRecentlyPlayed() {
            if (token) {
                const { data } = await axios.get(
                    "https://api.spotify.com/v1/me/player/recently-played",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            time_range: "short_term",
                            limit: 50,
                        },
                    }
                );
                console.log(data.items);

                const items = data.items;
                const recentlyPlayedTracks = [];

                for (let i = 0; i < items.length; i++) {
                    const recentlyPlayedTrack = [];

                    recentlyPlayedTrack.push(
                        items[i].track.album.images[2].url
                    );
                    recentlyPlayedTrack.push(
                        items[i].track.album.external_urls.spotify
                    );
                    recentlyPlayedTrack.push(items[i].track.name);
                    recentlyPlayedTrack.push(
                        items[i].track.artists.map((obj) => obj.name)
                    );

                    let timestamp = new Date(items[i].played_at);

                    const formattedTimestamp = formatTimestamp(timestamp);

                    recentlyPlayedTrack.push(formattedTimestamp);
                    recentlyPlayedTrack.push(
                        items[i].track.external_urls.spotify
                    );
                    recentlyPlayedTracks.push(recentlyPlayedTrack);
                }

                setRecentlyPlayedTracks(recentlyPlayedTracks);
            }
        }
        findRecentlyPlayed();
    }, [token]);

    return (
        <div className="recently-played-tracks-container">
            {!token && (
                <div>Log in to view your most recently played tracks</div>
            )}
            {token &&
                recentlyPlayedTracks.map((recentlyPlayedTrack) => (
                    <RecentlyPlayedItem
                        recentlyPlayedImage={recentlyPlayedTrack[0]}
                        recentlyPlayedAlbumURL={recentlyPlayedTrack[1]}
                        recentlyPlayedName={recentlyPlayedTrack[2]}
                        recentlyPlayedArtist={recentlyPlayedTrack[3]}
                        recentlyPlayedTimestamp={recentlyPlayedTrack[4]}
                        recentlyPlayedTrackURL={recentlyPlayedTrack[5]}
                    ></RecentlyPlayedItem>
                ))}
        </div>
    );
}

export default RecentlyPlayedPage;
