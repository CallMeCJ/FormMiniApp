var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;

Page({
    data: {
      title: 'Daily Active Forms',
      categoriesDatas: [15, 20, 45, 37, 30, 42, 56, 22, 11, 32, 29, 30, 41, 33],
      categories: ['10/10', '10/11', '10/12', '10/13', '10/14', '10/15', '10/16', '10/17', '10/18', '10/19', '10/20', '10/21', '10/22', '10/23']
    },
    
    onReady: function (e) {
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
            categories: this.data.categories,
            series: [{
                name: this.data.title,
                data: this.data.categoriesDatas,
                format: function (val, name) {
                    return val.toFixed(2);
                }
            }],
            yAxis: {
                format: function (val) {
                    return val;
                },
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
    }
});