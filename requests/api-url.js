// 接口page
const API_V1 = 'pub/login/';
const API_V2 = 'api/ope/';
const API_V3 = 'api/ser/';
const API_V4 = 'api/per/';
// 接口地址
export default {
  
  API_code2SessionL: API_V1 + "getAuthorizeData", //授权登录
  API_login: API_V1 + "userAuthorizeLogin",  //获取用户的基本信息
  API_operation: API_V2 + "getOperateRecordList", //用户的操作记录
  API_maintenance: API_V3 + "getServiceRecordList", //获取用户的操作记录
  API_getPhoneNumber: API_V4 + "getAuthorizeData",  //获取手机号
  API_coupons: API_V1 + "getCouponPromotionsList" //获取优惠券列表
}