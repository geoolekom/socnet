import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class MyPage extends React.Component {
    render = () => {
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => (
    bindActionCreators({}, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPage);