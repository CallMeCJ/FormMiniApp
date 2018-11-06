// pages/ideas/Ideas.js
var wxCharts = require('../../utils/wxcharts.js');
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    survey:{
      FinishRate: {
        categories: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
        data: [10, 20, 30, 15, 10, 5, 4, 3, 2, 1],
      },
      ResponseData: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [9, 8, 10, 13, 12],
        data2: [5, 4, 3, 5, 6]
      },
      DropData: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
        data: [192, 180, 170, 80, 76, 76, 76, 76, 73, 73]
      }
    },
    quiz:{
      averageScore: {
        mathModuls: ['Operation', 'Algebra', 'Math application', 'Fraction', 'Geometry', 'Statistics'],
        mathModulsScore: [95, 90, 50, 83, 30, 70],
        timeCategories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
        averageScoresOfMath: [25, 25, 25, 25, 25, 25, 24, 20, 5, 2],
        jackScore: [90.3, 89.6, 94.8, 80.6, 75.4, 70.6, 68.0, 68.9, 67, 67.8],
        roseScore: [85.3, 83.6, 89.8, 75.6, 73.4, 65.6, 64.0, 64.9, 63, 63.8],
        standard: [80.5, 80.1, 83.1, 83.0, 84.2, 84.8, 85, 85.1, 86, 85.7],
      }
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })

    if (app.globalData.isQuiz) {
      this.setData({
        isSurvey: false,
        isQuiz: true
      });
      this.onLoadClassQuiz(e,this.data.quiz);
      this.onLoadMathModulsScore(e,this.data.quiz);
      this.onLoadJackAndRoseRanking(e,this.data.quiz);
    } else {
      this.setData({
        isSurvey: true,
        isQuiz: false
      });
      this.onLoadFinishedRate(e,this.data.survey);
      this.onLoadRespond(e,this.data.survey);
      this.onLoadDrop(e,this.data.survey);
    }
  },

  onLoadFinishedRate: function (e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'finishRateCanvas',
      type: 'line',
      categories: data.FinishRate.categories,
      animation: true,
      series: [{
        name: 'Answer Rate Of Forms',
        data: data.FinishRate.data
      }],
      yAxis: {
        title: 'Respondents Proportion（%）',
        min: 0,
      },
      xAxis: {
        disableGrid: true
      },
      width: windowWidth,
      height: 200
    });
  },

  createRespondData: function (data) {
    var categories = data.ResponseData.categories;
    var data = data.ResponseData.data;
    return {
      categories: categories,
      data: data
    }
  },

  onLoadRespond: function (e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createRespondData(data);
    new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: 'Monrning',
        data: simulationData.data
      }, {
        name: 'Afternoon',
        data: data.ResponseData.data2
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'Response time（min）',
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  onLoadDrop: function (e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'areaCanvas',
      type: 'area',
      categories: data.DropData.categories,
      animation: true,
      series: [{
        name: 'Number of Responses',
        data: data.DropData.data
      }],
      yAxis: {
        title: 'Submit Responses',
        min: 0,
      },
      xAxis: {

      },
      width: windowWidth,
      height: 200
    });
  },

  onLoadMathModulsScore(e,data) {
    var windowWidth = 500;
    var windowHeigh = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'mathModulsRadar',
      type: 'radar',
      categories: data.averageScore.mathModuls,
      series: [{
        name: 'Students perfermance of mathematical module',
        data: data.averageScore.mathModulsScore
      }],
      width: windowWidth,
      height: windowHeigh,
      extra: {
        radar: {
          max: 100
        }
      }
    });
  },

  onLoadJackAndRoseRanking(e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'rankingCanvas',
      type: 'line',
      categories: data.averageScore.timeCategories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'Jack',
        data: data.averageScore.jackScore
      }, {
        name: 'Rose',
        data: data.averageScore.roseScore
      }, {
        name: 'Class average',
        data: data.averageScore.standard
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'Average(100)',
        min: 60
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  onLoadClassQuiz(e,data) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      canvasId: 'averageScoreCanvas',
      type: 'column',
      animation: true,
      categories: data.averageScore.timeCategories,
      series: [{
        name: '2018/10/25 Quiz--Algebra',
        data: data.averageScore.averageScoresOfMath,
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'Responses',
        min: 50
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
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