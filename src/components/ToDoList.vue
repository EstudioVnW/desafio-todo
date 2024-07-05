<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <div class="inputs-container">
        <input v-model="newTodoText" @keyup.enter="addTodo" placeholder="✚ Adicionar Tarefa " class="add-todo-input" />
       
      
      <input v-model="searchQuery" placeholder="Procurar Tarefa" class="seach-todo-input" />
    </div>
    <ul>
      <li v-if="filteredTodos.length === 0">Sem tarefas</li>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <ToDoItem :todo="todo" @toggle-complete="toggleComplete" @remove-todo="removeTodo" />
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
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
    const todos = reactive<ToDo[]>([]); // Iniciando com lista vazia

    const addTodo = () => {
      if (newTodoText.value.trim()) {
        todos.push({
          id: Date.now(),
          title: newTodoText.value,
          concluded: false,
        });
        newTodoText.value = '';
      }
    };

    const toggleComplete = (id: number) => {
      const todo = todos.find(todo => todo.id === id);
      if (todo) {
        todo.concluded = !todo.concluded;
      }
    };

    const removeTodo = (id: number) => {
      const index = todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
      }
    };

    const searchTodo = () => {
      // Implementação da busca (opcional)
      console.log('Pesquisar:', searchQuery.value);
    };

    const filteredTodos = computed(() => {
      return todos.filter(todo =>
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
      searchTodo,
      filteredTodos,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../style/ToDoList.scss';

.add-todo-input{
  width: 250px; 
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  }
  .seach-todo-input{
  width: 250px; 
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  }
</style>
