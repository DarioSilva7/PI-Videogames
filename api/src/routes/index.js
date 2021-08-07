const { Router } = require('express');
const router = Router();
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame , Genre} = require('../db');

const getApiGames= async ()=>{
    const infoApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let gamesArray= await mapGames(infoApi.data.results)
    let next = infoApi.data.next
    while (gamesArray.length < 100) {
        const temp= await axios.get(next)
        const carga= await mapGames(temp.data.results)
        gamesArray= [...gamesArray,...carga]
        next= temp.data.next
    }
    console.log(gamesArray.length)
    return gamesArray
}

const mapGames =(arreglo)=>{
  const aux=  arreglo.map(c => {
        return {
            id: c.id,
            name: c.name,
            img: c.background_image,
            genre: c.genres.map(g=> g.name)
        }
    })
    return aux
}

const getDBgame= async()=>{
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }
    })
}

const allGames= async()=>{
    const fromApi= await getApiGames(); 
    const fromDB= await getDBgame();
    const allgame= fromApi.concat(fromDB) 
    return allgame
}

//--------------------------------------------------------------------

// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async(req, res)=>{
    const {name}= req.query;
    const games= await allGames()

        if(name){
            let byName= await games.filter(n=> n.name.toLowerCase().includes(name.toLowerCase()))
            byName.length ? 
            res.status(200).send(byName) 
            : res.status(404).send('No se encuentra el Videojuego')
        }
        else{
            res.status(200).json(games)
        }
})
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
    //description
    //releaseDate
    //rating
    //platforms
    //name img genre
    // Incluir los géneros asociados

    router.get('/videogame/:id', async(req,res)=>{
    const {id}= req.params;
    console.log(id)
    try {
            if(id.length>8){
                const game = await Videogame.findOne({
                    where: {id: id},
                })
                return res.status(200).send(game)
            }
            const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const result = {
                id: game.data.id,
                name: game.data.name,
                img: game.data.background_image,
                rating: game.data.rating,
                description: game.data.description,
                released: game.data.released,
                platforms: game.data.parent_platforms.map(c => c.platform.name)
            }
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
        }

})

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

router.get('/genres', async(req, res)=>{

        const genresApi= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const arrOfGenres= genresApi.data.results.map(g=> {
            return {
                name: g.name
            }
        })
    Genre.bulkCreate(arrOfGenres)
        //clase de Mati -> precarga para DB
    const allGenres= await Genre.findAll();
    res.send(allGenres) 
})

//--------------------------------------------------------------------
//--------------------------------------------------------------------

router.post('/videogames', async(req,res)=>{
    try{
        const{img, name,description,released_date, genres, rating,platforms}= req.body;
    const createdVideoGame = await Videogame.create({
        name, img, description, released_date, rating, platforms
    })
    res.json(createdVideoGame)}
    catch(err){
        console.log(err)
    }
})


module.exports = router;