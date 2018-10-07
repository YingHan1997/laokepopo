import React from 'react'
import ReactDOM from 'react-dom'

import store from './reducers'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import './index.css'
import './styles/global.css'
import './styles/utils.css'
import AppContainer from './routes/admin/AppContainer'
import Page404 from './routes/error/Page404'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from='/' to='/admin' />
                    <Route path='/admin' component={AppContainer}></Route>
                    <Route component={Page404}></Route>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'))
registerServiceWorker()
