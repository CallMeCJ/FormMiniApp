//logs.js
const util = require('../../utils/util.js')
const wxCharts = require('../../utils/wxcharts.js');
var classQuizColumn = null;
var mathSubjectsScore = null;
var jackAndRoseRanking = null;
var app = getApp();

Page({
  data: {
    averageScore: {
      mathModuls: ['Operation', 'Algebra', 'Word problem', 'Fraction', 'Geometry', 'Statistics'],
      mathModulsScore: [95, 90, 50, 83, 30, 70],
      timeCategories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
      averageScoresOfMath: [25, 25, 25, 25, 25, 25, 24, 20, 5, 2],
      jackScore: [90.3, 89.6, 94.8, 80.6, 75.4, 70.6, 68.0, 68.9, 67, 67.8],
      roseScore: [85.3, 83.6, 89.8, 75.6, 73.4, 65.6, 64.0, 64.9, 63, 63.8],
      standard: [80.5, 80.1, 83.1, 83.0, 84.2, 84.8, 85, 85.1, 86, 85.7],
    }
  },
  onLoad: function (e) {
    this.onLoadClassQuiz(e);
    this.onLoadMathModulsScore(e);
    this.onLoadJackAndRoseRanking(e);
  },

  onLoadMathModulsScore(e){
    var windowWidth = 500;
    var windowHeigh = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    mathSubjectsScore = new wxCharts({
      canvasId: 'mathModulsRadar',
      type: 'radar',
      categories: this.data.averageScore.mathModuls,
      series: [{
        name: 'Grasp degree of mathematical module',
        data: this.data.averageScore.mathModulsScore
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
  
  onLoadJackAndRoseRanking(e){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    jackAndRoseRanking = new wxCharts({
      canvasId: 'rankingCanvas',
      type: 'line',
      categories: this.data.averageScore.timeCategories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'The average of Jack',
        data: this.data.averageScore.jackScore
      }, {
        name: 'The average of Rose',
        data: this.data.averageScore.roseScore
      }, {
        name: 'Class average',
        data: this.data.averageScore.standard
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

  onLoadClassQuiz(e){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    classQuizColumn = new wxCharts({
      canvasId: 'averageScoreCanvas',
      type: 'column',
      animation: true,
      categories: this.data.averageScore.timeCategories,
      series: [{
        name: '2018/10/25 Quiz--Elements of Alge-bra',
        data: this.data.averageScore.averageScoresOfMath,
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'The count of anwsered questions',
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

  touchRankingHandler: function (e) {
    jackAndRoseRanking.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  }

})