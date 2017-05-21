import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Friend from "./Friend";

import { Loader } from 'semantic-ui-react';


class Friends extends React.Component {
    render = () => {
        const friends = this.props.friends;
        let array = [];
        for (let id of friends.ids) {
            const friend = friends.data[id];
            const user = this.props.users.data[friend.friend];
            if (!user) {
                array.push(<Loader key={ id } active>Loading</Loader>)
            } else {
                array.push(
                    <Friend key={ id } username={ user.username } created={ friend.created } description={ user.description }/>
                )
            }
        }
        return <div>
            { array }
        </div>;
    };

    componentDidMount = () => {
        this.props.getFriends();
        this.props.getUsers();
    };
}

const mapStateToProps = state => ({
    friends: state.friends,
    // requests: state.requests,
    users: state.users,
});

import { getUsers } from '../../actions/users';
import { getFriends } from '../../actions/friends';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getUsers, getFriends }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
