<template>  
  <view>  
    <button @click="toggleAudioMode">开始</button>  
  </view>  
</template>  
  
<script>  
import { TagUtil } from "../../util/TagUtil";  
import { TagScanAgent } from "../../util/agent/TagScanAgent.js";  
  
export default {  
  data() {  
    return {  
      tagUtil: null,  
      tagScanAgent: null,  
    };  
  },  
  mounted() {
    this.tagUtil = new TagUtil();  
    this.tagScanAgent = new TagScanAgent(this.tagUtil);  
    this.tagScanAgent.setCallBackFn();
    this.tagUtil.init();
    this.setupKeyDownListener();
	this.tagUtil.start1()
  },
  methods: {  
    toggleAudioMode() {
    },  
    setupKeyDownListener() {
      this.tagScanAgent.setKeyDownListener1(toggleAudioMode);
    },  
  },  
};  
</script>  
  
<style scoped>  
button {  
  margin: 20px;  
  padding: 10px;  
  background-color: #0081ff;  
  color: white;  
  border-radius: 5px;  
}  
</style>