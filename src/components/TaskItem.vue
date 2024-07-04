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

const handleToggle = () => {
    props.todo.concluded = !props.todo.concluded
}
</script>

<template>
    <div class="card">
        <div class="card-content">
            <h2 class="card-content-title">{{ todo.title }}</h2>
            <p class="card-content-description">{{ todo.description }}</p>
        </div>
        <div class="card-content">
            <input
                type="checkbox"
                v-model="todo.concluded"
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
