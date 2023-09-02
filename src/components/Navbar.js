import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <Link to='/'>Spotify Stats</Link>
            </div>
            <div className='navbar-menu'>
                <Link to='/top-tracks'>Top Tracks</Link>
                <Link to='/top-artists'>Top Artists</Link>
                <Link to='/recently-played'>Recently Played</Link>
                <Link to='/recommended'>Recommended</Link>
            </div>
        </div>
    )
}

export default Navbar