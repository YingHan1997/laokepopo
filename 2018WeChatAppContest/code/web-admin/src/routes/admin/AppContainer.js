import App from './App'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        loginState: state.session_login,
        notification: state.app_notification,
        dialog:  state.app_dialog,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
