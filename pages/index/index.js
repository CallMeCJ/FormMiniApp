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
    quota:{
      percentage: [
        { name: 'My Forms', data: 73, stroke: false },
        { name: 'Recycle bin', data: 10, stroke: false },
        { name: 'Avaliable', data: 17, stroke: false }
      ]
    },
    questionType:{
      categories: ['Choice', 'Rating', 'Date', 'Ranking', 'Likert', 'Text', 'NPS'],
      categoriesData: [31234, 10025, 20000, 15000, 12200, 30256, 12250],
      maxValue: 10000,
    },
    dailyActiveForm:{
      categoriesDatas: [15, 20, 45, 37, 30, 42, 56, 22, 11, 32, 29, 30, 41, 33],
      categories: ['10/10', '10/11', '10/12', '10/13', '10/14', '10/15', '10/16', '10/17', '10/18', '10/19', '10/20', '10/21', '10/22', '10/23']
    },
    FormType:{
      
    }
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

    this.onLoadCapacity(e);
    this.onLoadFormType(e);
    this.onLoadQuestionType(e);
    this.onLoadDAF(e);
  },

  onLoadCapacity: function(e){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 20,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: this.data.quota.percentage[0].data + '%',
        color: '#FF6600',
        fontSize: 25
      },
      subtitle: {
        name: this.data.quota.percentage[0].name,
        color: '#666666',
        fontSize: 15
      },
      series: this.data.quota.percentage,
      disablePieStroke: true,
      width: windowWidth,
      height: 250,
      dataLabel: false,
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);
  },

  capacityTouchHandler: function (e) {
    var index = ringChart.getCurrentDataIndex(e);
    if(this.data.quota.percentage[index]){
      console.log(this.data.quota.percentage[index].name);
      ringChart.updateData({
        title: {
          name: this.data.quota.percentage[index].data + '%'
        },
        subtitle: {
          name: this.data.quota.percentage[index].name,
        }
      });
    }
  },

  //加载Form和Quiz的对比
  onLoadFormType: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: 'Survey',
        data: 38,
      }, {
        name: 'Quiz',
        data: 62,
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
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
        name: 'Question type preference',
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
        name: 'DAF',
        data: this.data.dailyActiveForm.categoriesDatas,
      }],
      yAxis: {
        title: 'Total number',
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
  gotoPage: function (e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: '../charts/' + page + '/' + page
    });
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
