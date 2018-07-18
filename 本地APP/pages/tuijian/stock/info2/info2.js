var app = getApp();
import { getNoticeData } from '../../../../utils/storage.js';

Page({
  data: {

  },
  // lifecycle
  onLoad: function (options) {
    var NoticeData = getNoticeData();
    this.setData({
      listData: NoticeData[options.index],
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