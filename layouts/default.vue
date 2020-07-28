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
            <v-icon @click="deleteСhat(i)">mdi-delete</v-icon>
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
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon :color="item.active ? 'primary' : 'grey'">mdi-chat</v-icon>
          </v-list-item-icon>
        </v-list-item>
     </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon @click="drawer_chats = !drawer_chats"/>
      {{getUser.name}} <span v-show="getUser.nameChat"> ------> </span> {{getUser.nameChat}}
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
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => {
    return {
      valid: true,
      name: '',
      show: false,
      drawer_chats: true,
      drawer_user: true,
      items: [
        { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      chatRules: [
        v => !!v || "Введите имя чата",
        v => (v && v.length <= 20) || "Имя чата не должен превышать 20 символов" 
      ]
    }
  },
  computed: { 
    ...mapGetters(['getUser', 'getChats']),
    
    btnAddChat () { 
      return {
        text: !this.show ? 'Новый чат' : 'Создать',
        icon: !this.show ? 'mdi-plus' : 'mdi-check'
      }
    }
  },
  methods: {
    ...mapMutations(['setChat', 'deleteChat', 'selectChat', 'setUserId', 'clearMessages', 'clearUser']),

    createChat() { 
      if (this.show) { 
        if (this.$refs.form.validate()) {
          const newChat = { nameChat: this.name }
          this.setChat(newChat)
        } 
      } 
      this.$refs.form.reset()
      
      return this.show = !this.show
    },

    deleteСhat(i) { this.deleteChat(i) },

    selectСhat(i) { 
      this.clearMessages()
      this.selectChat(this.getChats[i])
      this.$socket.client.emit('userLogin', this.getUser, data => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.setUserId(data.userId) 
        }
      })
    }
  }
}
</script>
