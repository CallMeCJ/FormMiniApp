// pages/report/report.js
var wxCharts = require('../../utils/wxcharts.js');
const app = getApp();

Page({

  data: {
    isSurvey:false,
    isQuiz:false,
    survey:{
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
    quiz:{
      questionType: {
        categories: ['Choice', 'Rating', 'Date', 'Ranking', 'Likert', 'Text', 'NPS'],
        categoriesData: [31234, 10025, 20000, 15000, 12200, 30256, 2200],
        maxValue: 10000,
      },
      dailyActiveForm: {
        categoriesDatas: [15, 17, 18, 20, 16, 5, 4, 20, 17, 18, 20, 19, 5, 6],
        categories: ['10/15', '10/16', '10/17', '10/18', '10/19', '10/20', '10/21', '10/22', '10/23', '10/24', '10/25', '10/26', '10/27', '10/28']
      },
      //标签云
      labArr: ['Hardworking educator', 'Overtime frenzy', 'Fan of Forms', 'Dedicated']
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    
    if (app.globalData.isQuiz){
      this.setData({
        isSurvey: false,
        isQuiz: true
      });
      this.onLoadDAF(options, this.data.quiz);
      this.onLoadQuestionType(options,this.data.quiz);
    }else{
      this.setData({
        isSurvey: true,
        isQuiz: false
      });
      this.onLoadMAF(options,this.data.survey);
      this.onLoadQuestionType(options,this.data.survey);
    }
  },

  onLoadQuestionType: function (e,data) {
    var windowWidth = 500;
    var windowHeigh = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var maxValue = Math.max(data.questionType.categoriesData);

    new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: data.questionType.categories,
      series: [{
        name: 'Preference Question Type',
        data: data.questionType.categoriesData,
      }],
      width: windowWidth,
      height: windowHeigh,
      extra: {
        radar: {
          max: maxValue
        }
      }
    });
  },
  onLoadMAF: function (e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: data.monthlyActiveForm.categories,
      series: [{
        name: 'Active Forms Per Hour Last Month',
        data: data.monthlyActiveForm.categoriesDatas,
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

  onLoadDAF: function (e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: data.dailyActiveForm.categories,
      series: [{
        name: 'Daily editing form count',
        data: data.dailyActiveForm.categoriesDatas,
      }],
      yAxis: {
        title: 'Total',
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