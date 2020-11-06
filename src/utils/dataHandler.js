import request from '@/utils/request'
import Message from 'element-ui'
import qs from 'querystring'
import {
  newMessage
} from '@/utils/Message'
// 这个js文件主要用来
//     封装store中数据的actions，其中又包括
//         新增/修改数据 -- saveOrUpdate
//         根据ID删除数据 -- deleteById
//         查询数据 -- query或者findAll等



//作用 新增/修改数据
//      参数: url 要传递的数据 回调
function saveOrUpdate(url, data, callback) {
  // 发送请求
  request({
    method: 'POST',
    url: url,
    data: qs.stringify(data)
  }).then((result) => {
    // 成功接收响应，弹出提示并将响应返回
    alert(result.message)
    callback(result.data)
  })
}

//作用 删除指定数据
//      参数: url id 回调
function deleteById(url, data, callback) {
  //判断id是否合法
  if (!Number(data)) {
    throw 'ID不合法'
  }
  // 发送请求
  request({
    method: 'GET',
    url: url + '?id=' + data,
    data: qs.stringify(data)
  }).then((result) => {
    // 成功接收响应，弹出提示并将响应返回
    callback(result.data)
  })
}

//作用 查询分页数据
//      参数: url list 回调
function queryPage(url, list, callback) {
  // 发送请求
  request({
    method: 'POST',
    url: url,
    data: qs.stringify(list)
  }).then((result) => {
    // 成功接收响应，弹出提示并将响应返回
    callback(result.data)
  })
}

//作用 查询所有数据
//      参数: url 回调
function queryAll(url, callback) {
  // 发送请求
  request({
    method: 'GET',
    url: url
  }).then((result) => {
    // 成功接收响应，弹出提示并将响应返回
    callback(result.data)
  })
}

//作用 查询指定数据
//      参数: url 指定的id 回调
function queryByTarget(url, target /* 以键值对的形式传值 例如{ customerId: id } */ , callback) {
  // 发送请求
  let urlStr = ''
  // 将条件遍历后组成请求url
  for (let item in target) {
    urlStr += item + '=' + target[item] + '&'
  }
  // 去掉最后一个 &
  urlStr = urlStr.substring(0, urlStr.length - 1)
  request({
    method: 'GET',
    url: url + '?' + urlStr
  }).then((result) => {
    // 成功接收响应，弹出提示并将响应返回
    callback(result.data)
  })
}

export {
  queryAll,
  queryPage,
  deleteById,
  saveOrUpdate,
  queryByTarget
}
