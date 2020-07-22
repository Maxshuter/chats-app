const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

//test sockets
io.on('connection', socket => {
  console.log('IO connected')

  socket.on('setMessage', data => {
    setTimeout(() => {
      socket.emit('message', {
        text: data.text + ' to server'
      })
    }, 500)
  })  
})

server.listen(3001, ()=> {
  console.log('listening http://localhost:3001')  
})

module.exports = { 
  path: '/api',
  handler: app
}
