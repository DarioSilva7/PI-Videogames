import React from 'react';
import {Link} from 'react-router-dom'
import './LandingPage.css'


export default function LandingPage() {
    return(
        <div class="buttons">
            <div class="container"> 
            <h1>WELCOMES TO MY VIDEOGAMES APP</h1>
            <Link to='/home'>
            {/* <button  id="enter-btn">E N T E R</button> */}
            <button  class="btn effect01" target="_blank">E N T E R</button>
            </Link>
            </div>
        </div>
    )
}