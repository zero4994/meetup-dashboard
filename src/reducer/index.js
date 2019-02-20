const initialState = {
  country: null,
  cities: [],
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
  }
  return state;
};

export default reducer;
