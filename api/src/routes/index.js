const { Router } = require('express');
const router = Router();
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame , Genre, Platform, Op} = require('../db');


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

const mapGames  = async (arreglo)=>{
  const aux=  arreglo.map(c => {
    //   console.log(c.parent_platforms," c. parent_platforms")
        return {
            id: c.id,
            name: c.name,
            img: c.background_image,
            genres: c.genres.map(g=>{return {id: g.id, name: g.name }}),
            rating: c.rating_top
            // genres: c.genres.map(g=> g.name),
            // platforms: c.parent_platforms.map(p=>p.name)
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
    const allgame= fromDB.concat(fromApi) 
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
        console.log(allgames.data.results,"//////////////////// BANOOO")
        let arr= byName.map(e=>{ 
            return {
                id: e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres.map(g=> g.length ? g.name : "none"),
                rating: e.rating_top,
                platforms: e.parent_platforms.map(p=>p.platform.name)
                }
            }
            )
            // console.log(byName[0].parent_platforms)
            // console.log(arr.genres, "////////////ARRRR?GENREE")

        let ofDB= await Videogame.findAll({
                    where:{ 
                        name: {[Op.like]: `%${name}%`}
                    },
                    include:{
                        model: Genre,
                        attributes: ["name"],
                        through:{
                            attributes:[]}
                    }
            })

        let arrByName= ofDB.concat(arr).slice(0,15)
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
                
                const game = await Videogame.findByPk(
                    id,{
                        include: [Genre]
                    })
                // const game = await Videogame.findOne({
                //     where: {id: id},
                //     include:{
                //         model: Genre,
                //         attributes: ["name"],
                //         through:{ attributes:[]}
                //  }
                // })
                return res.status(200).send(game)
            }
            const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
          
            // console.log(game.data.genres)
            const result = {
                id: game.data.id,
                name: game.data.name,
                img: game.data.background_image,
                genres: game.data.genres.map(g=>{return {id: g.id, name: g.name }}),
                description: game.data.description,
                released: game.data.released,
                rating: game.data.rating_top,
                platforms: game.data.parent_platforms.map(c => { return {id: c.platform.id ,name: c.platform.name}})
            }
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
        }
})

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

router.get('/genres', async(req,res)=>{
    try{
        const arr = await Genre.findAll()
        const generos = arr.map(el=> el.dataValues)
        console.log(generos,"---------------GENEROS")
        res.json(generos)
    }catch(error){
        console.log(error)
    }
})


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


router.post('/videogames', async(req,res)=>{
    const{img, name, description,released_date, genres, rating, platforms, createdInDB}= req.body;
    
    try{
        const createdVideoGame = await Videogame.create({
            img, name, description, released_date, rating, platforms,createdInDB
        })
        
        // await createdVideoGame.addGenres(genres)
        
        const generos= genres.map(async g=> {
           const gbyGame= await Genre.findByPk(g)
           createdVideoGame.addGenres(gbyGame)
        })
            

     // hacer por set
        await Promise.all(generos)
        res.send("Successfully created videogame.")
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router;

/*
-->LAS PLATAFORMAS EN EL FRONT, LLEGAN LLENAS DE NULL
*/