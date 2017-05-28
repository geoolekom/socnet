import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Sidebar, Menu as SemanticMenu, Icon } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import Menu from './Menu';
import Feed from '../components/Feed/Feed';
import Friends from '../components/Friends/Friends';
import MyPage from '../components/MyPage/MyPage';
import Search from '../components/Search/SearchResults';
import ChatSidebar from '../components/Messages/ChatSidebar';


class App extends React.Component {

    render = () => <div onScroll={this.props.setScroll} onChange={this.props.setWindowSize}>
        <Sidebar.Pushable style={{ position: 'absolute', right: 0, top: 0, left: 0, minHeight: `${this.props.windowSize.height}px` }}>
            <ChatSidebar/>
            <Sidebar.Pusher>
                <Menu/>
                <div style={{ padding: "8px", paddingTop: "4px" }}>
                    <Route path="/profile" component={ MyPage } />
                    <Route path="/feed" component={ Feed } />
                    <Route path="/friends" component={ Friends } />
                    <Route path="/search" component={ Search } />
                </div>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>;

    componentDidMount = () => {
        window.addEventListener('resize', this.props.setWindowSize);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.props.setWindowSize);
    };
}

App.propTypes = {};

const mapStateToProps = state => ({
    location: state.router.location,
    windowSize: state.display.size,
});

import {setScroll, setWindowSize} from '../actions/display';

const mapDispatchToProps = dispatch => (
    bindActionCreators({setScroll, setWindowSize}, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);