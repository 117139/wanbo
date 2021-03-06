//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    num:0,
		inr:'',
		catidz:[8,21,9,16],
		list0:[],
		list1:[],
		list2:[],
		list3:[],
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
    title:['微杂志','微原创','微音频','微视频'],
		page:[1,1,1,1]
  },
  onLoad: function (option) {
    console.log(option.type)
		if(option.type){
			this.setData({
			  num:option.type
			})
			wx.setNavigationBarTitle({
			  title: this.data.title[option.type],
			})
		}
		this.setData({
			inr:option.sr
		})
		this.getsousuo()
  },
	onShow(){
		// wx.showTabBar();
	},
  // 点击键盘上的搜索
  bindconfirm: function (e) {
    var that = this;
    // var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('e.detail.value', e.detail.value)
    if (e.detail.value == '') {
      return
    }
    that.setData({
      inr: e.detail.value,
      page: [1, 1, 1, 1]
    })
    that.getsousuo()
  },
	formSubmit(e){
		var that=this
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		if(e.detail.value.sr==''){
			return
		}
		that.setData({
			inr:e.detail.value.sr,
			page:[1,1,1,1]
		})
		that.getsousuo()
	},
	tab(e){
		var type=e.currentTarget.dataset.index
		if(type==this.data.num){
			return
		}
		// if(type==3){
		// 	wx.showToast({
		// 		title:'正在开发中',
		// 		duration:1000,
		// 		icon:'none'
		// 	})
		// 	return
		// }
		console.log(e.currentTarget.dataset.index)
		this.setData({
			num:type
		})
    wx.setNavigationBarTitle({
      title: this.data.title[this.data.num],
    })
		if(this.data.page[this.data.num]==1){
			this.getsousuo()
		}
		
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
	getsousuo(){
		var that =this
		//http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=8&q=%E5%8C%BB%E4%BF%9D&page=1
		wx.request({
			url:app.IPurl1+'?m=content&c=index&a=lists&catid='+that.data.catidz[that.data.num]+'&q='+that.data.inr+'&page='+that.data.page[that.data.num],
			data:{},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				
				var type=that.data.num
				console.log(res.data)
				if(res.data.length==0){
					wx.showToast({
						title:'暂无更多相关数据',
						duration:1000,
						icon:'none'
					})
          return
				}
          
        that.data.page[that.data.num]++

				if(type==0){
					
						
						that.data.list0=that.data.list0.concat(res.data)
						that.setData({
							// list0:that.data.list0
							list0:that.data.list0
						})
						console.log(that.data.list0)
					// }
					
				}else if(type==1){
					// if(that.data.list1.length==0){
					// 	that.setData({
					// 		list1:res.data
					// 	})
					// }else{
						that.data.list1=that.data.list1.concat(res.data)
						that.setData({
							list1:that.data.list1
						})
					// }
				}else if(type==2){
					// if(that.data.list2.length==0){
					// 	that.setData({
					// 		list2:res.data
					// 	})
					// }else{
						that.data.list2=that.data.list2.concat(res.data)
						that.setData({
							list2:that.data.list2
						})
					// }
				}else if(type==3){
					// if(that.data.list3.length==0){
					// 	that.setData({
					// 		list3:res.data
					// 	})
					// }
          that.data.list3 = that.data.list3.concat(res.data)
          that.setData({
            list3: that.data.list3
          })
				}
				// pageState1.finish()    // 切换为finish状态
			},
			fail() {
				 // pageState1.error()    // 切换为error状态
				 // wx.hideLoading()
			}
		})
	},
	jiazai(){
		console.log(this.data.num)
		this.getsousuo()
	},
	jump(e){
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    } 
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
      url1 = '/pages/spplay/spplay?id=' + id + '&catid=' + catid
		}
		wx.navigateTo({
		  url: url1
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
