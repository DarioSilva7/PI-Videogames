import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardGame.module.css'
import foto from '../../videogame.png'

export default function CardGame({name, image, genre, id}) {

    return(
        <div className={styles.divcard}>

            <h3 className={styles.h3card}>{name}</h3>
            <Link to={`/videogame/${id}`}>
            <img className={styles.imgcard} src={image?image : foto} alt="Img not found" width="500px" height="400px" />
            </Link>
             { typeof genre[0] === 'object' ? 
             genre.map(g=> <h5 className={styles.genre} >  {g.name}</h5>):
             genre.map(g=> <h5 className={styles.genre} >{g + " - "}</h5>) }
        </div>

    );
}