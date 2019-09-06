//logs.js
var pageState = require('../../utils/pageState/index.js')
const util = require('../../utils/util.js')

const app = getApp()
Page({
  data: {
    banner:[],
    num: 0,
    wsp: [], //微视频
    wyp:[], //微音频
    wyc: [], //微原创
    arr1: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    title: ['微杂志', '微原创', '微音频', '微视频'],
    catidz: [8, 21, 9, 16],
    page: [1, 1, 1, 1]
  },
  onLoad: function(option) {
    // console.log(option.type)
    this.getbanner()
    if (option.type){
     this.setData({
       num: option.type
     })
      wx.setNavigationBarTitle({
        title: this.data.title[option.type],
      })
   }
   
    // wx.createSelectorQuery().selectAll('.tabSwiper').boundingClientRect(function (rect) {
    // 		console.log(rect[0].height)
    // 		console.log(rect[0].width)
    // }).exec()  
    if (option.type == 3) {
      this.getvideo()
      return
    } else if (option.type == 2) {
      this.getyinpin()
      return
    } else if (option.type == 1) {
      this.getyuanchuang()
      return
    }
    this.getlist(this.data.catidz[option.type], 1, option.type)
  },
  onShow() {
    // wx.showTabBar();
  },
  getvideo() {
    const pageState1 = pageState.default(this)
    pageState1.loading() // 切换为loading状态
    let that = this
    // const pageState1 = pageState.default(this)
    // pageState1.loading()    // 切换为loading状态
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=tushutuijian
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=shipinchaxun',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        pageState1.finish() // 切换为finish状态
        console.log(res.data)
        if(res.data!=0){
          that.setData({
            wsp: res.data
          })
        }
        // pageState1.finish()    // 切换为finish状态
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
  getbanner(){
    var that =this
    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=listbanner',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        
        console.log(res.data)
        if (res.data[0].bankuan) {
          var arr=[]
          var imgs = res.data
          for (var i in imgs) {
            if (imgs[i].bankuan == '微杂志') {
              arr[0] = imgs[i].lists[0].banner
            }
            if (imgs[i].bankuan == '微原创') {
              arr[1] = imgs[i].lists[0].banner
            }
            if (imgs[i].bankuan == '微音频') {
              arr[2] = imgs[i].lists[0].banner
            }
            if (imgs[i].bankuan == '微视频') {
              arr[3] = imgs[i].lists[0].banner
            }
          }
          that.setData({
            banner: arr
          })
        }else{
          wx.showToast({
            title: '获取失败',
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
  getyinpin() {
    const pageState1 = pageState.default(this)
    pageState1.loading() // 切换为loading状态
    let that = this

    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=yinpinchaxun',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        pageState1.finish() // 切换为finish状态
        console.log(res.data)
        if (res.data != 0) {
          that.setData({
            wyp: res.data
          })
        }
        // pageState1.finish()    // 切换为finish状态
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
  getyuanchuang() {
    const pageState1 = pageState.default(this)
    pageState1.loading() // 切换为loading状态
    let that = this

    wx.request({
      url: app.IPurl2 + '/index.php?m=content&c=index&a=yuanchuangchaxun',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        pageState1.finish() // 切换为finish状态
        console.log(res.data)
        if (res.data != 0) {
          that.setData({
            wyc: res.data
          })
        }
        // pageState1.finish()    // 切换为finish状态
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

  getlist(catid, page, type) {
    let that = this
    const pageState1 = pageState.default(that)
    pageState1.loading() // 切换为loading状态
    var geturl
    // if (catid == 8) {
      geturl = app.IPurl1 + '?m=content&c=index&a=nianfen'
    // } else {
    //   geturl = app.IPurl1 + '?m=content&c=index&a=lists&catid=' + catid + '&page=' + page
    // }
    wx.request({
      //http://sf.zgylbx.com/index.php?m=content&c=index&a=nianfen
      url: geturl,
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {

        that.data.list0 = res.data
        that.setData({
          list0: that.data.list0
        })
      
        
        pageState1.finish() // 切换为finish状态
      },
      fail() {
        pageState1.error() // 切换为error状态
      }
    })
  },
  //点击切换
  tab(e) {
    let that = this
    // console.log(e.currentTarget.dataset.index)
    let type = e.currentTarget.dataset.index
    if (type == that.data.num) {
      return
    }
    if (type == 3) {
      this.getvideo()
    } else if (type == 2) {
      this.getyinpin()
    } else if (type == 1) {
      this.getyuanchuang()
    }else{
      that.getlist(that.data.catidz[type], that.data.page[type], type)
    }
    that.setData({
      num: type
    })
    wx.setNavigationBarTitle({
      title: that.data.title[that.data.num],
    })
    console.log(type)

    // 
  },
  //滑屏切换
  /*aa(e){
		let that =this
		console.log(e.detail.current)
		let type=e.detail.current
		that.setData({
			num:e.detail.current
		})
    wx.setNavigationBarTitle({
      title: that.data.title[that.data.num],
    })
		that.getlist(that.data.catidz[type],that.data.page+type,type)
	},*/
  jump(e) {
    let year = e.currentTarget.dataset.year
    let name = e.currentTarget.dataset.name
    let id = e.currentTarget.dataset.id
    let data1 = e.currentTarget.dataset.data1
    data1 = JSON.stringify(data1)
    wx.navigateTo({
      url: '/pages/magazineMonthly/magazineMonthly?year=' + year + '&name=' + name + '&id=' + id + '&data1=' + data1
    })
  },
  jumpdt(e) {
    let id = e.currentTarget.dataset.id
    let catid = e.currentTarget.dataset.catid
    let type = e.currentTarget.dataset.type
    console.log(type)
    let url1
    if (type == 1) {
      url1 = '/pages/magazineDatails/magazineDatails?id=' + id + '&catid=' + catid
    } else if (type == 2) {
      url1 = '/pages/audio/audio?id=' + id + '&catid=' + catid
    } else if (type == 3) {
      url1 = '/pages/magazineDatails/magazineDatails?id=' + id + '&catid=' + catid
    }
    wx.navigateTo({
      url: url1
    })
  },
  jumpmore(e) {
    let catid = e.currentTarget.dataset.catid
    let mk = e.currentTarget.dataset.mk
    if(catid==16){
      wx.navigateTo({
        url: '/pages/splist/splist?catid=' + catid +'&bankuan='+mk
      })
    }else{
      wx.navigateTo({
        url: '/pages/splist/splist?catid=' + catid + '&bankuan=' + mk
      })
    }
    
  },
  govideo(e) {
    console.log(e.currentTarget.dataset.id)
    var catid = e.currentTarget.dataset.catid
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/spplay/spplay?catid=' + catid + '&id=' + id,
    })
  },
  // 点击键盘上的搜索
  bindconfirm: function (e) {
    var that = this;
    // var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('e.detail.value', e.detail.value)
    if (e.detail.value == '') {
      return
    }
    wx.navigateTo({
      url: '/pages/sousuo/sousuo?sousuo=sousuo&sr=' + e.detail.value + '&type=' + that.data.num
    })
  },
  formSubmit(e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.sr == '') {
      return
    }
    wx.navigateTo({
      url: '/pages/sousuo/sousuo?sousuo=sousuo&sr=' + e.detail.value.sr + '&type=' + that.data.num
    })
  },
  jiazai() {
    var that = this
    console.log(that.data.num)
    var typenum = that.data.num
    that.getlistxl(that.data.catidz[typenum], that.data.page[typenum], typenum)
  }
})
/*let test=`[{
	"title": "偶像练习生 - Ei Ei (Live)",
	"url": "/index.php?m=content&c=index&a=show&catid=9&id=3",
	"mp3": {
		"0": {
			"fileurl ": "/uploadfile/2019/0515/20190515074132396.mp3",
			"filename ": "偶像练习生 - Ei Ei (Live)"
		}
	},
	"zuozhe": "Ei Ei",
	"readpoint": "10",
	"inputtime": "05-15"
}, {
	"title": "火箭少女101段奥娟 - 陪我长大",
	"url": "/index.php?m=content&c=index&a=show&catid=9&id=2",
	"mp3": {
		"0": {
			"fileurl ": "/uploadfile/2019/0515/20190515074049925.mp3",
			"filename ": "火箭少女101段奥娟 - 陪我长大"
		}
	},
	"zuozhe": "火箭少女",
	"readpoint": "5",
	"inputtime": "05-15"
}, {
	"title": "火箭少女101 - 卡路里",
	"url": "/index.php?m=content&c=index&a=show&catid=9&id=1",
	"mp3": {
		"0": {
			"fileurl ": "/uploadfile/2019/0515/20190515074005141.mp3",
			"filename ": "火箭少女101 - 卡路里 "
		}
	},
	"zuozhe": "张勇",
	"readpoint": "1",
	"inputtime": "05-15"
}]`*/