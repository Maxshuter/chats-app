const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

//test sockets
io.on('connection', socket => {
  socket.on('userLogin', (data, callback) => {
    if (!data.name) {
      return callback('Некорректные данные!')
    }
    console.log(data.nameChat)
    socket.join(data.nameChat)
    
    console.log(socket.id)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      nameChat: data.nameChat
    })

    callback({ userId: socket.id})
    socket.emit('newMessage', { 
      name: 'admin', 
      text: `Добро пожаловать в чат, ${data.name}!`
    })
   
    socket.broadcast
      .to(data.nameChat)
      .emit('newMessage', { 
        name: 'admin', 
        text: `${data.name} зашёл в чат!`
      })
  }),

  socket.on('setMessage', (data, callback) => {
    if (!data.text) {
      return callback('Текст не может быть пустым!')
    }

    const user = users.get(data.id)
    if (user) {
      io.to(user.nameChat).emit('newMessage', { 
        name: user.name, 
        text: data.text, 
        id: data.id 
      })
    }
    callback()
  })  
})

server.listen(3001, ()=> {
  console.log('listening http://localhost:3001')  
})

module.exports = { 
  path: '/api',
  handler: app
}
