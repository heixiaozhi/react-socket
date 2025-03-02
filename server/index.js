const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
// 使用中间件
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`User connect ${socket.id}`)

  // 加入房间
  socket.on('join_room', (data) => {
    socket.join(data)
  })

  // 监听客户端发送的信息
  socket.on('send_message', (data) => {
    // 向房间内的其他人发送信息
    socket.to(data.room).emit('receive_message', data)
    // 发送信息给其他客户端
    // socket.broadcast.emit('receive_message', data)
  })
})

server.listen('3001', () => {
  console.log('Server is running on port 3001')
})
