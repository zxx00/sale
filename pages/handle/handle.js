// pages/handle/handle.js
var requests = require('../../requests/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    lists:false,
    userinfos: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
     wx.showLoading({
      title: '加载中',
    })
    // 获取用户的头像
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userinfos: false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          userinfos: false
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            userinfos: false
          })
        }
      })
    }
    wx.hideLoading();
    wx.getStorage({
      key: 'openId',
      success: res => {
        console.log(res)
        let openId = res.data
        // 获取用户的信息
        wx.request({
          url: 'https://www.jiujiangmm.com/pub/login/getUserData',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            openId: openId
          },
          success: res => {
            console.log(res.data.data.phone)
            let token = res.data.data.token
            console.log(res.data.data.token)
            wx.request({
              url: 'https://www.jiujiangmm.com/api/ope/getOperateRecordList',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': token
              },
              data: {
                pageNum: 1,
                pageSize: 10
              },
              success: res => {
                wx.hideLoading();
                if (res.data.data != "") {
                  console.log(res)
                  that.setData({
                    list: res.data.data,
                    lists: false
                  })
                } else {
                  wx.hideLoading();
                  that.setData({
                    lists: true
                  })
                }

              }
            })
          }
        }) 
      }
    }) 
       
        // this.absde(res)

     
  },

  //封装
  // absde: function (res) {
  //   var params = { 
  //   }
  //   var sessionToken = res.data
  //   console.log("token是：" + sessionToken)
  //   requests.post_operation(params, sessionToken,(res) => {
  //     console.log(res)
  //   })
  // }, 

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