export const state = () => ({
  user: {},
  chats: [],
  messages: [],
  users: [],
})

export const getters ={
  getUser(state) {
    return state.user
  },
  getChats(state) {
    return state.chats
  },
  getMessages(state) {
    return state.messages
  },
  getUsers(state) {
    return state.users
  },
  getСounter(state) {
    return state.counter
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setChat(state, newChat) {
    state.chats.push(newChat)
  },
  setChats(state, newChats) {
    state.chats = newChats
  },
  deleteChat(state, index) {
    state.chats.splice(index, 1)
  },
  selectChat(state, nameChat) {
    state.user = { ...state.user, nameChat }
  },
  setUserId(state, id) {
    state.user = { ...state.user, id }
  },
  clearMessages(state) {
    state.messages = []
  },
  clearUser(state) {
    delete state.user.nameChat
  },
  clearUsers(state) {
    state.users = []
  },
  counterMessages(state, data) {
    state.chats.forEach(chat => {
      if (data.room === chat.nameChat && !data.system
        && data.name !== state.user.name && state.user.nameChat !== data.room) {
         chat.counterMessages++
      }
    })
  },
  resetCounterMessages(state, index) {
    state.chats[index].counterMessages = 0
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  }
} 

export const actions = {
  SOCKET_newMessage({ commit }, data) {
    commit('SOCKET_newMessage', data)
    commit('counterMessages', data) 
  },
  SOCKET_updateUsers({ commit }, data) {
    commit('SOCKET_updateUsers', data)
  },
  SOCKET_setChat({ commit }, data) {
    commit('setChat', data)
  }
}