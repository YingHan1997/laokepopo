import React, { Component } from 'react'
import './App.css'
import LoginContainer from './LoginContainer'
import ManagerContainer from './ManagerContainer'

class App extends Component {

    render() {
        const payload = this.props.loginState ? <ManagerContainer /> : <LoginContainer />
        return (
            <div>
                {payload}
                {this.props.notification}
                {this.props.dialog}
            </div>
        )
    }
}

export default App