<template>
  <v-layout>
   <h1>hello</h1>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'empty',
  middleware: ['chats'],
  computed: { ...mapGetters(['getUser']) }
}
</script>