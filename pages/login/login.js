const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    // wx.getSetting({
    //   success: function(res) {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.redirectTo({
    //         url: '/pages/index/index'
    //       })
    //       wx.getUserInfo({
    //         success: function(res) {
    //           //用户已经授权过
              
    //         }
    //       });
    //     }
    //   }
    // })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮后需要处理的逻辑方法体
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', e.detail.userInfo)
      var uinfo = e.detail.userInfo
      var supid = wx.getStorageSync('supid')
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.login({
              success: function (res) {
                if (res.code) {
                  app.getuser(res.code, uinfo.nickName, uinfo.avatarUrl, supid,'shouquan')

                
                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
			
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法登录小程序，请返回授权!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  goback() {
    wx.navigateBack()
  }
})

