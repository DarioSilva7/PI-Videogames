const { Router } = require('express');
const router = Router();
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame , Genre} = require('../db');

const getApiGames= async ()=>{
    const infoApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const infoApiOk= await infoApi.data.results.map(c => {
        return {
            name: c.name,
            img: c.background_image,
            genre: c.genres.map(g=> g.name)
        }
    })
    return infoApiOk
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
            const byName= await games.filter(n=> n.name.toLowerCase().includes(name.toLowerCase()))
            byName.length ? 
            res.status(200).send(byName) 
            : res.status(404).send('No se encuentra el Videojuego')
        }
        else{
            res.status(200).json(games)
        }

})

// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
    //description
    //releaseDate
    //rating
    //platforms
    //name img genre
    // Incluir los géneros asociados

    router.get('/videogames:id', async(req,res)=>{
    const {id}= req.params;
    try {
            if(!Number.isInteger(id)){
                const game = await Videogame.findOne({
                    where: {id: id},
                })
                console.log(game)
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
            next(err)
        }

})



//-----------------------------------------------------------------------------------------


router.get('/genres', async(req, res)=>{
    try{
        const genresApi= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const arrOfGenres= genresApi.data.results.map(g=> {
            return {
                name: g.name
            }
        })
        Genre.bulkCreate(arrOfGenres)
        //clase de Mati -> precarga para DB
    }
    catch(err){
        console.log(err)
    }
})

//--------------------------------------------------------------------
//--------------------------------------------------------------------



module.exports = router;