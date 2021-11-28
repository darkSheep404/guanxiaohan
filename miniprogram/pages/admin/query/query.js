Page({
  /**
   * 页面的初始数据
   */
  data: {
    included:true,
    storelist: [ {_id: "3f1780f46031242d0151f5055e4bdea8", beizhu: "均价:  300元。\n特点：平价店，大店，种类款式多，有男款", storeName: "重回汉唐",official:true}],
    id:null,
    currentId:null,
    tips:null,
    storeName:null,
  },

  onItemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  input: function (e) {
    this.setData({
      storeName: e.detail.value
    })
    console.log("输入事件")
    console.log(this.data.storeName)
  },
  queryStoreList:function(){
    var that = this
    console.log("查询",that.data.storeName)
    //修复输入框为空时,提交空参数给云函数造成的卡死错误
   if(that.data.storeName===null)
   {
     console.log("未输入")
     return
   }
    that.setData({
      loadModal:true
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_store_byName',
      data:{
       storeName:that.data.storeName
      },
      success: function (res) {
        //提取数据
        var data = res.result.storelist.data
        console.log(res)
        if(data.length>0){
        that.setData({
          loadModal:false,
          storelist: data,
          included:true,
        })}
        else
        {
          //TODO 此处应该监听到输入后,把included设置为true
          //TODO 未查询到数据时:更新字符串,显示未查询到的提示语
          that.setData({
            showName:that.data.storeName,
            loadModal:false,
            storelist: data,
            included:false,
          })
        }
      },
      fail: console.error
    })
  },
  onItemPress:function (e) {
    this.setData({
      loadModel2:true,
      currentId:e.currentTarget.dataset.id
    })
    console.log("长安--->",e.currentTarget.dataset.id)
  },
  hideModal:function(e){
    this.setData({
      loadModel:false,
    })
  },
  delItem:function(e){
    var that=this
    console.log("确认--->",that.data.currentId)
    wx.cloud.callFunction({
      // 云函数名称
      name: 'del_store_byId',
    //携带的参数:storeName--云函数中使用event.storeName获取
      data:{
       id:that.data.currentId
      },
    //成功后执行
      success: function (res) {
        console.log(res)
        that.setData({
          loadModel2:false
        })
        console.log("删除了一个店铺数据")   
      },
      fail: console.error
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
//tipname
console.log("---------------->")
    wx.cloud.callFunction({
      name:'get_tips',
     data:{
       tipname:"adminList"
      },
      success:function(res)
      {
        var data=res.result.tips.data
        that.setData({
          tips:data[0].tips
        })
        console.log(data[0].tips)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})