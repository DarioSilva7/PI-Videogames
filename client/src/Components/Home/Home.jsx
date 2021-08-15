import React from "react";
import { useState,useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getGames, filterByGenre, sort_AZ_ZA} from "../../Actions";
import {Link} from 'react-router-dom'
import CardGame from "../CardGame/CardGame";
import Paginado from "../Paginado/paginado";


export default function Home() {
    const dispatch= useDispatch()
    const allVideoGames = useSelector((state)=>state.showVideoGames)
    console.log(allVideoGames, "ALLVIDEOGAMES")
    //guardo el estado de videogames en allVideoGames
    //paginado
    const [currentPage, setCurrentPage]= useState(1) //guardo el estado de mi pagina actual. El (1) hace referencia a la pagina en que inica
    const [vgPerPage, setvgPerPage]= useState(15) // Este esta local, setea cuantas videogames muestra por pagina
    const indexOfLastVG= currentPage * vgPerPage // 15
    const indexOfFirstVG= indexOfLastVG - vgPerPage // 0
    const currentVG= allVideoGames.slice(indexOfFirstVG,indexOfLastVG) //los videogames de la pag actual 
    //nro pag          iOfFirstVG      iOfLastVG     
    //   1 ----------------0----------------15
    //   2 ----------------16----------------31
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
        dispatch(getGames()) 
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }
    function handleFilterGenre(e) {
        dispatch(filterByGenre(e.target.value))
        // console.log(e.target.value,"TARGET DEL SELECT")
    }
    function handleSort(e) {
        dispatch(sort_AZ_ZA(e.target.value))
    }

    return(
        <div>
            <Link to= '/videogames' >CREAT VIDEOGAME</Link>
            <button onClick={e=>{  handleClick(e) }} >
            Reload videogames
            </button>
        <div>
            <select onChange={e=> handleSort(e)}>
                <option value='az'>Ascendent</option>
                <option value='za'>Descendent</option>
            </select>
            <select onChange={e=> handleFilterGenre(e)}>

                <option value='All'>All</option>
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
                <option value='All'>All</option>
                <option value='Genre'>Created</option>
                <option value='Genre'></option>
            </select>
            <Paginado 
            vgPerPage={vgPerPage}
            allVideoGames={allVideoGames.length}
            paginado={paginado}
            />
            {
            currentVG?.map( (g,i)=>(

                <div key={i}>
                <Link to={`detalle de cada game-> /videogame/${g.id}`}>

                <CardGame 
                    name={g.name}
                    image={g.img}
                    genre={g.genres.map(g=> <h4 key={g.id}>{g.name}</h4>)} 
                    />
                    </Link>
                </div>
            ))
            }
        </div>
        </div>

    )
}