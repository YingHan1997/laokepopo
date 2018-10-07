// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head:"/images/head2.png",
    name:"樱子",
    myitem:[
      {
        icon:"/images/mymessage.png",
        itemname:"我的消息",
        url:"../my/mymessage/mymessage"
      },
      {
        icon: "/images/mycollection.png",
        itemname: "我的收藏",
        url:"../my/mycollection/mycollection"
      },
      {
        icon: "/images/mytopic.png",
        itemname: "我的话题",
        url:"../my/mytopic/mytopic"
      },
      {
        icon: "/images/myjoin.png",
        itemname: "我的参与",
        url: "../my/mypaticipate/mypaticipate"
      },
      {
        icon: "/images/mysuggestion.png",
        itemname: "意见反馈",
        url:"../my/mycallback/mycallback"
      },
    ]
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