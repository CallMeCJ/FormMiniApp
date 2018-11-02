//index.js
//获取应用实例
var wxCharts = require('../../utils/wxcharts.js');
const app = getApp()
var pieChart = null;
var ringChart = null;
var radarChart = null;
var columnChart = null;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    questionType:{
      categories: ['Choice', 'Rating', 'Date', 'Ranking', 'Likert', 'Text', 'NPS'],
      categoriesData: [31234, 10025, 20000, 15000, 12200, 30256, 2200],
      maxValue: 10000,
    },
    dailyActiveForm:{
      categoriesDatas: [15, 17, 18, 20, 16, 5, 4, 20, 17, 18, 20, 19, 5, 6],
      categories: ['10/15', '10/16', '10/17', '10/18', '10/19', '10/20', '10/21', '10/22', '10/23', '10/24', '10/25', '10/26','10/27','10/28']
    },
    //标签云
    labArr: ['Hardworking education worker', 'Overtime working makes me happy', 'Forms fans', 'Paranoia'],
  },
  onLoad: function (e) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.onLoadQuestionType(e);
    this.onLoadDAF(e);
  },

  onLoadQuestionType: function(e){
    var windowWidth = 500;
    var windowHeigh = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    this.data.questionType.maxValue = Math.max(this.data.questionType.categoriesData);

    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: this.data.questionType.categories,
      series: [{
        name: 'Preferred question types',
        data: this.data.questionType.categoriesData,
      }],
      width: windowWidth,
      height: windowHeigh,
      extra: {
        radar: {
          max: this.data.questionType.maxValue
        }
      }
    });
  },
  onLoadDAF: function(e){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: this.data.dailyActiveForm.categories,
      series: [{
        name: 'Daily editing form count',
        data: this.data.dailyActiveForm.categoriesDatas,
      }],
      yAxis: {
        title: 'total',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getOfficeInfo: function(){
    wx.request({
      url: app.globalData.serverPath + '/formapi/api/userInfo/',
      header: {
        Authorization:app.globalData.token
      },
      success: function(res){
        console.log(res);
      }
    })
  }
})
