<script setup lang="ts">
import BookList from "./BookList.vue";
import AddBookForm from "./AddBookForm.vue";
import SearchBook from "./SearchBook.vue";
import { type Book } from '../scripts/type.ts'
import {ref} from 'vue'


let bookTemplate = {
    id : 1,
    title : "Kaiju No. 8, Vol. 1",
    synopsis : "With the highest kaiju-emergence rates in the world, Japan is no stranger to attack by deadly monsters. Enter the Japan Defense Force, a military organization tasked with the neutralization of kaiju. Kafka Hibino, a kaiju-corpse cleanup man, has always dreamed of joining the force. But when he gets another shot at achieving his childhood dream, he undergoes an unexpected transformation. How can he fight kaiju now that he’s become one himself?!",
    author : "Naoya Matsumoto",
    coverImage : "https://m.media-amazon.com/images/I/812qiXhyN+L._SL1500_.jpg",
    releaseDate : "07/12/2021",
    price : 15.99,
    stock : 100
}

const books = ref<Book[]>([
    bookTemplate
]);
</script>

<template>
    <main class="container">
        <div class="row mb-2">
            <div class="col-6">
                <SearchBook />
            </div>
            <div class="col-3">
                <button class="btn btn-success w-100">+ Ajouter</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary w-100 ">Exporter en csv</button>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <BookList :books="books"/>
            </div>
            <div class="col-6">
                <AddBookForm @add-book="books.push($event)"/>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>