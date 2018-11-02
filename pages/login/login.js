// pages/login.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'Sign in to your account',
    });

    if (app.globalData.userInfo) {
      this.nickNameCallback(app.globalData.userInfo.nickName);
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.nickNameCallback(res.userInfo.nickName);
      };
    }
  },

  nickNameCallback: function(nickName) {
    if (nickName == 'starxxy') {
      wx.redirectTo({
        url: '../loading/loading',
      });
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  login: function () {
    wx.redirectTo({
      url: '../login2/login?email='+this.data.email,
    })
  },

  emailUpdated: function(event) {
   this.setData({email: event.detail.value});
  }
})