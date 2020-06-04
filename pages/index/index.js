//index.js
//获取应用实例
var requests = require('../../requests/api.js');
let cache = require('/../../utils/cache.js');
const app = getApp()

Page({
  data: {
    userInfo: {},
    avatarUrl:"",
    userinfos:true,
    // hasUserInfo:true,
    // images:true,
    items: [],
    list:[
      {
        img:"/image/handle.png",
        title:"操作记录",
        open:"/image/open.png"  
      },
      {
        img: "/image/handle.png",
        title: "操作记录",
        open: "/image/open.png"
      },
      {
        img: "/image/handle.png",
        title: "操作记录",
        open: "/image/open.png"
      },
      {
        img: "/image/handle.png",
        title: "操作记录",
        open: "/image/open.png"
      },
      {
        img: "/image/handle.png",
        title: "操作记录",
        open: "/image/open.png"
      },
      {
        img: "/image/handle.png",
        title: "操作记录",
        open: "/image/open.png"
      }
    ],
    current:"",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
 
  onLoad: function () {
    var that = this
   if (app.globalData.userInfo = null){
      this.setData({
        userinfos: false
      })
    }else{
        userinfos: true
    } 
    // debugger
    // wx.showLoading({
    //   title: '加载中',
    // })

    // 判断用户是否授权过手机号
    // if (cache.endUser.phoneNumber != ""){
    //   that.setData({
    //     hasUserInfo: false
    //   })
    // }else{
    //   that.setData({
    //     hasUserInfo: true
    //   })
    // }
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
              url: 'https://www.jiujiangmm.com/api/per/getUserData',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                "token": token
              },
              success: res => {
                wx.hideLoading();
                console.log(res)
                that.setData({
                  items: res.data.data.userAfterSalesCardList,
                  avatarUrl: res.data.data.avatarUrl
                })

              }
            })
          }
        })

      }
    })

  
    let leng = this.data.current
    this.setData({
      swiperIndex: leng,
    })
    // // 检测是否授权了手机号
    // if (this.errMsg) {
    //   this.setData({
    //     hasUserInfo: true
    //   })
    // }
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
  },

  // 轮播滑动
  swiperChange(e) {
    const that = this
    if (e.detail.current != 0){
      that.setData({
        swiperIndex: e.detail.current,
        // images: false
      })
    }else{
      that.setData({
        swiperIndex: e.detail.current,
        // images: true
      })
    }
  
  },
  // 点击进去二维码页面
  binlick(e){
    // debugger
    var that = this
    // 判断用户是否授权过手机号
    if (e.currentTarget.dataset.status == 1){
      wx.showModal({
        title: '提示',
        content: '未激活',
        success: function (res) {
        }
      })
    } else if (e.currentTarget.dataset.status == undefined){
      let id = e.currentTarget.id
      let name = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
      that.setData({
        hasUserInfo: false
      })
    }else{
      let id = e.currentTarget.id
      let name = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '/pages/center/center?id=' + id + '&name=' + name,
      })
      that.setData({
        hasUserInfo: false
      })
    }
  },
  // 纹眉售后卡
  // tattoo(e){
  //   var id = e.currentTarget.id
  //   let name = e.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: '/pages/center/center?id=' + id + '&name=' + name,
  //   })
  // },
  // //美瞳线售后卡
  // line(e){
  //   var id = e.currentTarget.id
  //   let name = e.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: '/pages/center/center?id=' + id + '&name=' + name,
  //   })
  // },
  // //水晶唇
  // crystal(e){
  //   var id = e.currentTarget.id
  //   let name = e.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: '/pages/center/center?id=' + id + '&name=' + name,
  //   })
  // },
  // hairline(e){
  //   var id = e.currentTarget.id
  //   let name = e.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: '/pages/center/center?id=' + id + '&name=' + name,
  //   })
  // },
  // 唤起分享
  onShareAppMessage: function() {

  },

  // 弹框
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  // 跳转操作记录
  handle(){
    wx.navigateTo({
      url: '/pages/handle/handle',
    })
  },
  // 跳转维护记录
  tenance(){
    wx.navigateTo({
      url: '/pages/tenance/tenance',
    })
  },
  // 跳转售后使用规则
  rules(){
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  },
  // 跳转注意事项
  notice(){
     wx.navigateTo({
       url: '/pages/notice/notice',
     })
  },
  // 跳转福利介绍
  welfare(){
    wx.navigateTo({
      url: '/pages/welfare/welfare',
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideDialogModal: function() {
    this.setData({
      showModal: false,
    });
  },
  onReady: function() {
    // 生命周期回调—监听页面初次渲染完成
  },
})