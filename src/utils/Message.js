

//作用 返回一个Message的内容对象
//     参数: 消息
function newMessage(msg, type){
    return {
        message: msg || 'OK',
        type: type,
        duration: 3000
    }
}

export { newMessage }