import api_url from './api-url.js'
var util = require('../utils/util.js');
let cache = require('../utils/cache.js');
var app = getApp()

// Get请求
function getReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  return requestMethod(url, params, "GET", contentType, successCallback, errorCallback, completeCallback)
}
// Post请求
function postReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "POST", contentType, successCallback, errorCallback, completeCallback)
}
// Put请求
function putReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "PUT", contentType, successCallback, errorCallback, completeCallback)
}
// Delete请求
function deleteReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "DELETE", contentType, successCallback, errorCallback, completeCallback)
}
// Head请求
function headReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "HEAD", contentType, successCallback, errorCallback, completeCallback)
}
// Options请求
function optionsReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "OPTIONS", contentType, successCallback, errorCallback, completeCallback)
}
// Trace请求
function traceReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "TRACE", contentType, successCallback, errorCallback, completeCallback)
}
// Connect请求
function connectReq(url, params, contentType, successCallback, errorCallback, completeCallback) {
  requestMethod(url, params, "CONNECT", contentType, successCallback, errorCallback, completeCallback)
}

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param params {object} 请求参数
 * @method method {method} 参数为请求方法对应的 字符串
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestMethod(url, params, methodstr, contentType, successCallback, errorCallback, completeCallback) {
  if (util.debug) {
    console.log('requestData url - ' + methodstr + ':' + url);
    console.log('requestData url - params: ', JSON.stringify(params));
    console.log('requestData token: ', cache.endUser.token);
  }

  var systemInfo = ""
  var platformCode = 5
  try {
    systemInfo = wx.getSystemInfoSync()
    if (systemInfo.platform == "ios") {
      platformCode = 5
    } else {
      platformCode = 6
    }
  } catch (e) { }
  wx.showLoading({
    title: '加载中',
  })
  // debugger
  return wx.request({
    url: url,
    method: methodstr,
    data: params,
    header: {
      'Content-Type': contentType,
      "token": cache.endUser.token,
      "X-WOW-SAPP-DT": '',
      "X-WOW-SAPP-CH": platformCode
    },
    success: function (res) {
      wx.hideLoading();
      if (util.debug) {
        console.log('json数据==' + JSON.stringify(res.data));
      }
      wx.hideLoading();
      if (res.data.code === "0000") {
        util.isFunction(successCallback) && successCallback(res.data);

      } else {

        // wx.showToast({
        //   title: res.data.msg,
        //   duration: 2000,
        //   success: function () {
          
        //   }
        // })
        wx.hideLoading();
        util.isFunction(errorCallback) && errorCallback(res.data);
      }
    },
    error: function (res) {
      wx.hideLoading();
      if (util.debug) {
        console.log('请求失败：==' + res);
      }
      util.isFunction(errorCallback) && errorCallback();
    },
    complete: function (res) {
      wx.hideLoading();
      util.isFunction(completeCallback) && completeCallback();
    },

  });
}

module.exports = {
  get: getReq,
  post: postReq,
  put: putReq,
  head: headReq,
  delete: deleteReq,
  options: optionsReq,
  trace: traceReq,
  connect: connectReq,
};