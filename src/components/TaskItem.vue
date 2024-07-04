<script setup lang="ts">
const props = defineProps<{
    todo: {
        id: number
        title: string
        description: string
        concluded: boolean
    }
    onRemove: (id: number) => void
}>()

const emit = defineEmits(['update:concluded'])

const handleToggle = () => {
    emit('update:concluded', !props.todo.concluded)
}
</script>

<template>
    <div class="card">
        <div class="card-content">
            <h2
                :class="{
                    'completed-task': todo.concluded,
                    'card-content-title': true,
                }"
            >
                {{ todo.title }}
            </h2>
            <p
                :class="{
                    'completed-task': todo.concluded,
                    'card-content-description': true,
                }"
            >
                {{ todo.description }}
            </p>
        </div>
        <div class="card-content">
            <input
                type="checkbox"
                :checked="todo.concluded"
                class="card-toggle"
                @change="handleToggle"
            />
            <button @click="onRemove(todo.id)" class="card-content-btn">
                ❌
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/styles/mixin.scss';
@import '/src/styles/variables.scss';

.card {
    @include center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    @include borderAndRadius($accent);
}

.card-content {
    @include column;
    gap: 8px;
}

.card-content-title {
    @include fontStyle($font-roboto, 22px, 500, $text-primary);
}

.card-content-description {
    @include fontStyle($font-roboto, 14px, 400, $text-primary);
}

.completed-task {
    text-decoration: line-through;
    color: white;
}

.card-toggle {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.card-content-btn {
    font-size: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>
