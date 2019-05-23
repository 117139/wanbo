//logs.js
var pageState = require('../../utils/pageState/index.js')
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
		list0:[],
		list1:[],
		list2:[],
		list3:[],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    title:['微杂志','微原创','微音频','微视频'],
    catidz:[8,10,9,'微视频'],
		page0:1,
		page1:1,
		page2:1,
		page3:1,
  },
  onLoad: function (option) {
    console.log(option.type)
    this.setData({
      num:option.type
    })
    wx.setNavigationBarTitle({
      title: this.data.title[option.type],
    })
		this.getlist(this.data.catidz[option.type],1,option.type)
  },
	onShow(){
		// wx.showTabBar();
	},
	getlist(catid,page,type){
		let that =this
		const pageState1 = pageState.default(this)
		pageState1.loading()    // 切换为loading状态
		wx.request({
			url:  app.IPurl1+'?m=content&c=index&a=lists&catid='+catid+'&page='+page,
			data:{
			
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				
				console.log(res.data)
				if(type==0){
					if(that.data.list0.length==0){
						that.setData({
							list0:res.data
						})
					}
				}else if(type==1){
					if(that.data.list1.length==0){
						that.setData({
							list1:res.data
						})
					}
				}else if(type==2){
					if(that.data.list2.length==0){
						that.setData({
							list2:res.data
						})
					}
				}else if(type==3){
					if(that.data.list3.length==0){
						that.setData({
							list3:res.data
						})
					}
				}
				// console.log(test)
				// console.log(JSON.parse(test))
				// that.setData({
				// 	list2:test
				// })
				pageState1.finish()    // 切换为finish状态
				// setTimeout(function(){
				// 	pageState1.finish()    // 切换为finish状态
				// },1000)
			},
			fail() {
				 pageState1.error()    // 切换为error状态
			}
		})
	},
	//点击切换
	tab(e){
		let that =this
		console.log(e.currentTarget.dataset.index)
		let type=e.currentTarget.dataset.index
		that.setData({
			num:type
		})
    wx.setNavigationBarTitle({
      title: that.data.title[that.data.num],
    })
		console.log(type)
		that.getlist(that.data.catidz[type],that.data.page+'type',type)
	},
	//滑屏切换
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
    let catid = e.currentTarget.dataset.catid
    let type = e.currentTarget.dataset.type
    console.log(type)
    let url1
    if(type==1){
      url1= '/pages/magazineDatails/magazineDatails?id=' + id+'&catid='+catid
    } else if (type == 2) {
      url1 = '/pages/audio/audio?id=' + id+'&catid='+catid
    } else if (type == 3) {
      url1 = '/pages/magazineDatails/magazineDatails?id=' + id
    }
    wx.navigateTo({
      url: url1
    })
  },
	formSubmit(e){
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		if(e.detail.value.sr==''){
			return
		}
		wx.navigateTo({
		  url: '/pages/sousuo/sousuo?sousuo=sousuo&id=' + e.detail.value.sr
		})
	}
})
/*let test=`[{
	"title": "偶像练习生 - Ei Ei (Live)",
	"url": "/index.php?m=content&c=index&a=show&catid=9&id=3",
	"mp3": {
		"0": {
			"fileurl ": "/uploadfile/2019/0515/20190515074132396.mp3",
			"filename ": "偶像练习生 - Ei Ei (Live)"
		}
	},
	"zuozhe": "Ei Ei",
	"readpoint": "10",
	"inputtime": "05-15"
}, {
	"title": "火箭少女101段奥娟 - 陪我长大",
	"url": "/index.php?m=content&c=index&a=show&catid=9&id=2",
	"mp3": {
		"0": {
			"fileurl ": "/uploadfile/2019/0515/20190515074049925.mp3",
			"filename ": "火箭少女101段奥娟 - 陪我长大"
		}
	},
	"zuozhe": "火箭少女",
	"readpoint": "5",
	"inputtime": "05-15"
}, {
	"title": "火箭少女101 - 卡路里",
	"url": "/index.php?m=content&c=index&a=show&catid=9&id=1",
	"mp3": {
		"0": {
			"fileurl ": "/uploadfile/2019/0515/20190515074005141.mp3",
			"filename ": "火箭少女101 - 卡路里 "
		}
	},
	"zuozhe": "张勇",
	"readpoint": "1",
	"inputtime": "05-15"
}]`*/