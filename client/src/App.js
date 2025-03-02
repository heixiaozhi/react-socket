import io from 'socket.io-client'
import { useEffect, useState } from 'react'
// 建立连接
const socket = io('http://localhost:3001')

function App() {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState('')
  function sendMessage() {
    // 发送信息
    socket.emit('send_message', { message, room })
  }
  function joinRoom() {
    if (!room) return
    socket.emit('join_room', room)
  }

  useEffect(() => {
    // 监听信息
    socket.on('receive_message', (data) => {
      setReceivedMessage(data.message)
    })
  }, [socket])

  return (
    <div className='App'>
      <input
        type='text'
        placeholder='Join room'
        value={room}
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>join</button>
      <input
        type='text'
        placeholder='Message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>send</button>
      <h1>Message: {receivedMessage}</h1>
    </div>
  )
}

export default App
