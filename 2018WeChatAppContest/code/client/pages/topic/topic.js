// pages/topic/topic.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:['日话题','周话题','排行榜'],
    navbar2: ['全国榜', '好友榜'],
    currentNavbar: '0',
    currentNavbar2: '0',
    topicbg:"/images/topbg.jpg",
    name:"如何用克苏风格描述一个常见物体？",
    topicbg2: "/images/topbg2.jpg",
    name2: "喜欢一个人是什么样的感觉",
    rank:'/images/rank.png',
    func:1,
    day:"10",
    month:"May",
    year:"2018",
    chooseSize: false,
    animationData: {},
    trangle:"/images/triangle.png",
    status:0,
    img: "/images/head3.png",
    keep: "/images/shoucang1.png",
    good: "/images/zan2.png",
    daytopicid:'',
    weektopicid:'',
    collection: [
      {
        collectionimage: "/images/topbg.jpg",
        join: "如何用克苏风格描述一个常见物体？",
        mydate:"2018/05/13"
      },
      {
        collectionimage: "/images/topbg2.jpg",
        join: "我换一个人是一种什么样的感觉？",
        mydate: "2018/05/12"
      },
      {
        collectionimage: "/images/topbg3.jpg",
        join: "呵呵哒嘻嘻嘻吗吗吗？",
        mydate: "2018/05/11"
      }
    ],
    date:[
      {
        mymonth:5,
        mydate:"2018/5/13"
      }
  ],
    myrank:[
      {
        head: "/images/head2.png",
        username: "零纪年",
        plus: "15589+25649",
        total: "41238",
        crown: "/images/one.png",
        pm:1
      },
      {
        head: "/images/head3.png",
        username: "微蓝一抹淡笑",
        plus: "15845+23645",
        total: "39490",
        crown: "/images/two.png",
        pm:2
      },
      {
        head: "/images/head4.png",
        username: "知否知否",
        plus: "13564+22410",
        total: "35974",
        crown: "/images/three.png",
        pm:3
      },
    ],
    me: {
      myhead: "/images/head5.png",
      myusername: "我",
      myplus: "5423+3556",
      mytotal: "8979",
      mynumber: 35
    },
    others:[
      {
        myhead: "/images/head6.png",
        myusername: "清风",
        myplus: "10236+15648",
        mytotal: "25884",
        mynumber: 4
      },
      {
        myhead: "/images/head7.png",
        myusername: "拂袖",
        myplus: "10025+15684",
        mytotal: "21325709",
        mynumber: 5
      },
      {
        myhead: "/images/head8.png",
        myusername: "席枫",
        myplus: "10136+10326",
        mytotal: "20462",
        mynumber: 6
      },
    ],
    myrank2: [
      {
        head: "/images/head6.png",
        username: "白日梦想家",
        plus: "3264+2130",
        total: "5754",
        crown: "/images/one.png",
        pm: 1
      },
      {
        head: "/images/head5.png",
        username: "夜雨梧桐",
        plus: "3215+2031",
        total: "5246",
        crown: "/images/two.png",
        pm: 2
      },
      {
        head: "/images/head8.png",
        username: "静微",
        plus: "3356+1523",
        total: "4879",
        crown: "/images/three.png",
        pm: 3
      },
    ],
    others2: [
      {
        myhead: "/images/head3.png",
        myusername: "忘清子",
        myplus: "3210+1456",
        mytotal: "4666",
        mynumber: 4
      },
      {
        myhead: "/images/head2.png",
        myusername: "木山",
        myplus: "3045+1389",
        mytotal: "4434",
        mynumber: 5
      },
      {
        myhead: "/images/head8.png",
        myusername: "益佰",
        myplus: "2078+456",
        mytotal: "2534",
        mynumber: 6
      },
    ]
  },
    

  changekeep:function(event){
    templates.changekeep(event)
  },

  changemode: function (event){
    var a = this.data.func
    if (a==1){
      this.setData({func:0})
      console.log(a)
      this.getdayhotcomment()
    }
    else{
      this.setData({func:1})
      console.log(a)
      this.getdaynewcomment()
    }
  },

  changemode2: function (event) {
    var a = this.data.func
    if (a == 1) {
      this.setData({ func: 0 })
      console.log(a)
      this.getweekhotcomment()
    }
    else {
      this.setData({ func: 1 })
      console.log(a)
      this.getweeknewcomment()
    }
  },
  /**
   * 点击跳转详情页
   */
  onItemClick(e) {
    var targetUrl = api.PAGE_WORK
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },

  swichNav2(e) {
    this.setData({
      currentNavbar2: e.currentTarget.dataset.idx
    })
  },


  /*
   * 模态框动画效果 
   */

  
  chooseSezi: function (e) {
    var tabheight
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      tabheight = res[0].height
      //取高度
      console.log(res[0].height);
    })
      console.log("chooseSezi执行了")
    // 用that取代this，防止不必要的情况发生
      var that = this;
      that.setData({
        currentNavbar: 4,
        trangle: "/images/triangle2.png",
      })
      var screenheight;
      wx.getSystemInfo({
        success: function (res) {
          screenheight = res.windowHeight
        },
      })
      // 创建一个动画实例

      var animation = wx.createAnimation({
        // 动画持续时间
        duration: 500,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
      })
      // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(-screenheight-200).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        chooseSize: true,
        
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      },400)
  },

  hideModal: function (e) {
    console.log("hidemodal执行了")
    var screenheight;
    wx.getSystemInfo({
      success: function (res) {
        screenheight = res.windowHeight
      },
    })

    var that = this;
    that.setData({
      currentNavbar: 0,
      trangle: "/images/triangle.png",
    })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(screenheight).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 600)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          second_height: res.windowHeight
        })
      }
    })
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
      data: {
        page: 1,
        size: 5,
        topic_id: 3,
        pool_id: 12,
        order:'id'
      },
      success: function (res) {
        console.log('日话题评论请求成功'),
          console.log(res.data.data.result),
          that.setData({
            daycomment: res.data.data.result
          })
      }
    }),
      wx.request({
        url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
        data: {
          page: 1,
          size: 5,
          topic_id: 14,
          pool_id: 9,
          order: 'id'
        },
        success: function (res) {
          console.log('周话题评论请求成功'),
            console.log(res.data.data.result),
            that.setData({
              weekcomment: res.data.data.result
            })
        }
      })
      /**
       * 获取日话题周话题id
       */
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/system.action',
      data: {
      },
      success: function (res) {
        that.setData({
          daytopicid:res.data.data.day_topic_id,
          weektopicid:res.data.data.week_topic_id
        }),
          console.log('日话题id：' + that.data.daytopicid + "  " + "周话题id：" + that.data.weektopicid)
          that.getdaytopic()
          that.getweektopic()
      }
    })
    
  },
  getdaytopic:function(){
    var that = this
    /**
         * 获取日话题
         */
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/pool_detail.action',
      method: 'post',
      data: {
        id: that.data.daytopicid
      },
      success: function (res) {
        console.log('日话题名称请求成功'),
        console.log(res.data)
        that.setData({
          daytopic: res.data.data.result
        })
      }
    })
  },
  getweektopic: function () {
    var that = this
    /**
         * 获取走话题
         */
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/pool_detail.action',
      method: 'post',
      data: {
        id: that.data.weektopicid
      },
      success: function (res) {
        console.log('周话题名称请求成功'),
          console.log(res.data)
        that.setData({
          weektopic: res.data.data.result
        })
      }
    })
  },
  getdaynewcomment:function(){
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
      data: {
        page: 1,
        size: 5,
        topic_id: 3,
        pool_id: 12,
        order:'id'
      },
      success: function (res) {
        console.log('日话题评论请求成功'),
          console.log(res.data.data.result),
          that.setData({
            daycomment: res.data.data.result
          })
      }
    })
  },
  getdayhotcomment: function () {
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
      data: {
        page: 1,
        size: 5,
        topic_id: 3,
        pool_id: 12,
        order: 'good_point'
      },
      success: function (res) {
        console.log('日话题评论请求成功'),
          console.log(res.data.data.result),
          that.setData({
            daycomment: res.data.data.result
          })
      }
    })
  },
  getweeknewcomment: function () {
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
      data: {
        page: 1,
        size: 5,
        topic_id: 14,
        pool_id: 9,
        order: 'id'
      },
      success: function (res) {
        console.log('日话题评论请求成功'),
          console.log(res.data.data.result),
          that.setData({
            weekcomment: res.data.data.result
          })
      }
    })
  },
  getweekhotcomment: function () {
    var that = this
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
      data: {
        page: 1,
        size: 5,
        topic_id: 14,
        pool_id: 9,
        order: 'good_point'
      },
      success: function (res) {
        console.log('日话题评论请求成功'),
          console.log(res.data.data.result),
          that.setData({
            weekcomment: res.data.data.result
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
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          second_height: res.windowHeight
        })
      }
    })
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
      data: {
        page: 1,
        size: 5,
        topic_id: 3,
        pool_id: 12,
        order: 'id'
      },
      success: function (res) {
        console.log('日话题评论请求成功'),
          console.log(res.data.data.result),
          that.setData({
            daycomment: res.data.data.result
          })
      }
    }),
      wx.request({
        url: 'https://d0vnlgdt.qcloud.la/weapp/comment.action',
        data: {
          page: 1,
          size: 5,
          topic_id: 14,
          pool_id: 9,
          order: 'id'
        },
        success: function (res) {
          console.log('周话题评论请求成功'),
            console.log(res.data.data.result),
            that.setData({
              weekcomment: res.data.data.result
            })
        }
      })
    /**
     * 获取日话题周话题id
     */
    wx.request({
      url: 'https://d0vnlgdt.qcloud.la/weapp/system.action',
      data: {
      },
      success: function (res) {
        that.setData({
          daytopicid: res.data.data.day_topic_id,
          weektopicid: res.data.data.week_topic_id
        }),
          console.log('日话题id：' + that.data.daytopicid + "  " + "周话题id：" + that.data.weektopicid)
        that.getdaytopic()
        that.getweektopic()
      }
    })
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