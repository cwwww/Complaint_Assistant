import axiosService from "./axios-request"; // 从axios-request.js内引入axiosService
const BASE = 'https://test-bebot-api.baoxianxia.com.cn'
// 下面是POST形式
export const  reqHomeInit  = data => {  
  return axiosService({
    url: BASE + `/common/homeInitializer/`, // 主页初始化接口
    method: "post",
    data
  });
};
export const  reqFairyShop  = data => {
  return axiosService({
    url: BASE + `/common/show_his_shelf/`, // 精灵商店买家
    method: "post",
    data
  });
};
export const  reqstarRating  = data => {  
  return axiosService({
    url: BASE + `/common/star_rating/`, // 精灵商店买家评价接口
    method: "post",
    data
  });
};
export const  reqFairyBuy  = data => {  
  return axiosService({
    url: BASE + `/common/buy/`, // 精灵商店买家购买接口
    method: "post",
    data
  });
};
export const  reqRobotHistory  = data => { 
  return axiosService({
    url: BASE + `/common/ansRobotHistory/`,  // 代理人机器人对话历史接口
    method: "post",
    data
  });
};
export const  reqRobotDetail  = data => {  
  return axiosService({
    url: BASE + `/common/ansRobotDetail/`, // 代理人机器人对话详情
    method: "post",
    data
  });
};	
export const  reqChathist  = data => {
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
// 下面是GET形式
// export const userInfo = params => {
//   return axiosService({
//     url: "/xxxx/user/xxxx", // 根据实际接口地址来写
//     method: "get",
//     params
//   });
// };