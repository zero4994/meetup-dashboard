const initialState = {
  country: null,
  cities: [],
  selectedCity: null,
  meetups: [],
  meetupCards: [],
  weather: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_COUNTRY": {
      const stateChanges = { country: action.country };
      return {
        ...state,
        ...stateChanges,
      };
    }
    case "RENDER_CITIES": {
      const stateChanges = { cities: action.cities };
      return {
        ...state,
        ...stateChanges,
      };
    }
    case "SELECT_CITY": {
      const stateChanges = { selectedCity: action.city };
      return {
        ...state,
        ...stateChanges,
      };
    }
    case "STORE_MEETUPS": {
      const stateChanges = { meetups: action.meetups };
      return {
        ...state,
        ...stateChanges,
      };
    }
    case "RENDER_MEETUPS": {
      const stateChanges = { meetupCards: action.meetupCards };
      return {
        ...state,
        ...stateChanges,
      };
    }
    case "STORE_WEATHER": {
      const stateChanges = { weather: action.weather };
      console.log(`==========weather reducer======`, action)
      return {
        ...state,
        ...stateChanges,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
