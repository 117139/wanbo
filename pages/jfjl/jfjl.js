// pages/jfjl/jfjl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    datalist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbanner()
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
    this.getbanner()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getbanner() {
    let that = this
    
    var geturl = app.IPurl1 + '?m=content&c=index&a=spend_lists&userid=' + wx.getStorageSync('usermsg').userid+'&page='+that.data.page
    wx.request({
      //http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=12
      url: geturl,
      data: {
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {

        if (res.data.length>0){
          that.data.datalist = that.data.datalist.concat(res.data)
          that.data.page++
          that.setData({
            page: that.data.page,
            datalist: that.data.datalist
          })
        }else{
          wx.showToast({
            icon:'none',
            title: '暂无更多数据',
          })
        }
        console.log(res.data)
        

        // pageState1.finish()    // 切换为finish状态
      },
      fail() {
        // pageState1.error()    // 切换为error状态
        // wx.hideLoading()
      }
    })

  }
})

