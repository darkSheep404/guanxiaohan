// pages/authorize/authorize.js
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

  },
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {//用户按了允许授权按钮
      console.log(e.detail.userInfo)
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })
      wx.cloud.callFunction(
      {
        name:'add_user',
        data:{
          nikename:e.detail.userInfo.nickName,
          avatarUrl:e.detail.userInfo.avatarUrl,
          gender:e.detail.userInfo.gender,
          country:e.detail.userInfo.country,
          province:e.detail.userInfo.province,
          city:e.detail.userInfo.province,
          language:e.detail.userInfo.language,
        }
      })
      wx.navigateBack({
        delta: 1
      })
      
    } else {//用户按了拒绝按钮
      wx.navigateBack({
        delta: 2
      })
    }
  }
})