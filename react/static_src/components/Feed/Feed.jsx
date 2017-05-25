import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'semantic-ui-react';

import Post from './Post';


class Feed extends React.Component {
    render = () => {
        if (this.props.posts.isLoading) {
            return <Loader active>Loading</Loader>;
        }
        let array = [];
        const posts = this.props.posts;
        for (let id of posts.ids) {
            const author = this.props.users.data[posts.data[id].author];
            if (!author) {
                array.push(<Loader active>Loading</Loader>)
            } else {
                array.push(
                    <Post key={ id }
                          created={ posts.data[id].created }
                          title={ posts.data[id].title }
                          content={ posts.data[id].content }
                          author={ author }
                          likeCount={ posts.data[id].like_count }
                    />
                )
            }
        }
        return <div>
            { array }
        </div>;
    };

    componentDidMount = () => {
        this.props.getPosts();
        this.props.getUsers();
    };
}

Feed.propTypes = {};

const mapStateToProps = state => ({
    posts: state.posts,
    users: state.users,
});

import { getPosts } from '../../actions/posts';
import { getUsers } from '../../actions/users';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getPosts, getUsers }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);