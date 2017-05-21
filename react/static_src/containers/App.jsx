import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Segment } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';

import Feed from '../components/Feed/Feed';


class App extends React.Component {

    changeActiveMenuItem = (event, item) => {
        this.props.changeNavKey(item.name);
    };

    render = () => <div>
        <Menu pointing secondary>
            <Menu.Item name="profile" active={ this.props.navKey === "profile" } onClick={ this.changeActiveMenuItem }>
                <Link to={ "/profile" } >Profile</Link>
            </Menu.Item>

            <Menu.Item name="feed" active={ this.props.navKey === "feed" } onClick={ this.changeActiveMenuItem }>
                <Link to={ "/feed" } >Feed</Link>
            </Menu.Item>

            <Menu.Item name="friends" active={ this.props.navKey === "friends" } onClick={ this.changeActiveMenuItem }>
                <Link to={ "/friends" } >Friends</Link>
            </Menu.Item>

            <Menu.Item name="messages" active={ this.props.navKey === "messages" } onClick={ this.changeActiveMenuItem }>
                <Link to={ "/messages" } >Messages</Link>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item name="logout" active={ this.props.navKey === "logout" } onClick={ this.changeActiveMenuItem } />
            </Menu.Menu>
        </Menu>

        <Segment>
            <Route exact path="/profile" component={ () => <div>profile</div> } />
            <Route path="/feed"  component={ Feed }  />
            <Route path="/friends"  component={ () => <div>friends</div> } />
            <Route path="/messages"  component={ () => <div>messages</div> } />
        </Segment>
    </div>
}

App.propTypes = {};

const mapStateToProps = state => ({
    navKey: state.display.navKey,
});

import { changeNavKey } from '../actions/display';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ changeNavKey }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);