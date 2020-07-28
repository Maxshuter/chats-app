export const state = () => ({
  user: {},
  chats: [],
  messages: []
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
  }
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
    state.user = {}
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  }
} 

export const actions = {
  SOCKET_newMessage({ commit }, data) {
   commit('SOCKET_newMessage', data)
  }
}