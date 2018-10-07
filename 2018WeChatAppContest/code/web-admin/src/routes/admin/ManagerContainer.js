import Manager from './Manager'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        logoutAction: () => {
            dispatch({
                type: 'app_logout',
            })
        },
    }
}

const ManagerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Manager)

export default withRouter(ManagerContainer)
