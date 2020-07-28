<template>
  <div class="wrap">
    <div class="chat">
      <Message v-for="(message, i) in getMessages" 
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
  computed: { ...mapGetters(['getUser', 'getMessages']) }
}
</script>

<style scoped>
/* .wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
} */

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