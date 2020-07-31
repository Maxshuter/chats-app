<template>
  <v-main class="grey lighten-3 pa-4">
    <v-container 
      class="fill-height"
      fluid
    >
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
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    large
                    target="_blank"
                    v-on="on"
                  >
                    <v-icon>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="name"
                  label="Login"
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
                  Login
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Введите логин",
      v => (v && v.length <= 25) || "Логин не должен превышать 25 символов" 
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
        const user = { name: this.name }
        this.setUser(user)
        this.$socket.client.emit('login', this.getUser, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            this.$router.push("/chats")
          }
        })
      }
    }
  }
}
</script>
