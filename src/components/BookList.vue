<script setup lang="ts">
import BookItem from "./BookItem.vue";
import { type Book } from '../scripts/type.ts'

defineProps<{
    books: Book[]
}>()
</script>
<template>
    <div>
        <div class="list-group">
            <div class="list-group-item justify-content-start align-items-center">
                <h4>List of books</h4>
            </div>
            <BookItem v-for="book of books" :key="book.id" :book="book"/>
        </div>
    </div>
</template>

<style scoped>
</style>