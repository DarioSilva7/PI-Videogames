import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { getdetalle, resetGames, setLoading } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './Details.module.css'
import Loading from "../Loading/Loading";

export default function GetDetails(props) {
    const dispatch= useDispatch()
    
    useEffect(()=>{
        dispatch(setLoading())
        dispatch(getdetalle(props.match.params.id))
    },[dispatch])

    useEffect(()=>{
        return ()=>{
            dispatch(resetGames())
        }
    },[])

const theVideoGame= useSelector(state=> state.detail)
const loading= useSelector(state=> state.loading)

return(

        <div className={styles.bg} >
        {
            (loading)?
            <Loading className={styles.loadingDet} />
            :
            <div className={styles.container}>

                <h2>Name: {theVideoGame.name}</h2>
                <div >
                    <img className={styles.img} src={theVideoGame.img} alt="Img not found"></img>
                </div>
                <div className={styles.info}>
                    <p>Rating: {theVideoGame.rating}</p>
                    <p>Description:{theVideoGame.description}</p>
                    <p>Released: {theVideoGame.released}</p>
                    <p>Genres: {theVideoGame.genres?.length>0 ? theVideoGame.genres?.map(g=> g.name + (" - ")): "Empty"}</p>
                    <p>Platforms: {theVideoGame.platforms?.length>0 ? theVideoGame.platforms.map(p=> typeof p === "object"? <p>  {p.name + " - "}</p> : <p> {p} </p> ): "Empty"}</p>

                </div>
                <Link to="/home">Go back 👋</Link>
            </div> 
        }
    </div>
)
 
}