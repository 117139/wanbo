// pages/spplay/spplay.js
const app=getApp()
var pageState = require('../../utils/pageState/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianzan: 0,     //点赞数
    dzstatus: 0, //1表示我点过赞了，0表示我没点过赞
    num:0,
    details:'',
    catid: 0,
    id:0,
    zan:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      catid:options.catid,
      id: options.id
    })
    this.getvideo(options.catid,options.id)
    this.getzan()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  jumpout() {
    wx.navigateTo({
      url: '/pages/out/out'
    })
  },
  buy() {
    let that = this
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=guomai&catid=8&id=68&uid=3&add=ok
    wx.showModal({
      title: '提示',
      content: '是否购买本视频',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.IPurl2 + '/index.php?m=content&c=index&a=guomai&catid=' + that.data.catid + '&id=' + that.data.id + '&uid=' + wx.getStorageSync('usermsg').userid + '&add=ok',
            data: {

            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            method: 'POST',
            success(res) {
              console.log(res.data)
              if (res.data.zt = 3) {
                wx.showToast({
                  icon: 'none',
                  title: '购买成功'
                })
                that.data.details.zt = 1
                that.setData({
                  details: that.data.details
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
              } else if (res.data.zt = 1) {
                wx.showToast({
                  icon: 'none',
                  title: '您已经购买过了'
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '操作失败'
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  getzan() {
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
  dianzan(){
    var that =this
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
        if (res.data.dianzan >= 0) {
          that.setData({
            dianzan: res.data.dianzan,
            dzstatus: res.data.zt
          })
        } else {
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
  },
  jump(e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })

    }

  },
  
  getvideo(catid,id) {
    let that = this
    const pageState1 = pageState.default(this)
    pageState1.loading()    // 切换为loading状态
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=tushutuijian
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=show&catid=' + catid + '&id=' + id + '&uid=' + wx.getStorageSync('usermsg').userid,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.readpoint == 0 || res.data.zt == 1) {
          that.startSetInter()
        }
        that.setData({
          details: res.data,
          dianzan: res.data.dianzan,
          dzstatus: res.data.dzzt 
        })
        pageState1.finish()    // 切换为finish状态
      },
      fail() {
        pageState1.error()    // 切换为error状态
        wx.showToast({
          title: '网络异常',
          duration: 1000,
          icon: 'none'
        })
      }
    })
  },
  startSetInter: function() {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function() {
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        // console.log('setInterval==' + that.data.num);
      }, 1000);
  },
  endSetInter: function() {
    var that = this;
    console.log(that.data.num)
    if (that.data.num > 1800) {
      console.log('无效')
    }
    // http://sf.zgylbx.com/index.php?m=content&c=index&a=add_time&catid=8&id=8&uid=3&sj=8
    var geturl1 = app.IPurl2 + '/index.php?m=content&c=index&a=add_time&catid=' + that.data.catid + '&id=' + that.data.id + '&uid=' + wx.getStorageSync('usermsg').userid + '&sj=' + that.data.num
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
          icon: 'none',
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