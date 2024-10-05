"use strict";
const common_vendor = require("../common/vendor.js");
const api_onLaunch = require("../api/onLaunch.js");
function getVersion() {
  const systemInfo = common_vendor.index.getSystemInfoSync();
  api_onLaunch.getAppInfo().then((res) => {
    if (res.data.code === 200) {
      const appVersion = res.data.data.version;
      const appUrl = res.data.data.url;
      const forceUpdate = res.data.data.forceUpdate;
      if (appVersion !== systemInfo.appWgtVersion && forceUpdate === 1) {
        common_vendor.index.setStorageSync("isCouldLogin", false);
        common_vendor.index.showModal({
          title: "版本更新",
          content: "发现新版本，更新后才能正常登录，是否立即更新？",
          showCancel: true,
          confirmText: "立即更新",
          cancelText: "取消",
          success: function(res2) {
            if (res2.confirm) {
              common_vendor.index.downloadFile({
                url: appUrl,
                // 下载地址接口返回
                success: (res3) => {
                  if (res3.statusCode === 200) {
                    common_vendor.index.saveFile({
                      tempFilePath: res3.tempFilePath,
                      // 临时路径
                      success: (saveRes) => {
                        common_vendor.index.showToast({
                          icon: "none",
                          title: "下载成功：" + saveRes.savedFilePath,
                          // 保存路径
                          duration: 2e3
                        });
                        setTimeout(() => {
                          common_vendor.index.openDocument({
                            filePath: saveRes.savedFilePath,
                            success: (openRes) => {
                              console.log("打开文档成功");
                            },
                            fail: (openErr) => {
                              console.log("打开文档失败", openErr);
                            }
                          });
                        }, 2e3);
                      }
                    });
                  }
                },
                fail: (err) => {
                  console.log(err);
                  common_vendor.index.showToast({
                    icon: "none",
                    title: "下载失败，请重新下载"
                  });
                },
                onProgressUpdate: (progress) => {
                  common_vendor.index.showLoading({
                    title: "下载中：" + progress.progress + "%"
                  });
                  if (progress.progress === 100) {
                    common_vendor.index.hideLoading();
                  }
                }
              });
            } else if (res2.cancel)
              ;
          }
        });
      } else {
        common_vendor.index.setStorageSync("isCouldLogin", true);
      }
    } else {
      common_vendor.index.showToast({
        title: "Error:" + res.data.message,
        icon: "none"
      });
    }
  }).catch((error) => {
    console.error("获取版本信息出错", error);
    common_vendor.index.showToast({
      title: "获取版本信息出错",
      icon: "none"
    });
  });
}
exports.getVersion = getVersion;
