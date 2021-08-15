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

/* */