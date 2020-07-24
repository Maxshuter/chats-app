export const state = () => ({
  user: {},
  chats: []
})

export const getters ={
  getUser(state) {
    return state.user.name
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
  }
} 

export const actions = {
  SOCKET_message(context, data) {
    console.log('Message', data)
  }
}