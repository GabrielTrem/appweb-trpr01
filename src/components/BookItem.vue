<script setup lang="ts">
import {type Book} from '../scripts/type.ts'

defineProps<{
    book: Book
}>()
</script>

<template>
        <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex justify-content-between align-items-center">
                <img :src="book.coverImage" class="rounded" :alt="'Image of the cover of the book ' + book.title" width="40px">
                <h4>{{ book.title }}</h4>
                <div class="justify-content-end">
                    <button class="btn btn-outline-warning me-2">✏️ Modifier</button>
                    <button class="btn btn-outline-danger">❌ Retirer</button>
                </div>
            </div>
        </a>
</template>

<style scoped>
</style>