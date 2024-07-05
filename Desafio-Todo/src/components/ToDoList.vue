<template>
    <div>
      <h1>To-Do List</h1>
      <input v-model="newTodoText" @keyup.enter="addTodo" placeholder="Adicionar Tarefa" />
      <input v-model="searchQuery" placeholder="Procurar Tarefa" />
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <ToDoItem :todo="todo" @toggle-complete="toggleComplete" @remove-todo="removeTodo" />
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import ToDoItem from './ToDoItem.vue';
  
  interface ToDo {
    id: number;
    title: string;
    concluded: boolean;
  }
  
  export default defineComponent({
    name: 'ToDoList',
    components: {
      ToDoItem,
    },
    setup() {
      const newTodoText = ref('');
      const searchQuery = ref('');
      const todos = ref<ToDo[]>([
        { id: 1, title: 'Fazer almoço', concluded: false },
        { id: 2, title: 'Estudar', concluded: false },
        { id: 3, title: 'Lavar louça', concluded: false },
      ]);
  
      const addTodo = () => {
        if (newTodoText.value.trim()) {
          todos.value.push({
            id: Date.now(),
            title: newTodoText.value,
            concluded: false,
          });
          newTodoText.value = '';
        }
      };
  
      const toggleComplete = (id: number) => {
        const todo = todos.value.find(todo => todo.id === id);
        if (todo) {
          todo.concluded = !todo.concluded;
        }
      };
  
      const removeTodo = (id: number) => {
        todos.value = todos.value.filter(todo => todo.id !== id);
      };
  
      const filteredTodos = computed(() => {
        return todos.value.filter(todo =>
          todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      return {
        newTodoText,
        searchQuery,
        todos,
        addTodo,
        toggleComplete,
        removeTodo,
        filteredTodos,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped>
  @import '../style/ToDoList.scss';
  </style>