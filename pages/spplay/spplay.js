// pages/spplay/spplay.js
const app=getApp()
var pageState = require('../../utils/pageState/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inrkkk: '',
    usermsg: '',
    userwxmsg: '',
    form_info: '',
    pllist: [],
    dianzan: 0,     //点赞数
    dzstatus: 0, //1表示我点过赞了，0表示我没点过赞
    num:0,
    details:'',
    catid: 0,
    id:0,
    zan: '',
    platforms: app.platforms
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      catid:options.catid,
      id: options.id,
      usermsg: wx.getStorageSync('usermsg'),
      userwxmsg: wx.getStorageSync('userInfo')
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
  jumpout() {
    app.gotel()
    // wx.navigateTo({
    //   url: '/pages/out/out'
    // })
  },

  gomore(e) {
    var that = this
    app.gomore(e, that.data.catid, that.data.id)
  },

  formSubmit(e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.sr == '') {
      wx.showToast({
        title: '请输入评论',
        icon: 'none'
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
      url: app.IPurl2 + '/index.php?m=content&c=index&a=pinglun_list&uid=' + wx.getStorageSync('usermsg').userid + '&catid=' + that.data.catid + '&id=' + that.data.id + '&page=1',
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
        if (that.data.platforms.platform == 'ios') {
          var aaa = {
            kg: res.data.iospay,
            kgl: res.data.iosleft,
            inr0: res.data.iospaymsg,
            inr1: res.data.iospayleftsubmsg,
            inr2: res.data.iospayrightsubmsg
          }
          that.setData({
            inrkkk: aaa
          })
        } else {
          var aaa = {
            kg: res.data.Androidpay,
            kgl: res.data.Androidleft,
            inr0: res.data.Androidpaymsg,
            inr1: res.data.Androidleftsubmsg,
            inr2: res.data.Androidrightsubmsg
          }
          that.setData({
            inrkkk: aaa
          })
        }
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