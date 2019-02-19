import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "./action";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {};

class SearchFilterBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Search Filter</h1>
      </div>
    );
  }
}

SearchFilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ test: state.test });

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchFilterBar));
