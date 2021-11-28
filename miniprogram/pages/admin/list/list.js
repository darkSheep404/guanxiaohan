Page({
  /**
   * 页面的初始数据
   */
  data: {
    storelist: [ {_id: "3f1780f46031242d0151f5055e4bdea8", beizhu: "均价:  300元。\n特点：平价店，大店，种类款式多，有男款", storeName: "重回汉唐",official:true}],
    id:null,
    currentId:null,
    tips:null,
    currentPages:0,
    maxPages:0,
    inputPages:0,
    loadModel2:false,
    loadModel:false,
  },
  prevPage:function(e){
    this.setData({
      currentPages:this.data.currentPages-1
    })
    console.log("向前翻了一页,当前页数",this.data.currentPages)
    this.getStoreList(this.data.currentPages)
  },
  nextPage:function(e){
    var temp=this.data.currentPages
    console.log("翻页前前页数",this.data.currentPages)
    this.setData({
      currentPages:temp+1
    })
    console.log("后翻了一页,当前页数",this.data.currentPages)
    this.getStoreList(this.data.currentPages)
  },
  switchPages:function(e){
    this.setData({
      currentPages:parseInt(this.data.inputPages)
    })
    this.getStoreList(this.data.currentPages)
  },
  onItemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  input: function (e) {
    this.setData({
     inputPages: e.detail.value-1
    })
    console.log("输入事件")
    console.log(this.data.inputPages)
  },
  
  onItemPress:function (e) {
    this.setData({
      loadModel:true,
      currentId:e.currentTarget.dataset.id
    })
    console.log("长安--->",e.currentTarget.dataset.id)
  },
  hideModel:function(e){
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
          loadModel:false
        })
        console.log("删除了一个店铺数据")   
      },
      fail: console.error
    })
  },
  getStoreList:function(pages){
    var that=this;//进入云函数中this发生了变化,使用this.setData({})无效
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_store_list',
      data:{
        pages:pages
      },
    //携带的参数:storeName--云函数中使用event.storeName获取
    //成功后执行
      success: function (res) {
        var data = res.result.storeList.data 
        that.setData({
          //此处设置一个加载中弹窗,区分删除确认弹窗
          loadModel2:false,
          storelist: data
        })
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
          tips:data[0].tips,
          loadModel2:true,
        })
        console.log(data[0].tips)
      }
    })

    wx.cloud.callFunction({
      name:'get_store_count',
      success:function(res)
      {
        console.log("---------------->")
        console.log(res)
        var data=res.result.total
        that.setData({
          //向下取整:13=4*3+1 3,3,3,3,1共5页
          //
          maxPages:Math.floor(data/10)+1
        })
        console.log("最大页面数",that.data.maxPages)
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
    this.setData({
      loadModel2:true
    })
   this.getStoreList(0)
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