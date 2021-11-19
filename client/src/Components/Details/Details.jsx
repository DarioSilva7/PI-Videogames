import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { getdetalle, resetGames, setLoading } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from './Details.module.css'
import Loading from "../Loading/Loading";
import foto from '../../videogame.png'

export default function GetDetails(props) {
    const dispatch= useDispatch()
    
    useEffect(()=>{
        dispatch(setLoading())
        dispatch(getdetalle(props.match.params.id))
        console.log(props)
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    useEffect(()=>{
        return ()=>{
            dispatch(resetGames())
        }
    },[])

const theVideoGame= useSelector(state=> state.detail)
const loading= useSelector(state=> state.loading)

const fnDescription= { __html: theVideoGame.description}

return(

        <div className={styles.bg} >
        {
            (loading)?
            <Loading className={styles.loading}  />
            :
            <div className={styles.container}>

                <div >
                    <h2>{theVideoGame.name}</h2>
                    <img className={styles.img} src={theVideoGame.img?theVideoGame.img: foto} alt="Img not found"></img>
                    <p  className={styles.p1} >Rating: {theVideoGame.rating}</p>                    
                    <p  className={styles.p1}>Genres: {theVideoGame.genres?.length>0 ? theVideoGame.genres?.map(g=> <span className={styles.span}>  {g.name + ("  ")} </span>) : "Empty"}</p>
                    <p  className={styles.p1}>Platforms: {theVideoGame.platforms?.length>0 ? theVideoGame.platforms.map(p=> typeof p === "object"? <span className={styles.span}>  {p.name + "  "}</span> : <span className={styles.span}> {p} </span> ): "Empty"}</p>
                </div>
                <div className={styles.info}>

                    <span  className={styles.p1}>Description:</span>
                    <span  className={styles.p2} dangerouslySetInnerHTML={fnDescription}></span>
                    <span  className={styles.p1}>Released: {theVideoGame.released}</span>

                <Link to="/home">
                    <button className={styles.btn}> Go back 👋</button>
                </Link>
                </div>
            </div> 
        }
    </div>
)
 
}