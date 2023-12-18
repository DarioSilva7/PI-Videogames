/* eslint-disable no-case-declarations */
const initialState = {
  allVideogames: [],
  videogamesQty: null,
  showVideoGames: [],
  genres: [],
  platforms: [],
  detail: [],
  loading: false,
  error: null,
  message: null,
  page: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "GET_VIDEOGAMES":
      return {
        ...state,
        allVideogames: action.payload.data,
        showVideoGames: action.payload.data,
        videogamesQty: action.payload.qty,
        loading: false,
      };

    case "FILTER_BY_GENRE":
      const { allVideogames } = state;
      const filteredGames =
        action.payload === "default"
          ? allVideogames
          : allVideogames.filter((game) => {
              return game.genres.find((genre) => genre.id == action.payload);
            });
      return {
        ...state,
        showVideoGames: filteredGames,
      };

    case "SORT_AZ_ZA": {
      const sortedGames = [...state.showVideoGames];
      if (action.payload === "az")
        // Ordenar de A-Z
        sortedGames.sort((game1, game2) => (game1.name > game2.name ? 1 : -1));
      // Ordenar de Z-A
      else
        sortedGames.sort((game1, game2) => (game1.name > game2.name ? -1 : 1));
      // Ordenar de manera aleatoria
      if (action.payload === "random") {
        sortedGames.sort(() => Math.random() - 0.5);
      }
      return {
        ...state,
        showVideoGames: sortedGames,
      };
    }

    case "SORT_BY_RATING": {
      const sortedGames = [...state.showVideoGames];
      if (action.payload === "high")
        sortedGames.sort((a, b) => (a.rating > b.rating ? -1 : 1));
      else sortedGames.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      if (action.payload === "random")
        sortedGames.sort(() => Math.random() - 0.5);
      return {
        ...state,
        showVideoGames: sortedGames,
      };
    }

    case "IS_CREATED": {
      let allGames = state.showVideoGames;
      var filteredByCreated =
        action.payload === "Created"
          ? allGames.filter((g) => g.createdInDB)
          : allGames.filter((g) => !g.createdInDB);
      return action.payload === "default"
        ? { ...state, showVideoGames: allGames }
        : { ...state, showVideoGames: filteredByCreated };
    }

    case "GET_BY_NAME": {
      return {
        ...state,
        showVideoGames: action.payload,
      };
    }
    case "GET_GENRES": {
      return {
        ...state,
        genres: action.payload,
      };
    }

    case "GET_PLATFORMS": {
      return {
        ...state,
        platforms: action.payload,
      };
    }

    case "GET_BY_ID": {
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };
    }

    case "POST_VIDEOGAME": {
      return {
        ...state,
        showVideoGames: [...state.showVideoGames, action.payload],
        loading: false,
      };
    }

    case "RESET_GAMES": {
      return {
        ...state,
        detail: [],
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        errors: action.payload,
      };
    }

    case "SET_MESSAGE": {
      return {
        ...state,
        message: action.payload,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
