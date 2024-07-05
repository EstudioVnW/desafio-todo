<template>
    <div>
      <input type="checkbox" v-model="todo.concluded" @change="toggleComplete" />
      <span :class="{ concluded: todo.concluded }">{{ todo.title }}</span>
      <button @click="removeTodo">Delete</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ToDoItem',
    props: {
      todo: {
        type: Object as () => { id: number; title: string; concluded: boolean },
        required: true,
      },
    },
    methods: {
      toggleComplete() {
        this.$emit('toggle-complete', this.todo.id);
      },
      removeTodo() {
        this.$emit('remove-todo', this.todo.id);
      },
    },
  });
  </script>
  
  <style lang="scss" scoped>
  @import '../style/ToDoItem.scss';
  </style>
  