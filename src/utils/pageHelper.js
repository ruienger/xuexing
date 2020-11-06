// 分页助手，给出原始数据，筛选条件和分页条件即可返回一个分好页的数据！！
//   参数：原始数据，筛选条件 例如： { status：'已报名' } 可添加多个条件，分页条件 { page: 0; pageSize: 10 }
// 返回 数组

function pageHelper(originArr, filterObj, pageObj){
    // 从原始数据中 过滤 符合条件的
    for(let key in filterObj){
        if(!filterObj[key] || filterObj[key]=='none'){
            continue
        }
        originArr = originArr.filter( ele => {
            return ele[key] == filterObj[key]
        })
    }
    // 分页
    let startPage = pageObj.page * pageObj.pageSize
    return originArr.slice(startPage, startPage + pageObj.pageSize)
}

export default pageHelper
      