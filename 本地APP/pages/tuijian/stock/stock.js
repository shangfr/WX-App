//entry.js
var app = getApp();
var wxCharts = require('../../../utils/wxcharts.js');
import { getSTData } from '../../../utils/storage.js';
var Chart = null;

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
    var STData = getSTData();
    var windowWidth = 320;
    this.setData({
      listData: STData[options.index],
      level: STData[options.index].level,
      id: options.index
    })
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    Chart = new wxCharts({
      animation: true,
      canvasId: 'canvas6',
      type: 'radar',
      categories: ['估值', '盈利能力', '成长能力', '现金流', '运营能力', '偿债能力'],
      series: [{
        name: "本期测评",
        data: STData[options.index].level
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 5//雷达数值的最大值
        }
      }
    });
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

