//my.js
const util = require('../../utils/util.js')

Page({
  data: {
    usermsg: '',
		userwxmsg:''
  },
  onLoad: function () {
		
    this.setData({
      usermsg: wx.getStorageSync('usermsg'),
      userwxmsg: wx.getStorageSync('userInfo')
    })
  },
	onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("my19-supid:"+res.target.dataset.supid)
    }
    return {
      title: '医保学院',
      path: '/pages/index/index?supid=' + res.target.dataset.supid
    }
  }
})
