import bindAll from 'lodash.bindall';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Follower } from 'meteor/brewhk:follower';

class FollowButton extends Component {
  constructor(props) {
    super(props);
    bindAll(this, 'follow', 'unfollow');
  }

  follow() {
    Follower.follow(this.props.userId, (err, res) => {
    });
  }

  unfollow() {
    Follower.unfollow(this.props.userId, (err, res) => {
    });
  }

  render() {
    const getComponentToRender = () => {
      if(Meteor.userId()) {
        if (this.props.ready) {
          return this.props.isFollowing ? (
            <RaisedButton label="Unfollow" onClick={this.unfollow} />
          ) : (
            <RaisedButton label="Follow" onClick={this.follow} />
          );
        }
        return <CircularProgress />;
      }
      return null;
    }
    return getComponentToRender();
  }
}

FollowButton.propTypes = {
  ready: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
};

export default createContainer((params) => {
  let userSubscriptionHandle = Meteor.subscribe('brewhk:follower/following', params.userId);
  return {
    ready: userSubscriptionHandle.ready(),
    isFollowing: Follower.checkIfFollowing(params.userId),
  };
}, FollowButton);
