var app = getApp();
import { getNEWSData } from '../../../../utils/storage.js';
Page({
  data: {
    
  },
  // lifecycle
  onLoad: function (options) {
    var NEWSData = getNEWSData();
    this.setData({
      twoList: NEWSData[options.index],
      id: options.index
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