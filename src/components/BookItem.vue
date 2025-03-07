<script setup lang="ts">
import {type Book} from '../scripts/type.ts'

const props = defineProps<{
    book: Book
}>()

const emit = defineEmits(['open-modifyForm', 'remove-book', 'show-details', 'duplicate-book'])

function handleOpenModifyForm(){
    emit('open-modifyForm', props.book)
}

function handleDeleteBook(){
    emit('remove-book', props.book.id)
}

function handleShowDetails(){
    emit('show-details', props.book)
}

function handleDuplicateBook(){
    emit('duplicate-book', {...props.book})
}
</script>

<template>
        <a href="#" class="list-group-item list-group-item-action" @click="handleShowDetails">
            <div class="d-flex justify-content-between align-items-center">
                <img v-if="book.coverImage !== ''" :src="book.coverImage" class="rounded" :alt="'Image of the cover of the book ' + book.title" width="50px">
                <img v-else src="../assets/images/no-cover.jpg" class="rounded" :alt="'Image of the cover of the book ' + book.title" width="50px">
                <h4 class="p-2">{{ book.title }}</h4>
                <span v-if="book.stock >= 10" class="badge text-bg-success">{{ book.stock }} en stock</span>
                <span v-else-if="book.stock >= 5" class="badge text-bg-warning">{{ book.stock }} en stock</span>
                <span v-else class="badge text-bg-danger">{{ book.stock }} en stock</span>
                <div class="justify-content-end">
                    <button class="btn btn-outline-primary me-2" @click.stop="handleDuplicateBook"><i class="bi bi-copy"></i></button>
                    <button class="btn btn-outline-warning me-2" @click.stop="handleOpenModifyForm"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-outline-danger" @click.stop="handleDeleteBook"><i class="bi bi-trash3-fill"></i></button>
                </div>
            </div>
        </a>
</template>

<style scoped>
</style>