// pages/splist/splist.js
// var pageState = require('../../utils/pageState/index.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    bankuan: '',
    catid:'',
    page:1,
    wsp:[], //微视频
    wyp: [], //为音频
    wyc:[],  //微原创
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.bankuan) {
      this.setData({
        bankuan:options.bankuan,
        catid: options.catid
      })
      wx.setNavigationBarTitle({
        title: options.bankuan,
      })
      this.getlist()
      
    } 
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
    this.getlist2()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  govideo(e){
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    } 
    console.log(e.currentTarget.dataset.id)
    
    let id = e.currentTarget.dataset.id
    let catid = e.currentTarget.dataset.catid
    var url
    if (catid == 16) {
      wx.navigateTo({
        url: '/pages/spplay/spplay?catid=' + catid + '&id=' + id,
      })
    } else if (catid == 9) {
      url = '/pages/audio/audio?id=' + id + '&catid=' + catid
    } else if (catid == 21) {
      url = '/pages/magazineDatails/magazineDatails?id=' + id + '&catid=' + catid
    }
    wx.navigateTo({
      url: url
    })
  },
  
  
  getlist() {
    let that = this
    // const pageState = pageState.default(that)
    // pageState.loading() // 切换为loading状态
    
    // const pageState1 = pageState.default(this)
    // pageState1.loading()    // 切换为loading状态
      //http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=8&bankuan=专题&page=1
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=lists&catid='+that.data.catid+'&bankuan='+that.data.bankuan+'&page='+that.data.page,
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data != []) {
          if (res.data.length>0){
            that.data.page++
            that.setData({
              page: that.data.page
            })
          } else if (res.data.length == 0){
              wx.showToast({
                icon:'none',
                title: '暂无数据'
              })
          }
          if (that.data.catid == 16) {
            
            that.setData({
              wsp: res.data
            })
          } else if (that.data.catid == 9) {
            that.setData({
              wyp: res.data
            })
          } else if (that.data.catid == 21) {
            that.setData({
              wyc: res.data
            })
          } 
          
          
        }
        // pageState.finish()    // 切换为finish状态
      },
      fail() {
        // pageState.error()    // 切换为error状态
        wx.showToast({
          title: '网络异常',
          duration: 1000,
          icon: 'none'
        })
      }
    })
  },
  getlist2() {
    let that = this
    // const pageState1 = pageState.default(this)
    // pageState1.loading()    // 切换为loading状态
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=8&bankuan=专题&page=1
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=lists&catid=' + that.data.catid + '&bankuan=' + that.data.bankuan + '&page=' + that.data.page,
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data != []) {
          if (res.data.length > 0) {
            that.data.page++
            that.setData({
              page: that.data.page
            })
          } else if (res.data.length == 0) {
            wx.showToast({
              icon: 'none',
              title: '没有更多数据了'
            })
            return
          }
          if (that.data.catid == 16) {
            that.data.wsp = that.data.wsp.concat(res.data)
            that.setData({
              wsp: res.data
            })
          } else if (that.data.catid == 9) {
            that.data.wyp = that.data.wyp.concat(res.data)
            that.setData({
              wyp: res.data
            })
          } else if (that.data.catid == 21) {
            that.data.wyc = that.data.wyc.concat(res.data)
            that.setData({
              wyc: res.data
            })
          }

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
  },
})