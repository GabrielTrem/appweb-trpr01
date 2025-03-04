<script setup lang="ts">
import BookItem from "./BookItem.vue";
import { type Book } from '../scripts/type.ts'

defineProps<{
    books: Book[]
}>()

const emit = defineEmits(['open-modifyForm', 'remove-book'])

function handleOpenModifyForm(book : Book){
    emit('open-modifyForm', book)
}

function handleRemoveBook(bookId : number){
    emit('remove-book', bookId)
}
</script>
<template>
    <div>
        <div class="list-group">
            <div class="list-group-item justify-content-start align-items-center">
                <h4>Liste des livres ({{books.length}})</h4>
            </div>
            <BookItem 
            v-for="book of books" 
            :key="book.id" 
            :book="book" 
            @open-modifyForm="handleOpenModifyForm($event)"
            @remove-book="handleRemoveBook($event)"
            />
        </div>
    </div>
</template>

<style scoped>
</style>