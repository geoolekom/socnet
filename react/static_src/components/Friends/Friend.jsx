import React from 'react';
import { Card } from 'semantic-ui-react';


class Friend extends React.Component {
    render = () => <Card>
        <Card.Content>
            <Card.Header>
                { this.props.username }
            </Card.Header>
            <Card.Meta>
                <span className='date'>
                  Friends since { this.props.created }
                </span>
            </Card.Meta>
            <Card.Description>
                { this.props.description }
            </Card.Description>
        </Card.Content>
    </Card>
}

Friend.propTypes = {
    username: React.PropTypes.string.isRequired,
    created: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
};

export default Friend;
