import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "./action";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  card: {
    maxWidth: "100%",
    marginTop: "15px"
  },
  media: {
    // height: 250,
    // paddingtop: "56.25%", //16:9 ratio
    // marginTop: "30",
    // width: "80%",
    // marginLeft: "10%"
    height: 0,
    //paddingTop: "56.25%", // 16:9,
    marginTop: "30"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class EventCard extends Component {
  //if we are going to add expand functionality, we need to add the function below.
  //However, since it needs to be tied to the state, I'm just gonna comment it out for now.
  //Making another comment because I need to commit and push this thing to understand where the hell it is going wrng.
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const time = this.props.meetup.time;
    const formatted = moment(time).format("MMMM Do YYYY, HH:mm:ss");
    const subHeader = ` - ${this.props.meetup.yes_rsvp_count} people going`;
    const address = this.props.meetup.venue
      ? ` ${this.props.meetup.venue.address_1}, ${
          this.props.meetup.venue.city
        }, ${this.props.meetup.venue.country}`
      : "";
    const showCardMedia = () => {
      if (this.props.meetup.hasOwnProperty("photo_url")) {
        return (
          // <CardMedia
          //   component="img"
          //   className={classes.media}
          //   src={this.props.meetup["photo_url"]}
          //   title="Mad Lad"
          // />
          <img
            src={this.props.meetup["photo_url"]}
            alt=""
            style={{ margin: "auto" }}
          />
        );
      }
    };
    return (
      <Card className={classes.card}>
        <Grid container fluid="true" spacing={0} className="padding-top-2">
          <Grid item md={3}>
            {showCardMedia()}
          </Grid>
          <Grid item md={8}>
            <CardHeader
              // avatar={<Avatar aria-label="Meet Ups" className={classes.avatar} />}
              title={this.props.meetup.name}
              subheader={`${
                this.props.meetup.isHolidayOrWeekend === true
                  ? `HOLIDAY - ${formatted}`
                  : formatted
              }${subHeader}`}
            />
          </Grid>
        </Grid>

        <CardContent>
          <Typography className="truncate" noWrap="true" component="p">
            {this.props.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {/* Commenting out the below component because it is the expand icon */}
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        {/* Commenting out the component below because it is content for the expanded card */}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.meetup.description
                }}
              />
              <Divider />
              <div style={{ "padding-top": "1rem" }}>
                <strong>Where</strong>
                <div style={{ "margin-left": "2rem" }}>
                  <p>
                    Address:
                    <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                      {address}
                    </span>
                  </p>
                </div>
              </div>
              <div style={{ "padding-top": "1rem" }}>
                <strong>Event URL</strong>
                <div style={{ "margin-left": "2rem" }}>
                  <br />
                  <a href={this.props.meetup.event_url}>
                    {this.props.meetup.event_url}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ selectedCity: state.selectedCity });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventCard));
