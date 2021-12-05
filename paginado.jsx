import { number } from "prop-types";
import React from "react";
import styles from './paginado.module.css'

export default function Paginado({vgPerPage, allVideoGames, paginado}) {
   const pageNumber=[]
    for (let i=1; i<Math.ceil(allVideoGames/vgPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.nro}>
                <ul className={styles.pagination}>
                {   pageNumber && 
                    pageNumber.map(nro=>(
                        <li className={styles.number} key={nro}>
                            <a className={styles.ancla} onClick={()=> paginado(nro)}> {nro} </a>
                        </li>
                ))
                }
                </ul>
            </div>
        </nav>
    )
}