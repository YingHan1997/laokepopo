// pages/my/mycallback/mycallback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:"",
    phone:"",
    content:""
  },
  sendmessage:function(){
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/callback.action',
      data: {
        email:this.data.email,
        phone: this.data.phone,
        content: this.data.content
      },
      method:'post',
      success: function (res) {
        console.log('意见提交成功'),
        wx.showToast({
          title: '意见提交成功',
        })
      }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  getemail: function (e) {
    var that = this
    that.setData({
      email: e.detail.value
    })
  },
  getnumber: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  getcontent: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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