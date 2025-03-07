<script setup lang="ts">
import BookList from "./BookList.vue";
import AddBookForm from "./AddBookForm.vue";
import SearchBook from "./SearchBook.vue";
import { type Book } from '../scripts/type.ts'
import {ref} from 'vue'
import ModifyBookForm from "./ModifyBookForm.vue";
import BookDetails from "./BookDetails.vue";


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

let lastId = ref<number>(books.value.length);

function addBook(newBook : Book){
    lastId.value++
    newBook.id = lastId.value
    books.value.push(newBook)
}

function duplicateBook(newBook : Book){
    lastId.value++
    newBook.id = lastId.value
    newBook.title += ' (' + (books.value.filter(book => book.title === newBook.title)).length + ')'
    books.value.push(newBook)
}

function modifyBook(modifiedBook : Book){
    const index = books.value.findIndex(book => book.id === modifiedBook.id);
    books.value[index] = modifiedBook;
}

function removeBook(bookId : number) {
    books.value = books.value.filter(book => book.id !== bookId)
}

let showAddingForm = ref<boolean>(false);
let showModifyingForm = ref<boolean>(false);
let showBookDetailedView = ref<boolean>(false);

let currentBookToModify = ref<Book>(books.value[0])
let currentBookToShowDetails = ref<Book>(books.value[0])

</script>

<template>
    <main class="container min-vh-100">
      <div class="justify-content-center align-items-center">
          <div class="row mb-2">
              <div class="col-6">
                  <SearchBook />
              </div>
              <div class="col-3">
                  <button class="btn btn-success w-100" @click="showAddingForm = true, showModifyingForm = false"><i class="bi bi-plus-lg"></i> Ajouter</button>
              </div>
              <div class="col-3">
                  <button class="btn btn-secondary w-100 "><i class="bi bi-arrow-bar-up"></i> Exporter en csv</button>
              </div>
          </div>
          <div class="mb-2">
              <div v-if="showAddingForm">
                  <AddBookForm @add-book="addBook($event)" @close-form="showAddingForm = false"/>
              </div>
              <div v-if="showModifyingForm">
                  <ModifyBookForm :book="currentBookToModify" @modify-book="modifyBook($event)" @close-form="showModifyingForm = false"/>
              </div>
              <div v-if="!showBookDetailedView">
                  <div class="col-md-12">
                      <BookList 
                      :books="books" 
                      @open-modify-form="currentBookToModify = $event, showModifyingForm = true, showAddingForm = false"
                      @remove-book="removeBook($event)"
                      @show-details="currentBookToShowDetails = $event, showBookDetailedView = true"
                      @duplicate-book="duplicateBook($event)"
                      />
                  </div>
              </div>
              <div v-else class="row">
                  <div class="col-md-6">
                      <BookList 
                      :books="books" 
                      @open-modify-form="currentBookToModify = $event, showModifyingForm = true, showAddingForm = false"
                      @remove-book="removeBook($event)"
                      @show-details="currentBookToShowDetails = $event, showBookDetailedView = true"
                      @duplicate-book="duplicateBook($event)"
                      />
                  </div>
                  <div class="col-md-6">
                      <BookDetails :book="currentBookToShowDetails" @close-window="showBookDetailedView = false"/>
                  </div>
              </div>
          </div>
      </div>
    </main>
    <footer class="text-center py-3">
        <div class="container">
            <p>&copy; 2025 Book Manager. All rights reserved.</p>
        </div>
    </footer>
</template>

<style scoped>
</style>