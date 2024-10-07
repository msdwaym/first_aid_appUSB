//播放音频
export function createAudioPlayer(src) {  
    const innerAudioContext = uni.createInnerAudioContext();  
  
    innerAudioContext.autoplay = false; // 不建议设置 autoplay 为 true，因为许多浏览器限制了自动播放  
    innerAudioContext.src = src;  
    innerAudioContext.onPlay(() => {  
		setTimeout(()=>{
			innerAudioContext.destroy()
		},500)
    });  
  
    innerAudioContext.onError((res) => {  
        console.error(res);  
    });  
  
    return {  
        play: function() {  
            innerAudioContext.play()
        },  
        pause: function() {  
            innerAudioContext.pause();  
        },  
        stop: function() {  
            innerAudioContext.stop();  
        },  
        // 可以根据需要添加更多方法，如设置音量、当前时间等  
    };  
}