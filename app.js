//app.js
App({
	IPurl1: 'https://sf.zgylbx.com/index.php',
	IPurl2: 'https://sf.zgylbx.com',
  onLaunch: function () {
		 this.dlogin()
    // 获取用户信息
    
  },
  onShow: function(){
    var that =this
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("session_key 未过期，并且在本生命周期一直有效")
        that.dlogin()
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("session_key 已经失效")
        that.dlogin() // 重新登录
        // wx.reLaunch({// 重新获取授权
        //   url: '/pages/login/login',
        //   fail: (err) => {
        //     console.log("失败: " + JSON.stringify(err));
        //   }
        // })

        
      }
    })
  },
  globalData: {
    userInfo: null
  },
  dlogin(supid){
		var that =this
		var uinfo
		wx.getSetting({
		  success: res => {
		    // console.log(res)
		    if (res.authSetting['scope.userInfo']==true) {
		      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		      // console.log(1)
		      // wx.reLaunch({
		      //   url: '/pages/index/index',
					// 	fail(err) {
					// 		console.log("失败: " + JSON.stringify(err));
					// 	}
		      // })
		      wx.getUserInfo({
		        success: res => {
		          that.globalData.userInfo = res.userInfo
							uinfo=res.userInfo
							wx.setStorageSync('userInfo', res.userInfo)
		          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		          // 所以此处加入 callback 以防止这种情况
		          // if (this.userInfoReadyCallback) {
		          //   this.userInfoReadyCallback(res)
		          // }
		        }
		      })
		    }else{
		      console.log(2)
		      wx.reLaunch({
		        url: '/pages/login/login',//这是授权页面
		        fail: (err) => {
		          console.log("失败: " + JSON.stringify(err));
		        }
					})
		    }
		  }
		})
		wx.login({
      success: function (res) {
        if (res.code) {
          // wx.getUserInfo({
          //   success: function (res) {
          //     console.log("存在code")
          //   }
          // });
          var appid = "wxd1034622dbcffc48"        //这里是我的appid，需要改成你自己的
          var secret = "16410179a711eb886766c86694b4699d"    //密钥也要改成你自己的
          var openid = ""
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET', 
            success: function (res) {
              var obj = {};
							// console.log(res)
              obj.openid = res.data.openid;
              // console.log("取得的openid==" + res.data.openid);
							wx.setStorageSync('openid', res.data.openid)
							wx.getUserInfo({
							  success: rest => {
							    that.globalData.userInfo = rest.userInfo
									uinfo=rest.userInfo
									wx.setStorageSync('userInfo', rest.userInfo)
                  that.getuser(res.data.openid, uinfo.nickName, uinfo.avatarUrl, supid)
							  }
							})
							
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
	},
  getuser(openid, nickname, tx, supid){
		let that =this
    var geturl1
    if (supid){
      console.log('supid:'+supid)
      geturl1 = that.IPurl1 + '?m=content&c=index&a=wechat&openid=' + openid + '&nickname=' + nickname + '&touxiang=' + tx +'&pid='+supid
    }else{
    geturl1 = that.IPurl1 + '?m=content&c=index&a=wechat&openid=' + openid + '&nickname=' + nickname + '&touxiang=' + tx

    }
    // console.log(geturl1)
			wx.request({
				//http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=12
				url: geturl1,
				data:{},
				header: {
					'content-type': 'application/x-www-form-urlencoded' 
				},
				dataType:'json',
				method:'POST',
				success(res) {
					
          // console.log('openid126' + JSON.stringify(res))
					// console.log(res.data)
					wx.setStorageSync('usermsg', res.data)
          console.log('login')
          // that.onload()

          setTimeout(function () {
            if (getCurrentPages().length != 0) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad()
            }
          }, 0)
          // console.log(131 + JSON.stringify(wx.getStorageSync('usermsg')))
					// that.setData({
					// 	imgUrls:res.data
					// })
					
					// pageState1.finish()    // 切换为finish状态
				},
				fail(err) {
          console.log(err)
          console.log(JSON.stringify(err))
					 // pageState1.error()    // 切换为error状态
					 // wx.hideLoading()
				}
			})
		
	},
  gotel(){
    var that = this
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=shizhi&uid=4
    wx.request({
      url: that.IPurl2 + '/index.php?m=content&c=index&a=shizhi&uid=' + wx.getStorageSync('usermsg').userid,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.zt == 0) {
            wx.navigateTo({
              url: '/pages/bdtel/bdtel?url='+res.data.img,
            })
        } else if(res.data.zt == 1) {
          wx.navigateTo({
            url: '/pages/hqewm/hqewm?url='+res.data.zhifu,
          })
        } else {
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: '获取失败'
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '获取失败'
            })
          }
        }

      },
      fail(err) {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
        console.log(err)
      }
    })
  },
  gomore(e,catid,id) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/pinglun/pinglun?catid=" + catid+"&id="+id
    })
  },
})