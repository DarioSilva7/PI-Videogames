import axios from 'axios'

export function getGames(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/videogames',{
        });
        // console.log(json.data,"el JSONNNN . DATA")
        
    return dispatch({
        type:'GET_VIDEOGAMES',
        payload: json.data
        })
     }
}

export function filterByGenre(payload){
    console.log(payload," EL VALUE DEL SELECT") //el value del select
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function sort_AZ_ZA (payload){
    console.log(payload)
    return{
        type: 'SORT_AZ_ZA',
        payload
    }
}

export function sort_by_Rating (payload){
    console.log(payload)
    return{
        type: 'SORT_BY_RATING',
        payload
    }
}

export function isCreated(payload){
    console.log(payload)
    return{
        type: 'IS_CREATED',
        payload
    }
}

export function getByName(name){
    return async function(dispatch){
        try{
            var json= await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: "GET_BY_NAME",
                payload: json.data
            })
        }
        catch(err){
            console.log("Videogame not found")
        }
    }
}


export function getdetalle(id){
    console.log(id,'---------------- id en el action')
    return async function(dispatch){
        try{
            var json= await axios.get("http://localhost:3001/videogame/" + id)
            return dispatch({
                type: "GET_BY_ID",
                payload: json.data
            })
        }
        catch(error){
            console.log("Videogame not found")
        }
    }
}

export function getGenres(){
    return async function (dispatch){
        try{
            var theGenres= await axios.get('http://localhost:3001/genres')
            console.log(theGenres,"/////////////// THEGENRES")
            return dispatch({
                type: 'GET_GENRES',
                payload: theGenres.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function postGame(payload){
    return async function(dispatch){
        const response= await axios.post('http://localhost:3001/videogame', payload)
        console.log(response,"---------------response")
        return response
    }
}

/* */