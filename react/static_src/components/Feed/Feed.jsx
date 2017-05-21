import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Feed extends React.Component {
    render = () => <div>
        <button onClick={ this.props.getPosts }>GET POSTS</button>
    </div>
}

Feed.propTypes = {};

const mapStateToProps = state => ({
    posts: state.posts
});

import { getPosts } from '../../actions/posts';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getPosts }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);