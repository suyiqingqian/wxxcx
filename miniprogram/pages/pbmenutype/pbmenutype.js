let db = wx.cloud.database();

import DB from '../../utils/DB'
import { tables  } from '../../utils/config'

Page({
  data: {
    typename:'', //分类名称
    recipeTypes:[], // 菜谱分类列表
    id:'', //根据此id修改菜谱分类
  },
  onLoad(){
    this._gitRecipeType()
    // db.collection(tables.typename).doc().update()
  },
  // 删除菜谱分类，根据id
  _doRecipeTypeById(e){
    // console.log(e);
    // return
    let id = e.currentTarget.dataset.id
    let _this = this
    wx.showModal({
      title: '云菜谱温馨提示',
      content:'您确定要离开我吗~',
      async success(res){
        if(res.confirm){
          let result = await db.collection(tables.typename).doc(id).remove()
          // console.log(result,'删除的信息');
          if(result.stats.removed > 0){
            wx.showToast({
              title: '删除成功',
            })
            _this._gitRecipeType() //同步一下数据
          }
        }
      }
    })
    
  },
  // 点击修改文字按钮显示，修改input框，同时为data中的id赋值
  _editHandle(e){
    // console.log(e.currentTarget.dataset);
    let { id,typename } = e.currentTarget.dataset
    this.setData({
      id,typename
    })
  },
  // 修改菜谱的名称
  async _doUpdateRecipeTypename(){
    /*
      根据id修改数据：8e5be7055f8ab8af01e5dce47e09fbcb
    */
    // console.log(this.data);
    let { id,typename } = this.data
    let result = await DB._updateById( tables.typename,id,{ typename } )
    console.log(result,'修改的结果');
    if( result.stats.updated > 0 ){
      wx.showToast({
        title: '修改成功',
      })
      this._gitRecipeType() //同步一下修改的数据
    }
    // this.setData({
    //   typename:result.data
    // })
    // console.log(result,'修改的结果');
  },
  // 获取菜谱分类的数据
  async _gitRecipeType(){
    let result = await DB._get(tables.typename,{ status:'1' })
    // console.log(result)
    this.setData({
      recipeTypes:result.data
    })
  },
  // 监听菜谱分类名称的修改
  _typenameHandle(e){
    // console.log(e.detail)
    this.data.typename = e.detail.value
  },
  // 添加菜谱的分类
  async _doPublishRecipeType(){
    // console.log(this.data);
    let typename = this.data.typename
    let result = await DB._add(tables.typename,{ typename,status:'1' })
    // console.log(result,"添加结果")
    if(result._id){
      wx.showToast({
        title: '添加成功',
        mask:true
      })
      this._gitRecipeType()
      this.setData({
        typename:''
      })
    }
  }
})