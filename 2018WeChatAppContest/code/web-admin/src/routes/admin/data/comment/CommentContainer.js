import Comment from './Comment'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

const CommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)

export default CommentContainer
