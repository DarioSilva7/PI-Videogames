import React from "react";
import { useState,useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getGames, filterByGenre, sort_AZ_ZA, sort_by_Rating, isCreated} from "../../Actions";
import {Link} from 'react-router-dom'
import CardGame from "../CardGame/CardGame";
import Paginado from "../Paginado/paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from './home.module.css'

export default function Home() {
    const dispatch= useDispatch()
    const allVideoGames = useSelector((state)=>state.showVideoGames)
    // console.log(allVideoGames, "///////////////////ALLVIDEOGAMES")
    //guardo el estado de showVideogames en allVideoGames

    const [currentPage, setCurrentPage]= useState(1) //guardo el estado de mi pagina actual. El (1) hace referencia a la pagina en que inica
    const [vgPerPage, setvgPerPage]= useState(9) // Seteo cuantos videogames muestro por pagina
    const indexOfLastVG= currentPage * vgPerPage // 9
    const indexOfFirstVG= indexOfLastVG - vgPerPage // 0
    
    var currentVG= allVideoGames.slice(indexOfFirstVG,indexOfLastVG) //los videogames de la pag actual 
    //nro pag          iOfFirstVG      iOfLastVG     
    //   1 ----------------0----------------9
    //   2 ----------------10----------------19
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

    }
    function handleSort(e) {
        e.preventDefault();
        dispatch(sort_AZ_ZA(e.target.value))
    }

    function handleRating(e){
        dispatch(sort_by_Rating(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(isCreated(e.target.value))
    }

    return(
        <div className={styles.body} > 
                  <h1 className={styles.h1}>Henry Videogames</h1>
            <div className={styles.filters}>

                <div className={styles.box}>
                    <select onChange={e=> handleSort(e)}>
                        <option value='az'>Ascendent A-Z</option>
                        <option value='za'>Descendent Z-A</option>
                    </select>
                </div>

                <div className={styles.box}>
                    <select onChange={e=> handleFilterCreated(e)}>
                        <option value='All'>All</option>
                        <option value='Created'>Created</option>
                        <option value='Existent'>Existent</option>
                    </select>
                </div>
            

                <div className={styles.box}>
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
                </div>
            </div>
            <div>
                <SearchBar />
            </div>
            <div className={styles.contenedor}>
                <div>
                    <Link to= '/videogames' >CREAT VIDEOGAME</Link>
                </div>

                <div>
                    <button onClick={e=>{  handleClick(e) }} >
                    Reload videogames
                    </button>
                </div>                
            </div>

            <div>
                <select onChange={e=>handleRating(e)}>
                    <option value='best'>Rating ⬆</option>
                    <option value='worst'>Rating ⬇</option>
                </select>
            </div>

            
            <div>
{                console.log(currentVG, "////////////////////// GGGGGG")}
                { 
                        
                        // console.log(g.name)
                    currentVG?.map( (g,i)=>(
                        <div  className={styles.card} key={i}>
                            <Link to={`/videogame/${g.id}`}>
                            
                                <CardGame 
                                    name={g.name}
                                    image={g.img } // condicional para imagen default
                                    // c.image? c.image: <img src=" url..."> 
                                    // genre={g.genres.map(g=> <h4 key={g.id}> {" - " + g.name} </h4> )} 
                                    genre={g.genres}
                                    id={g.id}
                                    />
                            </Link>
                        </div>
                    ))
                }
                
            </div >
            <Paginado 
                vgPerPage={vgPerPage}
                allVideoGames={allVideoGames.length}
                paginado={paginado}
                />
    </div>
    )
}