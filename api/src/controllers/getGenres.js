const {Genre} = require('../db');

exports.getGenres= async(req,res)=>{
    try{
        const arr = await Genre.findAll()
        const generos = arr.map(el=> el.dataValues)
        res.json(generos)
    }catch(error){
        console.log(error)
    }
}