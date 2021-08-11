const { Router } = require('express');
const router = Router();
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame , Genre, Platform} = require('../db');

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
            genre: c.genres.map(g=> g.name),
            platforms: c.parent_platforms.map(p=>p.name)
        }
    })
    return aux
}

const getDBgame= async ()=>{
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

    if(name){
        const allgames= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        let byName= await allgames.data.results.filter(n=> n.name.toLowerCase().includes(name.toLowerCase()))
        // console.log(byName[0].parent_platforms)
        let arr= byName.map(e=>{
            // console.log(e.parent_platforms)
            return {
                id: e.id,
                name: e.name,
                img: e.background_image,
                genre: e.genres.map(g=> g.name),
                platforms: e.parent_platforms.map(p=>p.platform.name)
            }})

        let ofDB= Videogame.findAll({
                    where:{ name:name},
                    include:{
                        model: Genre,
                        attributes: ["name"],
                        through:{
                            attributes:[]}
                    }})

        let arrByName= arr.concat(ofDB)
            arrByName.length ?
            res.status(200).send(arrByName) 
            : res.status(404).send('No se encuentra el Videojuego')
        } 
        else{
            const games= await allGames()
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
    // Incluir los géneros asociados

    router.get('/videogame/:id', async(req,res)=>{
    const {id}= req.params;

    try {
            if(id.length>8){
                const game = await Videogame.findOne({
                    where: {id: id},
                    include:{
                        model: Genre,
                        attributes: ["name"],
                        through:{ attributes:[]}
                 }
                })
                return res.status(200).send(game)
            }
            const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
          
            console.log(game.data.genres)
            const result = {
                name: game.data.name,
                img: game.data.background_image,
                genre: game.data.genres.map(g=>g.name),
                description: game.data.description,
                released: game.data.released,
                rating: game.data.rating,
                platforms: game.data.parent_platforms.map(c => c.platform.name)
            }
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
        }
})

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


router.post('/videogames', async(req,res)=>{
    try{
        const{img, name, description,released_date, genres, rating, platforms}= req.body;
        
        const createdVideoGame = await Videogame.create({
            img, name, description, released_date, genres, rating, platforms
        })

        const generos= await Genre.findAll({
        where:{
            name: genres
        }
    })
        createdVideoGame.addGenre(generos)
        res.json(createdVideoGame)
    }

    catch(err){
        console.log(err)
    }
})


module.exports = router;