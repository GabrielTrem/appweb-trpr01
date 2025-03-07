<script setup lang="ts">
import type { Book } from '../scripts/type';
import {ref} from 'vue'

const props = defineProps<{
    book : Book 
}>()

const modifiedBook = ref<Book>(
    {
        id : props.book.id,
        title : props.book.title,
        synopsis : props.book.synopsis,
        author : props.book.author,
        coverImage : props.book.coverImage,
        releaseDate : props.book.releaseDate,
        price : props.book.price,
        stock : props.book.stock
    }
);

const emit = defineEmits(['modify-book', 'close-form'])

function handleAddBook(){
    emit('modify-book', {...modifiedBook.value})
}
function handleCloseFormWindow(){
    emit('close-form')
}
</script>

<template>
    <div class="border rounded p-2 ">
        <div class="d-flex justify-content-between">
            <h4>Modifier un livre</h4>
            <button class="btn btn-outline-danger" @click="handleCloseFormWindow">❌</button>
        </div>
        <div class="row">
            <div class="col-10">
                <div class="mb-3">
                    <label for="bookTitle" class="form-label">Titre *</label>
                    <input type="text" class="form-control" id="bookTitle" v-model="modifiedBook.title">
                </div>
                <div class="mb-3">
                    <label for="bookSynopsis" class="form-label">Résumé *</label>
                    <textarea class="form-control" id="bookSynopsis" rows="3" v-model="modifiedBook.synopsis"></textarea>
                </div>
            </div>
            <div class="col-2">
                <label for="bookCover" class="form-label">Image</label>
                <input type="url" class="form-control" id="bookCover" placeholder="URL" v-model="modifiedBook.coverImage">
                <div class="border d-flex rounded p-2 justify-content-center mt-2">
                    <img v-if="modifiedBook.coverImage !== ''" :src="modifiedBook.coverImage" class="rounded img-fluid" :alt="'Image of the cover of the book ' + modifiedBook.title" width="100px">
                    <img v-else src="../assets/images/no-cover.jpg" class="rounded" alt="Image representant un livre sans couverture specifique" width="100px">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mb-3 col-6">
                    <label for="bookPrice" class="form-label">Prix *</label>
                    <input type="number" step=0.01 class="form-control" id="bookPrice" v-model="modifiedBook.price">
                </div>
                <div class="mb-3 col-6">
                    <label for="bookStock" class="form-label">Stock *</label>
                    <input type="number" class="form-control" id="bookStock" v-model="modifiedBook.stock">
                </div>
            </div>
            <div class="row">
                <div class="mb-3 col-6">
                    <label for="bookAuthor" class="form-label">Auteur</label>
                    <input type="text" class="form-control" id="bookAuthor" v-model="modifiedBook.author">
                </div>
                <div class="mb-3 col-6">
                    <label for="bookReleaseDate" class="form-label">Date de sortie</label>
                    <input type="date" class="form-control" id="bookReleaseDate" v-model="modifiedBook.releaseDate">
                </div>
            </div>
            <button class="btn btn-warning w-100" @click="handleAddBook">Modifier</button>
        </div>
</template>

<style scoped>
</style>