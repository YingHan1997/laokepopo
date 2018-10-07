import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import './Manager.css'
import icon from './resources/admin.svg'
import author from './resources/author.svg'
import github from './resources/github.svg'
import gitee from './resources/gitee.svg'

import { AppBar, FlatButton, IconButton, Drawer, MenuItem, Dialog, Avatar, SvgIcon, RaisedButton } from 'material-ui'
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import { indigo500 } from 'material-ui/styles/colors'
import CommunicationEmail from 'material-ui/svg-icons/communication/email'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ContentSend from 'material-ui/svg-icons/content/send'

import AutoContainer from './auto/AutoContainer'
import dataRoutes from './data'
import systemRoutes from './system'

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8' />
    </SvgIcon>
);

const ManagerIcon = (props) => (
    <SvgIcon {...props}>
        <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
    </SvgIcon>
);

const styles = {
    button: {
        margin: 12,
    },
};

class WelcomeView extends Component {

    render() {
        return (
            <div>
                <h1>Admin, Hello World!</h1>
                <h3>Quick Start （快速开始）</h3>
                <RaisedButton
                    href='https://gitee.com/moyinzi/2018WeChatAppContest'
                    label='前往主页'
                    style={styles.button}
                    icon={<HomeIcon />}
                />
                <RaisedButton
                    label='开始管理'
                    style={styles.button}
                    onClick={this.props.showMenu}
                    icon={<ManagerIcon />}
                />
            </div>
        );
    }
}

class Manager extends Component {

    state = {
        menuDrawer: false,
        aboutPage: false,
    }

    constructor(props) {
        super(props)
    }

    showAboutPage = (e) => {
        this.setState({
            aboutPage: true
        })
    }

    hideAboutPage = (e) => {
        this.setState({
            aboutPage: false
        })
    }

    showMenu = (e) => {
        this.setState({
            menuDrawer: true
        })
    }

    hideMenu = (e) => {
        this.setState({
            menuDrawer: false
        })
    }

    changePage = (e) => {
        this.props.history.replace(e.currentTarget.dataset.url)
        this.setState({
            menuDrawer: false
        })
    }

    render() {
        console.log(this)
        return (
            <div>
                <AppBar
                    title='管理系统'
                    onTitleClick={this.showAboutPage}
                    onLeftIconButtonClick={this.showMenu}
                    onRightIconButtonClick={this.props.logoutAction}
                    iconElementRight={<FlatButton label='退出登录' />}
                />
                <div style={{ 'margin': '0 30px' }}>
                    <Switch>
                        <Route exact path='/admin' component={() => <WelcomeView showMenu={this.showMenu} />} />
                        {/* 具体功能 */}
                        {/**
                         * 数据模块
                         * |-- 话题池管理
                         * |-- 话题管理 (-评论管理)
                         * 系统模块
                         * |-- 系统信息
                         * |-- 意见反馈 (+消息推送)
                         * 话题调度（切换日/周话题）
                         */}
                        <Route exact path='/admin/data_pool' component={dataRoutes.Pool} />
                        <Route exact path='/admin/data_topic' component={dataRoutes.Topic} />
                        {/*<Route exact path='/admin/data_comment' component={dataRoutes.Comment} />*/}
                        <Route exact path='/admin/system_info' component={systemRoutes.Info} />
                        {/*<Route exact path='/admin/system_message' component={systemRoutes.Message} />*/}
                        <Route exact path='/admin/system_callback' component={systemRoutes.Callback} />
                        <Route exact path='/admin/auto' component={AutoContainer} />
                        <Route component={() => <h1>404 NOT FOUND</h1>}></Route>
                    </Switch>
                </div>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.menuDrawer}
                    onRequestChange={(open) => this.setState({ menuDrawer: open })}
                >
                    <Card style={{
                        'width': '300px',
                    }}>
                        <CardHeader
                            title='admin'
                            subtitle='' // address
                            avatar={icon}
                        />
                        <List>
                            <ListItem
                                leftIcon={<CommunicationCall color={indigo500} />}
                                primaryText='' // phone
                                secondaryText='Phone'
                            />
                            <ListItem
                                leftIcon={<CommunicationEmail color={indigo500} />}
                                primaryText='' //email
                                secondaryText='Email'
                            />
                        </List>
                    </Card>
                    <List>
                        <ListItem
                            leftIcon={<ContentSend />}
                            primaryText='欢迎页'
                            data-url='/admin'
                            onClick={this.changePage} />
                        <ListItem
                            primaryText='数据模块'
                            leftIcon={<ContentInbox />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={1}
                                    leftIcon={<ContentInbox />}
                                    primaryText='话题池管理'
                                    data-url='/admin/data_pool'
                                    onClick={this.changePage} />,
                                <ListItem
                                    key={2}
                                    leftIcon={<ContentInbox />}
                                    primaryText='话题管理'
                                    data-url='/admin/data_topic'
                                    onClick={this.changePage} />,
                                /*<ListItem
                                    key={3}
                                    leftIcon={<ContentInbox />}
                                    primaryText='评论管理'
                                    data-url='/admin/data_comment'
                                    onClick={this.changePage} />,*/
                            ]}
                        />
                        <ListItem
                            primaryText='系统模块'
                            leftIcon={<ActionGrade />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={1}
                                    leftIcon={<ActionGrade />}
                                    primaryText='系统信息'
                                    data-url='/admin/system_info'
                                    onClick={this.changePage} />,
                                /*<ListItem
                                    key={2}
                                    leftIcon={<ActionGrade />}
                                    primaryText='消息推送'
                                    data-url='/admin/system_message'
                                    onClick={this.changePage} />,*/
                                <ListItem
                                    key={3}
                                    leftIcon={<ActionGrade />}
                                    primaryText='意见反馈'
                                    data-url='/admin/system_callback'
                                    onClick={this.changePage} />,
                            ]}
                        />
                        <ListItem
                            leftIcon={<ContentDrafts />}
                            primaryText='话题调度'
                            data-url='/admin/auto'
                            onClick={this.changePage} />
                    </List>
                </Drawer>
                <Dialog
                    title='关于'
                    actions={[<FlatButton label='关闭' primary={true} onClick={this.hideAboutPage} />]}
                    modal={true}
                    open={this.state.aboutPage}>
                    <Card>
                        <CardHeader
                            title='Sakura Mo'
                            subtitle='ddosakura'
                            avatar={author}
                        />
                        <CardText>
                            Powered By Sakura Mo.
                        </CardText>
                        <CardActions>
                            <IconButton href='https://github.com/DoubleDarkofSakura' target='_blank'>
                                <Avatar size={20} src={github} />
                            </IconButton>
                            <IconButton href='https://gitee.com/moyinzi' target='_blank'>
                                <Avatar size={20} src={gitee} />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Dialog>
            </div>
        );
    }
}

export default Manager
