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

module.exports = { selectCountry };
