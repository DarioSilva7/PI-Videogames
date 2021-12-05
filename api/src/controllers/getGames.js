require('dotenv').config();
const {Videogame , Genre, Op} = require('../db');
const axios = require ('axios');
const {API_KEY} = process.env

exports.getGames = async(req, res)=>{
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
}


const allGames= async()=>{
    const fromApi= await getApiGames(); 
    const fromDB= await getDBgame();
    const allgame= fromDB.concat(fromApi) 
    return allgame
}

const getApiGames= async ()=>{
    const infoApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    
    // var temp=[]
    // for (let index = 1; index < 6; index++) { 
    // temp.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${index}`))
    // }
    // const infodeapi2= await Promise.all(temp)

    // console.log(infodeapi2)
    // mapGames(infodeapi2)
    // console.log(infodeapi2[0].data.results)
    
    // var arreglodeinfo=[]
    // for (let i = 0; i < infodeapi2.length; i++) {
    //     arreglodeinfo= [...arreglodeinfo, mapGames(infodeapi2[i].data.results) ] 
    // }
    // return arreglodeinfo

    let gamesArray= await mapGames(infoApi.data.results)

    let next = infoApi.data.next
    while (gamesArray.length < 100) {
        const temp= await axios.get(next)
        const carga= await mapGames(temp.data.results)
        gamesArray= [...gamesArray,...carga]
        next= temp.data.next
    }
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