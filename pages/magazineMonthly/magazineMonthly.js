//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
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
		arr2:[
			1,2,3,4,5
		]
  },
  onLoad: function (option) {
		wx.setNavigationBarTitle({
			title: option.year+'年'
		})
    if(option.month){
			this.setData({
			  // logs: (wx.getStorageSync('logs') || []).map(log => {
			  //   return util.formatTime(new Date(log))
			  // })
				month:option.month
			})
		}
  },
	tabbar(e){
		let month =e.currentTarget.dataset.month
		console.log(month)
		this.setData({
			month:month
		})
	},
	jump(e){
		let id =e.currentTarget.dataset.id
		wx.navigateTo({
			url:'/pages/magazineDatails/magazineDatails?id='+id
		})
	}
})
