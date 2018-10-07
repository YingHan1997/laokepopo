import React, { Component } from 'react'

import { Snackbar, Dialog, FlatButton, RaisedButton } from 'material-ui'

class Notification extends Component {

    state = {
        open: true,
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        const ex = Object.assign({
            message: '',
            autoHideDuration: 4000,
        }, this.props)
        return (
            <Snackbar
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
                {...ex}
            />
        )
    }
}

class MyDialog extends Component {
    state = {
        open: true,
        data: this.props.defaultData ? this.props.defaultData : {},
        res: {},
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = () => {
        const preSubmit = this.props.preSubmit ? this.props.preSubmit : () => true
        if (preSubmit()) {
            this.props.onSubmit(this.state.data, (res) => {
                if (res === undefined) {
                    this.setState({ open: false })
                } else {
                    this.setState({
                        res
                    })
                }
            })
        } else {
            this.setState({ open: false })
        }
    }

    onChange = (e, value) => {
        console.log('çhange', e, e.target, value)
        this.setState({
            data: Object.assign(this.state.data, {
                [e.target.id]: e.target.value
            }),
            res: this.props.onChange(this.state.data),
        })
    }

    // Need:
    // - component & onSubmit & onChange + onChange & data & res / content + preSubmit
    // Choice:
    // - submit, cancel, title
    render() {
        const actions = [
            <FlatButton
                label={this.props.cancel ? this.props.cancel : 'Cancel'}
                primary={false}
                onClick={this.handleClose}
            />,
            <FlatButton
                label={this.props.submit ? this.props.submit : 'Submit'}
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />,
        ]

        const ChildComponent = this.props.component ? this.props.component : () => { return <div /> }

        return (
            <div>
                <Dialog
                    title={this.props.title ? this.props.title : ''}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.content}
                    <ChildComponent onChange={this.onChange} data={this.state.data} res={this.state.res} />
                </Dialog>
            </div>
        )
    }
}

export const notificationState = {
    app_notification: <div />,
    app_dialog: <div />,
}

let key = 0

export function notificationCounter(state, action) {
    switch (action.type) {
        case 'app_notification': return {
            app_notification: <Notification key={key++} {...action.data} />,
        }
        case 'app_dialog': return {
            app_dialog: <MyDialog key={key++} {...action.data} />,
        }
        default: return {}
    }
}