// pages/my/mytopic/mytopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selftopic:[
      {
        pool_id:""
      }
    ],
    pondshare: "/images/share.png",
    pondzan: "/images/zan2.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getpoolid()
  },
  /**
   * 获取收藏的话题池id
   */
  getpoolid:function(){
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/self_topic.action',
      data:{
        open_id:"21856216321",
        page:1,
        size:10
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          mytopic:res.data.data.result
        })
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