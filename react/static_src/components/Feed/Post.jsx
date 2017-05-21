import React from 'react';
import { Segment, Divider, Header, Icon, Container } from 'semantic-ui-react';


class Post extends React.Component {
    render = () => {
        return <Segment loading={ !this.props.author }>
            <Header as="h2">{ this.props.title }</Header>
            <p>{ this.props.content }</p>
            <Divider horizontal>Created by <a>{ this.props.author.username }</a> at { this.props.created }</Divider>
            <Icon name="like" /> { this.props.likeCount } likes
        </Segment>;
    }
}

Post.propTypes = {
    title: React.PropTypes.string.isRequired,
    created: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    likeCount: React.PropTypes.number.isRequired,
    author: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        username: React.PropTypes.string.isRequired,
    })
};

export default Post;
