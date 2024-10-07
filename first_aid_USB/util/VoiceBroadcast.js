

const SixUniTts = uni.requireNativePlugin("SmallSix-SixUniTts")
SixUniTts.initSixUniTts()
function voiceBroadcast(text){
	SixUniTts.stop()
	SixUniTts.setSpeechRate({rate:'1.0f'})
	SixUniTts.startSpeech({ speechText: text })
}
function stopVoice(){
	SixUniTts.stop()
	SixUniTts.destroy()
}

export {voiceBroadcast,stopVoice}
