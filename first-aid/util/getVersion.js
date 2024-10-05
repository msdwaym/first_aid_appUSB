import {getAppInfo} from '../api/onLaunch.js';

function getVersion() {
    const systemInfo = uni.getSystemInfoSync();
    getAppInfo().then(res => {
        if (res.data.code === 200) {
            const appVersion = res.data.data.version;
            const appUrl = res.data.data.url;
            const forceUpdate = res.data.data.forceUpdate;

            if (appVersion !== systemInfo.appWgtVersion && forceUpdate === 1) {
                uni.setStorageSync('isCouldLogin', false);
                uni.showModal({
                    title: '版本更新',
                    content: '发现新版本，更新后才能正常登录，是否立即更新？',
                    showCancel: true,
                    confirmText: '立即更新',
                    cancelText: '取消',
                    success: function (res) {
                        if (res.confirm) {
                            // 用户确认更新，跳转到指定URL
                            //下载文档
                            uni.downloadFile({
                                url: appUrl, // 下载地址接口返回
                                success: (res) => {
                                    if (res.statusCode === 200) {
                                        // 文件保存到本地
                                        uni.saveFile({
                                            tempFilePath: res.tempFilePath, // 临时路径
                                            success: (saveRes) => {
                                                uni.showToast({
                                                    icon: 'none',
                                                    title: '下载成功：' + saveRes.savedFilePath, // 保存路径
                                                    duration: 2000
                                                });
                                                setTimeout(() => {
                                                    // 打开文档查看
                                                    uni.openDocument({
                                                        filePath: saveRes.savedFilePath,
                                                        success: (openRes) => {
                                                            console.log('打开文档成功');
                                                        },
                                                        fail: (openErr) => {
                                                            console.log('打开文档失败', openErr);
                                                        }
                                                    });
                                                }, 2000);
                                            }
                                        });
                                    }
                                },
                                fail: (err) => {
                                    console.log(err);
                                    uni.showToast({
                                        icon: 'none',
                                        title: '下载失败，请重新下载'
                                    });
                                },
                                onProgressUpdate: (progress) => {
                                    uni.showLoading({
                                        title: '下载中：' + progress.progress + '%'
                                    });
                                    if (progress.progress === 100) {
                                        uni.hideLoading();
                                    }
                                }
                            });

                        } else if (res.cancel) {

                        }
                    }
                });
            } else {
                // 版本一致，正常进入首页
                uni.setStorageSync('isCouldLogin', true);
            }
        } else {
            uni.showToast({
                title: 'Error:' + res.data.message,
                icon: 'none'
            });
        }
    }).catch(error => {
        console.error('获取版本信息出错', error);
        uni.showToast({
            title: '获取版本信息出错',
            icon: 'none'
        });
    });
}

export {
    getVersion
}