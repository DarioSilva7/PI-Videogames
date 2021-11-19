import axios from 'axios'

export function setLoading() {
    return {
        type: "SET_LOADING"
    }
}

export function getGames() {
    return async function (dispatch) {
        dispatch(setLoading())
        var json = await axios.get('http://localhost:3001/videogames', {

        });

        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function filterByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function sort_AZ_ZA(payload) {
    return {
        type: 'SORT_AZ_ZA',
        payload
    }
}

export function sort_by_Rating(payload) {
    return {
        type: 'SORT_BY_RATING',
        payload
    }
}

export function isCreated(payload) {
    return {
        type: 'IS_CREATED',
        payload
    }
}

export function getByName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: "GET_BY_NAME",
                payload: json.data
            })
        }
        catch (err) {
            alert("Videogame not found")
        }
    }
}


export function getdetalle(id) {

    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogame/" + id)
            return dispatch({
                type: "GET_BY_ID",
                payload: json.data
            })
        }
        catch (error) {
            alert("Videogame not found")
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        try {
            var theGenres = await axios.get('http://localhost:3001/genres')
            return dispatch({
                type: 'GET_GENRES',
                payload: theGenres.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export function postGame(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogames', payload)
        return response
    }
}

export function resetGames() {
    return {
        type: "RESET_GAMES"
    }
}

export function deleteGame(id){
    return async function(dispatch){
        return dispatch({
            type: 'DELETE_VIDEOGAME',
            payload: id
        })
    }
}