import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import {} from "./action";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import SearchFilterBar from "./SearchFilterBar";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <Grid container fluid="true" spacing={6} className="padding-top-2">
          <Grid item md={3}>
            <SearchFilterBar />
          </Grid>
          <Grid item md={8}>
            {this.props.meetupCards}
          </Grid>
        </Grid>
        {/* <Grid container spacing={24}>
          <Grid item md />
          <Grid item md={8}>
            
          </Grid>
          <Grid item md />
        </Grid> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({ meetupCards: state.meetupCards });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
