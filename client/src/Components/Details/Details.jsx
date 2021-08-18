import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { getdetalle } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";


export default function GetDetails(props) {
    console.log(props, "LASPROOOPSS")
    const dispatch= useDispatch()
    
    useEffect(()=>{
        dispatch(getdetalle(props.match.params.id))
    },[])
    // console.log(props.match.params.id,"--------- el id por params")

const theVideoGame= useSelector(state=> state.detail)
console.log(theVideoGame,"-----------------------THEVIDEOGAME")

return(

    <div>
            {
                <div>
                    <h2>Name: {theVideoGame.name}</h2>
                    <img src={theVideoGame.img} alt="Img not found"></img>
                    <p>Rating: {theVideoGame.rating}</p>
                    <p>Description: {theVideoGame.description}</p>
                    <p>Released: {theVideoGame.released}</p>
                    <p>Genres: {theVideoGame.genres?.length>0 ? theVideoGame.genres?.map(g=> g.name + (" ")): "Empty"}</p>
                    <p>Platforms: {theVideoGame.platforms?.length>0 ? theVideoGame.platforms?.map(p=> p.name): "Empty"}</p>
                </div> 
            }
            <Link to="/home">Go back 👋</Link>
    </div>
)
}