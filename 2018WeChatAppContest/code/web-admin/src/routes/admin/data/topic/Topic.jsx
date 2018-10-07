import React, { Component } from 'react';
import './Topic.css'

import { TextField, SelectField, MenuItem, DatePicker } from 'material-ui'

import CrudComponent, { commonDeleteButton, commonFreshAction, commonFreshButton, commonFormButton } from '../../../../components/crud/CrudComponent'
import API from '../../../../utils/API'
import axios from 'axios'

class Topic extends Component {

    render() {
        return (
            <CrudComponent
                moudleName='话题'
                titleGroup={[
                    {
                        name: 'ID',
                        key: 'id',
                    },
                    {
                        name: '类型',
                        key: 'type',
                        format: type => type ? '周话题' : '日话题',
                    },
                    {
                        name: 'Pool ID',
                        key: 'pool_id',
                    },
                    {
                        name: '时间',
                        key: 'time',
                    },
                ]}
                fresh={commonFreshAction('topic.action', { type: -1 })}
                actions={[
                    /*
                    {
                        name: '修改',
                        primary: true,
                        onClick: (state, { fresh }) => {
                            // console.log('fresh')
                            // fresh()
                        }
                    },*/
                    commonFormButton({
                        create: this.props.changeTopic,
                        name: '修改',
                        primary: true,
                        config: {
                            title: '话题修改',
                            submit: '修改',
                        },
                        preCheck: (state) => {
                            const { selected } = state
                            // console.log('preCheck', selected, state)
                            if (selected === 'none' || selected.length === 0) {
                                return {
                                    result: false,
                                    defaultData: () => alert('请选择一项修改')
                                }
                            } else if (selected === 'all' || selected.length > 1) {
                                return {
                                    result: false,
                                    defaultData: () => alert('不能多选')
                                }
                            }
                            const index = selected[0]
                            const data = state.data[index]
                            return {
                                result: true,
                                defaultData: {
                                    id: data.id,
                                    pool_id: data.pool_id,
                                    type: data.type,
                                    time: new Date(data.time),
                                }
                            }
                        },
                        Inputs: [
                            {
                                isInput: true,
                                id: 'id',
                                View: TextField,
                                ex: {
                                    floatingLabelText: 'ID',
                                    disabled: true,
                                },
                            },
                            {
                                isInput: true,
                                id: 'time',
                                View: DatePicker,
                                ex: {
                                    floatingLabelText: 'Time',
                                    mode: "landscape",
                                    disabled: true,
                                },
                            },
                            {
                                isInput: true,
                                id: 'pool_id',
                                View: TextField,
                                ex: {
                                    floatingLabelText: 'Pool ID',
                                },
                            },
                            {
                                isInput: false,
                                View: <br />,
                            },
                            /*
                            {
                                isInput: true,
                                id: 'type',
                                View: SelectField,
                                ex: {
                                    floatingLabelText: '类型',
                                },
                                child: [
                                    <MenuItem value={0} primaryText="日话题" />,
                                    <MenuItem value={1} primaryText="周话题" />,
                                ],
                            },*/
                        ],
                        doSubmit: (data, callback, fresh) => {
                            const { id, pool_id, time } = data
                            new API('put', 'topic.action', { id, pool_id , time: Date.parse(new Date(time))}).then(res => {
                                callback()
                                fresh()
                            }).action()
                        },
                    }),
                    commonDeleteButton({
                        url: 'topic.action'
                    }),
                    commonFreshButton({}),
                ]}
            />
        );
    }
}

export default Topic
