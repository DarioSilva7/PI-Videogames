const initialState={
    allVideogames:[],
    showVideoGames:[],
    stateGenres:[],
    detail:[]
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                allVideogames: action.payload,
                showVideoGames: action.payload,
            }
            
        case 'FILTER_BY_GENRE':
            let allGames= state.allVideogames
            const mapeo= allGames.map(g=> {
                return {...g, genres: g.genres.map(el=>el.name)}
            }) // cambio la forma de guardar los genres, hago un array con los nombres de cada genero
            
            const filtrados= action.payload=== 'All' ? allGames : mapeo.filter(e => {
                return e.genres.includes(action.payload)}) // filtro 
            return { 
                ...state,
                showVideoGames: filtrados
            }

        case 'SORT_AZ_ZA': {
            if (action.payload === "az") return { ...state, showVideoGames: [...state.showVideoGames].sort((game1, game2) => game1.name > game2.name ? 1 : -1) }
            return { ...state, showVideoGames: [...state.showVideoGames].sort((game1, game2) => game1.name > game2.name ? -1 : 1) }
        }

        case 'SORT_BY_RATING':{
                if (action.payload === 'high') return {...state, showVideoGames: [...state.showVideoGames].sort((a, b) => a.rating > b.rating ? -1 : 1)}
                return {...state, showVideoGames: [...state.showVideoGames].sort((a, b) => a.rating > b.rating ? 1 : -1)}
            }
            
        case 'IS_CREATED' :{
            let allGames= state.allVideogames
            var losfiltrados= action.payload === "Created" ? allGames.filter(g=> g.createdInDB): allGames.filter(g=> !g.createdInDB)
            return action.payload === 'All' ? {...state, showVideoGames:allGames} : {...state, showVideoGames: losfiltrados}
        }

        case 'GET_BY_NAME':{
            // console.log(action.payload,"////////// ACTION//PAYLOAD")
            return{
                ...state,
                showVideoGames: action.payload
            }
        }
        case 'GET_GENRES':{
            console.log(action.payload,"ACTIONPAYLOAD--- REDUCER")
            return{
                ...state,
                stateGenres: action.payload
            }
        }

        case 'GET_BY_ID':{
            return {
                ...state,
                detail: action.payload
            }
        }

        case 'POST_VIDEOGAME':{
            return{ 
                ...state,
            }
        }

        default:
            return state
    }
}

export default rootReducer;   