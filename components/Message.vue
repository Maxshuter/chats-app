<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-center">{{text}}</p>
    </div>
    <div v-else class="wrap">
      <v-card
        max-width="600"
        min-width="250"  
        shaped 
        dark
        elevation="20" 
        class="mes" 
        :class="{owner}">
        <small>
          <strong>{{name}}</strong>
        </small>
        <v-card-title class="text-body-2">{{text}}</v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.system {
  margin: 25px 0;
}

.wrap {
  display: flex;
  flex-direction: column;
}

.mes {
  padding: 16px 0 0 16px;
  width: 60%;
  margin: 0 16px;
  background: #1976d2;
  position: relative;
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.owner {
  background: #ffffff;
  color: black;
  align-self: flex-end;
}
</style>

