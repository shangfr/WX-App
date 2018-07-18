
var app = getApp();
import { getTJData } from '../../utils/storage.js';
Page({
  data: {
    sptext: '\n',
    open: false
  },
  onLoad: function () {
    var tjData = getTJData();
    this.setData({
      stock: tjData.tuijian,
      riqi: tjData.date
    });
  },
  showitem: function () {
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
      title: 'TaoData-DataBrain',
      path: '/pages/tuijian/tuijian'
    }
  }
})

