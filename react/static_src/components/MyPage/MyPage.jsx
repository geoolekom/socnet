import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Divider } from "semantic-ui-react";
import Post from "../Feed/Post";

class MyPage extends React.Component {
    render = () => {
        if (!this.props.user) {
            return <div>
                Please, log in.
            </div>
        }
        const posts = this.props.posts;
        let posts_array = [];
        for (let id of posts.ids) {
            if (!posts.data[id]) {
                continue;
            }
            if (posts.data[id].author === this.props.user.id) {
                posts_array.push(
                    <Post key={ id }
                          created={ posts.data[id].created }
                          title={ posts.data[id].title }
                          content={ posts.data[id].content }
                          author={ this.props.user }
                          likeCount={ posts.data[id].like_count }
                    />
                )
            }
        }
        return <div>
            Page of <b>{ this.props.user.username }</b>. Hello!
            <Divider horizontal>Your posts</Divider>
            { posts_array }
        </div>
    };

    componentDidMount = () => {
        this.props.getPosts();
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    posts: state.posts
});

import { getProfile } from '../../actions/auth';
import { getPosts } from '../../actions/posts';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getProfile, getPosts }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPage);