import Login from './Login'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        loginAction: () => {
            dispatch({
                type: 'app_login'
            })
            dispatch({
                type: 'app_notification',
                data: {
                    message: '登录成功'
                },
            })
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginContainer
