//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    title:['微杂志','微原创','微音频','微视频'],
    catidz:[8,10,9,16],
		imgUrls:[],
    dataz:[],
		arr:[
		'/static/images/btn2_1.jpg',
		'/static/images/btn2_3.jpg',
		'/static/images/btn2_2.jpg',
		'/static/images/btn2_4.jpg',
		'/static/images/btn2_5.jpg',
		'/static/images/btn2_6.png',
		],
		page:1
  },
  onLoad: function (option) {

    if (option&&option.supid){
      console.log("supid:"+option.supid)
      app.dlogin(option.supid)
		}
    
		this.getbanner()
		this.resetinr()
  },
	onReady:function (){
	},
  
  // 点击键盘上的搜索
  bindconfirm: function (e) {
    var that = this;
    // var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('e.detail.value', e.detail.value)
    if (e.detail.value == '') {
      return
    }
    wx.navigateTo({
      url: '/pages/sousuo/sousuo?sousuo=sousuo&sr=' + e.detail.value
    })
  },
  
	 formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
		if(e.detail.value.sr==''){
			return
		}
		wx.navigateTo({
		  url: '/pages/sousuo/sousuo?sousuo=sousuo&sr=' + e.detail.value.sr
		})
  },
  jump(e) {
    let id = e.currentTarget.dataset.id
    let catid = e.currentTarget.dataset.catid
		console.log(e.currentTarget.dataset)
    if(catid==9){
      wx.navigateTo({
        url: '/pages/audio/audio?id=' + id + '&catid=' + catid
      })
    }else if(catid==16){
      wx.navigateTo({
        url: '/pages/spplay/spplay?id=' + id + '&catid=' + catid
      })
    }else{
      wx.navigateTo({
        url: '/pages/magazineDatails/magazineDatails?id=' + id + '&catid=' + catid
      })
    }
    
  },
	getbanner(){
		let that =this
		var geturl=app.IPurl1+'?m=content&c=index&a=lists&catid=12'
			wx.request({
				//http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=12
				url: geturl,
				data:{},
				header: {
					'content-type': 'application/x-www-form-urlencoded' 
				},
				dataType:'json',
				method:'POST',
				success(res) {
					
					
					// console.log(res.data)
					
					that.setData({
						imgUrls:res.data
					})
					
					// pageState1.finish()    // 切换为finish状态
				},
				fail() {
					 // pageState1.error()    // 切换为error状态
					 // wx.hideLoading()
				}
			})
		
	},
  //今日更新
	resetinr(){
		let that =this
		wx.showLoading({
			title:'加载中'
		})
    var geturl = app.IPurl1 +'/index.php?m=search&c=index&a=init&typeid=0&q=&siteid=1&time=all&page='+that.data.page
		wx.request({
			//http://sf.zgylbx.com/index.php?m=content&c=index&a=nianfen
			url: geturl,
			data:{},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				
				
				// console.log(res.data)
				wx.hideLoading()
				if(res.data.length==0){
					wx.showToast({
						title:'没有更多东西了',
						icon:'none',
						duration:1000
					})
					return
				}
				that.data.page++
				that.setData({
					page:that.data.page,
					dataz:res.data
				})
				
				// pageState1.finish()    // 切换为finish状态
			},
			fail() {
				 // pageState1.error()    // 切换为error状态
				 wx.hideLoading()
			}
		})
	},
	
	kfz(){
		wx.showToast({
			icon:'none',
			title:'正在开发中'
		})
	}
})
