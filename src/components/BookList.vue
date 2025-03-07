<script setup lang="ts">
import BookItem from "./BookItem.vue";
import { type Book } from '../scripts/type.ts'
import {computed} from 'vue'

const props = defineProps<{
    books: Book[]
}>()

const booksCount = computed(() => props.books.length);

const emit = defineEmits(['open-modifyForm', 'remove-book', 'show-details', 'duplicate-book'])

function handleOpenModifyForm(book : Book){
    emit('open-modifyForm', book)
}

function handleRemoveBook(bookId : number){
    emit('remove-book', bookId)
}

function handleShowDetails(book : Book){
    emit('show-details', book)
}

function handleDuplicateBook(book : Book){
    emit('duplicate-book', book)
}
</script>
<template>
    <div>
        <div class="list-group">
            <div class="list-group-item justify-content-start align-items-center">
                <h3><strong></strong>Liste des livres ({{booksCount}})</h3>
            </div>
            <div class="d-flex list-group-item justify-content-between align-items-center">
                <p><strong>•Couverture</strong></p>
                <p><strong>•Titre</strong></p>
                <p><strong>•Inventaire</strong></p>
                <p><strong>•Opération</strong></p>
            </div>
            <BookItem 
            v-for="book of books" 
            :key="book.id" 
            :book="book" 
            @open-modifyForm="handleOpenModifyForm($event)"
            @remove-book="handleRemoveBook($event)"
            @show-details="handleShowDetails($event)"
            @duplicate-book="handleDuplicateBook($event)"
            />
        </div>
    </div>
</template>

<style scoped>
</style>