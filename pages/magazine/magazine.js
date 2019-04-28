//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    num:0,
		arr1:[
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12
		],
		imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    title:['微杂志','微原创','微音频','微视频']
  },
  onLoad: function (option) {
    console.log(option.type)
    this.setData({
      num:option.type
    })
    wx.setNavigationBarTitle({
      title: this.data.title[option.type],
    })
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
	onShow(){
		wx.showTabBar();
	},	
	tab(e){
		console.log(e.currentTarget.dataset.index)
		this.setData({
			num:e.currentTarget.dataset.index
		})
    wx.setNavigationBarTitle({
      title: this.data.title[this.data.num],
    })
	},
	aa(e){
		console.log(e.detail.current)
		this.setData({
			num:e.detail.current
		})
    wx.setNavigationBarTitle({
      title: this.data.title[this.data.num],
    })
	},
	jump(e){
		let year =e.currentTarget.dataset.year
		let month =e.currentTarget.dataset.month
		wx.navigateTo({
			url:'/pages/magazineMonthly/magazineMonthly?year='+year+'&month='+month
		})
  },
  jumpdt(e) {
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    console.log(type)
    let url1
    if(type==1){
      url1= '/pages/magazineDatails/magazineDatails?id=' + id
    } else if (type == 2) {
      url1 = '/pages/audio/audio?id=' + id
    } else if (type == 3) {
      url1 = '/pages/magazineDatails/magazineDatails?id=' + id
    }
    wx.navigateTo({
      url: url1
    })
  }
})
