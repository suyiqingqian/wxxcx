let db = wx.cloud.database()
/*
  _add：数据的添加操作
    params：
      collection：集合表名
      data：添加的数据参数
*/
const _add = ( collection,data = {} )=>{
  // console.log(collection,data)
  return db.collection( collection ).add( { data } ) //返回的是promise
}
/*
  _get：查询一组
    params:
      collection：集合表名
      where：条件
*/ 
const _get = ( collection,where = {} )=>{
  return db.collection(collection).where(where).get()
}
/*
  _updateById：更新一条数据
    params:
      collection：集合表名
      id：要更新哪个数据的id
      data：要更新的数据
*/
const _updateById = ( collection='',id='',data={} )=>{
  return db.collection( collection ).doc( id ).update({ data })
}


export default{
  db,
  _add,
  _get,
  _updateById,
  
}