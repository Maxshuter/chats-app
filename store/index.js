export const state = () => ({
  user: {}
})

export const getters ={
  getUser(state) {
    return state.user.name
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
} 

export const actions = {
  SOCKET_message(context, data) {
    console.log('Message', data)
  }
}