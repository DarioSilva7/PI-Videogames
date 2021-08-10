import React from 'react';
import {Link, link} from 'react-router-dom'

export default function LandingPage() {
    return(
        <div>
            <h1>WELCOMES TO MY VIDEOGAMES APP</h1>
            <Link to='/home'>
            <button>ENTER</button>
            </Link>
        </div>
    )
}