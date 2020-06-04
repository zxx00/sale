// pages/coupon/coupon.js
var requests = require('../../requests/api.js');
let cache = require('/../../utils/cache.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aheight: 1000,
    currentData: 0,
    selectPerson: true,
    contentlists1: false,
    contentlists2: false,
    contentlists3: false,
    usedList: [],//已使用
    pastList: [],//已过期
    couList: [] //可使用
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //动态计算高度
  onLoad: function (options) {
    //  获取可使用优惠券
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    // 读取缓存的数据
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
            // 获取用户的信息
            wx.request({
              url: 'https://www.jiujiangmm.com/api/coupon/queryUserCodeList',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                "token": token
              },
              data: {

              },
              success: res => {

                wx.hideLoading();
                console.log(res.data.data)

                if (res.data.data.notUseCodeList.length != 0) {
                  let line = Math.ceil(res.data.data.notUseCodeList.length);
                  that.setData({
                    couList: res.data.data.notUseCodeList,
                    aheight: 60 + 205 * line,

                  })
                } else {
                  that.setData({
                    contentlists1: true,
                    aheight: 1000,
                  })
                }
                wx.setStorage({
                  key: 'couList',
                  data: res.data.data.notUseCodeList
                })
                // 已使用
                // if (res.data.data.usedCodeList.length != 0) {
                //   let lines = Math.ceil(res.data.data.usedCodeList.length);

                //   that.setData({
                //     usedList: res.data.data.usedCodeList,
                //     aheight: 60 + 205 * lines,

                //   })
                // } else {
                //   that.setData({
                //     contentlists2: true,
                //     aheight: 1000,
                //   })
                // }
                wx.setStorage({
                  key: 'usedList',
                  data: res.data.data.usedCodeList
                })
                // 已过期
                // if (res.data.data.expireCodeList.length != 0) {
                //   let liness = Math.ceil(res.data.data.expireCodeList.length);
                //   that.setData({
                //     pastList: res.data.data.expireCodeList,
                //     aheight: 60 + 205 * liness,

                //   })
                // } else {
                //   that.setData({
                //     contentlists3: true,
                //     aheight: 1000,
                //   })
                // }
                wx.setStorage({
                  key: 'pastList',
                  data: res.data.data.expireCodeList
                })
              }
            })
          }
        })
      }
    })



  },

  //获取当前滑块的index
  bindchange: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    if (e.detail.current === 1) {

      wx.getStorage({
        key: 'usedList',
        success: res => {
          wx.hideLoading();
          console.log(res)
          if (res.data.length != 0) {

            let lines = Math.ceil(res.data.length);

            that.setData({
              usedList: res.data,
              couList: "",
              pastList: "",
              currentData: e.detail.current,
              aheight: 60 + 205 * lines
            })
          } else {
            that.setData({
              contentlists2: true,
              aheight: 1000,
              currentData: e.detail.current,
            })
          }
        }
      })
    } else if (e.detail.current === 2) {
      wx.getStorage({
        key: 'pastList',
        success: res => {
          wx.hideLoading();
          console.log(res)
          if (res.data.length != 0) {
            let liness = Math.ceil(res.data.length);
            that.setData({
              usedList: "",
              couList: "",
              pastList: res.data,
              currentData: e.detail.current,
              aheight: 60 + 205 * liness
            })
          } else {
            that.setData({
              contentlists3: true,
              aheight: 1000,
              currentData: e.detail.current,
            })
          }
        }
      })
    } else if (e.detail.current === 0) {
      wx.getStorage({
        key: 'couList',
        success: res => {
          wx.hideLoading();
          console.log(res)
          if (res.data.length != 0) {
            let line = Math.ceil(res.data.length);
            that.setData({
              usedList: "",
              couList: res.data,
              pastList: "",
              currentData: e.detail.current,
              aheight: 60 + 205 * line
            })
          } else {
            that.setData({
              contentlists1: true,
              aheight: 1000,
              currentData: e.detail.current,
            })
          }
        }
      })
    }

  },

  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    let that = this;
    // wx.showLoading({
    //   title: '加载中',
    // })
    if (e.target.dataset.current === 1) {
      wx.getStorage({
        key: 'usedList',
        success: res => {
          console.log(res)
          if (res.data.length != 0) {
            let lines = Math.ceil(res.data.length);

            that.setData({
              usedList: res.data,
              couList: "",
              pastList: "",
              currentData: e.detail.current,
              aheight: 60 + 205 * lines,
            })
          } else {

            that.setData({
              contentlists2: true,
              aheight: 1000,
              currentData: e.detail.current,
            })
          }
        }
      })
    } else if (e.target.dataset.current === 2) {
      wx.getStorage({
        key: 'pastList',
        success: res => {
          console.log(res)
          if (res.data.length != 0) {
            let liness = Math.ceil(res.data.length);

            that.setData({
              usedList: "",
              couList: "",
              pastList: res.data,
              currentData: e.detail.current,
              aheight: 60 + 205 * liness,
            })
          } else {

            that.setData({
              contentlists3: true,
              aheight: 1000,
              currentData: e.detail.current,
            })
          }
        }
      })
    } else if (e.target.dataset.current === 0) {
      wx.getStorage({
        key: 'couList',
        success: res => {
          wx.hideLoading();
          console.log(res)
          if (res.data.length != 0) {
            let line = Math.ceil(res.data.length);
            that.setData({
              usedList: "",
              couList: res.data,
              pastList: "",
              currentData: e.detail.current,
              aheight: 60 + 205 * line
            })
          } else {
            that.setData({
              contentlists1: true,
              aheight: 1000,
              currentData: e.detail.current,
            })
          }
        }
      })
    }

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 使用优惠券
  binlick: function (e) {
    let code = e.currentTarget.dataset.code
    let name = e.currentTarget.dataset.name
    let validity = e.currentTarget.dataset.validity
    let showCode = e.currentTarget.dataset.showcode
    wx.redirectTo({
      url: '/pages/coding/coding?code=' + code + '&name=' + name + '&validity=' + validity + '&showCode=' + showCode,
    })
  },
})