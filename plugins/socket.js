import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIO, io('http://localhost:3001'),
  {
    store,
    debug: false,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  })
}
