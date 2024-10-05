### 注意事项
样式上使用了scss, vue2&vue3都可使用, 多平台适用, 可自行根据dom位置调整提示方向和调整画面滚动至操作位置, 滚动使用官方的uni.pageScrollTo。  
所有插件项目上随意使用, 但请勿复制重新发至插件市场！

### 扫码预览
![image](https://masteryi-localhost.oss-cn-hangzhou.aliyuncs.com/uni-app/yi-step-tip.png)

### 使用示例
```
<template>
	<view class="content">
		<view class="target target-1" style="position: absolute; left: 0; top: 10%;">步骤一</view>
		<view class="target target-2" style="position: absolute; right: 0; top: 55%;">步骤二</view>
		<view class="target target-3" style="position: absolute; right: 0; bottom: 10%;">步骤三</view>
		<view class="target target-4" style="position: absolute; right: 0; top: 30%;">步骤四</view>
		<yi-step-tip ref="step" :steps="steps"></yi-step-tip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				steps: [
					{
						class: '.target-1',
						text: '操作一：你好，这是第一次提示。'
					},
					{
						class: '.target-2',
						text: '操作二：你好，这是第二次提示。'
					},
					{
						class: '.target-3',
						text: '操作三：你好，这是第三次提示。'
					},
					{
						class: '.target-4',
						text: '操作四：点击完成按钮，结束操作提示。'
					},
				]
			};
		},
		onReady() {
			// 切记组件树以挂载后调用, 如有动态内容会改变页面结构 则等加载后 $nextTick 再触发
			this.$refs.step.start() 
		},
		methods: {
			
		}
	};
</script>

<style lang="scss">
	.content {
		position: relative;
		height: 150vh;
	}

	.target {
		width: 100px;
		height: 100px;
		background-color: #409EFF;
		color: #FFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
```

### 参数
| 属性           | 类型      | 说明                                    | 默认值  |
|--------------|---------|---------------------------------------|------|
| steps        | array   | { class: '独立的类名或id', text: '提示内容' }[] | []   |
| width        | number  | 提示框宽度 单位rpx                           | 300  |
| spacing      | number  | 提示框距离dom的间距 单位px                      | 5    |
| nextText     | string  | 下一步的文字                                | 下一步  |
| completeText | string  | 完成的文字                                 | 教学完成 |


### 个人博客
博客地址：[https://www.masteryi.cn](https://www.masteryi.cn) (近期忙着自己的事业打理的少，稳定后会持续更新各类插件与文章上去，求关注)


