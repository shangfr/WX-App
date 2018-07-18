//entry.js
import { getSTData } from '../../utils/storage.js';
import { getTaData } from '../../utils/storage.js';
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
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
    var TaData = getTaData();
    var windowWidth = 320;
    this.setData({
      levelData: STData[options.index],
      quotation: TaData[options.index],
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
      categories: ['估值', '盈利能力', '运营能力','成长能力',  '偿债能力', '现金流'],
      series: [{
        name: "本期测评",
        color: "#FFD700",
        data: STData[options.index].slice(3, 9)
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 6//雷达数值的最大值
        }
      },
      dataLabel: true,
      legend: false,
      dataPointShape:false
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'TaoData',
      path: '/pages/index/index'
    }
  }
})

