import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Icon, Menu as SemanticMenu, Sidebar} from 'semantic-ui-react';
import Chat from "./Chat";

class ChatSidebar extends React.Component {

    render = () => {
        const chats = this.props.chats;
        const messages = this.props.messages;
        const users = this.props.users;
        const chatArray = [];
        for (let id of chats.ids) {
            const chat = chats.data[id];
            if (chat.message_set.length === 0) {
                chatArray.push(
                    <SemanticMenu.Item key={id} name={chat.title} style={{padding: "4px"}}>
                        <Chat title={chat.title} lastMessage="No messages yet" />
                    </SemanticMenu.Item>
                );
            } else {
                const lastMsgId = Math.max.apply(null, chat.message_set);
                if (!messages.data[lastMsgId]) {
                    chatArray.push(
                        <SemanticMenu.Item key={id} name={chat.title} style={{padding: "4px"}}>
                            <Chat title={chat.title} lastMessage="Loading..." />
                        </SemanticMenu.Item>
                    );
                } else {
                    const msg = messages.data[lastMsgId];
                    const author = users.data[msg.author];
                    chatArray.push(
                        <SemanticMenu.Item key={id} name={chat.title} style={{padding: "4px"}}>
                            <Chat title={chat.title} lastMessageAuthor={`${author ? author.username : '...' }`} lastMessage={msg.content} lastMessageInfo={`${msg.created}`} />
                        </SemanticMenu.Item>
                    );
                }
            }
        }

        return <Sidebar
            as={SemanticMenu}
            animation='overlay'
            width='wide'
            direction='right'
            style={{ position: "absolute", top: this.props.top, overflowY: "scroll", maxHeight: `${this.props.windowSize.height}px` }}
            visible={this.props.visibility}
            vertical borderless
        >
            <SemanticMenu.Item name='hide' onClick={this.props.toggleChatSidebarVisibility}>
                <Icon name='chevron right' /> Hide
            </SemanticMenu.Item>
            { chatArray }
        </Sidebar>
    };
}


const mapStateToProps = state => ({
    visibility: state.display.sidebarVisibility,
    top: state.display.scroll.top,
    windowSize: state.display.size,
    chats: state.chats,
    messages: state.messages,
    users: state.users,
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
