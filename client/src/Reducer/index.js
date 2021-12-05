const initialState={
    allVideogames:[],
    showVideoGames:[],
    stateGenres:[],
    detail:[],
    loading:false
}

function rootReducer(state= initialState, action){
    switch(action.type){

        case 'SET_LOADING':
            return{
                ...state,
                loading:true
            }

        case 'GET_VIDEOGAMES':
            return{
                ...state,
                loading: false,
                allVideogames: action.payload,
                showVideoGames: action.payload
            }
            
        case 'FILTER_BY_GENRE':
            let allGames= state.allVideogames
            const mapeo= allGames.map(g=> {
                return {...g, genres: g.genres.map(el=>el.name)}
            }) 
            
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
            return{
                ...state,
                showVideoGames: action.payload
            }
        }
        case 'GET_GENRES':{
            return{
                ...state,
                stateGenres: action.payload
            }
        }

        case 'GET_BY_ID':{
            return {
                ...state,
                detail: action.payload,
                loading: false
            }
        }

        case 'POST_VIDEOGAME':{
            return{ 
                ...state,
                loading: false,
            }
        }

        case 'RESET_GAMES':{
            return{ 
                ...state,
                detail: []
            }
        }

        default:
            return state
    }
}

export default rootReducer;   