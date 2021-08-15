import { number } from "prop-types";
import React from "react";

export default function Paginado({vgPerPage, allVideoGames, paginado}) {
   const pageNumber=[]
    for (let i=1; i<Math.ceil(allVideoGames/vgPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav className='container'>
            <div className="paginado">

            <ul>
            {   pageNumber && 
                pageNumber.map(nro=>(
                    <li id='number' key={nro}>
                        <a onClick={()=> paginado(nro)}> {nro} </a>
                    </li>
            ))
            }
            </ul>
            </div>
        </nav>
    )
}