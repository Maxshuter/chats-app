export const state = () => ({
  user: {},
  chats: [],
  messages: [],
  users: []
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
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setChat(state, newChat) {
    state.chats.push(newChat)
  },
  deleteChat(state, index) {
    state.chats.splice(index, 1)
  },
  selectChat(state, chat = {}) {
    state.user = { ...state.user, ...chat }
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
  },
  SOCKET_updateUsers({ commit }, data) {
    commit('SOCKET_updateUsers', data)
  }
}