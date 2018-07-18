var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
var lineChart = null;

Page({
  data: {
    sptext: '\n'
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  onLoad: function (e) {
    var that = this
    wx.request({
      url: 'http://p8cgfbcg8.bkt.clouddn.com/zsdata.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({

        })
        var zsData = res.data
        var ZS = res.data.zhishu;
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: zsData.categories,
          animation: true,
          // background: '#f5f5f5',
          series: [{
            name: '桃树指数',
            data: zsData.data1,
            format: function (val, name) {
              return val.toFixed(2) + '%';
            }
          }, {
            name: '沪深300',
            data: zsData.data2,
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
              return val.toFixed(2);
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
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: "大盘评级",
            color: '#666666',
            fontSize: 15
          },
          series: [{
            name: '评级1',
            data: 100 - ZS * 10,
            stroke: false
          }, {
            name: '评级2',
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
      }
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

