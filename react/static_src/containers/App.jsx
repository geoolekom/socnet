import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';

import Feed from '../components/Feed/Feed';
import Friends from '../components/Friends/Friends';


class App extends React.Component {

    render = () => <div>
        <Menu pointing secondary>
            <Menu.Item name="profile" active={ this.props.location.pathname === '/profile' }>
                <Link to="/profile">Profile</Link>
            </Menu.Item>

            <Menu.Item name="feed" active={ this.props.location.pathname === '/feed' }>
                <Link to="/feed">Feed</Link>
            </Menu.Item>

            <Menu.Item name="friends" active={ this.props.location.pathname === '/friends' }>
                <Link to="/friends">Friends</Link>
            </Menu.Item>

            <Menu.Item name="messages" active={ this.props.location.pathname === '/messages' }>
                <Link to="/messages">Messages</Link>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item name="logout" />
            </Menu.Menu>
        </Menu>

        <div>
            <Route exact path="/" render={ () => <div>Main</div> }/>
            <Route path="/profile" render={ () => <div>profile</div> } />
            <Route path="/feed" component={ Feed } />
            <Route path="/friends" component={ Friends } />
            <Route path="/messages" render={ () => <div>messages</div> } />
        </div>
    </div>
}

App.propTypes = {};

const mapStateToProps = state => ({
    location: state.router.location,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({}, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);