<template>
  <v-layout>
   <h1>{{ getUser }}</h1>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'chats',
  middleware: ['chats'],
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>