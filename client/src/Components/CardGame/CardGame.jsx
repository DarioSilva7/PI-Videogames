import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardGame.module.css' 

export default function CardGame({name, image, genre, id}) {
    console.log(id)
    return(

        <div className={styles.divcard}>
            <h3 className={styles.h3card}>{name}</h3>
            <img className={styles.imgcard} src={image} alt="Img not found" width="500px" height="400px" />
            <h5 className={styles.genre} >{genre}</h5>
            {/* <Link to={`/videogame/${id}`}> */}
            {/* </Link> */}

            {/* <Link to='/home'> */}
            {/* <button>ENTER</button> */}
            {/* </Link> */}
        </div>
    );
}