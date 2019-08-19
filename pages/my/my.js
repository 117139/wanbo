//my.js
const util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    usermsg: '',
		userwxmsg:'',
    wuxian:0
  },
  onLoad: function () {
		
    this.setData({
      usermsg: wx.getStorageSync('usermsg'),
      userwxmsg: wx.getStorageSync('userInfo')
    })
    this.wuxianka()
    console.log(wx.getStorageSync('usermsg'))
  },
  onShow(){
    this.setData({
      usermsg: wx.getStorageSync('usermsg'),
      userwxmsg: wx.getStorageSync('userInfo')
    })
  },
	onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("my19-supid:"+res.target.dataset.supid)
    }
    return {
      title: '医保学院',
      path: '/pages/index/index?supid=' + res.target.dataset.supid
    }
  },
  jump(e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })

    }

  },
  jumpout() {
    wx.navigateTo({
      url: '/pages/out/out'
    })
  },
  duihuan(e){
    let that = this
    var sj = e.currentTarget.dataset.sj
    console.log(e)
    console.log(sj)
    wx.showModal({
      title: '提示',
      content: '是否要将时长兑换为积分',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var geturl1 = app.IPurl1 + '?m=content&c=index&a=addjifen_spend&uid=' + wx.getStorageSync('usermsg').userid + '&sj=' +sj
          wx.request({

            url: geturl1,
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            method: 'POST',
            success(res) {
              if (res.data == 2) {
                wx.showToast({
                  icon: 'none',
                  title: '您的时长太短了',
                })
              }
              app.dlogin()
              // console.log(res)
            },
            fail() {
              wx.showToast({
                icon: 'none',
                title: '操作失败',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  },
  wuxianka(){
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=get_wuxianka&userid=3
    let that = this
    var geturl1 = app.IPurl2 + '/index.php?m=content&c=index&a=get_wuxianka&userid=' + wx.getStorageSync('usermsg').userid
    wx.request({

      url: geturl1,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        if(res.data.test==0){
            that.setData({
              wuxian: res.data.test
            })
        }
        if (res == 1) {
         
        }
        // console.log(res)
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '操作失败',
        })
      }
    })
  }
})
