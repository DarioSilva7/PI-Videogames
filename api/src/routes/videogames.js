const {Router} = require ("express")
const allGames= require ('../Controllers/getGames')

const router= Router()
module.exports = router;

router.get ('/', async(req, res, next)=>{
    const {name}= req.query;
    const games= allGames()
    try{
        if(name){
            const byName= games.filter(n=> n.name.includes(name))
        if(byName.length)
        { res.status(200).send(byName)}
            else{
                res.status(404).send('No se encuentra el Videojuego')
                }
    }
    else{
        res.status(200).json(games)
    }
    }
    catch(err){
        return next(err)
    }
})
