<script>
import { TagUtil } from './util/TagUtil';
import { TagUtilG1 } from './util/mechineG1/tagUtilG1';
import {getVersion} from './util/getVersion';
import store from './store';
import {initializeMachineModule} from '@/util/machine.js'
export default {
  data() {
	return {
	};
  },
  onLaunch: function () {
    console.log('App Launch');
	initializeMachineModule().then((res) => {
	  let tagUtil = null;
	  if(res=="MachineModule"){
		  tagUtil = new TagUtil();
	  }else{
		  tagUtil = new TagUtilG1()
	  }
	  tagUtil.init();
	  store.commit("setTagUtil", tagUtil);
	}).catch(error => {
	  console.error('Failed to initialize machine module:', error);
	});
  },
  onShow: function () {
    console.log('App Show');
    getVersion()
	const tagUtil = store.state.tagUtil
	tagUtil.init();
  },
  onHide: function () {
    console.log('App Hide');
	const tagUtil = store.state.tagUtil;
	tagUtil.destory(false);
  }
}
</script>

<style lang="scss">
@import "uview-plus/index.scss";
</style>
