<template>
  <v-main class="grey lighten-3 pa-4">
    <v-container class="fill-height">
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <div class="primary">
              <v-col>
                <v-row justify="center">
                  <v-avatar
                    class="ma-3"
                    size="150"
                    tile
                  >
                    <v-img src="chat.png"/>
                  </v-avatar>
                </v-row>            
                <v-row justify="center">
                  <v-card-title class="white--text">Вход в мессенджер</v-card-title>
                </v-row>
            </v-col>
            </div>
            
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  v-model="name"
                  label="Ваш логин"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  :counter="25"
                  :rules="nameRules"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row 
               align="center" 
               justify="center"
              >
                <v-btn 
                  :disabled="!valid" 
                  color="primary" 
                  @click="login"
                  >
                 Войти
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      top
      color="error"
      timeout="5000"
    >
      {{textError}}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex'

export default {
  layout: 'empty',
  name: 'index',

  head() {
    return { title: "Добро пожаловать!" }
  },

  data: () => ({
    textError: "",
    snackbar: false,
    valid: true,
    lazy: true,
    name: "",
    nameRules: [
      v => !!v || "Введите логин",
      v => (v && v.length <= 25) || "Логин не должен превышать 25 символов",
      v => v.trim() !== "" || "Логин не должен быть пустым"
    ]
  }),
  sockets: {
    connect() {
      console.log('Client IO connected')
    }
  },
  computed: { ...mapGetters(['getUser']) },
  methods: {
    ...mapMutations(['setUser']),

    login() {
      if (this.$refs.form.validate()) {
          this.$socket.client.emit('login', this.name.replace(/ +/g, ' ').trim(), data => {
            if (typeof data === 'string') {
              this.textError = data
              this.snackbar = true
              console.error(data)
            } else {
              const user = { name: this.name }
              this.setUser(user)
              this.$router.push("/chats")
            }
          })
      }
    }
  }
}
</script>
