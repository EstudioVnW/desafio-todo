<script setup lang="ts">
import TaskItem from './TaskItem.vue'

const props = defineProps<{
    todos: Array<{
        id: number
        title: string
        description: string
        concluded: boolean
    }>
    onRemove: (id: number) => void
}>()
</script>

<template>
    <div class="card-container">
        <TaskItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            :onRemove="onRemove"
        />
    </div>
</template>

<style scoped lang="scss">
@import '/src/styles/mixin.scss';
@import '/src/styles/variables.scss';

.card-container {
    @include column;
    gap: 16px;
}
</style>
