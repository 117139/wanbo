const app = getApp()
 
var pageState = require('../../utils/pageState/index.js')
let bgMusic;
Page({
  data: {
		setInter:'',//计时器
		num:0,//阅读时间
		readpoint:0,
		details:'',
		fri:true,
		tmore:true,
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '00:00',   //总时长
    src:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
  },
	onLoad(option){
		this.getaudio(option.catid,option.id)
		// console.log(option.readpoint)
	},
	onReady(){
		console.log('ready')
		this.startSetInter()
	},
	more(){
		this.setData({
			tmore:false
		})
	},
	danzan(){
		console.log('danzan')
	},
	getaudio(catid,id){
		console.log('get')
		const pageState1 = pageState.default(this)
		pageState1.loading()    // 切换为loading状态
		var that = this
		//m=content&c=index&a=show&catid=9&id=3
		wx.request({
			url:  app.IPurl1+'?m=content&c=index&a=show&catid='+catid+'&id='+id,
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
				that.setData({
					details:res.data[0],
					src:app.IPurl2+res.data[0].fileurl
				})
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
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter)
  },
	preAud(){
		let that=this
		if(that.data.details.previous_page!==''){
			console.log(that.data.details.previous_page)
		}else{
			console.log('暂无更多')
		}
		
	},
	nextAud(){
		let that=this
		if(that.data.details.next_page!==''){
			console.log(that.data.details.next_page)
		}else{
			console.log('暂无更多')
		}
		
	}
})
