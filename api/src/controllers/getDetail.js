const axios = require ('axios');
const {Videogame , Genre} = require('../db');
const {API_KEY} = process.env

exports.getDetail = async(req,res)=>{
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
}