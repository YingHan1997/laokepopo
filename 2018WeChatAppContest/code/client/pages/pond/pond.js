// pages/pond/pond.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pondshare: "/images/share.png",
    pondzan: "/images/zan2.png",
    pond:{},
    image:"/images/head2.png "
  },

  addGood:function(){
    var that =this
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/pool.action',
      login: false, 
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        page:1,
        size:6
      },
      method:"GET",
      success: function (res) {
        console.log('话题池请求成功'),
        console.log(res.data),
        that.setData({
          pond:res.data.data.result
        })
      },
      fail:function(){
        console.log('requset fail');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})