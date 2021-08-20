import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardGame.module.css' 

export default function CardGame({name, image, genre, id}) {
    console.log(genre,"--------------genre")
    
    return(

        <div className={styles.divcard}>
            <h3 className={styles.h3card}>{name}</h3>
            <img className={styles.imgcard} src={image} alt="Img not found" width="500px" height="400px" />
            {/* : <img className={styles.imgcard} src={"https://api.time.com/wp-content/uploads/2020/04/video-games-quarantine.jpg?quality=85&w=1024&h=628&crop=1"} alt="Img not found" width="500px" height="400px" /> */}
            {/* <h5 className={styles.genre} >{genre}</h5> */}
            {/* <h5 className={styles.genre} > { genre?.map(g=> g.name) }</h5> */}
             { typeof genre[0] === 'object' ? 
             genre.map(g=> <h5 className={styles.genre} >  {g.name}</h5>):
             genre.map(g=> <h5 className={styles.genre} >{g}</h5>) }
        </div>
    );
}