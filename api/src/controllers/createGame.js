const {Videogame , Genre} = require('../db');

exports.createGame = async(req,res)=>{
    const{img, name, description,released_date, genres, rating, platforms, createdInDB}= req.body;
    
    try{
        const createdVideoGame = await Videogame.create({
            img, name, description, released_date, rating, platforms,createdInDB
        })
        
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
}