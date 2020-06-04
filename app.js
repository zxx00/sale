//app.js
let {
  WeToast
} = require('toast/wetoast.js')
let api = require("requests/api.js");
let cache = require('utils/cache.js');
App({
  WeToast,
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var endUser = wx.getStorageSync('endUser')
    if (endUser != null && endUser != '') {
      cache.endUser.phoneNumber = endUser
    }
 
    // 登录
    wx.login({
      success: res => {
        let code = res.code
        let that = this
        console.log(code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // this.replacement(res)
        wx.request({
          url: 'https://www.jiujiangmm.com/pub/login/getAuthorizeData',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data:{
            js_code: code
          },
          success: res => {
            console.log(res)
            wx.setStorage({
              key: 'openId',
              data: res.data.data.openid
            })
            that.globalData.session_key = res.data.data.session_key
            that.globalData.openId = res.data.data.openid
            let openId = res.data.openid
            console.log(that.globalData.session_key)
            console.log(that.globalData.openId)

            this.globalData.employId = res.data.data.openid;
            //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.employIdCallback) {
              this.employIdCallback(res);
            }
          }
        })
      },
    })
    // 获取用户信息，判断是否授权小程序
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          //获取用户的相关信息
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              this.globalData.checkLogin = true;
              //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.checkLoginReadyCallback) {
                this.checkLoginReadyCallback(res);
              }
            }
          })
        }
      },
   

    })


  },
  // 用code置换openid
  // replacement: function (res){
  //   let that = this
  //   var params = {
  //     js_code:res.code
  //   }
  //   api.post_code2Session(params, (res) =>{
  //     console.log(res)
  //     wx.setStorage({
  //       key: 'openId',
  //       data: res.data.openid
  //     })
  //     that.globalData.session_key = res.data.session_key
  //     that.globalData.openId = res.data.openid
  //     let openId = res.data.openid
  //     console.log(that.globalData.session_key)
  //     console.log(that.globalData.openId)
  //   })
  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getUpdateManager) {

      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log('11111111111111111111111111111111' + res.hasUpdate)
      })

      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })

      })

      updateManager.onUpdateFailed(function() {
        // 新的版本下载失败
      })
    }
    let that = this;
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    session_key:null,
    isIphoneX: false,
    checkLogin:"",
    openId:null
  },

})