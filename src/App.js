import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import TopTracksPage from "./pages/TopTracksPage";
import TopArtistsPage from "./pages/TopArtistsPage";
import RecentlyPlayedPage from "./pages/RecentlyPlayedPage";
import RecommendedPage from "./pages/RecommendedPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
    const [token, setToken] = useState("");

    return (
        <>
            <BrowserRouter>
                <Navbar setTokenParent={setToken}></Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage token={token}></HomePage>}
                    ></Route>
                    <Route
                        path="/top-tracks"
                        element={<TopTracksPage token={token}></TopTracksPage>}
                    ></Route>
                    <Route
                        path="/top-artists"
                        element={
                            <TopArtistsPage token={token}></TopArtistsPage>
                        }
                    ></Route>
                    <Route
                        path="/recently-played"
                        element={
                            <RecentlyPlayedPage
                                token={token}
                            ></RecentlyPlayedPage>
                        }
                    ></Route>
                    <Route
                        path="/recommended"
                        element={
                            <RecommendedPage token={token}></RecommendedPage>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
