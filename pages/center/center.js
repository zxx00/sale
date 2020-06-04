// pages/responsive/responsive.js
const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(460)

Page({
  data: {
    text: '',
    image: '',
    name: "",
    // 用于设置wxml里canvas的width和height样式
    qrcodeWidth: qrcodeWidth,
    imgsrc: ''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options.id)
    console.log(options.name)
    var that = this

    that.setData({
      text: options.id,
      name: options.name
    })

  },

  onReady() {

    const z = this
    qrcode = new QRCode('canvas', {
      usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
      text: z.data.text,
      image: '/image/11.png',
      width: qrcodeWidth,
      height: qrcodeWidth,
      correctLevel: QRCode.CorrectLevel.H,
    });
    wx.hideLoading();
    // 生成图片，绘制完成后调用回调
    qrcode.makeCode(z.data.text, () => {
      // 回调

      setTimeout(() => {
        qrcode.exportImage(function (path) {
          z.setData({
            imgsrc: path
          })
        })
      }, 200)
    })
  },
  // 长按保存
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  }
})