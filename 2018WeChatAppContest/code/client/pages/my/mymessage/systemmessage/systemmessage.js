// pages/my/mymessage/systemmessage/systemmessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    system: "/images/mymessage.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/self_message.action',
      data: {
        open_id: 'svsdvsdvdsvsdvds28000',
        type: 2
      },
      method: "GET",
      success: function (res) {
        console.log('我的消息请求成功'),
          console.log(res.data),
          that.setData({
            mymessage: res.data.data.result
          })
        var comment_id = res.data.data.result[0].link1
        wx.request({
          url: 'https://d0vnlgdt.qcloud.la/weapp/comment_detail.action',
          data: {
            id: comment_id,
          },
          success: function (res) {
            console.log('我的评论请求成功'),
              console.log(comment_id)
            console.log(res.data.data.result),
              that.setData({
                commentdetail: res.data.data.result
              })
          }
        })
      },
      fail: function () {
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