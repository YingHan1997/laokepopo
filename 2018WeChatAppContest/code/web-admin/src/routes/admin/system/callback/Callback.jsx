import React, { Component } from 'react';
import './Callback.css'

import { TextField } from 'material-ui'

import CrudComponent, { commonDeleteButton, commonFreshAction, commonFreshButton, commonFormButton } from '../../../../components/crud/CrudComponent'
import API from '../../../../utils/API'
import axios from 'axios'

class Callback extends Component {

    /*
    doSendMessage = (state, { fresh }) => {
        this.props.sendMessage({
            title: '消息推送',
            submit: '发送',
            component: class View extends Component {
                render() {
                    console.log('form', this.props, this.state)
                    return (<div>
                        <TextField
                            floatingLabelText='Open ID'
                            id='open_id'
                            errorText={this.props.res.open_id}
                            value={this.props.data.open_id}
                            onChange={this.props.onChange}
                        />
                        <br />
                        <TextField
                            style={{ width: '100%' }}
                            floatingLabelText='内容'
                            id='content'
                            errorText={this.props.res.content}
                            value={this.props.data.content}
                            onChange={this.props.onChange}
                            multiLine={true}
                            rows={6}
                            rowsMax={12}
                        />
                    </div>)
                }
            },
            onSubmit: (data, callback) => {
                const res = {
                    open_id: 'Open ID 不能为空',
                    content: '内容不能为空',
                }
                let test = 0
                const temp = ['open_id', 'content'].map(value => {
                    if (data[value]) {
                        test++
                        return { [value]: '' }
                    }
                    return {}
                })
                console.log(res, temp)
                if (test === 2) {
                    new API('post', 'self_message.action', { type: 0, ...data }).then(res => {
                        callback()
                    })
                } else {
                    callback(Object.assign(res, ...temp))
                }
            },
            onChange: (data) => {
                const res = {
                    open_id: 'Open ID 不能为空',
                    content: '内容不能为空',
                }
                const temp = ['open_id', 'content'].map(value => {
                    if (data[value]) {
                        return { [value]: '' }
                    }
                    return {}
                })
                return Object.assign(res, ...temp)
            }
        })
    }
    */

    render() {
        return (
            <CrudComponent
                moudleName='意见反馈'
                titleGroup={[
                    {
                        name: 'ID',
                        key: 'id',
                    },
                    {
                        name: '内容',
                        key: 'content',
                    },
                    {
                        name: '联系电话',
                        key: 'phone',
                    },
                    {
                        name: '邮箱',
                        key: 'email',
                    },
                    {
                        name: '反馈时间',
                        key: 'create_time',
                    },
                ]}
                fresh={commonFreshAction('callback.action')}
                /*
                fresh={(state, callback) => {
                    const { size, page } = state
                    new API('get', 'callback.action', { size, page })
                        .then(res => {
                            console.log(res)
                            if (res.size > 0) {
                                callback(res.result)
                            } else {
                                throw new Error('无数据')
                            }
                        })
                        .action()
                }}
                 */
                actions={[
                    /*
                    {
                        name: '-消息推送-',
                        primary: true,
                        onClick: this.doSendMessage,
                    },*/
                    commonFormButton({
                        create: this.props.sendMessage,
                        name: '消息推送',
                        primary: true,
                        config: {
                            title: '消息推送',
                            submit: '发送',
                        },
                        preCheck: (state) => {
                            const { selected } = state
                            console.log('preCheck', selected)
                            if (selected === 'none' || selected.length === 0) {
                                return { result: true, defaultData: {} }
                            } else if (selected === 'all' || selected.length > 1) {
                                return {
                                    result: false,
                                    defaultData: () => alert('不能多选')
                                }
                            }
                            return {
                                result: true,
                                defaultData: {
                                    open_id: 'hellokitty'
                                }
                            }
                        },
                        Inputs: [
                            {
                                isInput: true,
                                id: 'open_id',
                                View: TextField,
                                ex: {
                                    floatingLabelText: 'Open ID',
                                },
                            },
                            {
                                isInput: false,
                                View: <br />,
                            },
                            {
                                isInput: true,
                                id: 'content',
                                View: TextField,
                                ex: {
                                    style: { width: '100%' },
                                    floatingLabelText: '内容',
                                    multiLine: true,
                                    rows: 6,
                                    rowsMax: 12,
                                },
                            },
                        ],
                        doSubmit: (data, callback, fresh) => {
                            new API('post', 'self_message.action', { type: 0, ...data }).then(res => {
                                callback()
                            }).action()
                        },
                    }),
                    commonDeleteButton({
                        url: 'callback.action'
                    }),
                    /*
                    {
                        name: '删除',
                        primary: false,
                        onClick: (state, { fresh }) => {
                            const { size, page, selected, data } = state
                            const offest = size * (page - 1)
                            let reqs
                            if (selected == 'all') {
                                reqs = data.map(value => new API('delete', 'callback.action', { id: value.id }))
                            } else {
                                reqs = selected.map(value => new API('delete', 'callback.action', { id: data[value].id }))
                            }
                            axios.all(reqs)
                                .then(axios.spread(function (...res) {
                                    fresh()
                                }))
                        }
                    },*/
                    commonFreshButton({}),
                ]}
            />
        );
    }
}

export default Callback
