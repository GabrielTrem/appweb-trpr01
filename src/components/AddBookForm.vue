<script setup lang="ts">
import type { Book } from '../scripts/type';
import {ref} from 'vue'

const props = defineProps<{
    bookToDuplicate : Book | null
}>()

const newBook = ref<Book>(
    {
        id : 0,
        title : "",
        synopsis : "",
        author : "",
        coverImage : "",
        releaseDate : "",
        price : 0,
        stock : 0
    }
);

if(props.bookToDuplicate !== null){
    newBook.value.title = props.bookToDuplicate.title
    newBook.value.synopsis = props.bookToDuplicate.synopsis
    newBook.value.author = props.bookToDuplicate.author
    newBook.value.coverImage = props.bookToDuplicate.coverImage
    newBook.value.releaseDate = props.bookToDuplicate.releaseDate
    newBook.value.price = props.bookToDuplicate.price
    newBook.value.stock = props.bookToDuplicate.stock
}


const emit = defineEmits(['add-book', 'close-form'])

function handleAddBook(){
    emit('add-book', {...newBook.value})
}
function handleCloseFormWindow(){
    emit('close-form')
}
</script>

<template>
    <div class="border rounded p-2 ">
        <div class="d-flex justify-content-between">
            <h3><b>Ajouter un livre</b></h3>
            <button class="btn btn-outline-danger" @click="handleCloseFormWindow"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="row">
            <div class="col-10">
                <div class="mb-3">
                    <label for="bookTitle" class="form-label">Titre *</label>
                    <input type="text" class="form-control" id="bookTitle" v-model="newBook.title">
                </div>
                <div class="mb-3">
                    <label for="bookSynopsis" class="form-label">Résumé *</label>
                    <textarea class="form-control" id="bookSynopsis" rows="4" v-model="newBook.synopsis"></textarea>
                </div>
            </div>
            <div class="col-2">
                <label for="bookCover" class="form-label">Image</label>
                <input type="url" class="form-control" id="bookCover" placeholder="URL" v-model="newBook.coverImage">
                <div class="border d-flex rounded p-2 justify-content-center mt-2">
                    <img v-if="newBook.coverImage !== ''" :src="newBook.coverImage" class="rounded" :alt="'Image of the cover of the book ' + newBook.title" height="133px">
                    <img v-else src="../assets/images/no-cover.jpg" class="rounded" alt="Image representant un livre sans couverture specifique" height="133px">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mb-3 col-6">
                    <label for="bookPrice" class="form-label">Prix *</label>
                    <input type="number" step=0.01 class="form-control" id="bookPrice" v-model="newBook.price">
                </div>
                <div class="mb-3 col-6">
                    <label for="bookStock" class="form-label">Stock *</label>
                    <input type="number" class="form-control" id="bookStock" v-model="newBook.stock">
                </div>
            </div>
            <div class="row">
                <div class="mb-3 col-6">
                    <label for="bookAuthor" class="form-label">Auteur</label>
                    <input type="text" class="form-control" id="bookAuthor" v-model="newBook.author">
                </div>
                <div class="mb-3 col-6">
                    <label for="bookReleaseDate" class="form-label">Date de sortie</label>
                    <input type="date" class="form-control" id="bookReleaseDate" v-model="newBook.releaseDate">
                </div>
            </div>
            <button class="btn btn-success w-100" @click="handleAddBook">Ajouter</button>
        </div>
</template>

<style scoped>
</style>