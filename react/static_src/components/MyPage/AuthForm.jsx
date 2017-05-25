import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form, Button } from 'semantic-ui-react';


class AuthForm extends React.Component {

    state = {};

    handleChange = event => { this.setState({ [event.target.name]: event.target.value }) };

    handleSubmit = event => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
        this.props.done();
    };

    handleCancel = event => {
        event.preventDefault();
        this.props.done();
    };

    render = () => <Form onSubmit={ this.handleSubmit } loading={ this.props.isLoading }>
        <Form.Input name="username" placeholder="Username" onChange={ this.handleChange } />
        <Form.Input name="password" placeholder="Password" type="password" onChange={ this.handleChange } />
        <Button.Group basic>
            <Form.Button color="black" type="submit">Login</Form.Button>
            <Form.Button color="black" onClick={ this.handleCancel }>Cancel</Form.Button>
        </Button.Group>
    </Form>;
}

AuthForm.propTypes = {
    done: React.PropTypes.func
};

const mapStateToProps = state => ({
    token: state.auth.token,
    isLoading: state.auth.isLoading
});

import { login } from '../../actions/auth';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ login }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);