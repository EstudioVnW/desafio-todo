<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <div class="inputs-container">
      <div class="pesquisar">
      <input v-model="newTodoText" @keyup.enter="addTodo" placeholder="Adicionar Tarefa" />
       <button @click="addTodo" class="add-button">✚</button>
       </div>
      <input v-model="searchQuery" placeholder="Procurar Tarefa" />
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

.inputs-container {
  display: flex;
  align-items: center;
}

.add-button,
.search-button {
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.add-button:hover,
.search-button:hover {
  background-color: #0056b3;
}
</style>
