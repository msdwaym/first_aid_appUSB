<script>
import { TagUtil } from './util/TagUtil';
import {getVersion} from './util/getVersion';
import store from './store';

export default {
  onLaunch: function () {
    console.log('App Launch');
	const tagUtil = new TagUtil();
	tagUtil.init();
	store.commit("setTagUtil", tagUtil);
  },
  onShow: function () {
    console.log('App Show');
    getVersion()
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
