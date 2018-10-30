var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var radarChart = null;
Page({
    data: {
      categories: ['Choice', 'Rating', 'Date', 'Ranking', 'Likert', 'Text', 'NPS'],
      categoriesData: [31234, 10025, 20000, 15000, 12200, 30256, 12250],
      maxValue: 10000,
    },
    touchHandler: function (e) {
        console.log(radarChart.getCurrentDataIndex(e));
    },
    onReady: function (e) {
        var windowWidth = 500;
        var windowHeigh = 300;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        this.data.maxValue = Math.max(this.data.categoriesData);

        radarChart = new wxCharts({
          canvasId: 'radarCanvas',
          type: 'radar',
          categories: this.data.categories,
          series: [{
            name: 'Question type preference',
            data: this.data.categoriesData,
          }],
          width: windowWidth,
          height: windowHeigh,
          extra: {
            radar: {
              max: this.data.maxValue
            }
          }
        });
    }
});