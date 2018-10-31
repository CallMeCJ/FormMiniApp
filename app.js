//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力.
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    serverPath: 'https://forms.office-int.com',
    token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im45SF9ZSkRDbTd5SmJsRDBoQ0NVM3A3bXBqQSIsImtpZCI6Im45SF9ZSkRDbTd5SmJsRDBoQ0NVM3A3bXBqQSJ9.eyJhdWQiOiJjOWE1NTlkMi03YWFiLTRmMTMtYTZlZC1lN2U5YzUyYWVjODciLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLXBwZS5uZXQvZjY4NmQ0MjYtOGQxNi00MmRiLTgxYjctYWI1NzhlMTEwY2NkLyIsImlhdCI6MTU0MDg4NzE5NCwibmJmIjoxNTQwODg3MTk0LCJleHAiOjE1NDA4OTEwOTQsImFpbyI6IkFWUUFxLzhNQUFBQW13dFh0a09FeUsvSlE0YVErNGRQbDJuYW1ZSGhrMVc4eWdQWHpIZmd4T1BxUjhxMnRDbG9pUmlmZldhWWNvR2tDTG84RTFOdFVwWVEvMHN3MXJmWjllYWJTQ0d0SUhXSlJ2OE5IOEZTNmVzPSIsImFtciI6WyJ3aWEiLCJtZmEiXSwiY19oYXNoIjoiNi01VVFib0ZlZEkyVlQtYkFGOEdRdyIsImZhbWlseV9uYW1lIjoiWmhlbmciLCJnaXZlbl9uYW1lIjoiQ2hhb0ppZSIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMTY3LjIyMC4yMzIuODIiLCJuYW1lIjoiQ2hhb0ppZSBaaGVuZyIsIm5vbmNlIjoiOTY1NzAxZjItZDdjMS00Yjg0LTljNGItZmVhMGJlYThhNDM0LjYzNjc2NDY0MDU5MzA2MzY5OCIsIm9pZCI6IjczZDQ5NTFlLWE2MGQtNDIyYi04OGUxLWJhMTYzZjk2N2U5MyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMTQ2NzczMDg1LTkwMzM2MzI4NS03MTkzNDQ3MDctMjM0MzA5NCIsInB1aWQiOiIxMDAzQkZGREE5NUZDQ0RBIiwic3ViIjoiQWhqVTBSd0phbXZIRksxU1lzUllSR1Jod1VWZnNJSDlQQ095RFNKWDBWYyIsInRpZCI6ImY2ODZkNDI2LThkMTYtNDJkYi04MWI3LWFiNTc4ZTExMGNjZCIsInVuaXF1ZV9uYW1lIjoiY2h6aGVAbWljcm9zb2Z0LmNvbSIsInVwbiI6ImNoemhlQG1pY3Jvc29mdC5jb20iLCJ1dGkiOiJSU2pMLWtaSEdraWR4TGhjUDBRYUFBIiwidmVyIjoiMS4wIn0.GKM2gwxhMnLObyeQ9h_yzVZnYIs1qjxg8Vk025FQhlPe62zHgW7HuFTY5AhliGzULRCN657-RYnmXj2EARW4Y7AUhZx1vplZd_8NzSDzlZlnpVcQlRzk3LjK2tOAxO_c24UzWyfmKY7Pz07z_6YDff2rjxX27BxcITFpSRDA1_9nCtBePnLdMXrpKQcaThDMf671OAbNrhyH8zkf3HagajKXtpVbLaFNPyQgkCY2w212SCsEJ3Yqhwn3jAxePk7q82i_q-T3wb3ciVKVxe4nbPdoZAbGuu6Rr0u-vzjJclfi1-ZsdKBQIsDPjPsujywGfwGcV9MAtwyqz1AWzCqyrg'
  }
})