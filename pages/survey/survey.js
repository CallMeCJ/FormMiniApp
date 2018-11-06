//logs.js
const util = require('../../utils/util.js')
const wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var areaChart = null;
const app = getApp();

Page({
  data: {
    FinishRate: {
      categories: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
      data: [10, 20, 30, 15, 10, 5, 4, 3, 2, 1],
    },
    ResponseData:{
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      data: [9, 8, 10, 13, 12], 
      data2: [5, 4, 3, 5, 6]
    },
    DropData:{
      categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
      data: [192, 180, 170, 80, 76, 76, 76, 76, 73, 73]
    }
  },

  onLoad: function (e) {
    this.onLoadFinishedRate(e);
    this.onLoadRespond(e);
    this.onLoadDrop(e);
    app.editTabbar();
  },

  onLoadFinishedRate: function (e) {
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
      categories: this.data.FinishRate.categories,
      animation: true,
      series: [{
        name: 'Answer Rate Of Forms',
        data: this.data.FinishRate.data
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

  createRespondData: function () {
    var categories =this.data.ResponseData.categories;
    var data = this.data.ResponseData.data;    
    return {
      categories: categories,
      data: data
    }
  },

  onLoadRespond: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createRespondData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: 'Monrning',
        data: simulationData.data
      }, {
        name: 'Afternoon',
          data: this.data.ResponseData.data2
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
  
  respondTouchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },  

  onLoadDrop: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    areaChart = new wxCharts({
      canvasId: 'areaCanvas',
      type: 'area',
      categories: this.data.DropData.categories,
      animation: true,
      series: [{
        name: 'Number of Responses',
        data: this.data.DropData.data
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
  
  dropTouchHandler: function (e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },  
})
