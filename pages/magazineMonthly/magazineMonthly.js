//logs.js
var pageState = require('../../utils/pageState/index.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
		year:2019,
    month: 0,
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
		dataz:[],
		arr2:[
			1,2,3,4,5
		]
  },
  onLoad: function (option) {
		wx.setNavigationBarTitle({
			title: option.year+'年'
		})
    if(option.name){
			console.log(option.data1)
			
			this.setData({
			  // logs: (wx.getStorageSync('logs') || []).map(log => {
			  //   return util.formatTime(new Date(log))
			  // })
				year:option.year,
				name:option.name,
				month:option.id,
				arr1:JSON.parse(option.data1)
			})
			this.getqi()
		}
  },
	tabbar(e){
		let month =e.currentTarget.dataset.month
		let name =e.currentTarget.dataset.name
		console.log(month)
		this.setData({
			month:month,
			name:name
		})
		this.getqi()
	},
	getqi(){
		let that =this
		const pageState1 = pageState.default(this)
		pageState1.loading()    // 切换为loading状态
		//http://sf.zgylbx.com/index.php?m=content&c=index&a=anqichaxun&year=2019&mouth=1
		var geturl=app.IPurl1+'?m=content&c=index&a=anqichaxun&year='+that.data.year+'&mouth='+that.data.month
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
				
				console.log(res.data)
				that.setData({
					dataz:res.data
				})
				
				pageState1.finish()    // 切换为finish状态
			},
			fail() {
				 pageState1.error()    // 切换为error状态
			}
		})
	},
	jump(e){
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    } 
		let id =e.currentTarget.dataset.id
		let catid =e.currentTarget.dataset.catid
		wx.navigateTo({
			url:'/pages/magazineDatails/magazineDatails?id='+id+'&catid='+catid
		})
	}
})
