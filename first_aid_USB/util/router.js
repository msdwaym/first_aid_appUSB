import { errorEnum } from "@/common/enum/enum";

export function Return() {
    if (getCurrentPages().length === 1) {
        uni.switchTab({
            url: '/pages/index/index',
            fail: function () {
                uni.showToast({
                    title: errorEnum.JUMP,
                    icon: 'error',
                })
            }
        })
        return;
    }
    uni.navigateBack()
}

// 跳转到homepage
export function ReturnHomepage() {
    uni.switchTab({
    	url:'/pages/homepage/homepage',
		fail: function () {
		    uni.showToast({
		        title: errorEnum.JUMP,
		        icon: 'error',
		    })
		}
    })
}