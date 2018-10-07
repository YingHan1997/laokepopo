// pages/my/mycollection/mycollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:[
      {
        collectionimage:"/images/topbg.jpg",
        join:"如何用克苏风格描述一个常见物体？"
      },
      {
        collectionimage: "/images/topbg2.jpg",
        join: "我换一个人是一种什么样的感觉？"
      },
      {
        collectionimage: "/images/topbg3.jpg",
        join: "呵呵哒嘻嘻嘻吗吗吗？"
      },
    ],
    comment_id:"",
    pool_id:"",
    img:"/images/head.jpg",
    mypondid:"",
    commentids:[
      {
        commentid:""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取收藏评论id
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/self_save.action',
      data: {
        open_id:'svsdvsdvdsvsdvds28000',
        page:1,
        size:5
      },
      success: function (res) { 
        that.setData({
          collection:res.data.data.result
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