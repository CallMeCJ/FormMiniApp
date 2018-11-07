// pages/loading/loading.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var email = options.email;
    if(email.toLowerCase().startsWith("j")){  
      app.globalData.isQuiz=true;
      app.globalData.isSurvey = false;
    }else{
      app.globalData.isSurvey=true;
      app.globalData.isQuiz = false;
    }
    
    setTimeout(function() {
      wx.switchTab({
        url: '../report/report',
      });
    }, 2000);
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

  }
})