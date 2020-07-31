class Chats {
  constructor() {
    this.chats = []
  }

  add(chat) { this.chats.push(chat) }

  addUser(chat, user) { chat.listUsers.push(user) }

  get(room) { return this.chats.find(chat => chat.name === room) }

/*   remove(id) {
    const user = this.get(id)
    if (user) { this.users = this.users.filter(user => user.id !== id) }
    return user
  } */

  getAll() { return this.chats}

  //getByAll(nameUser) { return this.chats.filter(chat => !chat.listUsers.find(user => user.name === nameUser)) }
    
}

module.exports = function() {
  return new Chats()
}
