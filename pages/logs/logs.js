// pages/logs/logs.js
//获取应用实例
var requests = require('../../requests/api.js');
let cache = require('/../../utils/cache.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 授权微信
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      // debugger
      wx.getStorage({
        key: 'openId',
        success: function (res) {
          var openid = res.data
          console.log('取出缓存openId' + openid)
          // 获取用户的基本信息
          wx.request({
            url: 'https://www.jiujiangmm.com/pub/login/userAuthorizeLogin',
            method: "POST",
            data: {
              avatarUrl: e.detail.userInfo.avatarUrl,
              city: e.detail.userInfo.city,
              country: e.detail.userInfo.country,
              gender: e.detail.userInfo.gender,
              language: e.detail.userInfo.language,
              nickName: e.detail.userInfo.nickName,
              openId: openid,
              province: e.detail.userInfo.province
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              console.log(res)
              wx.setStorage({
                key: 'token',
                data: res.data.data.token,
              })
              wx.redirectTo({
                url: '/pages/home/home',
              })
            }
          })
        },
      })

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})