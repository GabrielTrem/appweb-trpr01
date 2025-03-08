<script setup lang="ts">
import type { Book } from '../scripts/type';
import {ref} from 'vue'
import {BOOK_COVER_ALT, ERR_MESSAGE_TITLE, ERR_MESSAGE_SYNOPSIS, ERR_MESSAGE_PRICE, ERR_MESSAGE_STOCK} from '../scripts/constants.ts'
import {handleImageError} from '../scripts/functions.ts'

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
    validateForm()
    if(isValid.value){
        emit('add-book', {...newBook.value})
    }
}

const form = ref<HTMLFormElement | null>(null)
let isValid = ref(false)

function validateForm(){
    if (form.value) {
        isValid.value = form.value.checkValidity()
        if(isValid.value){
            form.value.classList.add('was-validated')
        }
    }
}

function handleCloseFormWindow(){
    emit('close-form')
}

</script>

<template>
    <form ref="form" class="border rounded p-2 needs-validation" @submit.prevent="handleAddBook" novalidate>
        <div class="d-flex justify-content-between">
            <h3><b>Ajouter un livre</b></h3>
            <button class="btn btn-outline-danger" @click="handleCloseFormWindow"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="row">
            <div class="col-md-10">
                <div class="mb-3">
                    <label for="bookTitle" class="form-label">Titre *</label>
                    <input 
                        type="text" class="form-control" 
                        :class="{'is-invalid' : !newBook.title, 'is-valid' : newBook.title}" 
                        id="bookTitle" v-model="newBook.title" 
                    required>
                    <div id="bookTitleFeedback" class="invalid-feedback">{{ERR_MESSAGE_TITLE}}</div>
                </div>
                <div class="mb-3">
                    <label for="bookSynopsis" class="form-label">Résumé *</label>
                    <textarea class="form-control" 
                        :class="{'is-invalid' : !newBook.synopsis, 'is-valid' : newBook.synopsis}" 
                        id="bookSynopsis" rows="4" v-model="newBook.synopsis" required> 
                    </textarea>
                    <div id="bookSynopsisFeedback" class="invalid-feedback">{{ERR_MESSAGE_SYNOPSIS}}</div>
                </div>
            </div>
            <div class="col-md-2">
                <label for="bookCover" class="form-label">Image</label>
                <input type="url" class="form-control" id="bookCover" placeholder="URL" v-model="newBook.coverImage">
                <div class="border d-flex rounded p-2 justify-content-center mt-2">
                    <img 
                        :src="newBook.coverImage" 
                        class="rounded" 
                        :alt="BOOK_COVER_ALT + newBook.title" 
                        height="133px"
                        @error="handleImageError"
                    >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mb-3 col-md-6">
                    <label for="bookPrice" class="form-label">Prix *</label>
                    <input type="number" step=0.01 class="form-control" 
                        :class="{'is-invalid' : newBook.price <= 0, 'is-valid' : newBook.price > 0}" 
                        id="bookPrice" v-model="newBook.price" required
                    >
                    <div id="bookPriceFeedback" class="invalid-feedback">{{ ERR_MESSAGE_PRICE }}</div>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="bookStock" class="form-label">Inventaire *</label>
                    <input type="number" class="form-control" 
                        :class="{'is-invalid' : newBook.stock < 0, 'is-valid' : newBook.stock >= 0}" 
                        id="bookStock" v-model="newBook.stock" required
                    >
                    <div id="bookStockFeedback" class="invalid-feedback">{{ERR_MESSAGE_STOCK}}</div>
                </div>
            </div>
            <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="bookAuthor" class="form-label">Auteur</label>
                    <input type="text" class="form-control" id="bookAuthor" v-model="newBook.author">
                </div>
                <div class="mb-3 col-md-6">
                    <label for="bookReleaseDate" class="form-label">Date de sortie</label>
                    <input type="date" class="form-control" id="bookReleaseDate" v-model="newBook.releaseDate">
                </div>
            </div>
            <button class="btn btn-success w-100">Ajouter</button>
        </form>
</template>

<style scoped>
</style>