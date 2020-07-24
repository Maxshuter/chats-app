<template>
  <v-app app>
    <v-navigation-drawer app  v-model="drawer_chats">
      <v-list subheader>
        <v-subheader inset>Список чатов</v-subheader>
        <v-list-item
          v-for="chat in getChats"
          :key="chat.name"
          @click="">
          <v-list-item-content>
            <v-list-item-title v-text="chat.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-chat</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-container>
        <v-text-field
           v-show="show"
           v-model="name"
           label="Имя чата"
           name="chat"
           type="text"
           :counter="20"
           :rules="chatRules"/>
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
      {{getUser}}
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
    ...mapMutations(['setChat']),

    btnAddChat () { 
      return {
        text: !this.show ? 'Новый чат' : 'Создать',
        icon: !this.show ? 'mdi-plus' : 'mdi-check'
      }
    }
  },
  methods: {
    createChat() {
      const newChat = {
        name: this.name
      }
      if (this.show) { this.$store.commit('setChat', newChat) } //this.setChat(room)

      return this.show = !this.show
    }
  }
 //:color="item.active ? 'primary' : 'grey'"
}
</script>
