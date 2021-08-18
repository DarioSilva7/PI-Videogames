import { number } from "prop-types";
import React from "react";
import './paginado.css'

export default function Paginado({vgPerPage, allVideoGames, paginado}) {
   const pageNumber=[]
    for (let i=1; i<Math.ceil(allVideoGames/vgPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav className='nav'>
            <div className="nro">

            <ul className="pagination">
            {   pageNumber && 
                pageNumber.map(nro=>(
                    <li className='number' key={nro}>
                        <a className="ancla" onClick={()=> paginado(nro)}> {nro} </a>
                    </li>
            ))
            }
            </ul>
            </div>
        </nav>
    )
}