<template>
  <v-flex xs12>
    <v-text-field label="Введите сообщение" outline v-model="text" @keydown.enter="send"/>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: ""
  }),
  methods: {
    send() {
      this.$socket.client.emit('setMessage',
        {
          text: this.text,
          id: this.$store.getters.getUser.id
        },
        data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.text = "";
          }
        }
      );
    }
  }
};
</script>

