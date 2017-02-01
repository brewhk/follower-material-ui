import _bindAll from 'lodash.bindall';
import React, { Component, PropTypes } from 'react';
import { Follower } from 'meteor/brewhk:follower';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

class UsersListingItem extends Component {
    constructor(props) {
        super(props);

        _bindAll(this, ['followUser', 'unfollowUser']);
    }

    followUser() {
        Follower.follow(this.props.user._id, function (err, res) {
        })
    }

    unfollowUser() {
        Follower.unfollow(this.props.user._id, function (err, res) {
        })
    }

    render() {
        return (
            <Paper>
                { this.props.ready ? (
                  <div>
                    <Avatar src={this.props.user.settings.profile && this.props.user.settings.profile.avatar ? this.props.user.settings.profile.avatar : Meteor.settings.public.profile.defaultAvatar} />
                    <p>{this.props.user.settings.account.firstName} {this.props.user.settings.account.lastName}</p>
                    <FlatButton
                      label="Profile"
                      containerElement={<Link to={`/user/${this.props.user._id}`} />}
                    />
                    <FlatButton label="Follow" onClick={this.followUser} />
                    <FlatButton label="Unfollow" onClick={this.unfollowUser} />

                  </div>
                ) : <CircularProgress /> }
            </Paper>
        );
    }
}
UsersListingItem.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      settings: PropTypes.shape({
        profile: PropTypes.shape({
          avatar: PropTypes.string,
        }),
        account: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
};

export default UsersListingItem;
