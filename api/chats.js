class Chats {
  constructor() {
    this.chats = []
  }

  add(chat) { this.chats.push(chat) }

  addUser(chat, user) { chat.listUsers.push(user) }

  get(room) { return this.chats.find(chat => chat.name === room) }

  //remove(listUsers, name) { if(listUsers.indexOf(name) != -1) {listUsers.splice(indexOf(name), 1)}}

  getAll() { return this.chats}

  //getByAll(nameUser) { return this.chats.filter(chat => !chat.listUsers.find(user => user.name === nameUser)) }
    
}

module.exports = function() {
  return new Chats()
}
