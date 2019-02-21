import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import {} from "./action";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import SearchFilterBar from "./SearchFilterBar";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";
import Weather from "./WeatherComponent";

const styles = theme => ({});

class App extends Component {
  constructor() {
    super();
    this.state = {
      holidaysOrWeekendsOnly: false
    };
  }
  handleClick = () => {
    console.log(this.state);
    this.setState({
      holidaysOrWeekendsOnly: !this.state.holidaysOrWeekendsOnly
    });
  };
  render() {
    console.log("this is the state of this component", this.state);
    return (
      <div className="App">
        <Navbar />

        <Grid container fluid="true" spacing={0} className="padding-top-2">
          <Grid item md={3}>
            <SearchFilterBar toggle={this.handleClick} />
            <Weather />
          </Grid>
          <Grid item md={8}>
            {this.state.holidaysOrWeekendsOnly === true
              ? this.props.holidayOrWeekendMeetups
              : this.props.meetupCards}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meetupCards: state.meetupCards,
  holidayOrWeekendMeetups: state.holidayOrWeekendMeetups
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
