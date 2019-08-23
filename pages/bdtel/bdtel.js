// pages/bdtel/bdtel.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function (e) {

    let that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var tel = e.detail.value.tel
    console.log(tel)
    if (tel == '' || !(/^1\d{10}$/.test(tel))){
      wx.showToast({
        icon: 'none',
        title: '手机号有误'
      })
      return 
    }
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=shizhi&uid=4&mob=13693193565


    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=shizhi&uid=' + wx.getStorageSync('usermsg').userid+'&mob='+tel,
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data){
          wx.showToast({
            title: '绑定成功',
            duration: 1000,
            icon: 'none'
          })
          setTimeout(function(){
            wx.navigateBack()
          },1000)
        }else{
          wx.showToast({
            title: '网络异常',
            duration: 1000,
            icon: 'none'
          })
        }
      },
      fail() {
        wx.showToast({
          title: '网络异常',
          duration: 1000,
          icon: 'none'
        })
      }
    })
  },
})