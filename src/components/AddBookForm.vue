<script setup lang="ts">
import type { Book } from '../scripts/type';
import {ref} from 'vue'


const newBook = ref<Book>(
    {
        id : 2,
        title : "",
        synopsis : "",
        author : "",
        coverImage : "",
        releaseDate : "",
        price : 0,
        stock : 0
    }
);

const emit = defineEmits<{
    (event: 'add-book', book: Book): void
}>()

function verifyBook(){
    let book = newBook.value
    emit('add-book', book)
}
</script>

<template>
    <div class="border rounded p-2">
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="bookTitle" class="form-label">Titre *</label>
                    <input type="text" class="form-control" id="bookTitle" v-model="newBook.title">
                </div>
                <div class="mb-3">
                    <label for="bookSynopsis" class="form-label">Résumé *</label>
                    <textarea class="form-control" id="bookSynopsis" rows="3" v-model="newBook.synopsis"></textarea>
                </div>
            </div>
            <div class="col-4">
                <label for="bookCover" class="form-label">Image</label>
                <input type="url" class="form-control" id="bookCover" placeholder="URL" v-model="newBook.coverImage">
                <div class="border rounded p-2">
                    <img src="" class="rounded" alt="" id="bookCover" width="40px">
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
            <button class="btn btn-success w-100" @click="verifyBook">Ajouter</button>
        </div>
</template>

<style scoped>
</style>