const initialState={
    allVideogames:[],
    showVideoGames:[],
    videogames:[]
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                allVideogames: action.payload,
                showVideoGames: action.payload,
                videogames: action.payload
            }
            
            case 'FILTER_BY_GENRE':
                console.log(action.payload,"action of filter by genre")
                let allGames= state.allVideogames
                // allGames: allGames.filter(e => e.genres.map((genre) => (genre.name)).includes(action.payload))
                const mapeo= allGames.map(g=> {
                    return {...g, genres: g.genres.map(el=>el.name)}
                }) // cambio la forma de guardar los genres, hago un array con los nombres de cada genero
                // console.log(mapeo," este es el mapeo")
                const filtrados= action.payload=== 'All' ? allGames : mapeo.filter(e => {
                    return e.genres.includes(action.payload)}) // filtro 
                return {
                    ...state,
                    showVideoGames: filtrados
                }
            // case 'ADD_VIDEOGAME':
        //     return{
        //         ...state,
        //         createdGames: [...state.createdGames, action.payload]
        //     }
        case 'SORT_AZ_ZA': {
            if (action.payload === "az") return { ...state, showVideoGames: [...state.showVideoGames].sort((game1, game2) => game1.name > game2.name ? 1 : -1) }
            return { ...state, showVideoGames: [...state.showVideoGames].sort((game1, game2) => game1.name > game2.name ? -1 : 1) }
        }
        // function sortByRatingAux(videogames, sortOrder) {
        // case 'SORTE_BY_RATING':{
        //     if (sortOrder === 'high') return videogames.sort((a, b) => a.rating > b.rating ? -1 : 1)
        //     return videogames.sort((a, b) => a.rating > b.rating ? 1 : -1)
        // }
        default:
        }
            return state
    }


export default rootReducer;   