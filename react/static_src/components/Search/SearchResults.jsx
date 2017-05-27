import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Divider, Checkbox, Segment, Input, Loader} from 'semantic-ui-react';
import Post from "../Feed/Post";


class SearchResults extends React.Component {

    state = {
        checkboxes: {
            'posts.post': true,
            'relations.friendship': true,
            'accounts.user': true,
            'chats.message': true
        }
    };

    handleSearch = (e, data) => {
        const activeBoxes = [];
        for (let name in this.state.checkboxes) {
            if (this.state.checkboxes[name]) {
                activeBoxes.push(name);
            }
        }
        this.props.getSearchResults({q: data.value, models: activeBoxes});
    };

    handleCheckbox = (e, data) => {
        const state = this.state;
        state.checkboxes[data.name] = data.checked;
        this.setState(state);
    };

    render = () => {

        let postArray = [];
        if (this.props.results.hasOwnProperty('post')) {
            const posts = this.props.posts;
            const users = this.props.users;
            for (let id of this.props.results.post) {
                if (posts.data.hasOwnProperty(id) && users.data.hasOwnProperty(posts.data[id].author)) {
                    const author = users.data[posts.data[id].author];
                    postArray.push(
                        <Post key={ id }
                              created={ posts.data[id].created }
                              title={ posts.data[id].title }
                              content={ posts.data[id].content }
                              author={ author }
                              likeCount={ posts.data[id].like_count }
                        />
                    )
                } else {
                    postArray.push(<Segment key={id} padded='very' loading/>)
                }
            }
        }

        return <div>
            <Input loading={ this.props.isLoading } icon='search' placeholder='Search...' onChange={ this.handleSearch } />
            <Divider horizontal>Filter entities you are looking for</Divider>
            <Segment.Group horizontal>
                <Segment textAlign='center'><Checkbox onChange={ this.handleCheckbox } label={ <label>POSTS</label> } slider defaultChecked name="posts.post" /></Segment>
                <Segment textAlign='center'><Checkbox onChange={ this.handleCheckbox } label={ <label>FRIENDS</label> } slider defaultChecked name="relations.friendship" /></Segment>
                <Segment textAlign='center'><Checkbox onChange={ this.handleCheckbox } label={ <label>PEOPLE</label> } slider defaultChecked name="accounts.user" /></Segment>
                <Segment textAlign='center'><Checkbox onChange={ this.handleCheckbox } label={ <label>MESSAGES</label> } slider defaultChecked name="chats.message" /></Segment>
            </Segment.Group>
            <Divider horizontal>Results</Divider>
            { postArray }
        </div>;
    };
}

const mapStateToProps = state => ({
    results: state.search.results,
    isLoading: state.search.isLoading,
    posts: state.posts,
    users: state.users,
    friends: state.friends,
});

import { getSearchResults } from '../../actions/search';
import { getPosts } from '../../actions/posts';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getSearchResults, getPosts }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);