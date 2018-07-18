var app = getApp();
import { getPREData } from '../../../../utils/storage.js';
Page({
  data: {
    sptext: '\n'
  },
  // lifecycle
  onLoad: function (options) {
    var PREData = getPREData();
    this.setData({
      PREdata: PREData[options.index],
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