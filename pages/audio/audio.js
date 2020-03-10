const app = getApp()
var WxParse = require('../../vendor/wxParse/wxParse.js')
 
var pageState = require('../../utils/pageState/index.js')
let bgMusic;
Page({
  data: {
    inrkkk:'',
    usermsg: '',
    userwxmsg: '',
    form_info:'',
    pllist:[],
    dianzan: 0,     //点赞数
    dzstatus: 0, //1表示我点过赞了，0表示我没点过赞
    resdkg:0,
    catid:9,
    id:0,
		setInter:'',//计时器
		num:0,//阅读时间
		readpoint:0,
		details:'',
		fri:true,
		tmore:true,
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '00:00',   //总时长
    src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    platforms: app.platforms
  },
	onLoad(option){
    this.setData({
      usermsg: wx.getStorageSync('usermsg'),
      userwxmsg: wx.getStorageSync('userInfo')
    })
    this.setData({
      catid: option.catid,
      id: option.id
    })
		this.getaudio(option.catid,option.id)
		// console.log(option.readpoint)
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
  jumpout() {
    app.gotel()
    // wx.navigateTo({
    //   url: '/pages/out/out'
    // })
  },
  // gomore(e) {
  //   app.gomore(e)
  // },
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
      content: '是否购买本音频',
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
                  details: that.data.details,
                  resdkg:1
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
	onReady(){
		console.log('ready')
		
	},
	more(){
    if (this.data.resdkg==1){
      this.setData({
        tmore: false
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '请先购买本音频'
      })
    }
		
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
  dianzan() {
    var that = this
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
	getaudio(catid,id){
		console.log('get')
		const pageState1 = pageState.default(this)
		pageState1.loading()    // 切换为loading状态
		var that = this
		//m=content&c=index&a=show&catid=9&id=3
		wx.request({
      url: app.IPurl1 + '?m=content&c=index&a=show&catid=' + catid + '&id=' + id + '&uid=' + wx.getStorageSync('usermsg').userid,
			data:{},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				console.log(res.data)
				// let json1=JSON.parse(res.data)
				// console.log(json1)
				let rlist=res.data
        var article = res.data[0].yinpinjs
        var subStr = new RegExp('<div>&nbsp;</div>', 'ig');
        article = article.replace(subStr, "<text style='margin-bottom:1em;'></text>");
        WxParse.wxParse('article', 'html', article, that, 5);
				that.setData({
					details:res.data[0],
          src: app.IPurl2 + res.data[0].fileurl,
          dianzan: res.data[0].dianzan,
          dzstatus: res.data[0].dzzt 
				})
        if (that.data.platforms.platform == 'ios') {
          var aaa = {
            kg: res.data[0].iospay,
            kgl: res.data[0].iosleft,
            inr0: res.data[0].iospaymsg,
            inr1: res.data[0].iospayleftsubmsg,
            inr2: res.data[0].iospayrightsubmsg
          }
          that.setData({
            inrkkk: aaa
          })
        } else {
          var aaa = {
            kg: res.data[0].Androidpay,
            kgl: res.data[0].Androidleft,
            inr0: res.data[0].Androidpaymsg,
            inr1: res.data[0].Androidleftsubmsg,
            inr2: res.data[0].Androidrightsubmsg
          }
          that.setData({
            inrkkk: aaa
          })
        }
        if (res.data[0].readpoint == 0 || res.data[0].zt == 1) {
          that.setData({
            resdkg:1
          })
          that.startSetInter()
        }
				bgMusic = wx.createInnerAudioContext()
				//bug ios 播放时必须加title 不然会报错导致音乐不播放
				bgMusic.title = res.data[0].title  
				bgMusic.epname = res.data[0].title
				bgMusic.src = app.IPurl2+res.data[0].fileurl;
				//音频进入可以播放状态，但不保证后面可以流畅播放
		    bgMusic.onCanplay(() => {
		      bgMusic.duration //类似初始化-必须触发-不触发此函数延时也获取不到
		      setTimeout(function () {
		       //在这里就可以获取到大家梦寐以求的时长了
		        console.log(bgMusic.duration);//延时获取长度 单位：秒
						var duration = bgMusic.duration; 
						var max = parseInt(bgMusic.duration);
						var min1 = parseInt(max / 60);
						console.log(min1)
						var sec = max % 60;
						if (sec < 10) {
							sec = "0" + sec;
						};
						var ztime = min1 + ':' + sec;
						that.setData({
							duration:ztime,
							max: max,
							changePlay: true
						})
						
						bgMusic.onTimeUpdate(() => { 
						  //bgMusic.duration总时长  bgMusic.currentTime当前进度
						  console.log(bgMusic.currentTime)
						  var duration = bgMusic.duration; 
						  var offset = bgMusic.currentTime;  
							
						  var currentTime = parseInt(bgMusic.currentTime);
							// if(time>0&&that.data.fri){
							// 	offset =time
							// 	currentTime =time
							// }
							// console.log(currentTime)
						  var min = "0" + parseInt(currentTime / 60);
						  var max = parseInt(bgMusic.duration);
						  var sec = currentTime % 60;
						  if (sec < 10) {
						    sec = "0" + sec;
						  };
						  var starttime = min + ':' + sec;   /*  00:00  */
						  that.setData({
						    offset: currentTime,
						    starttime: starttime,
						    max: max,
						    changePlay: true
						  })
						})
						//播放结束
						bgMusic.onEnded(() => {
						  that.setData({
						    starttime: '00:00',
						    isOpen: false,
								fri:true,
						    offset: 0
						  })
						  console.log("音乐播放结束");
							bgMusic.stop()
						})
		      }, 100)  //这里设置延时1秒获取
		    })
				
				pageState1.finish()    // 切换为finish状态
			},
			fail() {
				 pageState1.error()    // 切换为error状态
			}
		})
	
	},
	onRetry(){
		this.getaudio()
	},
  // 播放
  listenerButtonPlay: function (time) {
    var that = this
		 bgMusic.play();
		// if(time>0&&that.data.fri){
		// 	bgMusic.seek(time);
		// 	that.setData({
		// 		fri:false
		// 	})
		// }else{
			var currentTime = parseInt(bgMusic.currentTime);
			bgMusic.seek(currentTime)
		// }
    
   
    that.setData({
      isOpen: true,
    })
  },
  //暂停播放
  listenerButtonPause(){
     var that = this
    bgMusic.pause()
    that.setData({
      isOpen: false,
    })
  },
  listenerButtonStop(){
    var that = this
    bgMusic.stop()
  },
  // 进度条拖拽
  sliderChange(e) {
    var that = this
    var offset = parseInt(e.detail.value);
			console.log(offset)
		// if(that.data.fri){
		// 	that.listenerButtonPlay(offset)
		// }else{
			bgMusic.play();
			bgMusic.seek(offset);
			that.setData({
			  isOpen: true,
			})
		// }
		
  },
  // 页面卸载时停止播放
  onUnload() {
    var that = this
    bgMusic.destroy()//销毁当前实例
		that.endSetInter()
    console.log("离开")
  },
	startSetInter: function(){
      var that = this;
      //将计时器赋值给setInter
      that.data.setInter = setInterval(
          function () {
              var numVal = that.data.num + 1;
              that.setData({ num: numVal });
              console.log('setInterval==' + that.data.num);
          }
    , 2000);   
  },
  endSetInter: function(){
      var that = this;
			console.log(that.data.num)
			if(that.data.num>1800){
				console.log('无效')
			}
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
	preAud(){
		let that=this
		if(that.data.details.previous_page!==''){
			console.log(that.data.details.previous_page)
      wx.navigateTo({
        url: '/pages/audio/audio?id=' + that.data.details.previous_page + '&catid=' + that.data.catid
      })
		}else{
			console.log('暂无更多')
		}
		
	},
	nextAud(){
		let that=this
		if(that.data.details.next_page!==''){
			console.log(that.data.details.next_page)
      wx.navigateTo({
        url: '/pages/audio/audio?id=' + that.data.details.next_page + '&catid=' + that.data.catid
      })
		}else{
			console.log('暂无更多')
		}
		
	},
  jump(e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })

    }
    
  },
})
