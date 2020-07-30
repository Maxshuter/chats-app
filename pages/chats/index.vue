<template>
  <v-layout>
   <v-row justify="center">
     <h1 style="color:grey">Добро пожаловать, {{getUser.name}}!</h1>
    </v-row>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return { title: this.getUser.name }
  },
  middleware: ['chats'],
  computed: { ...mapGetters(['getUser']) }
}
</script>