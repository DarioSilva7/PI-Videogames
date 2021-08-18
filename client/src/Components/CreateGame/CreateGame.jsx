import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { postGame, getGenres } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function VideogameCreate(params) {
    const dispatch= useDispatch()
    const generos= useSelector((state)=> state.stateGenres)
    console.log(generos,"*---------------------------* generos")
    const thePlatforms=['PlayStation','Xbox','Nintendo','SEGA','Android','3DO','Atari','Linux','iOS','Commodore','Apple Macintosh']

    const [form, setForm]= useState({
        genres:[],
        platforms:[]
    })
    const history= useHistory() // metodo del rputer que me redirige a la ruta que le diga
    
    useEffect(()=>{
        // console.log("----------///////////////////////-----------")
        dispatch(getGenres())
        // eslint-disable-next-line
    },[])

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form,"*****handlechange")
    }
    function handleGenres(e){
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
        console.log(form,"*****handleArray")
    }

    function handlePlatforms(e){
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
        })
        console.log(form,"*****handleArray")
    }


    function handleSubmit(e) {
        alert("Videogame created 😁")
        console.log(form,"-----------------el submit")
        dispatch(postGame(form))
        setForm({})
        history.push('/home') // Me lleva al home luego de crear el juego
    }
    

    return (
        <div>
            <h1>CREATE YOUR VIDEOGAME 😀</h1>
            <Link to="/home"><button>HOME</button></Link>
           
            <form onSubmit={e=> handleSubmit(e)}>
            
                    <label htmlFor="name">Name:</label>
                    <input 
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    />
            
                    <label htmlFor="description">Description:</label>
                    <textarea 
                    type="textarea"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    />
                    
                    <label htmlFor="released date">Released date:</label>
                    <input 
                    type="date"
                    id="released date"
                    name="released date"
                    value={form.released_date}
                    onChange={e=> handleChange(e)}
                    />

                    <label>Rating:</label>

                    <input onChange={e=> handleChange(e)}
                    type="checkbox"
                    name="rating"
                    value="1"
                    />1
                    
                    <input onChange={e=> handleChange(e)}
                    type="checkbox"
                    name="rating"
                    value="2"
                    />2

                    <input onChange={e=> handleChange(e)}
                    type="checkbox"
                    name="rating"
                    value="3"
                    />3

                    <input onChange={e=> handleChange(e)}
                    type="checkbox"
                    name="rating"
                    value="4"
                    />4

                    <input onChange={e=> handleChange(e)}
                    type="checkbox"
                    name="rating"
                    value="5"
                    />5
                
                    <label htmlFor="genres">Genres:
                        <select onChange={e=> handleGenres(e)} id="genres" name="genres" defaultValue="">
                            <option name="genres" value="">- - - - -</option>
                            {
                                generos?.map(g=>(
                                    <option value={g}> {g}</option>
                                    ))
                            }
                        </select>
                    <ul>
                        <li>{form.generos?.map(el=> el + " - ")}</li>
                    </ul>
                    </label>

                    <label htmlFor="platforms">Platforms:
                        <select onChange={e=> handlePlatforms(e)} id="platforms" name="platforms" defaultValue="">
                            <option name="platforms" value="">- - - - -</option>
                            {
                                thePlatforms?.map(p=>(
                                    <option value={p}> {p}</option>
                                    ))
                            }
                        </select>
                    <ul>
                        <li>{form.platforms?.map(el=> el + " - ")}</li>
                    </ul>
                    </label>

                    
                
                    <label htmlFor="image">Image:</label>
                    <input 
                    type="text"
                    name="image"
                    id="image"
                    onChange={handleChange}
                    />

                <button type="submit">CREATE!</button>
            </form>
        </div>
    )
}