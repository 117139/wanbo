// pages/audio.js
//magazineDatails.js
var WxParse = require('../../vendor/wxParse/wxParse.js')
const app = getApp()

Page({
  data: {
    arr2: [
      1,
      2,
      3,
      4,
      5,
    ],
  },
  onLoad: function () {
    var that = this;
    console.log(app.IPurl1)
    /*wx.request({
      url: app.IPurl1 + ,
      dataType: 'json',
      success: function (res) {
        if (res.data.code == 200) {
         
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.errdes,
          })
        }
      }
    })*/

  },
  onReady: function () {
    var that = this;
    var article = '<div><span>撒大声地所大所多</span><p>的发生大事<i>的发生大事</i></p></div>'
    WxParse.wxParse('article', 'html', article, that, 5);
  },
  share(e) {
    console.log(e.currentTarget.dataset.type)
    console.log(app.globalData.userInfo)
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("details46-supid:" + res.target.dataset.supid)
    }
    return {
      title: '医保学院',
      path: '/pages/index/index?supid=' + res.target.dataset.supid
    }
  },
  jump(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/magazineMonthly/magazineMonthly?id=' + id
    })
  },
  rob(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    let that = this;
    console.log(app.IPurl1)
		/*wx.request({
		  url: app.IPurl1 + ,
		  dataType: 'json',
		  success: function (res) {
		    if (res.data.code == 200) {
		     
		    } else {
		      wx.hideLoading();
		      wx.showToast({
		        title: res.data.errdes,
		      })
		    }
		  }
		})*/
  },
  jumpdt(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/magazineDatails/magazineDatails?id=' + id
    })
  }
})
