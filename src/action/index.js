const selectCountry = (country) => {
  return {
    type: "SELECT_COUNTRY",
    country,
  };
};
const renderCities = (cities) => {
  return {
    type: "RENDER_CITIES",
    cities,
  };
};

const selectCity = (city) => {
  return {
    type: "SELECT_CITY",
    city,
  };
};

module.exports = { selectCountry, renderCities, selectCity };
