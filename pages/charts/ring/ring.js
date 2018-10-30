var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
Page({
  data: {
      percentage: [
        { name: 'My Forms', data: 73, stroke: false }, 
        { name: 'Recycle bin', data: 10, stroke: false}, 
        { name: 'Avaliable', data: 17, stroke: false}
      ]
    },
    touchHandler: function (e) {
      var index = ringChart.getCurrentDataIndex(e);
      console.log(this.data.percentage[index].name);
      ringChart.updateData({
        title: {
          name: this.data.percentage[index].data + '%'
        },
        subtitle: {
          name: this.data.percentage[index].name,
        }
      });
    },   
    onReady: function (e) {
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
                name: this.data.percentage[0].data + '%',
                color: '#FF6600',
                fontSize: 25
            },
            subtitle: {
                name: this.data.percentage[0].name,
                color: '#666666',
                fontSize: 15
            },
            series: this.data.percentage,
            disablePieStroke: true,
            width: windowWidth,
            height: 200,
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
    }
});