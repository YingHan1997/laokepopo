import React, { Component } from 'react';
import './Message.css'

import { RaisedButton, Toggle } from 'material-ui'

import CrudComponent from '../../../../components/crud/CrudComponent'

const styles = {
    toggle: {
        marginBottom: 16,
    },
}

class Message extends Component {

    state = {
        toggled: true,
    }

    handleToggle = () => {
        this.setState({
            toggled: !this.state.toggled
        })
    }

    handleOpen = () => {
        this.props.testAction({
            content: <Toggle
                onToggle={this.handleToggle}
                label='Toggled by default'
                defaultToggled={this.state.toggled}
                style={styles.toggle}
            />,
            preSubmit: () => this.state.toggled,
        })
    }

    render() {
        return (
            <div>
                <h1>Message</h1>
                <h3>Change It!</h3>
                <RaisedButton label='Dialog' onClick={this.handleOpen} />

                <CrudComponent
                    moudleName='被废除的消息模块'
                    titleGroup={[
                        {
                            name: 'A',
                            key: 'a',
                        },
                        {
                            name: 'B',
                            key: 'b',
                        },
                        {
                            name: 'C',
                            key: 'c',
                        },
                    ]}
                    fresh={(state, callback) => {
                        const { size, page } = state
                        const f = size * (page - 1)
                        const t = f + size
                        setTimeout(() => {
                            callback(globalData.slice(f, t))
                        }, 2000);
                    }}
                    actions={[
                        {
                            name: '刷新',
                            primary: true,
                            onClick: (state, { fresh }) => {
                                console.log('fresh')
                                fresh()
                            }
                        },
                        {
                            name: '按钮2',
                            primary: false,
                            onClick: (state, { fresh }) => {
                                console.log('按钮2')
                            }
                        },
                    ]}
                />
            </div>
        );
    }
}

export default Message

const globalData = [
    {
        a: 0,
        b: 0,
        c: 0,
    },
    {
        a: 0,
        b: 0,
        c: 1,
    },
    {
        a: 0,
        b: 1,
        c: 0,
    },
    {
        a: 0,
        b: 1,
        c: 1,
    },
    {
        a: 1,
        b: 0,
        c: 0,
    },
    {
        a: 1,
        b: 0,
        c: 1,
    },
    {
        a: 1,
        b: 1,
        c: 0,
    },
    {
        a: 1,
        b: 1,
        c: 1,
    },
]