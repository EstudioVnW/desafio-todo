<template>
  <div id="app">
    <ToDoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToDoList from './components/ToDoList.vue';

export default defineComponent({
  name: 'App',
  components: {
    ToDoList,
  },
});
</script>


