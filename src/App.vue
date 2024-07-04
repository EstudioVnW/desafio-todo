<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const data = ref([
    {
        id: 1,
        title: 'Fazer almoço',
        description:
            'Tenho que fazer almoço as 12h, será Arroz, Feijão e Carne moída.',
        concluded: false,
    },
    {
        id: 2,
        title: 'Estudar',
        description: 'Fazer prova da faculdade',
        concluded: true,
    },
])
const search = ref<string | null>(null)
const error = ref<string | null>(null)

const addTask = (title: string, description: string) => {
    const obj = {
        id: data.value.length + 1,
        title,
        description,
        concluded: false,
    }
    data.value.push(obj)
    error.value = null
}

const completedTodo = computed(() =>
    data.value.filter((todo) => todo.concluded)
)

const uncompletedTodo = computed(() =>
    data.value.filter((todo) => !todo.concluded)
)

const searchTodo = computed(() => {
    if (!search.value) return []
    const title = search.value.toLowerCase()
    return data.value.filter((todo) => todo.title.toLowerCase().includes(title))
})

const removeItem = (id: number) => {
    data.value = data.value.filter((todo) => todo.id !== id)
}
</script>

<template>
    <main class="container">
        <TaskForm :onSubmit="addTask" :error="error" />

        <section>
            <input
                class="input"
                type="text"
                name="title"
                placeholder="Pesquisa"
                v-model="search"
            />
        </section>

        <section class="container-itens" v-if="searchTodo.length">
            <h2 class="message">Resultados da pesquisa</h2>
            <TaskList :todos="searchTodo" :onRemove="removeItem" />
        </section>

        <section class="container-itens" v-if="data.length === 0 && !search">
            <h1 class="message">No tasks</h1>
        </section>

        <section class="container-itens" v-if="data.length > 0 && !search">
            <TaskList :todos="uncompletedTodo" :onRemove="removeItem" />
            <TaskList :todos="completedTodo" :onRemove="removeItem" />
        </section>
    </main>
</template>

<style scoped lang="scss">
@import '/src/styles/mixin.scss';
@import '/src/styles/variables.scss';

.container {
    @include column;
    gap: 48px;
    max-width: 768px;
    padding: 32px 0;
    margin: 0 auto;

    @media (max-width: 800px) {
        padding: 32px;
    }
}

.container-itens {
    @include column;
    gap: 24px;
}

.message {
    @include fontStyle($font-roboto, 24px, 400, $text);
    text-align: center;
}

.input {
    @include enterText;
}
</style>
