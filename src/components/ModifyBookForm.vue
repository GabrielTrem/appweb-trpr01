<script setup lang="ts">
import type { Book } from '../scripts/type';
import {ref} from 'vue'
import {BOOK_COVER_ALT, ERR_MESSAGE_TITLE, ERR_MESSAGE_SYNOPSIS, ERR_MESSAGE_PRICE, ERR_MESSAGE_STOCK} from '../scripts/constants.ts'
import {handleImageError} from '../scripts/functions.ts'

const props = defineProps<{
    book : Book | null
}>()

const modifiedBook = ref<Book>(
    {
        id : -1,
        title : "",
        synopsis : "",
        author : "",
        coverImage : "",
        releaseDate : "",
        price : 0,
        stock : 0
    }
);

if(props.book !== null){
    modifiedBook.value.id = props.book.id
    modifiedBook.value.title = props.book.title
    modifiedBook.value.synopsis = props.book.synopsis
    modifiedBook.value.author = props.book.author
    modifiedBook.value.coverImage = props.book.coverImage
    modifiedBook.value.releaseDate = props.book.releaseDate
    modifiedBook.value.price = props.book.price
    modifiedBook.value.stock = props.book.stock
}

const emit = defineEmits(['modify-book', 'close-form'])

function handleModifyBook(){
    validateForm()
    if(isValid.value && modifiedBook.value.id !== -1){
        emit('modify-book', {...modifiedBook.value})
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
    form
    <form ref="form" class="border rounded p-2 needs-validation" @submit.prevent="handleModifyBook" novalidate>
        <div class="d-flex justify-content-between">
            <h3><b>Modifier un livre</b></h3>
            <button class="btn btn-outline-danger" @click="handleCloseFormWindow"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="row">
            <div class="col-10">
                <div class="mb-3">
                    <label for="bookTitle" class="form-label">Titre *</label>
                    <input 
                        type="text" class="form-control" 
                        :class="{'is-invalid' : !modifiedBook.title, 'is-valid' : modifiedBook.title}" 
                        id="bookTitle" v-model="modifiedBook.title" 
                    required>
                    <div id="bookTitleFeedback" class="invalid-feedback">{{ERR_MESSAGE_TITLE}}</div>
                </div>
                <div class="mb-3">
                    <label for="bookSynopsis" class="form-label">Résumé *</label>
                    <textarea class="form-control" 
                        :class="{'is-invalid' : !modifiedBook.synopsis, 'is-valid' : modifiedBook.synopsis}" 
                        id="bookSynopsis" rows="4" v-model="modifiedBook.synopsis" required> 
                    </textarea>
                    <div id="bookSynopsisFeedback" class="invalid-feedback">{{ERR_MESSAGE_SYNOPSIS}}</div>
                </div>
            </div>
            <div class="col-md-2">
                <label for="bookCover" class="form-label">Image</label>
                <input type="url" class="form-control" id="bookCover" placeholder="URL" v-model="modifiedBook.coverImage">
                <div class="border d-flex rounded p-2 justify-content-center mt-2">
                    <img 
                        :src="modifiedBook.coverImage" 
                        class="rounded" 
                        :alt="BOOK_COVER_ALT + modifiedBook.title" 
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
                        :class="{'is-invalid' : modifiedBook.price <= 0, 'is-valid' : modifiedBook.price > 0}" 
                        id="bookPrice" v-model="modifiedBook.price" required
                    >
                    <div id="bookPriceFeedback" class="invalid-feedback">{{ERR_MESSAGE_PRICE}}</div>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="bookStock" class="form-label">Inventaire *</label>
                    <input type="number" class="form-control" 
                        :class="{'is-invalid' : modifiedBook.stock < 0, 'is-valid' : modifiedBook.stock >= 0}" 
                        id="bookStock" v-model="modifiedBook.stock" required
                    >
                    <div id="bookStockFeedback" class="invalid-feedback">{{ERR_MESSAGE_STOCK}}</div>
                </div>
            </div>
            <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="bookAuthor" class="form-label">Auteur</label>
                    <input type="text" class="form-control" id="bookAuthor" v-model="modifiedBook.author">
                </div>
                <div class="mb-3 col-md-6">
                    <label for="bookReleaseDate" class="form-label">Date de sortie</label>
                    <input type="date" class="form-control" id="bookReleaseDate" v-model="modifiedBook.releaseDate">
                </div>
            </div>
            <button class="btn btn-warning w-100">Modifier</button>
        </form>
</template>

<style scoped>
</style>