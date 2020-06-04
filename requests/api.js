//获取api-url 层
import api_url from './api-url.js'
import request from './request.js'
// 正式版

const API_BASE = 'https://www.jiujiangmm.com/';
// 测试版 121
// const API_BASE = 'http://smallapp-api.intra.wowdsgn.com/';
//  const API_BASE = 'http://47.103.35.9/';
  // const API_BASE = 'http://47.100.83.153/';

/**
 * 获取请求时URL
 * @returns {string}
 */
function getRequestURL(url) {
  return API_BASE + url;
}
// code换session
function post_code2Session(params, successCallback, errorCallback, completeCallback) {
  request.post(getRequestURL(api_url.API_code2SessionL), params, 'application/x-www-form-urlencoded', successCallback, errorCallback, completeCallback)
}
// 获取用户的基本信息
function login(params, successCallback, errorCallback, completeCallback) {
  request.post(getRequestURL(api_url.API_login), params, 'application/x-www-form-urlencoded', successCallback, errorCallback, completeCallback)
}
// 获取用户的操作记录
function post_operation(params, contentType,successCallback, errorCallback, completeCallback) {
  request.post(getRequestURL(api_url.API_operation), params, 'application/x-www-form-urlencoded', successCallback, errorCallback, completeCallback)
}
// 获取用户的维护记录
function post_maintenance(params, successCallback, errorCallback, completeCallback) {
  request.post(getRequestURL(api_url.API_maintenance), params, 'application/x-www-form-urlencoded', successCallback, errorCallback, completeCallback)
}
// 获取优惠券列表
function post_coupons(params, successCallback, errorCallback, completeCallback) {
  request.post(getRequestURL(api_url.API_coupons), params, 'application/x-www-form-urlencoded', successCallback, errorCallback, completeCallback)
}
module.exports = {
  post_code2Session: post_code2Session,
  login: login,
  post_operation: post_operation,
  post_maintenance: post_maintenance,
  post_coupons: post_coupons
};
