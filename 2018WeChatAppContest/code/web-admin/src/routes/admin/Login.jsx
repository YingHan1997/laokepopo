import React, { Component } from 'react'
import './Login.css'

import { TextField, FlatButton } from 'material-ui'

import API from '../../utils/API'

class Login extends Component {

    state = {
        check_password: null,
        password: '',
    }

    handleChange = (e) => {
        const obj = {}
        obj[e.target.id] = e.target.value
        if (e.target.value === '') {
            obj['check_' + e.target.id] = '该字段不能为空'
        } else {
            obj['check_' + e.target.id] = null
        }
        this.setState(obj)
    }

    handleLoginAction = (e) => {
        if (this.state.password === '') {
            this.setState({
                check_password: '该字段不能为空',
            })
        } else {
            new API('post', 'system.action', { password: this.state.password })
                .then(res => {
                    if (res) {
                        this.props.loginAction()
                    } else {
                        throw new Error('验证失败')
                    }
                })
                .action()
        }
    }

    render() {
        return (
            <div className='u-center-page u-center-page--fix'>
                <h3>登录</h3>
                <TextField
                    id='password'
                    floatingLabelText='Password'
                    hintText='Please input your password'
                    type='password'
                    errorText={this.state.check_password}
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <br />
                <FlatButton label='Login' primary={true} onClick={this.handleLoginAction} />
            </div>
        )
    }
}

export default Login