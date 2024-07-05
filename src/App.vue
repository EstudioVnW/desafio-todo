<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { DataValues } from './utils/interfaces/dataValues.ts'
import { updateConcluded } from './utils/functions/updateConcluded'

const data = ref<DataValues[]>([
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
    const obj: DataValues = {
        id: data.value.length + 1,
        title,
        description,
        concluded: false,
    }

    data.value.unshift(obj)
    error.value = null
}

const completedTodo = computed(() =>
    data.value.filter((todo: DataValues) => todo.concluded)
)
const uncompletedTodo = computed(() =>
    data.value.filter((todo: DataValues) => !todo.concluded)
)
const searchTodo = computed(() => {
    if (!search.value) return []
    const title = search.value.toLowerCase()

    return data.value.filter((todo: DataValues) =>
        todo.title.toLowerCase().includes(title)
    )
})

const removeItem = (id: number) => {
    data.value = data.value.filter((todo: DataValues) => todo.id !== id)
}
</script>

<template>
    <main class="container">
        <TaskForm :onSubmit="addTask" :error="error" />

        <div>
            <input
                class="input"
                type="text"
                name="title"
                placeholder="Pesquisa"
                v-model="search"
            />
        </div>

        <section class="container-itens" v-if="search">
            <h1 class="msg">Resultados da pesquisa</h1>
            <TaskList
                :todos="searchTodo"
                :onRemove="removeItem"
                @update:concluded="updateConcluded"
            />
        </section>

        <section
            class="container-itens"
            v-if="!data && !search && search !== ''"
        >
            <h1 class="msg">Não há tarefas pendentes</h1>
        </section>

        <section class="container-itens" v-if="!search">
            <TaskList
                :todos="uncompletedTodo"
                :onRemove="removeItem"
                @update:concluded="updateConcluded"
            />
            <TaskList
                :todos="completedTodo"
                :onRemove="removeItem"
                @update:concluded="updateConcluded"
            />
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

.msg {
    @include fontStyle($font-roboto, 24px, 400, $text);
    text-align: center;
}

.input {
    @include enterText;
}
</style>
