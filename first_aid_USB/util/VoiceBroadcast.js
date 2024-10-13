

const SixUniTts = uni.requireNativePlugin("SmallSix-SixUniTts")
try{
	SixUniTts.initSixUniTts()
	console.log("语音初始化");
}catch(e){
	console.error(e)
}
function voiceBroadcast(text){
	try{
		console.log(text);
		SixUniTts.stop()
		SixUniTts.setSpeechRate({rate:'1.0f'})
		SixUniTts.startSpeech({ speechText: text })
	}catch(e){
		console.error(e);
	}
}
function stopVoice(){
	SixUniTts.stop()
	console.log("语音停止");
	// SixUniTts.destroy()
}

export {voiceBroadcast,stopVoice}