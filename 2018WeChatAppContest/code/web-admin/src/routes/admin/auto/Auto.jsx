import React, { Component } from 'react';
import './Auto.css'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import API from '../../../utils/API'

class Auto extends Component {

    state = {
        value: 0,
        data0: <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>loading...</TableRowColumn>
            <TableRowColumn></TableRowColumn>
        </TableRow>,
        data1: <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>loading...</TableRowColumn>
            <TableRowColumn></TableRowColumn>
        </TableRow>,
    }

    fresh = () => {
        new API('get', 'system.action')
            .then(res => {
                new API('get', 'topic_detail.action', { id: res.day_topic_id })
                    .then(res => {
                        const { id, image, content, open_id } = res.result[0]
                        this.setState({
                            data0: <TableRow key={res.day_topic_id}>
                                <TableRowColumn>{id}</TableRowColumn>
                                <TableRowColumn><img style={{ maxWidth: '200px', maxHeight: '100px' }} src={image} /></TableRowColumn>
                                <TableRowColumn>{content}</TableRowColumn>
                                <TableRowColumn>{open_id}</TableRowColumn>
                            </TableRow>
                        })
                    })
                    .action()
                new API('get', 'topic_detail.action', { id: res.week_topic_id })
                    .then(res => {
                        const { id, image, content, open_id } = res.result[0]
                        this.setState({
                            data1: <TableRow key={res.week_topic_id}>
                                <TableRowColumn>{id}</TableRowColumn>
                                <TableRowColumn><img style={{ maxWidth: '200px', maxHeight: '100px' }} src={image} /></TableRowColumn>
                                <TableRowColumn>{content}</TableRowColumn>
                                <TableRowColumn>{open_id}</TableRowColumn>
                            </TableRow>
                        })
                    })
                    .action()
            })
            .action()

    }

    constructor(props) {
        super(props)
        this.fresh()
    }

    handleChange = (event, index, value) => this.setState({ value })

    autoChange = () => {
        const urls = ['auto_day.action', 'auto_week.action']
        const type = this.state.value
        new API('get', urls[type])
            .then(res => {
                new API('get', 'topic_detail.action', { id: res.topic_id })
                    .then(res => {
                        const { id, image, content, open_id } = res.result[0]
                        const temp = {}
                        temp['data' + type] = <TableRow key={res.week_topic_id}>
                            <TableRowColumn>{id}</TableRowColumn>
                            <TableRowColumn><img style={{ maxWidth: '200px', maxHeight: '100px' }} src={image} /></TableRowColumn>
                            <TableRowColumn>{content}</TableRowColumn>
                            <TableRowColumn>{open_id}</TableRowColumn>
                        </TableRow>
                        this.setState(temp)
                    })
                    .action()
            })
            .action()
    }

    render() {
        return (
            <div>
                <br />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={0} primaryText='日话题' />
                            <MenuItem value={1} primaryText='周话题' />
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text='话题调度' />
                        <ToolbarSeparator />
                        <RaisedButton label='自动调度' primary={true} onClick={this.autoChange} />
                    </ToolbarGroup>
                </Toolbar>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Image</TableHeaderColumn>
                            <TableHeaderColumn>Content</TableHeaderColumn>
                            <TableHeaderColumn>Open ID</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state['data' + this.state.value]}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Auto
