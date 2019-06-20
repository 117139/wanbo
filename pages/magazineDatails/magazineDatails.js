//magazineDatails.js
var pageState = require('../../utils/pageState/index.js')
var WxParse = require('../../vendor/wxParse/wxParse.js')
const app = getApp()

Page({
  data: {
		setInter:'',//计时器
		num:0,//阅读时间
		details:'',
    arr2:[
    	1,
    	2,
    	3,
    	4,
    	5,
    ],
  },
  onLoad: function (option) {
		 var that=this;
		 console.log(option)
		 if(option.id){
			 this.getdetails(option.catid,option.id)
		 }
		 this.startSetInter()
			 
  },
	onReady: function () {
		// var that=this;
		// var article = '<div><span>撒大声地所大所多</span><p>的发生大事<i>的发生大事</i></p></div>'
		// WxParse.wxParse('article', 'html', article, that, 5);
	},
	getdetails(catid,id){
		let that =this
				const pageState1 = pageState.default(this)
				pageState1.loading()    // 切换为loading状态
				//m=content&c=index&a=show&catid=9&id=3
				wx.request({
					url:  app.IPurl2+'/index.php?m=content&c=index&a=show&catid='+catid+'&id='+id,
					data:{
					
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						console.log(typeof(res.data))
					let ruls=res.data
						that.setData({
							details:ruls[0]
						})
						console.log(res.data[0])
						var article = ruls[0].content
						WxParse.wxParse('article', 'html', article, that, 5);
						pageState1.finish()    // 切换为finish状态
					},
					fail() {
						 pageState1.error()    // 切换为error状态
					}
				})
	},
	share(e){
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
	jump(e){
		console.log(e.currentTarget.dataset.id)
		wx.navigateTo({
			url:'/pages/magazineMonthly/magazineMonthly?id='+id
		})
	},
	rob(e){
		console.log(e.currentTarget.dataset.id)
		let id=e.currentTarget.dataset.id
		let that=this;
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
  },
	startSetInter: function(){
	    var that = this;
	    //将计时器赋值给setInter
	    that.data.setInter = setInterval(
	        function () {
	            var numVal = that.data.num + 1;
	            that.setData({ num: numVal });
	            // console.log('setInterval==' + that.data.num);
	        }
	  , 2000);   
	},
	endSetInter: function(){
	    var that = this;
			console.log(that.data.num)
			if(that.data.num>1800){
				console.log('无效')
			}
	    //清除计时器  即清除setInter
	    clearInterval(that.data.setInter)
	},
	onUnload() {
	  var that = this
		that.endSetInter()
	  console.log("离开")
	},
})
