import Info from './Info'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

const InfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Info)

export default InfoContainer
