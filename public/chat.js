// 实现和服务端的连接
var socket = io.connect('http://localhost:4000');

// 获取节点
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// 事件监听
btn.addEventListener('click',()=> {
    // 实现客户端向服务器传输数据
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    });
    message.value ='';
})
// 向服务器端发送事件
message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
})

// 获取从服务器传输的数据
socket.on('chat',(data)=>{
    feedback.innerHTML ='';
    output.innerHTML += `<p><strong>${data.handle}:${data.message}</strong></p>`
})

// 获取从服务器广播的数据
socket.on('typing',(data)=> {
    feedback.innerHTML = `<p><em>${data}正在输入...</em></p>`
})