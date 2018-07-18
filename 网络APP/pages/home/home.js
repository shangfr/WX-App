var space = '\n'
Page({
  data: {
    sptext: space
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
