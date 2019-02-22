import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./SearchFilterBar.css";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from "react-redux";
import {} from "./action";
import moment from "moment";

const styles = {
  card: {
    width: "10rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class Weather extends React.Component {
  constructor(props) {
    super();
    // this.state = {
    //   expanded: false
    //  { classes } = props;
    // const bull = <span className={classes.bullet}>•</span>;
  }
  render() {
    console.log(this.props);
    return (
      <div className="" style={{ "margin-top": "2rem" }}>
        <Card className="" style={{ width: "15rem" }}>
          <CardHeader
            // avatar={<Avatar aria-label="Meet Ups" className={classes.avatar} />}
            subheader="WEATHER FORECAST"
          />
          <CardContent>
            {this.props.weather.map(element => {
              return (
                <div>
                  <p>
                    {" "}
                    {moment(element.date).format("ll")} - {element.description}{" "}
                  </p>
                  <Divider />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({ weather: state.weather });

const mapDispatchToProps = dispatch => ({});

//export default withStyles(styles)(Weather);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Weather));
