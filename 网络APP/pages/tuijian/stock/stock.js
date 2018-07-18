//entry.js
var app = getApp();

Page({
  // data
  data: {
    item: {},
    inputValue: '', //用于显示输入语句
    searchinput: '', //用户输入的查询语句
    sptext: '\n'
  },
  // lifecycle
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://p8cgfbcg8.bkt.clouddn.com/stdata.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          listData: res.data[options.index],
          id: options.index,
          date: res.data.date
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'TaoData-DataBrain',
      path: '/pages/tuijian/tuijian'
    }
  }
})

