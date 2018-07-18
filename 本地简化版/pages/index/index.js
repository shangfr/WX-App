import { getData } from '../../utils/storage.js';
import { getdpData } from '../../utils/storage.js';
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var ringChart = null;
var rangeChart = null;
var app = getApp();
Page({
  data: {
    sptext: '\n',
    open: false
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
   lineChart.showToolTip(e, {
      background: '#FFA500',
      format: function (item, category) {
       return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  onLoad: function () {
    var Data = getData();
    var dpData = getdpData();
    var ZS = dpData.zhishu;
    var windowWidth = 320;
    this.setData({
      stock: Data.tuijian,
      date: dpData.date,
      jianyi: dpData.jianyi
    });
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    };
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: ZS,
        color: '#FFA500',
        fontSize: 30
      },
      subtitle: {
        name: "大盘评级",
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '下跌',
        color: '#43CD80',
        data: 100 - ZS * 10,
        stroke: false
      }, {
        name: '上涨',
        color: '#FF4040',
        data: ZS * 10,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: false,
      legend: false,
      padding: 0
    });
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: dpData.categories,
      animation: false,
      // background: '#f5f5f5',
      series: [{
        name: '沪深300',
        data: dpData.data1,
        format: function (val, name) {
          return val.toFixed(2) + '%';
        }
      }, {
        name: '桃树',
        data: dpData.data2,
        format: function (val, name) {
          return val.toFixed(2) + '%';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '',
        format: function (val) {
          return val.toFixed(1);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
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
      title: 'TaoData',
      path: '/pages/index/index'
    }
  }
})

