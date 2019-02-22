import React from "react";
import EventCard from "./EventCard";
import { connect } from "react-redux";
import {
  selectCountry,
  renderCities,
  selectCity,
  storeMeetups,
  renderMeetups,
  renderHolidaysOrWeekendMeetups,
  storeWeather
} from "./action";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Select from "react-select";
import countries from "./assets/countries";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import "./SearchFilterBar.css";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const suggestions = countries.map(country => ({
  value: country.name,
  label: country.name,
  code: country.code
}));

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: 0
  },
  button: {
    margin: theme.spacing.unit
  },
  "btn-search": {
    backgroundColor: "#1976d2",
    marginTop: "1rem",
    marginBottom: "1rem",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#136ac1 !important"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class SearchFilterBar extends React.Component {
  handleSelectCountry = () => async value => {
    await this.props.selectCountry(value);
    axios
      .get(`/api/cities/${await this.props.country.code}`)
      .then(countries =>
        countries.data.results.map(obj => ({
          label: `${obj.city}${obj.state ? ", " + obj.state : ""}`,
          city: obj.city,
          state: obj.state,
          lat: obj.lat,
          lon: obj.lon,
          country: obj.localized_country_name,
          countryCode: obj.country
        }))
      )
      .then(cities => {
        this.props.renderCities(cities);
      });
  };
  handleInputCity = () => async value => {
    try {
      await this.props.selectCity(value);
    } catch (error) {
      console.error(error);
    }
  };
  handleSelectCity = () => async () => {
    //console.log("event=>", value);
    const query = this.props.selectedCity.state
      ? `?state=${this.props.selectedCity.state}`
      : "";
    axios
      .get(
        `/api/meetups/${this.props.selectedCity.countryCode}/${
          this.props.selectedCity.city
        }${query}`
      )
      .then(async results => {
        await this.props.storeMeetups(results.data);
        return this.props.meetups;
      })
      .then(meetups => {
        this.props.renderMeetups(
          meetups.map(meetup => {
            return <EventCard meetup={meetup} />;
          })
        );
        this.props.renderHolidaysOrWeekendMeetups(
          meetups
            .filter(meetup => meetup.isHolidayOrWeekend)
            .map(meetup => {
              return <EventCard meetup={meetup} />;
            })
        );
      });
    axios
      .get(
        `/api/weather/${this.props.selectedCity.countryCode}/${
          this.props.selectedCity.city
        }`
      )
      .then(async results => {
        console.log("=====before await====", results);
        await this.props.storeWeather(results.data);
        console.log(`=======after the await=======`, this.props.weather);
        return this.props.weather;
      })
      .then(() => {
        console.log(this.props.weather);
      });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className="search-bar">
        <div className={classes.root}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={suggestions}
              components={components}
              value={this.props.country}
              onChange={this.handleSelectCountry()}
              placeholder="Search a country"
              isClearable
            />
            <div className={classes.divider} />
            <Select
              classes={classes}
              styles={selectStyles}
              components={components}
              options={this.props.cities}
              value={this.props.selectedCity}
              placeholder="Search a city"
              isClearable
              onChange={this.handleInputCity()}
            />
            <div className={classes.divider} />
            <Button
              variant="contained"
              className={classes["btn-search"]}
              onClick={this.handleSelectCity()}
            >
              Search
              <Search className={classes.rightIcon} />
            </Button>

            <FormControlLabel
              control={<Switch value={this.props.holidaysOrWeekendsOnly} />}
              label="Holidays Or Weekends Only"
              onChange={() => this.props.toggle()}
            />
          </NoSsr>
        </div>
      </div>
    );
  }
}

SearchFilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  country: state.country,
  cities: state.cities,
  selectedCity: state.selectedCity,
  meetups: state.meetups,
  weather: state.weather
});

const mapDispatchToProps = dispatch => ({
  selectCountry: country => {
    const action = selectCountry(country);
    dispatch(action);
  },
  renderCities: cities => {
    const action = renderCities(cities);
    dispatch(action);
  },
  selectCity: city => {
    const action = selectCity(city);
    dispatch(action);
  },
  storeMeetups: meetups => {
    const action = storeMeetups(meetups);
    dispatch(action);
  },
  renderMeetups: meetups => {
    const action = renderMeetups(meetups);
    dispatch(action);
  },
  renderHolidaysOrWeekendMeetups: meetups => {
    const action = renderHolidaysOrWeekendMeetups(meetups);
    dispatch(action);
  },
  storeWeather: weather => {
    const action = storeWeather(weather);
    dispatch(action);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchFilterBar));
