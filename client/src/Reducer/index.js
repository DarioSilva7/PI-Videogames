const initialState={
    videogames:[],
    createdGames:[]

}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames:action.payload
            }
        case 'ADD_VIDEOGAME':
            return{
                ...state,
                createdGames: [...state.createdGames, action.payload]
            }
        default
    }

}

export default rootReducer;   