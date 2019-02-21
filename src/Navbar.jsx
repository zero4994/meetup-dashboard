import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "./action";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Polymer from "@material-ui/icons/Polymer";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 0.02
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Polymer fontSize={"large"} />
            <Typography
              variant="h5"
              color="inherit"
              className={classes.grow}
              fontFamily="Monospace"
              fontSize="h6.fontSize"
            >
              <b>Meetups Dashboard</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ test: state.test });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));
