<script setup lang="ts">
import {type Book} from '../scripts/type.ts'

defineProps<{
    book: Book
}>()
</script>

<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <img :src="book.coverImage" class="rounded" :alt="'Image of the cover of the book ' + book.name" width="40px">
        <h4>{{ book.name }}</h4>
        <div class="justify-content-end">
            <button class="btn btn-outline-warning me-2">✏️ Modifier</button>
            <button class="btn btn-outline-danger">❌ Retirer</button>
        </div>
    </li>
</template>

<style scoped>
</style>