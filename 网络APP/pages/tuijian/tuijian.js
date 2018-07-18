var app = getApp();

Page({
  data: {
    sptext: '\n',
    open: false
  },
  onLoad: function (e) {
    var that = this
    wx.request({
      url: 'http://p8cgfbcg8.bkt.clouddn.com/tjdata.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          stock: res.data.tuijian,
          riqi: res.data.date
        })
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
      }
    })
  },

  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },
  showprice: function () {
    this.setData({
      open: !this.data.open
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'TaoShu-AI',
      path: '/pages/tuijian/tuijian'
    }
  }
})

