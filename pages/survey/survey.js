//logs.js
const util = require('../../utils/util.js')
const wxCharts = require('../../utils/wxcharts.js');
var ringChart = null;
var lineChart = null;
var areaChart = null;

Page({
  data: {
    FinishRate: {
      percentage: [
        { name: '完成度1', data: 2, stroke: false },
        { name: '完成度0.9', data: 6, stroke: false },
        { name: '完成度0.8', data: 8, stroke: false },
        { name: '完成度0.7', data: 11, stroke: false },
        { name: '完成度0.6', data: 31, stroke: false },
        { name: '完成度0.5', data: 16, stroke: false },
        { name: '完成度0.4', data: 10, stroke: false },
        { name: '完成度0.3', data: 7, stroke: false },
        { name: '完成度0.2', data: 5, stroke: false },
        { name: '完成度0.1', data: 2, stroke: false },
        { name: '完成度0', data: 2, stroke: false }
      ]
    }
  },

  onLoad: function (e) {
    this.onLoadFinishRate(e);
    this.onLoadRespond(e);
    this.onLoadDrop(e);
  },

  onLoadFinishRate: function (e) {
    var windowWidth = 520;
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
        ringWidth: 10,
        pie: {
          offsetAngle: 0
        }
      },
      title: {
        name: this.data.FinishRate.percentage[4].data + '%',
        color: '#FF6600',
        fontSize: 15
      },
      subtitle: {
        name: this.data.FinishRate.percentage[4].name,
        color: '#666666',
        fontSize: 10
      },
      series: this.data.FinishRate.percentage,
      disablePieStroke: true,
      width: windowWidth,
      height: 250,
      dataLabel: true,
      legend: true,
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
  
  finisheRateTouchHandler: function (e) {
    var index = ringChart.getCurrentDataIndex(e);
    if(this.data.FinishRate.percentage[index]){
      console.log(this.data.FinishRate.percentage[index].name);
      ringChart.updateData({
        title: {
          name: this.data.FinishRate.percentage[index].data + '%'
        },
        subtitle: {
          name: this.data.FinishRate.percentage[index].name,
        }
      });
    }
  },

  createRespondData: function () {
    var categories = ['星期一', '星期二', '星期三', '星期四', '星期五'];
    var data = [9, 8, 10, 13, 12];    
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
      // background: '#f5f5f5',
      series: [{
        name: '上午',
        data: simulationData.data
      }, {
        name: '下午',
        data: [5, 4, 3, 5, 6]
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '相应时间（分）',
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
  
  RespondtouchHandler: function (e) {
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
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      animation: true,
      series: [{
        name: '回答量',
        data: [192, 180, 170, 80, 76, 76, 76, 76, 73, 73]
      }],
      yAxis: {
        title: '回答数量',
        min: 0,
        fontColor: '#8085e9',
        gridColor: '#8085e9',
        titleFontColor: '#f7a35c'
      },
      xAxis: {
        title: '题目编号',
        fontColor: '#7cb5ec',
        gridColor: '#7cb5ec'
      },
      extra: {
        legendTextColor: '#cb2431'
      },
      width: windowWidth,
      height: 200
    });
  }
})
