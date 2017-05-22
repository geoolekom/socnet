import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Request extends React.Component {
    render = () => <Card>
        <Card.Content>
            <Card.Header>
                { this.props.username }
            </Card.Header>
            <Card.Meta>
                wants to add you to friends
            </Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='green' onClick={ () => { this.props.acceptRequest(this.props.id, this.props.cookies['csrftoken']) } }>Accept</Button>
                <Button basic color='red'>Refuse</Button>
            </div>
        </Card.Content>
    </Card>
}

Request.propTypes = {
    id: React.PropTypes.number.isRequired,
    username: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    cookies: state.auth.cookies
});

import { acceptRequest } from '../../actions/requests';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ acceptRequest }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Request);