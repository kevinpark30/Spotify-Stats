import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TrackItem from "../components/TrackItem";
import "./RecommendedPage.css";

function RecommendedPage({ token }) {
    const [recommendedTracksInfo, setRecommendedTracksInfo] = useState([]);

    useEffect(() => {
        async function getRecommendations() {
            if (token) {
                let recentlyPlayedResponse = await axios.get(
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
                
                const recentlyPlayedItems = recentlyPlayedResponse.data.items;

                const recentlyPlayedArtistsURI = recentlyPlayedItems.map((recentlyPlayedItem) => {
                    return recentlyPlayedItem.track.artists[0].href.split("/")[5];
                })
    
                const seedsString = Array.from(new Set(recentlyPlayedArtistsURI))
                    .slice(0, 5)
                    .join(",");

                let recommendations = await axios.get(
                    "https://api.spotify.com/v1/recommendations",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            seed_artists: seedsString,
                            limit: 50,
                        },
                    }
                );
                const items = recommendations.data.tracks;

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
                setRecommendedTracksInfo(tracksInfo);
            }
        }
        getRecommendations();
    }, [token]);

    return (
        <div className="recommended-tracks-container">
            {!token && <div>Log in to view your recommendations</div>}
            {token &&
                recommendedTracksInfo.map((recommendedTrackInfo) => (
                    <TrackItem
                        trackRank={recommendedTrackInfo[0]}
                        albumImage={recommendedTrackInfo[1]}
                        trackAlbumURL={recommendedTrackInfo[2]}
                        trackTitle={recommendedTrackInfo[3]}
                        trackArtist={recommendedTrackInfo[4]}
                        trackURL={recommendedTrackInfo[5]}
                        key={recommendedTrackInfo[0]}
                    ></TrackItem>
                ))}
        </div>
    );
}

export default RecommendedPage;
