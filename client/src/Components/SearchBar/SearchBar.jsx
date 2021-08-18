import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { getByName } from "../../Actions";


export default function SearchBar() {
    const dispatch= useDispatch()
    const [name, setName]= useState("") 
    // armo un estado local (name) para que cuando reciba lo que ingresa el usuario,
    // se lo seteo, y se lo envio a la action, que se lo envia al back (axios)
    // usuario -> Ingresa el nombre -> lo recibo con el setName y lo guado en mi estado local (name)
    // despatcho a la action ese value (name), hace un axios, se comunica con el back y paso al reducer
    // el json.data que recibo.

    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getByName(name))
    }

    return(
        <div>
            <input 
            type="text" 
            placeholder="Search by name" 
            onChange = {(e) => handleInput(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)} >Search</button>
        </div>
    )
}