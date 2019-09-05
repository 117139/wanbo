//magazineDatails.js
var pageState = require('../../utils/pageState/index.js')
var WxParse = require('../../vendor/wxParse/wxParse.js')
const app = getApp()

Page({
  data: {
    usermsg: '',
    userwxmsg: '',
    dianzan:0,     //点赞数
    dzstatus: 0, //1表示我点过赞了，0表示我没点过赞
		catid:'',
		id:'',
    form_info:'',
    iszan:false,
    pllist:[],
		setInter:'',//计时器
		num:0,//阅读时间
		details:'',
		xiangguan:[], //相关推荐
		books:[], //图书
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
       this.setData({
         catid: option.catid,
         id: option.id
       })
			 this.getdetails(option.catid,option.id)
		 }
    that.setData({
      usermsg: wx.getStorageSync('usermsg'),
      userwxmsg: wx.getStorageSync('userInfo')
    })
    that.getXg()
    that.getbooks()
    that.getzan()
    that.getpinlun() 
  },
	onReady: function () {
	
	},
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("my19-supid:" + res.target.dataset.supid)
    }
    return {
      title: '医保学院',
      path: '/pages/index/index?supid=' + res.target.dataset.supid
    }
  },
	getdetails(catid,id){
		let that =this
				const pageState1 = pageState.default(this)
				pageState1.loading()    // 切换为loading状态
				//m=content&c=index&a=show&catid=9&id=3
				wx.request({
          url: app.IPurl2 + '/index.php?m=content&c=index&a=show&catid=' + catid + '&id=' + id + '&uid=' + wx.getStorageSync('usermsg').userid,
					data:{
					
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						// console.log(res.data)
					let ruls=res.data
						that.setData({
							details:ruls,
              dianzan: ruls.dianzan,
              dzstatus: ruls.dzzt 
						})
						console.log(res.data)
						var article = ruls.content
            // var subStr = new RegExp('<div>&nbsp;</div>', 'ig');
            // article = article.replace(subStr, "<text style='margin-bottom:1em;'></text>");
            var subStr = new RegExp('<div>&nbsp;</div>', 'ig');
            article = article.replace(subStr, "<text style='margin-bottom:1em;'></text>");
            var subStr1 = new RegExp('<br \/>\r\n', 'ig');
            article = article.replace(subStr1, "<text style='margin-bottom:1em;'></text>");
            // console.log(article)
						WxParse.wxParse('article', 'html', article, that, 5);
						pageState1.finish()    // 切换为finish状态
						if(ruls.readpoint==0||ruls.zt==1){
							that.startSetInter()
						}
					},
					fail() {
						 pageState1.error()    // 切换为error状态
					}
				})
	},
  gomore(e){
    var that=this
    app.gomore(e, that.data.catid,that.data.id)
  },

  formSubmit(e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.sr == '') {
      wx.showToast({
        title: '请输入评论',
        icon:'none'
      })
      return
    }
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=pinglun_add&catid=' + that.data.catid + '&id=' + that.data.id + '&uid=' + wx.getStorageSync('usermsg').userid + '&nicheng=' + wx.getStorageSync('usermsg').nickname + '&content=' + e.detail.value.sr,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.zt == 1) {
          wx.showToast({
            title: '评论成功',
            icon: 'none'
          })
          that.setData({
            form_info: ''
          })
          that.getpinlun()
        } else {
          wx.showToast({
            title: '评论失败',
            icon: 'none'
          })
        }

      },
      fail() {
        wx.showToast({
          title: '评论失败',
          icon: 'none'
        })
        console.log('失败')
      }
    })
    // that.getpinlun()
  },
  getpinlun() {
    var that = this
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=pinglun_list&uid=3&catid=8&id=68&page=1
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=pinglun_list&uid='+wx.getStorageSync('usermsg').userid+'&catid='+that.data.catid+'&id='+that.data.id+'&page=1',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.zt == 1) {
          that.setData({
            pllist: res.data.pinglun
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '获取失败'
          })
        }

      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.log('失败')
      }
    })

  },
	buy(){
		let that =this
		//http://sf.zgylbx.com/index.php?m=content&c=index&a=guomai&catid=8&id=68&uid=3&add=ok
		wx.showModal({
			title: '提示',
			content: '是否购买本章节',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					wx.request({
						url:  app.IPurl2+'/index.php?m=content&c=index&a=guomai&catid='+that.data.catid+'&id='+that.data.id+'&uid='+wx.getStorageSync('usermsg').userid+'&add=ok',
						data:{
						
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' 
						},
						dataType:'json',
						method:'POST',
						success(res) {
							console.log(res.data)
							if(res.data.zt=3){
								wx.showToast({
									icon:'none',
									title:'购买成功'
								})
								that.data.details.zt=1
								that.setData({
									details:that.data.details
								})
                that.startSetInter()
              } else if (res.data.zt = 4) {
                wx.showToast({
                  icon: 'none',
                  title: '文件不存在'
                })
              } else if (res.data.zt = 2) {
                wx.showToast({
                  icon: 'none',
                  title: '积分不足'
                })
              }else if(res.data.zt=1){
								wx.showToast({
									icon:'none',
									title:'您已经购买过了'
								})
							}else{
								wx.showToast({
									icon:'none',
									title:'操作失败'
								})
							}
						},
						fail() {
							wx.showToast({
								title:'网络异常',
								duration:1000,
								icon:'none'
							})
						}
					})
					
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
		
	},
	getXg(){
		let that =this
				// const pageState1 = pageState.default(this)
				// pageState1.loading()    // 切换为loading状态
				//http://sf.zgylbx.com/index.php?m=content&c=index&a=xiangguantuijian
				wx.request({
					url:  app.IPurl2+'/index.php?m=content&c=index&a=xiangguantuijian',
					data:{
					
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						// console.log(res.data)
						that.setData({
							xiangguan:res.data
						})
						// pageState1.finish()    // 切换为finish状态
					},
					fail() {
						 // pageState1.error()    // 切换为error状态
						 wx.showToast({
						 	title:'网络异常',
						 	duration:1000,
						 	icon:'none'
						 })
					}
				})
	},
  jumpout(e){
    app.gotel()
    // console.log(e)
    // let outurl = e.currentTarget.dataset.outurl
    // wx.navigateTo({
    //   url: '/pages/out/out?ourl=' + outurl
    // })
  },
  getbooks() {
    let that = this
    // const pageState1 = pageState.default(this)
    // pageState1.loading()    // 切换为loading状态
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=tushutuijian
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=tushutuijian',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        that.setData({
          books: res.data
        })
        // pageState1.finish()    // 切换为finish状态
      },
      fail() {
        // pageState1.error()    // 切换为error状态
        wx.showToast({
          title: '网络异常',
          duration: 1000,
          icon: 'none'
        })
      }
    })
  },
  getzan() {
    console.log('usermsg')
    console.log(wx.getStorageSync('usermsg'))
    console.log(wx.getStorageSync('usermsg').userid)
    let that = this
    // const pageState1 = pageState.default(this)
    // pageState1.loading()    // 切换为loading状态
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=tushutuijian
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=dianzan&catid=' + that.data.catid + '&id=' + that.data.id + '&uid=' + wx.getStorageSync('usermsg').userid,
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        that.setData({
          zan: res.data
        })
        // pageState1.finish()    // 切换为finish状态
      },
      fail() {
        // pageState1.error()    // 切换为error状态
        wx.showToast({
          title: '网络异常',
          duration: 1000,
          icon: 'none'
        })
      }
    })
  },
	share(e){
    var that =this
		console.log(e.currentTarget.dataset.type)
    var type = e.currentTarget.dataset.type
    console.log(app.globalData.userInfo)
    if(type==3){
      wx.request({
        url: app.IPurl2 + '/index.php?m=content&c=index&a=dianzan&add=ok&catid=' + that.data.catid + '&id=' + that.data.id + '&uid=' + wx.getStorageSync('usermsg').userid,
        data: {

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        method: 'POST',
        success(res) {
          console.log(res.data)
          if(res.data.dianzan>=0){
            that.setData({
              dianzan: res.data.dianzan,
              dzstatus: res.data.zt
            })
          }else{
            wx.showToast({
              title: '操作失败',
              duration: 1000,
              icon: 'none'
            })
          }
          // pageState1.finish()    // 切换为finish状态
        },
        fail() {
          // pageState1.error()    // 切换为error状态
          wx.showToast({
            title: '网络异常',
            duration: 1000,
            icon: 'none'
          })
        }
      })
    }
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
    if (e.currentTarget.dataset.url){
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
      return
    }
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
      url: '/pages/magazineDatails/magazineDatails?id=' + id + '&catid=' + e.currentTarget.dataset.catid
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
	  , 1000);   
	},
	endSetInter: function(){
	    var that = this;
			console.log(that.data.num)
			if(that.data.num>1800){
				console.log('无效')
			}
    // http://sf.zgylbx.com/index.php?m=content&c=index&a=add_time&catid=8&id=8&uid=3&sj=8
    var geturl1 = app.IPurl2 + '/index.php?m=content&c=index&a=add_time&catid=' + that.data.catid + '&id=' + that.data.id+ '&uid=' + wx.getStorageSync('usermsg').userid+'&sj=' + that.data.num
    wx.request({

      url: geturl1,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
       
        console.log(res)
        app.dlogin()
      },
      fail() {
        wx.showToast({
          icon:'none',
          title: '操作失败',
        })
      }
    })
	    //清除计时器  即清除setInter
	    clearInterval(that.data.setInter)
	},
	onUnload() {
	  var that = this
		that.endSetInter()
	  console.log("离开")
	},
})
