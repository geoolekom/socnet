import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Divider, Checkbox, Segment, Input} from 'semantic-ui-react';


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
        console.log(this.state);
        this.props.getSearchResults(data.value, activeBoxes);
    };

    handleCheckbox = (e, data) => {
        this.setState({ checkboxes: {[data.name]: data.checked} });
    };

    render = () => {

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
        </div>;
    };
}

const mapStateToProps = state => ({
    results: state.search.results,
    isLoading: state.search.isLoading,
});

import { getSearchResults } from '../../actions/search';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ getSearchResults }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);