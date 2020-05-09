import axiosService from "./axios-request"; // 从axios-request.js内引入axiosService

// 下面是POST形式
export const  reqFairyShop  = data => {
  return axiosService({
    url: "https://test-bebot-api.baoxianxia.com.cn/common/show_my_shop/", // 根据实际接口地址来写
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