<script setup lang="ts">
import {type Book} from '../scripts/type.ts'

const props = defineProps<{
    book: Book
}>()

const emit = defineEmits(['open-modifyForm', 'remove-book'])

function handleOpenModifyForm(){
    emit('open-modifyForm', props.book.id)
}

function handleDeleteBook(){
    emit('remove-book', props.book.id)
}
</script>

<template>
        <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex justify-content-between align-items-center">
                <img :src="book.coverImage" class="rounded" :alt="'Image of the cover of the book ' + book.title" width="40px">
                <h4>{{ book.title }}</h4>
                <div class="justify-content-end">
                    <button class="btn btn-outline-primary me-2" @click="handleOpenModifyForm"><i class="bi bi-copy"></i></button>
                    <button class="btn btn-outline-warning me-2" @click="handleOpenModifyForm"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-outline-danger" @click="handleDeleteBook"><i class="bi bi-trash3-fill"></i></button>
                </div>
            </div>
        </a>
</template>

<style scoped>
</style>