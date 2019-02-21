import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import {} from "./action";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import SearchFilterBar from "./SearchFilterBar";
import EventCard from "./EventCard";

const styles = (theme) => ({});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <SearchFilterBar />
        {this.props.meetupCards}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ meetupCards: state.meetupCards });

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
