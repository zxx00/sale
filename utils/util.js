
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 判断目标是否是函数
 * @param {mixed} val
 * @returns {boolean}
 */
function isFunction(val) {
  return typeof val === 'function';
}

/**
 * 判断手机号格式是否正确
 * @param {mobile} 手机号
 * @returns {手机号}
 */
function checkMobile(mobile) {
  if (!(/^1[0-9][0-9]{9}$/.test(mobile))) {
    return false;
  } else {
    return true;
  }
}
/**
 * 替换手机格式中间几位为 *****
 * @param {mobile} 手机号
 * @returns {boolean}
 */
function formatPhone(phone) {
  if (typeof phone == 'number') {
    phone = phone.toString();
  }
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

//裁切图片
function clipimage(url, width) {
  if (typeof url == 'string' && url.indexOf('img.wowdsgn.com') >= 0) {
    if (url.indexOf('?') >= 0) {
      return url + '&imageMogr2/strip/thumbnail/' + width + 'x'
    } else {
      return url + '?imageMogr2/strip/thumbnail/' + width + 'x'
    }
  } else {
    return url
  }
}
function rpx2px(rpx) {
  var res = wx.getSystemInfoSync()
  let pixelRatio = res.pixelRatio
  let windowWidth = res.windowWidth
  return rpx * pixelRatio * windowWidth / 750
}
function px2rpx(px) {
  var res = wx.getSystemInfoSync()
  let pixelRatio = res.pixelRatio
  let windowWidth = res.windowWidth
  return px * 750 / (pixelRatio * windowWidth)
}
function alertNetworkError(data) {
  if (data.resCode == 40501 || data.resCode == 40502 || data.resCode == 40505 || data.resCode == 40507 || data.resCode == 40508 || data.resCode == 40511 || data.resCode == 40437 || data.resCode == 40438 || data.resCode == 40510) {
    return false
  } else {
    return true
  }
}
module.exports = {
  isFunction: isFunction,
  checkMobile: checkMobile,
  formatPhone: formatPhone,
  debug: true,
  formatTime: formatTime,
  clipimage: clipimage,
  rpx2px: rpx2px,
  px2rpx: px2rpx,
  alertNetworkError: alertNetworkError,
}
