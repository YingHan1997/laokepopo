import Callback from './Callback'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: data => dispatch({
            type: 'app_dialog',
            data,
        })
    }
}

const CallbackContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Callback)

export default CallbackContainer
