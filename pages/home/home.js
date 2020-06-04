// pages/home/home.js
// var api = require('../../requests/api.js');
let cache = require('/../../utils/cache.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,//验证手机号
    userinfos: true, //验证微信授权
    avatarUrl: "",
    contentlists: false,
    couList: [],
    test:false,
    couponCount: 0, //优惠券
    integral: 0, //积分
    userAfterCardCount: 0,//售后卡
    msg:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    if (app.globalData.employId && app.globalData.employId != '') {
      // debugger
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
              wx.hideLoading();
              console.log(res.data.data.phone)
              let token = res.data.data.token
              console.log(res.data.data.token)
              if (res.data.data.phone != "" && app.globalData.userInfo  ) {
                // 获取用户的信息
                wx.request({
                  url: 'https://www.jiujiangmm.com/api/coupon/getCouponPromotionsList',
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "token": token
                  },
                  success: res => {
                    wx.hideLoading();
                    console.log(res)
                    if (res.data.data.pospalDataList.length != 0) {
                      wx.hideLoading();
                      that.setData({
                        couList: res.data.data.pospalDataList,
                        couponCount: res.data.data.couponCount,
                        integral: res.data.data.integral,
                        userAfterCardCount: res.data.data.userAfterCardCount,
                        hasUserInfo: false
                      })
                    } else {
                      that.setData({
                        contentlists: true,
                        couponCount: res.data.data.couponCount,
                        integral: res.data.data.integral,
                        userAfterCardCount: res.data.data.userAfterCardCount,
                        hasUserInfo: false
                      })
                    }
                  }
                })

              } else {

                wx.request({
                  url: 'https://www.jiujiangmm.com/pub/login/getCouponPromotionsList',
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  success: res => {
                    wx.hideLoading();
                    console.log(res)
                    if (res.data.data.length != 0) {
                      wx.hideLoading();
                      that.setData({
                        couList: res.data.data
                      })
                    } else {
                      that.setData({
                        contentlists: true
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      app.employIdCallback = checkLogin => {
        // debugger
        if (checkLogin != '') {
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
                  wx.hideLoading();
                  console.log(res.data.data.phone)
                  let token = res.data.data.token
                  console.log(res.data.data.token)
                  if (res.data.data.phone != "") {
                    // 获取用户的信息
                    wx.request({
                      url: 'https://www.jiujiangmm.com/api/coupon/getCouponPromotionsList',
                      method: "POST",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        "token": token
                      },
                      success: res => {
                        wx.hideLoading();
                        console.log(res)
                        if (res.data.data.pospalDataList.length != 0) {
                          wx.hideLoading();
                          that.setData({
                            couList: res.data.data.pospalDataList,
                            couponCount: res.data.data.couponCount,
                            integral: res.data.data.integral,
                            userAfterCardCount: res.data.data.userAfterCardCount,
                            hasUserInfo: false
                          })
                        } else {
                          that.setData({
                            contentlists: true,
                            couponCount: res.data.data.couponCount,
                            integral: res.data.data.integral,
                            userAfterCardCount: res.data.data.userAfterCardCount,
                            hasUserInfo: false
                          })
                        }
                      }
                    })

                  } else {

                    wx.request({
                      url: 'https://www.jiujiangmm.com/pub/login/getCouponPromotionsList',
                      method: "POST",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                      success: res => {
                        wx.hideLoading();
                        console.log(res)
                        if (res.data.data.length != 0) {
                          wx.hideLoading();
                          that.setData({
                            couList: res.data.data
                          })
                        } else {
                          that.setData({
                            contentlists: true
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    }
    // 获取用户的头像
    if (app.globalData.userInfo) {
 
      that.setData({
        userInfo: app.globalData.userInfo,
        userinfos: false
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        that.setData({
          userInfo: res.userInfo,
          userinfos: false
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            userinfos: false
          })
        }
      })
    }
    // 判断用户微信
    if (app.globalData.userInfo === null) {
      that.setData({
        hasUserInfo: false
      })

    }
 
    //校验用户信息binlicks
//     if (app.globalData.openId === null ){
//       console.log(app.globalData.openId)
// // debugger
//       wx.request({
//         url: 'https://www.jiujiangmm.com/pub/login/getCouponPromotionsList',
//         method: "POST",
//         header: {
//           'content-type': 'application/x-www-form-urlencoded',
//         },
//         success: res => {

//           console.log(res)
//           if (res.data.data.length != 0) {
//             wx.hideLoading();
//             that.setData({
//               couList: res.data.data
//             })
//           } else {
//             that.setData({
//               contentlists: true
//             })
//           }
//         }
//       })
//     }else{
      
//     }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  binlicks(e) {
    // debugger
    if (app.globalData.userInfo === null || app.globalData.userInfo === undefined) {
      // debugger
      wx.redirectTo({
        url: '/pages/logs/logs',
      })
    }
  },
  // 领取优惠券
  binlick(e) {
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
            wx.hideLoading();
            console.log(res.data.data.phone)
            let token = res.data.data.token
            if (app.globalData.userInfo === null || app.globalData.userInfo === undefined) {
              wx.redirectTo({
                url: '/pages/logs/logs',
              })
            } else if (res.data.data.phone === "") {
              wx.redirectTo({
                url: '/pages/mobile/mobile',
              })
            } else if (res.data.data.phone != "" && app.globalData.userInfo != null) {
              // 获取用户的信息
              wx.request({
                url: 'https://www.jiujiangmm.com/api/coupon/addCouponcode',
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  "token": token
                },
                data: {
                  promotionCouponUid: e.currentTarget.id,
                  name: e.currentTarget.dataset.name,
                  rule: e.currentTarget.dataset.rule,
                  amount: e.currentTarget.dataset.amount,
                  program: e.currentTarget.dataset.program
                },
                success: res => {
                  wx.hideLoading();
                  console.log(res)
                  if (res.data.data.data != "") {
                    this.setData({
                      couList: res.data.data.data,
                      msg:res.data.msg,
                      showModal: true
                    })
                  } else {
                    wx.hideLoading();
                    this.setData({
                      contentlists: true
                    })
                  }
                }
              })
            }
          }
        })
      }
    })

  },
  /**
 * 隐藏模态对话框
 */
  onConfirm: function () {
    wx.redirectTo({
      url: '/pages/home/home',
    })
  },
  // 进去售后卡
  after_sale() {
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
            wx.hideLoading();
            console.log(res.data.data.phone)
            if (app.globalData.userInfo === null || app.globalData.userInfo === undefined) {
              wx.redirectTo({
                url: '/pages/logs/logs',
              })
            } else if (app.globalData.userInfo != null && res.data.data.phone != "") {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            } else {
              wx.redirectTo({
                url: '/pages/mobile/mobile',
              })
            }
          }
        })
      }
    })

  },

  // 查看优惠券
  coupons() {
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
            wx.hideLoading();
            console.log(res.data.data.phone)
            if (app.globalData.userInfo === null || app.globalData.userInfo === undefined) {
              wx.redirectTo({
                url: '/pages/logs/logs',
              })
            } else if (app.globalData.userInfo != null  && res.data.data.phone != "") {
              wx.navigateTo({
                url: '/pages/coupon/coupon',
              })
            } else if (app.globalData.userInfo != null ){
              wx.redirectTo({
                url: '/pages/mobile/mobile',
              })
            }
          }
        })
      }
    })

  },

  // 使用优惠券
  binlickemploy: function (e) {
    let code = e.currentTarget.dataset.code
    let name = e.currentTarget.dataset.name
    let validity = e.currentTarget.dataset.validity
    let showCode = e.currentTarget.dataset.showcode
    wx.redirectTo({
      url: '/pages/coding/coding?code=' + code + '&name=' + name + '&validity=' + validity + '&showCode=' + showCode,
    })
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