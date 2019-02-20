import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "./action";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingtop: "56.25%" //16:9 ratio
  },
  actions: {
    display: "flex"
  },
  expland: {
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

  // handleExpandClick = () => {
  //   this.setState(state => ({ expand: !state.expanded }))
  // }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar aria-label="Meet Ups" className={classes.avatar} />}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Meet Your Best Freakin Friend"
          subheader="April 1st, 20never"
        />
        <CardMedia
          className={classes.media}
          image="https://secure.meetupstatic.com/photos/event/3/3/c/3/global_478213251.jpeg"
          title="Mad Lad"
        />
        <CardContent>
          <Typography component="p">
            This is where the specific description of the Meet Ups are supposed
            to go. But for the time being this will be a description on how
            douche the guys in the picture look. The male components in the
            picture above are the reason why Nsync gets hatred after all these
            years of their retirement.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          {/* Commenting out the below component because it is the expand icon */}
          {/* <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
          <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
        {/* Commenting out the component below because it is content for the expanded card */}
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ test: state.test });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventCard));
