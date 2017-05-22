import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Friend from "./Friend";
import Request from "./Request";

import { Loader, Divider } from 'semantic-ui-react';
import { Card } from "semantic-ui-react";


class Friends extends React.Component {
    render = () => {
        const friends = this.props.friends;
        let friends_array = [];
        for (let id of friends.ids) {
            const friend = friends.data[id];
            const user = this.props.users.data[friend.friend];
            if (!user) {
                friends_array.push(<Loader key={ id } active>Loading</Loader>)
            } else {
                friends_array.push(
                    <Friend key={ id } username={ user.username } created={ friend.created } description={ user.description }/>
                )
            }
        }

        const requests = this.props.requests;
        let requests_array = [];
        for (let id of requests.ids) {
            const request = requests.data[id];
            if (request.accepted === null) {
                const user = this.props.users.data[request.author];
                if (!user) {
                    requests_array.push(<Loader key={ id } active>Loading</Loader>)
                } else {
                    requests_array.push(
                        <Request id={ id } key={ id } username={ user.username } />
                    )
                }
            }
        }

        return <div>
            <Divider horizontal>Friendship Requests</Divider>
            <Card.Group itemsPerRow={ 4 }>
                { requests_array }
            </Card.Group>
            <Divider horizontal>Friends</Divider>
            <Card.Group itemsPerRow={ 4 }>
                { friends_array }
            </Card.Group>
        </div>;
    };

    componentDidMount = () => {
        this.props.getFriends();
        this.props.getRequests();
        this.props.getUsers();
    };
}

const mapStateToProps = state => ({
    friends: state.friends,
    requests: state.requests,
    users: state.users,
});

import { getUsers } from '../../actions/users';
import { getFriends } from '../../actions/friends';
import { getRequests } from '../../actions/requests';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getUsers, getFriends, getRequests }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
