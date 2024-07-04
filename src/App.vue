<script setup lang="ts">
import { ref, computed } from 'vue'

const data = ref([])

data.value = [
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
]

const completedTodo = computed(() => {
    return data.value.filter((todo) => todo.concluded)
})

const uncompletedTodo = computed(() => {
    return data.value.filter((todo) => !todo.concluded)
})

const toggleConcluded = computed(() => {
    return data.value.filter((todo) => todo.concluded)
})
</script>

<template>
    <main class="container">
        <form class="form-data">
            <div class="enter-text">
                <input
                    class="form-input-title"
                    type="text"
                    placeholder="Título da tarefa"
                    required
                />
                <textarea
                    class="form-enter-description"
                    placeholder="Descrição da tarefa"
                    required
                ></textarea>
            </div>

            <button class="btn-submit" type="submit">+</button>
        </form>

        <section v-if="data.length === 0">
            <h1 class="no-task">No tasks</h1>
        </section>

        <section class="card-container" v-if="data.length > 0">
            <div class="card" v-for="todo in uncompletedTodo" :key="todo.id">
                <div class="card-content">
                    <h2 class="card-content-title">{{ todo.title }}</h2>
                    <p class="card-content-description">
                        {{ todo.description }}
                    </p>
                </div>

                <div class="card-content">
                    <input
                        type="checkbox"
                        name="concluded"
                        class="card-toggle"
                        v-model="todo.concluded"
                    />
                    <button class="card-content-btn">❌</button>
                </div>
            </div>

            <div class="card" v-for="todo in completedTodo" :key="todo.id">
                <div class="card-content">
                    <h2 class="card-content-title">{{ todo.title }}</h2>
                    <p class="card-content-description">
                        {{ todo.description }}
                    </p>
                </div>

                <div class="card-content">
                    <input
                        type="checkbox"
                        name="concluded"
                        class="card-toggle"
                        v-model="todo.concluded"
                    />
                    <button class="card-content-btn">❌</button>
                </div>
            </div>
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

.no-task {
    @include fontStyle($font-roboto, 24px, 400, $text);
    text-align: center;
}

.card-container {
    @include column;
    gap: 16px;
}

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
