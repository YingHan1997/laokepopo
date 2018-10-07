import React, { Component } from 'react';
import './Pool.css'

import { TextField } from 'material-ui'

import CrudComponent, { commonDeleteButton, commonFreshAction, commonFreshButton, commonFormButton } from '../../../../components/crud/CrudComponent'
import API from '../../../../utils/API'
import axios from 'axios'

class Pool extends Component {

    render() {
        return (
            <CrudComponent
                moudleName='话题池'
                titleGroup={[
                    {
                        name: 'ID',
                        key: 'id',
                    },
                    {
                        name: '图片',
                        key: 'image',
                        format: image => <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={image} />,
                    },
                    {
                        name: '内容',
                        key: 'content',
                    },
                    {
                        name: 'Open ID',
                        key: 'open_id',
                    },
                    {
                        name: '好评数',
                        key: 'good_point',
                    },
                    {
                        name: '上传时间',
                        key: 'create_time',
                    },
                    {
                        name: '更新时间',
                        key: 'update_time',
                    },
                ]}
                fresh={commonFreshAction('pool.action')}
                actions={[
                    /*
                    {
                        name: '添加',
                        primary: true,
                        onClick: (state, { fresh }) => {
                            // console.log('fresh')
                            // fresh()
                        }
                    },*/
                    commonFormButton({
                        create: this.props.addTopic,
                        name: '新增',
                        primary: true,
                        config: {
                            title: '添加话题',
                            submit: '添加',
                        },
                        preCheck: (state) => {
                            const { selected } = state
                            console.log('preCheck', selected, state)
                            return {
                                result: true,
                                defaultData: {}
                            }
                        },
                        Inputs: [
                            {
                                isInput: true,
                                id: 'image',
                                View: TextField,
                                ex: {
                                    style: { width: '100%' },
                                    floatingLabelText: 'Image URL',
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
                            new API('get', 'system.action').then(res => {
                                const { open_id } = res
                                new API('post', 'pool.action', { ...data, key: 1, open_id }).then(res => {
                                    callback()
                                    fresh()
                                }).action()
                            }).action()
                        },
                    }),
                    commonDeleteButton({
                        url: 'pool.action'
                    }),
                    commonFreshButton({}),
                ]}
            />
        );
    }
}

export default Pool
