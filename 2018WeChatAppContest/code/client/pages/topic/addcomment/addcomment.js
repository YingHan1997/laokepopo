// pages/topic/addcomment/addcomment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    tempFilePaths:'/images/takepic.png',
    avataUrl:null,
    mytitle:null,
    comment:''
  },
  /**
   * 获取评论
   */
  getcomment:function(e){
    var that = this
    that.setData({
      comment:e.detail.value
    })
    
  },
  /**
   * 上传数据
   */
  sendmessage:function(){
    console.log('输入内容为：' + this.data.comment)
    var that = this
    if(this.data.mytitle=='day'){
      wx.request({
        url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
        method: 'post',
        data: {
          topic_id: 3,
          pool_id: 12,
          open_id: '我',
          content: this.data.comment
        },
        success: function (res) {
          console.log('评论提交成功')
          console.log(res.data)
          wx.showToast({
            title: '评论成功！',
          })
        }
      })
    }
    if(this.data.mytitle=='week'){
      wx.request({
        url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
        method: 'post',
        data: {
          topic_id: 14,
          pool_id: 9,
          open_id: '我',
          content: this.data.comment
        },
        success: function (res) {
          console.log('评论提交成功')
          console.log(res.data)
          wx.showToast({
            title: '评论成功！'
          })
        }
      })
    }
    
    // wx.switchTab ({
    //   url: '../topic',
    //   success:function(e){
    //     var page = getCurrentPages().pop()
    //     if (page == undefined || page == null) return;
    //     page.onLoad(); 
    //   }
    // })
    wx.navigateBack({
      delta:1,
      success: function (e) {
      var page = getCurrentPages().pop()
      if(page==undefined || page == null)return;
      page.onLoad();
      }
    })
  },
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  choosepic:function(){
    var that = this
    // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
    wx.chooseImage({
      success: function(res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          avatarUrl: tempFilePaths
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mytitle:options.title
    })
    console.log(this.data.mytitle)
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