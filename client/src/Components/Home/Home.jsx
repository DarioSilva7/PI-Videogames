import React = require("react");
import { useState,useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getGames } from "../../Actions";
import {Link} from 'react-router-dom'

export default function Home() {
    const dispatch= useDispatch()
    const allVideoGames = useSelector((state)=>state.videogames)

    useEffect(()=>{
        dispatch(getGames()) 
    },[])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }

    return(
        <div>
            <Link to= '/videogames' >CREAT VIDEOGAME</Link>
            <h1>GAMERS WORLD</h1>
            <button onClick={e=>{  handleClick(e) }} >
            Reload videogames
            </button>
        <div>
            <select>
                <option value='Asc'>Ascendent</option>
                <option value='Desc'>Descendent</option>
            </select>
            <select>
                <option value='Action'>Action</option>
                <option value='Indie'>Indie</option>
                <option value='Adventure'>Adventure</option>
                <option value='Strategy'>Strategy</option>
                <option value='RPG'>RPG</option>
                <option value='Shooter'>Shooter</option>
                <option value='Casual'>Casual</option>
                <option value='Simulation'>Simulation</option>
                <option value='Puzzle'>Puzzle</option>
                <option value='Arcade'>Arcade</option>
                <option value='Platformer'>Platformer</option>
                <option value='Racing'>Racing</option>
                <option value='Massively Multiplayer'>Massively Multiplayer</option>
                <option value='Sports'>Sports</option>
                <option value='Fighting'>Fighting</option>
                <option value='Family'>Family</option>
                <option value='Board Games'>Board Games</option>
                <option value='Educational'>Educational</option>
                <option value='Card'>Card</option>
                <option value='Action'>Action</option>
            </select>
            <select>
                <option value='Genre'>Created</option>
            </select>
                
        </div>
        </div>

    )
}