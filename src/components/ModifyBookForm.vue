<script setup lang="ts">
import type { Book } from '../scripts/type';
import {ref} from 'vue'
import {NO_COVER_LINK, NO_COVER_ALT, BOOK_COVER_ALT, ERR_MESSAGE_TITLE, ERR_MESSAGE_SYNOPSIS, ERR_MESSAGE_PRICE, ERR_MESSAGE_STOCK} from '../scripts/constants.ts'

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

function handleModifyBook(){
    validateForm()
    if(isValid.value){
        emit('modify-book', {...modifiedBook.value})
        console.log(modifiedBook.value.title)
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
            <div class="col-2">
                <label for="bookCover" class="form-label">Image</label>
                <input type="url" class="form-control" id="bookCover" placeholder="URL" v-model="modifiedBook.coverImage">
                <div class="border d-flex rounded p-2 justify-content-center mt-2">
                    <img v-if="modifiedBook.coverImage !== ''" :src="modifiedBook.coverImage" class="rounded" :alt="BOOK_COVER_ALT + modifiedBook.title" height="133px">
                    <img v-else :src="NO_COVER_LINK" class="rounded" :alt="NO_COVER_ALT" height="133px">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mb-3 col-6">
                    <label for="bookPrice" class="form-label">Prix *</label>
                    <input type="number" step=0.01 class="form-control" 
                        :class="{'is-invalid' : modifiedBook.price <= 0, 'is-valid' : modifiedBook.price > 0}" 
                        id="bookPrice" v-model="modifiedBook.price" required
                    >
                    <div id="bookPriceFeedback" class="invalid-feedback">{{ERR_MESSAGE_PRICE}}</div>
                </div>
                <div class="mb-3 col-6">
                    <label for="bookStock" class="form-label">Inventaire *</label>
                    <input type="number" class="form-control" 
                        :class="{'is-invalid' : modifiedBook.stock < 0, 'is-valid' : modifiedBook.stock >= 0}" 
                        id="bookStock" v-model="modifiedBook.stock" required
                    >
                    <div id="bookStockFeedback" class="invalid-feedback">{{ERR_MESSAGE_STOCK}}</div>
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
            <button class="btn btn-warning w-100">Modifier</button>
        </form>
</template>

<style scoped>
</style>