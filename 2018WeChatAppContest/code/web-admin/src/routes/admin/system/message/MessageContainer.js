import Message from './Message'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        testAction: data => dispatch({
            type: 'app_dialog',
            data,
        })
    }
}

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)

export default MessageContainer
