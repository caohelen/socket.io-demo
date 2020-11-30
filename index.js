// 引入模块
var express = require('express');
var socket = require('socket.io');

// 实例化express对象
var app = express();

// 监听端口号
var server = app.listen(4000, () => console.log('服务器正在4000端口号运行...'));


// 让服务器识别静态文件
app.use(express.static('public'));

// 设置socket.io
var io = socket(server);
io.on('connection',(socket)=> {
    console.log('实现socket连接',socket.id)

    // 获取从客户端发送的数据（chat）
    socket.on('chat',(data) => {
        io.sockets.emit('chat', data);
    })

    // 获取从客户端发送的数据（typing）
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
})