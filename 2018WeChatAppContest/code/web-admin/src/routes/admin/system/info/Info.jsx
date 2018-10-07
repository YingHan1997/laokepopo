import React, { Component } from 'react';
import './Info.css'

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

import API from '../../../../utils/API'

class Info extends Component {

    state = {
        data: <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>loading...</TableRowColumn>
            <TableRowColumn></TableRowColumn>
        </TableRow>,
    }

    fresh = () => {
        new API('get', 'system.action')
            .then(res => {
                this.setState({
                    data: <TableRow key={res.day_topic_id + '-' + res.week_topic_id + '-' + res.open_id}>
                        <TableRowColumn>{res.day_topic_id}</TableRowColumn>
                        <TableRowColumn>{res.week_topic_id}</TableRowColumn>
                        <TableRowColumn>{res.open_id}</TableRowColumn>
                    </TableRow>
                })
            })
            .action()

    }

    constructor(props) {
        super(props)
        this.fresh()
    }

    render() {
        return (
            <div>
                <br />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text='系统信息' />
                        <ToolbarSeparator />
                        <RaisedButton label='刷新' primary={true} onClick={this.fresh} />
                    </ToolbarGroup>
                </Toolbar>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>日话题</TableHeaderColumn>
                            <TableHeaderColumn>周话题</TableHeaderColumn>
                            <TableHeaderColumn>官方账号</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.data}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Info
