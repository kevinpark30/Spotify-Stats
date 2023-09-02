import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import HomePage from './pages/HomePage';
import TopTracksPage from './pages/TopTracksPage';
import TopArtistsPage from './pages/TopArtistsPage';
import RecentlyPlayedPage from './pages/RecentlyPlayedPage';
import RecommendedPage from './pages/RecommendedPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "top-tracks",
    element:<TopTracksPage></TopTracksPage>
  },
  {
    path: "top-artists",
    element:<TopArtistsPage></TopArtistsPage>
  },
  {
    path: "recently-played",
    element:<RecentlyPlayedPage></RecentlyPlayedPage>
  },
  {
    path: "recommended",
    element:<RecommendedPage></RecommendedPage>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
