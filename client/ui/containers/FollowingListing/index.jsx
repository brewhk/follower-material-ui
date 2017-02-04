import _bindAll from 'lodash.bindall';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Follower } from 'meteor/brewhk:follower';

import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import UsersListingItem from '../../components/UserListingItem/index.jsx';

class FollowingListing extends Component {

    render() {
        return (
            <div>
              {
                this.props.ready ? (
                  <div>
                    {
                      this.props.following.map((following) => (
                        <UsersListingItem key={following._id} user={following}/>
                      ))
                    }
                  </div>
                ) : <CircularProgress />
              }
            </div>
        );
    }
}
FollowingListing.propTypes = {
    ready: PropTypes.bool.isRequired,
    following: PropTypes.array.isRequired,
};

export default createContainer((params) => {
    let userSubscriptionHandle = Meteor.subscribe('brewhk:follower/following', params.id);
    return {
        ready: userSubscriptionHandle.ready(),
        following: Follower.getFollowings(params.id),
    };
}, FollowingListing);
