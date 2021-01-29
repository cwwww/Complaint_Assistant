import axiosService from "./axios-request"; // 从axios-request.js内引入axiosService
// const BASE = 'https://test-bebot-api.baoxianxia.com.cn'
const BASE = 'http://127.0.0.1:8000'
// 下面是POST形式 





export const reqRobotHistory = data => {
  return axiosService({
    url: BASE + `/common/ansRobotHistory/`,  // 代理人机器人对话历史接口
    method: "post",
    data
  });
};
export const sendResponse = data => {
  return axiosService({
    url: BASE + `/common/sendResponse/`, // get response from backend
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