import React from 'react';
// import {Link} from 'react-router-dom'

export default function CardGame({name, image, genre}) {
    return(
        <div>
            <h3>{name}</h3>
            <h5>{genre}</h5>

            <img src={image} alt="Img not found" width="500px" height="400px" />


            {/* <Link to='/home'> */}
            {/* <button>ENTER</button> */}
            {/* </Link> */}
        </div>
    );
}