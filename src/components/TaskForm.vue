<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    onSubmit: (title: string, description: string) => void
    error: string | null
}>()

const titleTaskValue = ref<string | null>(null)
const descriptionTaskValue = ref<string | null>(null)

const handleSubmit = () => {
    if (titleTaskValue.value && descriptionTaskValue.value) {
        props.onSubmit(titleTaskValue.value, descriptionTaskValue.value)
        titleTaskValue.value = null
        descriptionTaskValue.value = null
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="form-data">
        <div class="enter-text">
            <input
                class="form-input-title"
                type="text"
                name="title"
                placeholder="Título da tarefa"
                v-model="titleTaskValue"
                required
            />
            <textarea
                class="form-enter-description"
                placeholder="Descrição da tarefa"
                name="description"
                v-model="descriptionTaskValue"
                required
            ></textarea>
            <p>{{ error }}</p>
        </div>
        <button class="btn-submit" type="submit">+</button>
    </form>
</template>

<style scoped lang="scss">
@import '/src/styles/mixin.scss';
@import '/src/styles/variables.scss';

.form-data {
    @include between;
    gap: 8px;
}

.enter-text {
    @include column;
    gap: 8px;
    flex: 5;

    @media (max-width: 768px) {
        flex: 4;
    }

    @media (max-width: 450px) {
        flex: 3;
    }
}

.form-input-title {
    @include enterText;
}

.form-enter-description {
    resize: none;
    @include enterText;
}

.btn-submit {
    flex: 1;
    background: $bg-secondary;
    @include borderAndRadius($accent);
    @include fontStyle($font-roboto, 80px, 300, $accent);
    cursor: pointer;

    @media (max-width: 450px) {
        font-size: 48px;
    }
}
</style>
