/* 全局报错提示 */
const errorEnum = {
    JUMP:"跳转失败",
    LOAD:"本地加载失败",
    NET_WORK:"网路异常",
    LOGIN:"登录失效",
    NONE:"输入值不能为空",
    CACHE_NONE:"缓存失效，请重新进入",
    MAX_SIZE:"输入文件最大\n不能超过100M",
}


/* 导航栏 */
const navEnum = {
    EVENT_FILTER:"事件过滤器",

    TITLE:"主题/标题",

	register:"用户注册",

	medicalTrolleyInfo:"急救车信息",

	medicalTrolley:"急救车",

	materiralInfo:"物资信息",

	takeStock:"盘点情况",

	materialUsed:"物资使用记录",

	userInfo:"个人信息",

	report:"报表",

	feedback:"反馈",

	reviseInfo:"信息修改",

    labelRecords:"标签初始化记录",

	medicalTrolleyRecord:"急救车登记",

	reportDetail:"盘点详情",

    /* 加载中 */
    DATA_LOADING:"数据构造中",
};



const settingsEnum = {
    NICKNAME:"昵称",
    ACCOUNT:"账号",
    CHANGE_PASSWORD:"修改密码",
    SYSTEM_MESSAGE:"系统通知",
    RECEIVE_MESSAGE:"接收消息并通知",
    SOUND_SWITCH:"音效开关",
    NEED_HELP:"需要帮助",
    OTHER_SETTING:"其他设置",
    ACCOUNT_SWITCH:"切换账号",
    LOGOUT:"退出登录",
    EDIT_AVATAR:"设置头像",
};
/* 物资使用情况*/
const materialEnum = {
	materialUseNum:"用量",//物资使用量
	materialRemainingNum:"剩余",//物资剩余量
};
export {errorEnum,navEnum,settingsEnum,materialEnum};
