<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer_chats">
      <v-list subheader>
        <v-subheader inset>Список чатов</v-subheader>
        <v-list-item
          v-for="(chat, i) in getChats"
          :key="i"
          @click="selectСhat(i)">
          <v-list-item-content>
            <v-list-item-title v-text="chat.nameChat"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon >
            <v-icon @click="escape(i)">mdi-delete</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-text-field
              append-outer-icon="mdi-close"
              v-show="show"
              v-model="name"
              label="Имя чата"
              name="chat"
              type="text"
              :counter="20"
              :rules="chatRules"
              @click:append-outer="show = false"
              required/>
        </v-form>
      </v-container>
      <v-row justify="center">
        <v-btn color="primary" @click="createChat">
          <v-icon left>{{btnAddChat.icon}}</v-icon>
          {{btnAddChat.text}}
        </v-btn>
      </v-row>
    </v-navigation-drawer>

    <v-navigation-drawer right app v-model="drawer_user">
      <v-list subheader>
        <v-subheader inset>Учасники чата</v-subheader>
        <v-list-item
          v-for="item in getUsers"
          :key="item.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon :color="item.id === getUser.id ? 'primary' : 'grey'">mdi-chat</v-icon>
          </v-list-item-icon>
        </v-list-item>
     </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon @click="drawer_chats = !drawer_chats"/>
      {{getUser.name}} <span v-show="getUser.nameChat"> ------> </span> {{this.getUser.nameChat}}
      <v-spacer></v-spacer>
      <v-btn icon  @click="drawer_user = !drawer_user">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div>
        <nuxt/>
      </div>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      top
      left
      color="error"
      timeout="5000"
    >
      Чат с таким именем уже есть в списке
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
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
      snackbar: false,
      valid: true,
      show: false,
      drawer_chats: true,
      drawer_user: true,
      name: "",
      chatRules: [
        v => !!v || "Введите имя чата",
        v => (v && v.length <= 20) || "Имя чата не должен превышать 20 символов",
        v => (v && v.trim() !== "") || "Имя чата не должно быть пустым",
      ]
  }),
  computed: { 
    ...mapGetters(['getUser', 'getChats', 'getUsers']),
    
    btnAddChat () { 
      return {
        text: !this.show ? 'Новый чат' : 'Создать',
        icon: !this.show ? 'mdi-plus' : 'mdi-check'
      }
    }
  },
  methods: {
    ...mapMutations(
      ['setChat', 'deleteChat', 'selectChat', 
      'setUserId', 'clearMessages', 'clearUser', 'clearUsers']),

    createChat() { 
      if (this.show) { 
        if (this.$refs.form.validate()) {
          if(this.getChats.find(chat => chat.nameChat === this.name)) {
            this.snackbar = true 
          } else {
            const newChat = { nameChat: this.name }
            this.setChat(newChat)
            this.selectСhat(this.getChats.length - 1)
          }  
        } 
      } 
      this.$refs.form.reset()
      
      return this.show = !this.show
    },

    escape(i) {
      this.$socket.client.emit('forsedisconnect', this.getUser, ()=> {
        this.$router.push("/chats") 
        this.deleteChat(i)  
        this.clearUser()
        this.clearUsers()
      })
    },

    selectСhat(i) { 
      this.$router.push('/chats/' + this.getChats[i].nameChat)
      if (this.getChats[i].nameChat !== this.$route.params.id) {
        this.selectChat(this.getChats[i])
        this.$socket.client.emit('userJoin', this.getUser, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            this.setUserId(data.userId)
          }
        })
      } 
    }
  }
}
</script>
