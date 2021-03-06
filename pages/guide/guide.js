// pages/guide/guide.js
import request from "../../common/noBaseRequest";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    audioPlay: true,
    oneRow: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request
      .get(`https://v1.hitokoto.cn/`)
      .then(res => {
        console.log(res);
        this.setData({
          oneRow: {...res.data}
        })
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    this.innerAudioContext.loop = true;
    this.innerAudioContext.src = "http://other.web.nf03.sycdn.kuwo.cn/b0dd845e58d6ba387f49fd4f603ba5c2/5cd6eeaa/resource/a1/72/81/3260445309.aac"
    this.innerAudioContext.onPlay(() => {
      console.log("开始播放");
    });
    this.innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * 切换audio播放和暂停
   */
  switchAudio: function() {
    this.setData({
      audioPlay: !this.data.audioPlay
    });
    if (this.data.audioPlay) {
      this.innerAudioContext.play();
    } else {
      this.innerAudioContext.pause();
    }
  },

  /**
   * 前往首页
   */
  goToIndex: function() {
    this.innerAudioContext.destroy();
    wx.switchTab({
      url: "/pages/index/index" //实际路径要写全
    });
  }
});
