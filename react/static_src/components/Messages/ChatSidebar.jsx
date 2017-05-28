import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Icon, Menu as SemanticMenu, Sidebar} from 'semantic-ui-react';

class ChatSidebar extends React.Component {

    render = () => <Sidebar
        as={SemanticMenu}
        animation='overlay'
        width='wide'
        direction='right'
        style={{ position: "absolute", top: this.props.top, overflowY: "scroll", maxHeight: `${this.props.windowSize.height}px` }}
        visible={this.props.visibility}
        inverted vertical
    >

        <SemanticMenu.Item name='home' onClick={this.props.toggleChatSidebarVisibility}>
            <Icon name='chevron right' /> Hide
        </SemanticMenu.Item>
        <SemanticMenu.Item name='gamepad'>
            <Icon name='gamepad' />
            Games
        </SemanticMenu.Item>
        <SemanticMenu.Item name='camera'>
            <Icon name='camera' />
            Channels
        </SemanticMenu.Item>
    </Sidebar>;
}


const mapStateToProps = state => ({
    visibility: state.display.sidebarVisibility,
    top: state.display.scroll.top,
    windowSize: state.display.size,
    chats: state.chats
});

import { toggleChatSidebarVisibility } from '../../actions/display';
import { getChats } from '../../actions/chats';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleChatSidebarVisibility, getChats }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatSidebar);
