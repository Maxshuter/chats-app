const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()
const chats = require('./chats')()
const { v4: uuidv4 } = require('uuid')

io.on('connection', socket => {

  socket.on('login', (name, callback) => {
    if (!name) {
      return callback('Некорректные данные!')
    } else if (users.getAll().find(user => user.name === name)) {
      return callback('Пользователь с таким логином уже есть!')
    }

    chats.getAll().forEach(chat => {
      if (chat.listUsers.indexOf(name) != -1) {
        socket.emit('setChat', {nameChat: chat.name})
      }  
    })
    callback()
  })

  socket.on('userJoin', (data, callback) => {
    
    socket.join(data.nameChat)
    
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      nameChat: data.nameChat
    })

    if (!chats.get(data.nameChat))
      chats.add({
        id: uuidv4(),
        name: data.nameChat,
        listUsers: []
      })
    
    if (chats.get(data.nameChat).listUsers.indexOf(data.name) == -1) {
      chats.addUser(chats.get(data.nameChat), data.name)
    }
    
    callback({ userId: socket.id})
    io.to(data.nameChat).emit('updateUsers', users.getByAll(data.nameChat))
        
    socket.emit('newMessage', { 
      system: true, 
      text: `Добро пожаловать в чат, ${data.name}!`,
      room: data.nameChat
    })
   
    socket.broadcast
      .to(data.nameChat)
      .emit('newMessage', { 
        system: true, 
        text: `${data.name} зашёл в чат!`,
        room: data.nameChat
      })
  })

  socket.on('setMessage', (data, callback) => {
    if (!data.text) {
      return callback('Текст не может быть пустым!')
    }

    const user = users.get(data.id)
    if (user) {
      io.to(user.nameChat)
        .emit('newMessage', { 
          name: user.name, 
          text: data.text, 
          id: data.id,
          room: user.nameChat 
        })
    }
    callback()
  })
  
  socket.on('forsedisconnect', (data, callback) => {
    const user = users.remove(data.id)
    console.log('leaving room', data.nameChat);
    socket.leave(data.nameChat); 
    if (user) {
      io.to(user.nameChat).emit('updateUsers', users.getByAll(user.nameChat))
      io.to(user.nameChat)
        .emit('newMessage', {
          system: true, 
          text: `${user.name} покинул чат!`,
          room: user.nameChat
        })
    }
    callback()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.nameChat).emit('updateUsers', users.getByAll(user.nameChat))
      io.to(user.nameChat)
        .emit('newMessage', {
          system: true, 
          text: `${user.name} покинул чат!`,
          room: user.nameChat
        })
    }
  })
})

server.listen(3001, ()=> {
  console.log('listening http://localhost:3001')  
})

module.exports = { 
  path: '/api',
  handler: app
}
