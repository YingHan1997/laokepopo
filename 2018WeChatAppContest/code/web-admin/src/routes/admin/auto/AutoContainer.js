import Auto from './Auto'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

const AutoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Auto)

export default AutoContainer
