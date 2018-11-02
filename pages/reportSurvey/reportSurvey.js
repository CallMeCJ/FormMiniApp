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
    quota: {
      percentage: [
        { name: 'My Forms', data: 73, stroke: false },
        { name: 'Recycle bin', data: 10, stroke: false },
        { name: 'Avaliable', data: 17, stroke: false }
      ]
    },
    questionType: {
      categories: ['Choice', 'Rating', 'Date', 'Ranking', 'Likert', 'Text', 'NPS'],
      categoriesData: [31234, 28025, 24000, 25600, 22200, 33256, 22250],
      maxValue: 10000,
    },
    monthlyActiveForm: {
      categoriesDatas: [0, 1, 8, 6, 1, 5, 4, 10, 6, 6, 7, 2, 1, 2, 20, 27, 53, 32, 20, 1, 1, 2, 0, 0],
      categories: ['08:00', '', '', '11:00', '', '', '14:00', '', '', '17:00', '', '', '20:00', '', '', '23:00', '', '', '02:00', '', '', '05:00', '', '07:00']
    },
    //标签云
    labArr: ['Employee of the Year', 'Popular', 'Night Owl', 'All-Around Player'],
  },
  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket:true
    })
    this.onLoadQuestionType(e);
    this.onLoadMAF(e);
  },

  onLoadQuestionType: function (e) {
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
        name: 'Preference Question Type',
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
  onLoadMAF: function (e) {
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
      categories: this.data.monthlyActiveForm.categories,
      series: [{
        name: 'Active Forms Per Hour Last Month',
        data: this.data.monthlyActiveForm.categoriesDatas,
      }],
      yAxis: {
        title: 'Total Active Forms',
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

  getUserInfo: function (e) {
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

  getOfficeInfo: function () {
    wx.request({
      url: app.globalData.serverPath + '/formapi/api/userInfo/',
      header: {
        Authorization: app.globalData.token
      },
      success: function (res) {
        console.log(res);
      }
    })
  }
})
