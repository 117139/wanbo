//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),	
		arr:[
		'/static/images/btn2_1.jpg',
		'/static/images/btn2_2.jpg',
		'/static/images/btn2_3.jpg',
		'/static/images/btn2_4.jpg',
		'/static/images/btn2_5.jpg',
		'/static/images/btn2_6.png',
		]
  },
  onLoad: function (option) {

		if(option.supid){
			console.log("index31-option:"+option.supid)
		}
  },
	onReady:function (){
		wx.hideLoading()
	},
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
	 formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
		if(e.detail.value.sr==''){
			return
		}
		wx.navigateTo({
		  url: '/pages/sousuo/sousuo?sousuo=sousuo&id=' + e.detail.value.sr
		})
  },
  jump(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/magazineDatails/magazineDatails?id=' + id
    })
  },
	resetinr(){
		console.log(1)
	},
	kfz(){
		wx.showToast({
			icon:'none',
			title:'正在开发中'
		})
	}
})
