// pages/my/mypaticipate/mypaticipate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paticipate: [
      {
        collectionimage: "/images/topbg.jpg",
        join: "如何用克苏风格描述一个常见物体？",
        mydate: "2018/05/13",
        img:"/images/head.jpg",
        name:"知否知否",
        answer: "在高大的古老石台上有一方布满裂纹的硬木板，木板布乳白甚至墨绿色的陈旧血迹。每当太阳的位置正确之时，木上将上演隆重的献祭仪式。",
        good: "/images/zan1.png",
        number: 700
      },
      {
        collectionimage: "/images/topbg2.jpg",
        join: "我换一个人是一种什么样的感觉？",
        mydate: "2018/05/12",
        img: "/images/head2.png",
        name: "知否知否",
        answer: "在高大的古老石台上有一方布满裂纹的硬木板，木板布乳白甚至墨绿色的陈旧血迹。每当太阳的位置正确之时，木上将上演隆重的献祭仪式。",
        good: "/images/zan2.png",
        number: 452
      },
      {
        collectionimage: "/images/topbg3.jpg",
        join: "呵呵哒嘻嘻嘻吗吗吗？",
        mydate: "2018/05/11",
        img: "/images/head3.png",
        name: "知否知否",
        answer: "在高大的古老石台上有一方布满裂纹的硬木板，木板布乳白甚至墨绿色的陈旧血迹。每当太阳的位置正确之时，木上将上演隆重的献祭仪式。",
        
        number: 500
      }
    ],
    good: "/images/zan2.png",
    poolid:[
      {
        pool_id:""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getcomment()
  },
  /**
   * 获取评论信息
   */
  getcomment:function(){
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/self_comment.action',
      data:{
        open_id:'213000-10086-2',
        page:1,
        size:100
      },
      success:function(res){
        that.setData({
          topic:res.data.data.result
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