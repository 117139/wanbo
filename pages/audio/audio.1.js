const bgMusic = wx.getBackgroundAudioManager()
const app = getApp()
 
Page({
  data: {
		fri:true,
		tmore:true,
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '06:41',   //总时长
    src:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
  },
	onLoad(){
		this.listenerButtonStop()//停止播放
		var that = this
		//bug ios 播放时必须加title 不然会报错导致音乐不播放
		bgMusic.title = '此时此刻'  
		bgMusic.epname = '此时此刻'
		bgMusic.src = that.data.src;
 
		setTimeout(()=>{
				console.log(bgMusic.duration)//2.795102
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
		},1000)
		
	},
	more(){
		this.setData({
			tmore:false
		})
	},
  // 播放
  listenerButtonPlay: function (time) {
    var that = this
    //bug ios 播放时必须加title 不然会报错导致音乐不播放
    bgMusic.title = '此时此刻'  
    bgMusic.epname = '此时此刻'
    bgMusic.src = that.data.src;
    bgMusic.onTimeUpdate(() => { 
      //bgMusic.duration总时长  bgMusic.currentTime当前进度
      console.log(bgMusic.currentTime)
      var duration = bgMusic.duration; 
      var offset = bgMusic.currentTime;  
			
      var currentTime = parseInt(bgMusic.currentTime);
			if(time>0&&that.data.fri){
				offset =time
				currentTime =time
			}
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
				fri:false,
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
    })
    bgMusic.play();
		if(time>0&&that.data.fri){
			console.log(time)
			bgMusic.play();
			bgMusic.seek(time);
			that.setData({
				fri:false
			})
		}
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
		if(that.data.fri){
			that.listenerButtonPlay(offset)
		}else{
			bgMusic.play();
			bgMusic.seek(offset);
			that.setData({
			  isOpen: true,
			})
		}
		
  },
  // 页面卸载时停止播放
  onUnload() {
    var that = this
    that.listenerButtonStop()//停止播放
    console.log("离开")
  },
})
