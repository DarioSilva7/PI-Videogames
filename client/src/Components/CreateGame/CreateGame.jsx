import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { postGame, getGenres, getGames } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from './CreateGame.module.css'
import Loading from "../Loading/Loading";
import style from '../Loading/Loading.module.css'

export default function VideogameCreate(params) {
    const dispatch= useDispatch()
    const generos= useSelector((state)=> state.stateGenres)
    const loading = useSelector((state)=>state.loading)
    const thePlatforms=['PlayStation','Xbox','Nintendo','SEGA','Android','3DO','Atari','Linux','iOS','Commodore','Apple Macintosh']

    const [form, setForm]= useState({
        genres:[],
        platforms:[]
    })
    const history= useHistory() 
    useEffect(()=>{

        dispatch(getGenres())
        // eslint-disable-next-line
    },[])

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    function handleGenres(e){
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
    }

    function handlePlatforms(e){
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
        })
    }


    function handleSubmit(e) {
        dispatch(postGame(form))
        alert("Videogame created 😁")
        setForm({})
        dispatch(getGames())
        history.push('/home')
    }

    return (
<div className={style.contenedor}>{
    (loading)?
    <Loading className={styles.loading} />
    :
        <div className={styles.container}>
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
                    required
                    />
            
                    <label htmlFor="description">Description:</label>
                    <textarea 
                    type="textarea"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    maxLength="150"
                    rows="5"
                    />
                    
                    <label htmlFor="released date">Released date:</label>
                    <input 
                    type="date"
                    id="released date"
                    name="released"
                    value={form.released}
                    onChange={e=> handleChange(e)}
                    required
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
                        <select onChange={e=> handleGenres(e)} id="genres" name="genres" defaultValue="" required>
                            <option name="genres" value="">- - - - -</option>
                            {
                                generos?.map(g=>(
                                    <option value={parseInt(g.id)}> {g.name}</option>
                                    ))
                            }
                        </select>
                    <ul>
                        <li>{form.generos?.map(el=> el + " - ")}</li>
                    </ul>
                    </label>

                    <label htmlFor="platforms" >Platforms:
                        <select onChange={e=> handlePlatforms(e)} id="platforms" name="platforms" defaultValue="" required>
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
                    name="img"
                    id="image"
                    onChange={handleChange}
                    value={form.img}
                    />

                <button type="submit">CREATE!</button>
            </form>
        </div>
    }
</div>
    )
}