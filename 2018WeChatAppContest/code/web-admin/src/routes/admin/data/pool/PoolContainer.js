import Pool from './Pool'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        addTopic: data => dispatch({
            type: 'app_dialog',
            data,
        })
    }
}

const PoolContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Pool)

export default PoolContainer
