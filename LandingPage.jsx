import React from 'react';
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'


export default function LandingPage() {
    return(
      
            <div className={styles.body}>
                <h1 >WELCOMES TO MY VIDEOGAMES APP</h1>
                <div className={styles.container}> 
                    <Link to='/home'>
                        <button  className={`${styles.btn} ${styles.effect01} ${styles.bob}`} target="_blank">E N T E R</button>
                    </Link>
                </div>
            </div>
    )
}