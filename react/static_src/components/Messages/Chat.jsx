import React from 'react';
import {Card} from 'semantic-ui-react';

class Chat extends React.Component {
    render = () => <Card
        link fluid
        header={this.props.title}
        meta={this.props.lastMessageInfo}
        description={`${this.props.lastMessageAuthor}: ${this.props.lastMessage}`}
    />;
}

Chat.propTypes = {
    title: React.PropTypes.string.isRequired,
    lastMessage: React.PropTypes.string,
    lastMessageInfo: React.PropTypes.string,
    lastMessageAuthor: React.PropTypes.string,
};

export default Chat;