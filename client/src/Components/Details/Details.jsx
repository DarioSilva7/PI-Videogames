import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { getdetalle } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './Details.module.css'


export default function GetDetails(props) {
    console.log(props, "LASPROOOPSS")
    const dispatch= useDispatch()
    
    useEffect(()=>{
        dispatch(getdetalle(props.match.params.id))
    },[dispatch])
    // console.log(props.match.params.id,"--------- el id por params")

const theVideoGame= useSelector(state=> state.detail)
console.log(theVideoGame,"-----------------------THEVIDEOGAME")
const funcDescription = () => {
    return  {__html: theVideoGame.description};
}

return(

    <div>
            {
                <div className={styles.bg}>

                    <h2>Name: {theVideoGame.name}</h2>
                    <div >
                    <img className={styles.img} src={theVideoGame.img} alt="Img not found"></img>
                    </div>
                    <p>Rating: {theVideoGame.rating}</p>
                    <p dangerouslySetInnerHTML={funcDescription()}>

                        {/* Description: {theVideoGame.description} */}
                    </p>
                    <p>Released: {theVideoGame.released_date}</p>
                    <p>Genres: {theVideoGame.genres?.length>0 ? theVideoGame.genres?.map(g=> g.name + (" - ")): "Empty"}</p>
                    <p>Platforms: {theVideoGame.platforms?.length>0 ? theVideoGame.platforms?.map(p=> p.name + " - " || p + " - "): "Empty"}</p>
                </div> 
            }
            <Link to="/home">Go back 👋</Link>
    </div>
)

}