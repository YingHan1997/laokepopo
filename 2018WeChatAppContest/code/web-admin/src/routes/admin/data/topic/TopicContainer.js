import Topic from './Topic'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        changeTopic: data => dispatch({
            type: 'app_dialog',
            data,
        })
    }
}

const TopicContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Topic)

export default TopicContainer
