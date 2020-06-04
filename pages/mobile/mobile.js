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
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //授权手机号
  getPhoneNumber: function(e) {
    var that = this
    let id = e.currentTarget.id
    let name = e.currentTarget.dataset.item
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)


    console.log(cache.endUser.phoneNumber)

  
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny'){
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权手机号，将无法进入领取优惠券，请授权之后再领取!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }else{

      wx.login({

        success: res => {

          console.log(res);
          wx.getStorage({
            key: 'token',
            success: res => {
              let token = res.data
              console.log(token)
              wx.request({
                url: 'https://www.jiujiangmm.com/api/per/getAuthorizeData',
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  "token": token
                },
                data: {
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv,
                  sessionKey: app.globalData.session_key
                },
                success: res => {
                  console.log(res)
                  wx.setStorage({
                    key: 'endUser',
                    data: res.data.data.phoneNumber
                  })
                  cache.endUser = res.data
                  wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000,
                    success: function (ret) {
                      that.setData({
                        hasUserInfo: false
                      })
                      console.log(ret)
                      wx.redirectTo({
                        url: '/pages/home/home',
                      })
                    }
                  })
                },
              })

            }
          })

        }

      })
    }

  


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})