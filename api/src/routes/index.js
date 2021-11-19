const { Router } = require('express');
const router = Router();
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame , Genre, Platform, Op} = require('../db');


const getApiGames= async ()=>{
    // const infoApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    
    var temp=[]
    for (let index = 1; index < 6; index++) { 
        let {data}= await (axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${index}`))
        temp.push(...data.results)
    }

    let gamesArray= await mapGames(temp)

    // let next = infoApi.data.next
    // while (gamesArray.length < 100) {
    //     const temp= await axios.get(next)
    //     const carga= await mapGames(temp.data.results)
    //     gamesArray= [...gamesArray,...carga]
    //     next= temp.data.next
    // }

    return gamesArray
} 

const mapGames  = async (arreglo)=>{
  const aux=  arreglo.map(c => {

        return {
            id: c.id,
            name: c.name,
            img: c.background_image,
            genres: c.genres.map(g=>{return {id: g.id, name: g.name }}),
            rating: c.rating_top
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
//--------------------------------------------------------------------


router.get('/videogames', async(req, res)=>{
    const {name}= req.query;

    if(name){
        const allgames= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)

        let arr= allgames.data.results.map(e=>{ 
            return {
                id: e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres?.map(g=> g.name),
                rating: e.rating_top,
                platforms: e.parent_platforms.map(p=>p.platform.name)
                }
            }
            )

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

    router.get('/videogame/:id', async(req,res)=>{
    const {id}= req.params;

    try {
            if(id.length>8){
                
                const game = await Videogame.findByPk(
                    id,{
                        include: [Genre]
                    })
                return res.status(200).send(game)
            }
            const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

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


router.post('/videogames', async(req,res)=>{
    const{img, name, description,released, genres, rating, platforms, createdInDB}= req.body;

    try{
        const createdVideoGame = await Videogame.create({
            img, name, description, released, rating, platforms,createdInDB
        })

        const generos= genres.map(async g=> {
           const gbyGame= await Genre.findByPk(g[0])
           createdVideoGame.addGenres(gbyGame)
        })

        await Promise.all(generos)
        res.send("Successfully created videogame.")
    }
    catch(err){
        console.log(err)
    }
})


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

router.get('/genres', async(req,res)=>{
    try{
        const arr = await Genre.findAll()
        const generos = arr.map(el=> el.dataValues)
        res.json(generos)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;