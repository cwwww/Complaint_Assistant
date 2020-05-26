import axiosService from "./axios-request"; // 从axios-request.js内引入axiosService
const BASE = 'https://test-bebot-api.baoxianxia.com.cn'
// 下面是POST形式 
export const reqlogin = data => {  
  return axiosService({
    url: BASE + `/common/msm/login/`, // 登录
    method: "post",
    data
  });
};
export const reqsendMsmCode = data => {  
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/sendMsmCode/", // 发送短信
    method: "post",
    data
  });
};
export const reqloginMsmCode = data => {  
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/login/", // 验证短信
    method: "post",
    data
  });
};
export const reqwxconfig = data => {  
  return axiosService({
    url: "http://api-bebot.baoxianxia.com.cn/api/callback/wxconfig/bebot/", // Bebot微信分享接口
    method: "post",
    data
  });
};
export const reqbebotCode = data => {  
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/callback/bebot/code/", // Bebot获取微信用户信息接口
    method: "post",
    data
  });
};
export const reqHomeInit = data => {  
  return axiosService({
    url: BASE + `/common/homeInitializer/`, // 主页初始化接口
    method: "post",
    data
  });
};
export const reqVisitedInit = data => {  
  return axiosService({
    url: BASE + `/common/showVisitedRobotInfo/`, // 展示访客页被访机器人信息
    method: "post",
    data
  });
};
export const reqMyShop = data => {
  return axiosService({
    url: BASE + `/common/show_my_shop/`, // 显示精灵商店信息
    method: "post",
    data
  });
};
export const reqPutOnShelves = data => {
  return axiosService({
    url: BASE + `/common/put_on_shelves/`, // 商品下架接口
    method: "post",
    data
  });
};
export const reqPutOffShelves = data => {
  return axiosService({
    url: BASE + `/common/put_off_shelves/`, // 商品下架接口
    method: "post",
    data
  });
};
export const reqShowHistory = data => {  
  return axiosService({
    url: BASE + `/common/show_sales_history/`, // 显示出售记录接口
    method: "post",
    data
  });
};
export const reqShowvipStore = data => {
  return axiosService({
    url: BASE + `/common/show_vip_store/`, // 显示会员商店接口
    method: "post",
    data
  });
};
export const reqGetvip = data => {  
  return axiosService({
    url: BASE + `/common/get_vip/`, //  领取会员接口
    method: "post",
    data
  });
};
export const reqBuyvipGoods = data => {  
  return axiosService({
    url: BASE + `/common/buy_vip_goods/`, //  会员商店购买商品接口
    method: "post",
    data
  });
};



export const reqFairyShop = data => {
  return axiosService({
    url: BASE + `/common/show_his_shelf/`, // 精灵商店买家
    method: "post",
    data
  });
};
export const reqstarRating = data => {  
  return axiosService({
    url: BASE + `/common/star_rating/`, // 精灵商店买家评价接口
    method: "post",
    data
  });
};
export const reqFairyBuy = data => {  
  return axiosService({
    url: BASE + `/common/buy/`, // 精灵商店买家购买接口
    method: "post",
    data
  });
};
export const reqRobotHistory = data => { 
  return axiosService({
    url: BASE + `/common/ansRobotHistory/`,  // 代理人机器人对话历史接口
    method: "post",
    data
  });
};
export const reqRobotDetail = data => {  
  return axiosService({
    url: BASE + `/common/ansRobotDetail/`, // 代理人机器人对话详情
    method: "post",
    data
  });
};	
export const reqChathist = data => {
  return axiosService({
    url: BASE + `/common/pub2square/chathist_page/`, // 聊天记录页发布到问答广场
    method: "post",
    data
  });
};
export const reqLookMe = data => {  
  return axiosService({
    url: BASE + `/common/myVisitors/`, // 谁看过我
    method: "post",
    data
  });
};	
export const reqCusayrob = data => {  
  return axiosService({
    url: BASE + `/common/cusayrob/`, // 访客用户机器人对话接口
    method: "post",
    data
  });
};	
export const reqDialogAgent = data => {
  return axiosService({
    url: BASE + `/common/dialogHistory_agent/`, // AC聊天记录获取-代理人
    method: "post",
    data
  });
};
export const reqHistoryCustomer = data => {
  return axiosService({
    url: BASE + `/common/dialogHistory_customer/`, // AC聊天记录获取-访客
    method: "post",
    data
  });
};
export const reqCustomerInput = data => {
  return axiosService({
    url: BASE + `/common/customerInput/`, // AC聊天-访客输入接口
    method: "post",
    data
  });
};
export const reqAgentInput = data => {
  return axiosService({
    url: BASE + `/common/agentInput/`, // AC聊天-代理人输入接口
    method: "post",
    data
  });
};
export const reqShowList = data => {
  return axiosService({
    url: BASE + `/common/show_kb_list/`, // 显示知识库列表
    method: "post",
    data
  });
};
export const reqEnable_kb = data => {
  return axiosService({
    url: BASE + `/common/enable_kb/`, // 启用知识库接口
    method: "post",
    data
  });
};
export const reqDisable_kb = data => {
  return axiosService({
    url: BASE + `/common/disable_kb/`, // 停用知识库接口
    method: "post",
    data
  });
};
export const reqReceive_official_kb = data => {
  return axiosService({
    url: BASE + `/common/receive_official_kb/`, // 领取官方知识库接口
    method: "post",
    data
  });
};
export const RanlingDatas = data => {
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/globalRank/", // 全球排行
    method: "post",
    data 
  });
};

export const RanlingDatasQi = data => {
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/fansRank/", // 人气排行
    method: "post",
    data 
  });
};

export const RanlingDatasFriend = data => {
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/friendsRank/", // 好友排行
    method: "post",
    data 
  });
};

// 每日任务
export const getTaskList = data => {
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/dailyTaskList/", // 好友排行
    method: "post",
    data 
  });
};

export const freandaList = data => { // 好友列表
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/friendsList/", // 好友排行
    method: "post",
    data 
  });
};

export const BeanList = data => { // 粉丝列表
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/followerList/", // 粉丝排行
    method: "post",
    data 
  });
};

export const guanZhu = data => { // 关注/取消关注
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/followRobot/", 
    method: "post",
    data 
  });
};

export const yaoQing = data => { // 邀请好友页面
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/recommendlist/", 
    method: "post",
    data 
  });
};

// 下面是GET形式
// export const userInfo = params => {
//   return axiosService({
//     url: "/xxxx/user/xxxx", // 根据实际接口地址来写
//     method: "get",
//     params
//   });
// };