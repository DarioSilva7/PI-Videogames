import React from 'react';
import { Link } from 'react-router-dom';
import './CardGame.css' 

export default function CardGame({name, image, genre, id}) {
    console.log(id)
    return(

        <div>
            <h3>{name}</h3>
            <h5>{genre}</h5>
            {/* <Link to={`/videogame/${id}`}> */}
            <img src={image} alt="Img not found" width="500px" height="400px" />
            {/* </Link> */}

            {/* <Link to='/home'> */}
            {/* <button>ENTER</button> */}
            {/* </Link> */}
        </div>
    );
}