import React, { Component } from 'react'
import './crud.css'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import { SelectField, MenuItem, RaisedButton, FlatButton, DropDownMenu, TextField, CircularProgress } from 'material-ui'

import API from '../../utils/API'
import axios from 'axios'

let timeKey = 0

class CrudComponent extends Component {

    state = {
        /* 以下是确定使用的 */

        /* 分页配置 */
        size: 10,
        page: 1,
        check_page: '',

        /* 选择配置 */
        selected: [],
        data: [],
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1
    }

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        })
    }

    getData = () => {
        const { titleGroup } = this.props
        // const titleKeys = titleGroup.map(value => value.key)
        if (this.state.data.length === 0) {
            return <TableRow selectable={false} key={-1} selected={false}>
                {this.props.titleGroup.map(() => <TableRowColumn key={-1}><CircularProgress size={20} thickness={3} /></TableRowColumn>)}
            </TableRow>
        }
        return this.state.data.map((value, index) => {
            const innerData = titleGroup.map(({ key, format = v => v }) => {
                return <TableRowColumn key={timeKey++}>{format(value[key])}</TableRowColumn>
            })
            return <TableRow key={timeKey++} selected={this.isSelected(index)}>
                {innerData}
            </TableRow>
        })
    }

    fresh = (ex = { data: [] }) => {
        console.log('fresh...')
        if (ex) this.setState(ex)

        this.props.fresh(Object.assign(this.state, ex), (res) => {
            this.setState({
                data: res,
                selected: [],
            })
        })
    }

    constructor(props) {
        super(props)
        this.fresh(false)
    }

    handleChangeSize = (event, index, value) => {
        this.fresh({
            size: value,
            page: 1,
            data: [],
        })
    }

    handleChangePage = (event, value) => {
        if ('' === value) {
            this.setState({ check_page: '不能为空' })
        } else {
            this.setState({ page: parseInt(value), check_page: '' })
        }
    }

    handleGotoPage = () => {
        if ('' === this.state.check_page) {
            this.setState({
                data: [],
            })
            this.fresh()
        }
    }

    /**
     * {
     *   moudleName: '模块名',
     *   titleGroup: [
     *     {
     *       name: '标题',
     *       value: 'key',
     *     },
     *   ],
     *   fresh: (this.state, (res) => void) => void,
     *   actions: [
     *     {
     *       name: '按钮',
     *       primary: true,
     *       onClick: (this.state, {fresh: this.fresh,}) => void,
     *     },
     *   ],
     *   tableConfig: {},
     *   tableHeaderConfig: {},
     *   tableBodyConfig: {},
     * }
     */
    render() {
        console.log('render', this.props, this.state)

        const { moudleName, titleGroup, actions: buttonGroup } = this.props
        const titleComponents = titleGroup.map(value => <TableHeaderColumn key={value.name}>{value.name}</TableHeaderColumn>)

        const tableConfig = Object.assign({
            fixedHeader: true,
            selectable: true,
            multiSelectable: true,
        }, this.props.tableConfig)

        const showCheckboxes = this.state.data.length > 0

        const tableHeaderConfig = Object.assign({
            enableSelectAll: true,
        }, this.props.tableHeaderConfig, {
                displaySelectAll: showCheckboxes,
                adjustForCheckbox: showCheckboxes,
            })

        const tableBodyConfig = Object.assign({
            showRowHover: true,
            deselectOnClickaway: false,
        }, this.props.tableBodyConfig, { displayRowCheckbox: showCheckboxes })

        /* 功能按钮 */
        const buttonComponents = buttonGroup.map(value => <RaisedButton
            key={value.name}
            label={value.name}
            primary={value.primary}
            onClick={() => value.onClick(this.state, {
                fresh: this.fresh,
            })} />)

        const sizeGroup = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(value => <MenuItem key={value} value={value} primaryText={value} />)
        return (
            <div>
                <br />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        {/* 分页 */}
                        <SelectField
                            style={{ width: '100px', marginLeft: '10px' }}
                            floatingLabelText='每页条数'
                            value={this.state.size}
                            onChange={this.handleChangeSize}
                        >
                            {sizeGroup}
                        </SelectField>
                        <TextField
                            style={{ width: '50px' }}
                            floatingLabelText='页码'
                            type='number'
                            errorText={this.state.check_page}
                            value={this.state.page}
                            onChange={this.handleChangePage}
                        />
                        <FlatButton label='Go' primary={true} onClick={this.handleGotoPage} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text={moudleName} />
                        <ToolbarSeparator />
                        {buttonComponents}
                    </ToolbarGroup>
                </Toolbar>
                <Table {...tableConfig} onRowSelection={this.handleRowSelection}>
                    <TableHeader {...tableHeaderConfig}>
                        <TableRow>{titleComponents}</TableRow>
                    </TableHeader>
                    <TableBody {...tableBodyConfig}>
                        {this.getData()}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default CrudComponent

export function commonFreshAction(url, ex = {}) {
    return (state, callback) => {
        const { size, page } = state
        new API('get', url, { size, page, ...ex })
            .then(res => {
                console.log(res)
                if (res.size > 0) {
                    callback(res.result)
                } else {
                    throw new Error('无数据')
                }
            })
            .action()
    }
}

export function commonFreshButton({ name = '刷新', primary = false }) {
    return {
        name,
        primary,
        onClick: (state, { fresh }) => fresh()
    }
}

export function commonDeleteButton({ url, name = '删除', primary = false }) {
    return {
        name,
        primary,
        onClick: (state, { fresh }) => {
            const { size, page, selected, data } = state
            const offest = size * (page - 1)
            let reqs
            if (selected == 'all') {
                reqs = data.map(value => new API('delete', url, { id: value.id }))
            } else {
                reqs = selected.map(value => new API('delete', url, { id: data[value].id }))
            }
            axios.all(reqs)
                .then(axios.spread(function (...res) {
                    fresh()
                }))
        }
    }
}

const defaultPreCheck = () => {
    return { result: true, defaultData: {} }
}

export function commonFormButton({ create, name = 'XXX', primary = false, config = {}, preCheck = defaultPreCheck, Inputs = [], doSubmit = () => undefined }) {

    function createForm(state, { fresh }) {
        const { result, defaultData } = preCheck(state)
        if (!result) {
            defaultData()
        } else {
            create({
                defaultData,
                ...config,
                component: class ComponentView extends Component {
                    render() {
                        console.log('ComponentView', this.props, this.state)
                        return (<div>{Inputs.map(value => {
                            if (value.isInput) {
                                const View = value.View
                                if (value.child) {
                                    return <View
                                        id={value.id}
                                        /* errorText={this.props.res[value.id]} */
                                        value={this.props.data[value.id]}
                                        onChange={this.props.onChange}
                                        {...value.ex}
                                    >{value.child}</View>
                                }
                                return <View
                                    id={value.id}
                                    errorText={this.props.res[value.id]}
                                    value={this.props.data[value.id]}
                                    onChange={this.props.onChange}
                                    {...value.ex}
                                />
                            }
                            return value.View
                        })}</div>)
                    }
                },
                onSubmit: (data, callback) => {
                    let test = 0
                    const res = Inputs.map(value => {
                        if (data[value.id]) test++
                        if (value.isInput) test--
                        return data[value.id] ? { [value.id]: '' } : { [value.id]: '不能为空' }
                    })
                    // console.log('onSubmit', data, callback, test, res)
                    if (test === 0) {
                        doSubmit(data, callback, fresh)
                    } else {
                        callback(Object.assign({}, ...res))
                    }
                },
                onChange: (data) => {
                    // console.log('onChange', data)
                    return Object.assign({}, ...Inputs.map(value => {
                        return data[value.id] ? { [value.id]: '' } : { [value.id]: '不能为空' }
                    }))
                }
            })
        }
    }

    return {
        name,
        primary,
        onClick: createForm
    }
}