import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Menu as SemanticMenu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


import AuthModal from '../components/MyPage/AuthModal';

class Menu extends React.Component {
    render = () => <SemanticMenu pointing secondary>
        <SemanticMenu.Item name="profile" active={ this.props.location.pathname === '/profile' }>
            <Link to="/profile">Profile</Link>
        </SemanticMenu.Item>

        <SemanticMenu.Item name="feed" active={ this.props.location.pathname === '/feed' }>
            <Link to="/feed">Feed</Link>
        </SemanticMenu.Item>

        <SemanticMenu.Item name="friends" active={ this.props.location.pathname === '/friends' }>
            <Link to="/friends">Friends</Link>
        </SemanticMenu.Item>

        <SemanticMenu.Item name="people" active={ this.props.location.pathname === '/people' }>
            <Link to="/people">People</Link>
        </SemanticMenu.Item>

        <SemanticMenu.Item name="messages" active={ this.props.visibility } onClick={ this.props.toggleChatSidebarVisibility }>
            <a><Icon name="mail"/> Messages</a>
        </SemanticMenu.Item>

        <SemanticMenu.Item name="search" active={ this.props.location.pathname === '/search' }>
            <Link to="/search"><Icon name="search"/> Search</Link>
        </SemanticMenu.Item>

        <AuthModal/>
    </SemanticMenu>
}

const mapStateToProps = state => ({
    location: state.router.location,
    visibility: state.display.sidebarVisibility
});

import { toggleChatSidebarVisibility } from '../actions/display';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleChatSidebarVisibility }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);