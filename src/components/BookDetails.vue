<script setup lang="ts">
import type { Book } from '../scripts/type';
import {OUT_OF_STOCK_VALUE, LOW_STOCK_VALUE, NO_COVER_LINK, NO_COVER_ALT, BOOK_COVER_ALT} from '../scripts/constants.ts'

defineProps<{
    book : Book | null 
}>()

const emit = defineEmits(['close-window'])

function handleCloseWindow(){
 emit('close-window')
}
</script>

<template>
  <div v-if="book !== null" class="container border rounded p-2 ">
    <div class="d-flex justify-content-between mb-2">
            <h3><b>Détails du livre</b></h3>
            <button class="btn btn-outline-danger" @click="handleCloseWindow"><i class="bi bi-x-lg"></i></button>
        </div>
    <div class="row">
      <div class="col-md-4">
        <img v-if="book.coverImage !== ''" :src="book.coverImage" :alt="BOOK_COVER_ALT + book.title" class="img-fluid" />
        <img v-else :src="NO_COVER_LINK" :alt="NO_COVER_ALT" class="img-fluid" />
      </div>
      <div class="col-md-8">
        <h3>{{ book.title }}</h3>
        <p v-if="book.author !== ''"><strong>Auteur:</strong> {{ book.author }}</p>
        <p v-else><strong>Auteur:</strong> ------</p>
        <p v-if="book.releaseDate !== ''"><strong>Date de sortie:</strong> {{ book.releaseDate }}</p>
        <p v-else><strong>Date de sortie:</strong> ------</p>
        <p><strong>Prix:</strong> ${{ book.price}}</p>
        <p><strong>Inventaire: </strong>
            <span v-if="book.stock >= LOW_STOCK_VALUE" class="badge text-bg-success">{{ book.stock }} en stock</span>
            <span v-else-if="book.stock > OUT_OF_STOCK_VALUE" class="badge text-bg-warning">{{ book.stock }} en stock</span>
            <span v-else class="badge text-bg-danger">{{ book.stock }} en stock</span>
        </p>
        <h4>Résumé</h4>
        <p>{{ book.synopsis }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>