import _bindAll from 'lodash.bindall';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Follower } from 'meteor/brewhk:follower';

import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import UsersListingItem from '../../components/UserListingItem/index.jsx';

class FollowerListing extends Component {

    render() {
        return (
            <div>
              {
                this.props.ready ? (
                  <div>
                    {
                      Follower.getFollowers(this.props.id).map((follower) => (
                        <UsersListingItem key={follower._id} user={follower} />
                      ))
                    }
                  </div>
                ) : <CircularProgress />
              }
            </div>
        );
    }
}
FollowerListing.propTypes = {
    ready: PropTypes.bool.isRequired
};

export default createContainer((params) => {
    let userSubscriptionHandle = Meteor.subscribe('brewhk:follower/followers', params.id);
    return {
        ready: userSubscriptionHandle.ready()
    };
}, FollowerListing);


