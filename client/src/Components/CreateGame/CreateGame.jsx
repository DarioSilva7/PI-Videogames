import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { postGame, getGenres, getGames } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from './CreateGame.module.css'
import Loading from "../Loading/Loading";
import style from '../Loading/Loading.module.css'
import foto from '../../videogame.png'

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
        let v= e.target.value.split(',')
        v= [parseInt(v[0]),v[1]]
        console.log(v,"esto es v")
        setForm({
            ...form,
            genres: [...form.genres, v]
        })
    }

    function handlePlatforms(e){
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
        })
        
    }
    const handleDeleteGenre = function(el){
        setForm({
          ...form,
          genres: form.genres.filter(g => g !== el)
        })
      }
    const handleDeletePlatform = function(el){
        setForm({
          ...form,
          platforms: form.platforms.filter(p => p !== el)
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
            <Link to="/home"><button className={styles.btn}>HOME</button></Link>
           <div>
            <form autoComplete='off' className={styles.createForm} onSubmit={e=> handleSubmit(e)}>
            
                    <label htmlFor="name">Name:</label>
                    <input className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    />
            
                    <label htmlFor="description">Description:</label>
                    <textarea className={styles.input}
                    type="textarea"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    maxLength="1000"
                    rows="5"
                    />
                    
                    <label htmlFor="released date">Released date:</label>
                    <input className={styles.input}
                    type="date"
                    id="released date"
                    name="released"
                    value={form.released}
                    onChange={e=> handleChange(e)}
                    required
                    />

                    <label className={styles.rating}>Rating:
                    <input onChange={e=> handleChange(e)}
                    type="radio"
                    name="rating"
                    value="1"
                    />1
                    
                    <input onChange={e=> handleChange(e)}
                    type="radio"
                    name="rating"
                    value="2"
                    />2

                    <input onChange={e=> handleChange(e)}
                    type="radio"
                    name="rating"
                    value="3"
                    />3

                    <input onChange={e=> handleChange(e)}
                    type="radio"
                    name="rating"
                    value="4"
                    />4

                    <input onChange={e=> handleChange(e)}
                    type="radio"
                    name="rating"
                    value="5"
                    />5
                    </label>

                
                    <label htmlFor="genres">Genres:
                        <select className={styles.input} onChange={e=> handleGenres(e)} id="genres" name="genres" defaultValue="" required>
                            <option name="genres" value="">- - - - -</option>
                            {
                                generos?.map(g=>(
                                    <option value={[g.id, g.name]}> {g.name}</option>
                                    ))
                            }
                        </select>
  
                    <ul>
                        <li>{
                        form.genres?.map(el=> {
                            return (
                             <div key={el}>
                                {el[1]} 
                                <button name={el} type='button' onClick={() => handleDeleteGenre(el)} > X </button>
                            </div>
                            )}
                        )}
                        </li>
                    </ul>
                    
                    </label>

                    <label htmlFor="platforms" >Platforms:
                        <select className={styles.input} onChange={e=> handlePlatforms(e)} id="platforms" name="platforms" defaultValue="" required>
                            <option name="platforms" value="">- - - - -</option>
                            {
                                thePlatforms?.map(p=>(
                                    <option value={p}> {p}</option>
                                    ))
                            }
                        </select>

                    <ul>
                        <li>{
                        form.platforms?.map(el=> {
                            return (
                             <div key={el}>
                                {el} 
                                <button name={el} type='button' onClick={() => handleDeletePlatform(el)} > X </button>
                            </div>
                            )}
                        )}
                        </li>
                    </ul>
                    </label>

                    
                
                    <label htmlFor="image">Image:
                    <input className={styles.input}
                    type="text"
                    name="img"
                    id="image"
                    onChange={handleChange}
                    value={form.img}
                    placeholder="Mario"
                    />
                    {
                        form.img?
                        <img className={styles.img} src={form.img} alt="" />
                        :
                        
                        <img className={styles.img} src={foto} alt="" />
                        
                    }
                    
                    </label>
                <button className={styles.btnCreate} type="submit">CREATE!</button>
            </form>
            </div>

        </div>
    }
</div>
    )
}