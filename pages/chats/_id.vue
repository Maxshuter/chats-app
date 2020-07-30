<template>
  <div class="wrap">
    <div class="chat" ref="block">
      <Message v-for="(message, i) in getRoomMessages" 
        :key="i" 
        :name="message.name" 
        :text="message.text" 
        :owner="message.id === getUser.id"/>
    </div>
    <div class="form">
      <InputMessage/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from '@/components/Message'
import InputMessage from '@/components/InputMessage'

export default {
  name: 'chat',
  middleware: ['chats'],
  components: { Message, InputMessage },
  head() {
    return { 
      title: this.getUser.name,  
      titleTemplate: '%s - ' + this.$route.params.id 
    }
  },
  computed: { 
    ...mapGetters(['getUser', 'getMessages']),
    
    getRoomMessages() { 
      return this.getMessages
        .filter(message => message.room === this.$route.params.id || 
          (message.name === 'admin' && message.room === this.$route.params.id))    
    },
  },
  watch: {
    getRoomMessages() {
      this.$nextTick(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
.form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: #f0f0f0
}

.chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>