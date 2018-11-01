//logs.js
const util = require('../../utils/util.js')
const wxCharts = require('../../utils/wxcharts.js');
var totalAverageScore = null;
var mathSubjectsScore = null;
var jackAndRoseRanking = null;
var app = getApp();

Page({
  data: {
    averageScore: {
      mathModuls: ['数的运算', '初步代数', '应用题', '量的计算', '空间与图形', '统计与概率'],
      mathModulsScore: [95, 90, 50, 83, 30, 70],
      timeCategories: ['2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06'],
      averageScoresOfMath: [80.3, 81.4, 84.2, 70.1, 84.8, 86.6, 74.2, 85.9, 87.6, 87.8],
      averageScoresOfEnglish: [70.1, 73.3, 75.5, 79.4, 80.2, 81.8, 83.6, 85.0, 84.7, 85.6],
      jackScore: [90.3, 89.6, 94.8, 80.6, 75.4, 70.6, 68.0, 68.9, 67, 67.8],
      roseScore: [85.3, 83.6, 89.8, 75.6, 73.4, 65.6, 64.0, 64.9, 63, 63.8],
      standard: [80.5, 80.1, 83.1, 83.0, 84.2, 84.8, 85, 85.1, 86, 85.7],
    }
  },
  onLoad: function (e) {
    this.onLoadAverageScore(e);
    this.onLoadJackAndRoseRanking(e);
    this.onLoadMathModulsScore(e);
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
        name: '数学模块掌握度',
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
        name: '梁山伯平均分',
        data: this.data.averageScore.jackScore
      }, {
        name: '朱丽叶平均分',
        data: this.data.averageScore.roseScore
      }, {
        name: '班级平均分',
        data: this.data.averageScore.standard
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '平均分（百分制）',
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

  onLoadAverageScore(e){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    totalAverageScore = new wxCharts({
      canvasId: 'averageScoreCanvas',
      type: 'line',
      categories: this.data.averageScore.timeCategories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '数学',
        data: this.data.averageScore.averageScoresOfMath,
        format: function (val, name) {
          return val.toFixed(2) + '分';
        }
      }, {
        name: '英语',
        data: this.data.averageScore.averageScoresOfEnglish,
        format: function (val, name) {
          return val.toFixed(2) + '分';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '班级平均分(百分制)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 50
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

  touchAverageHandler: function (e) {
    totalAverageScore.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
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