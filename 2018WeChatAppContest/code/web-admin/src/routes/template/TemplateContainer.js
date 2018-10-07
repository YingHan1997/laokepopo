import Template from './Template'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

const TemplateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Template)

export default TemplateContainer
