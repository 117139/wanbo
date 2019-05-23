//app.js
App({
	IPurl1: 'http://sf.zgylbx.com/index.php',
	IPurl2: 'http://sf.zgylbx.com',
  onLaunch: function () {
		 
    // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)
// 
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']==true) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log(1)
          wx.reLaunch({
            url: '/pages/index/index',
						fail(err) {
							console.log("失败: " + JSON.stringify(err));
						}
          })
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log(2)
          wx.reLaunch({
            url: '/pages/login/login',
            fail: (err) => {
              console.log("失败: " + JSON.stringify(err));
            }
					})
        }
      }
    })
  },
  onShow: function(){
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("session_key 未过期，并且在本生命周期一直有效")
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("session_key 已经失效")
        wx.login() // 重新登录
        // wx.reLaunch({// 重新获取授权
        //   url: '/pages/login/login',
        //   fail: (err) => {
        //     console.log("失败: " + JSON.stringify(err));
        //   }
        // })

        wx.login({
          success: function (res) {
            const url = '接口地址'   //本次项目中是从后台获取session_key的接口，可能流程不同，会有相应的变化
            const data = {
              //你要传的数据
            }
            wx.request({
              url: url,
              method: 'POST',
              data: data,
            }).then(res => {
              if (res.data.code == 0) {
                //拿到的openid和session_key存到缓存中
                wx.setStorage({
                  key: 'openid',
                  data: '获取到的openid'
                })
                wx.setStorage({
                  key: 'session_key',
                  data: '获取到的session_key'
                })
                //调用换取用户id接口[需求不同，可能接口会有相应的变化]
                const url = '获取用户id的接口'
                const data = {}//'要传的数据'
                wx.request({
                  url: url,
                  method: 'POST',
                  data: data,
                }).then((res) => {
                  //该接口设计返回的参数包括换取的用户ID和返回的用户的微信中信息，也就是通过button获取的那个userInfo[我们为了后续的处理，所以后台这块返回用户信息，如果用户还未登录，用户信息，返回是空，反之则有值]
                  //存储用户ID
                  wx.setStorage({
                    key: 'userId',
                    data: '获取到的用户ID'
                  })
                  //存储用户信息[userInfo]
                  wx.setStorage({
                    key: 'userInfo',
                    data: '获取到的用户信息'
                  })
                })
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})