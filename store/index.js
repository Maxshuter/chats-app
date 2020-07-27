export const state = () => ({
  user: {},
  chats: []
})

export const getters ={
  getUser(state) {
    return state.user
  },
  getChats(state) {
    return state.chats
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
  }
} 

export const actions = {
  SOCKET_message(context, data) {
    console.log('Message', data)
  }
}