import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Modal, Icon, Loader } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';

import Feed from '../components/Feed/Feed';
import Friends from '../components/Friends/Friends';
import AuthForm from '../components/MyPage/AuthForm';
import MyPage from '../components/MyPage/MyPage';
import Search from '../components/Search/SearchResults';


class App extends React.Component {

    state = {
        needLogin: this.props.token === null
    };

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

            <Menu.Item name="people" active={ this.props.location.pathname === '/people' }>
                <Link to="/people">People</Link>
            </Menu.Item>

            <Menu.Item name="messages" active={ this.props.location.pathname === '/messages' }>
                <Link to="/messages"><Icon name="mail"/> Messages</Link>
            </Menu.Item>

            <Menu.Item name="search" active={ this.props.location.pathname === '/search' }>
                <Link to="/search"><Icon name="search"/> Search</Link>
            </Menu.Item>

            { this.props.token ?
                <Menu.Menu position="right">
                    <Menu.Item content={ this.props.user ? `Hello, ${this.props.user.username}!` : <Loader size='tiny' active inline /> }/>
                    <Menu.Item name="logout" onClick={ this.props.logout } />
                </Menu.Menu> :
                <Menu.Menu position="right">
                    <Modal size="small" open={ this.state.needLogin } trigger={ <Menu.Item>Login</Menu.Item> } onOpen={ () => { this.setState({ needLogin: true }) } }>
                        <Modal.Header>Welcome!</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <AuthForm done={ () => { this.setState({ needLogin: false }) } } />
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>
            }
        </Menu>

        <div style={ { padding: "8px" } }>
            <Route exact path="/" component={ AuthForm }/>
            <Route path="/profile" component={ MyPage } />
            <Route path="/feed" component={ Feed } />
            <Route path="/friends" component={ Friends } />
            <Route path="/messages" render={ () => <div>messages</div> } />
            <Route path="/search" component={ Search }/>
        </div>
    </div>;

    componentDidMount = () => {
        this.props.getProfile();
    };
}

App.propTypes = {};

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    location: state.router.location,
});

import { logout, getProfile } from '../actions/auth';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ logout, getProfile }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);