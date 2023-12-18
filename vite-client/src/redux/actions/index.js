import axios from "axios";
const BASE_URL = "http://localhost:3001/api";
export function setLoading() {
  return {
    type: "SET_LOADING",
  };
}

export function getGames(page) {
  return async function (dispatch) {
    try {
      dispatch(setLoading());
      let url = BASE_URL + "/videogames";
      page && url + `?page=${page}`;
      console.log("🚀 ~ file: index.js:16 ~ url:", url);
      const { data } = await axios.get(url);

      console.log("🚀 ~ file: index.js:14 ~ data:", data);

      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: data,
      });
    } catch (error) {
      console.log("🚀 ~ file: index.js:21 ~ error:", error);
      dispatch(setErrors(error));
    }
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function sort_AZ_ZA(payload) {
  return {
    type: "SORT_AZ_ZA",
    payload,
  };
}

export function sort_by_Rating(payload) {
  return {
    type: "SORT_BY_RATING",
    payload,
  };
}

export function isCreated(payload) {
  return {
    type: "IS_CREATED",
    payload,
  };
}

// export function getByName(name) {
//   return async function (dispatch) {
//     try {
//       const json = await axios.get(BASE_URL + `/videogames?name=${name}`);
//       return dispatch({
//         type: "GET_BY_NAME",
//         payload: json.data,
//       });
//     } catch (err) {
//       console.log("🚀 ~ file: index.js:60 ~ err:", err);
//       dispatch(setErrors([{ error: err.response.data.error[0].message }]));
//       alert("Videogame not found");
//     }
//   };
// }

export function getVideogameDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        BASE_URL + "/videogames/videogame/" + id
      );
      return dispatch({
        type: "GET_BY_ID",
        payload: data.data,
      });
    } catch (error) {
      alert("Videogame not found");
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(BASE_URL + "/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(BASE_URL + "/platforms");
      return dispatch({
        type: "GET_PLATFORMS",
        payload: data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postGame(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        BASE_URL + "/videogames/create",
        payload
      );
      dispatch(setMessages(data.message));
      return dispatch({
        type: "POST_VIDEOGAME",
        payload: data.data,
      });
    } catch (error) {
      console.error("🚀 ~ file: POSTGAME ERROR :131 ~ error:", error);
      alert(error.response.data.message);
      dispatch(setErrors(error.response.data.message));
    }
  };
}

export function resetGames() {
  return {
    type: "RESET_GAMES",
  };
}

export function setErrors(payload) {
  return function (dispatch) {
    return dispatch({
      type: "SET_ERROR",
      payload,
    });
  };
}

export function setMessages(payload) {
  return function (dispatch) {
    return dispatch({
      type: "SET_MESSAGE",
      payload,
    });
  };
}
