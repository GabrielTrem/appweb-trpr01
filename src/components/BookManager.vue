<script setup lang="ts">
import BookList from "./BookList.vue";
import AddBookForm from "./AddBookForm.vue";
import SearchBook from "./SearchBook.vue";
import { type Book } from '../scripts/type.ts'
import {ref} from 'vue'
import ModifyBookForm from "./ModifyBookForm.vue";
import BookDetails from "./BookDetails.vue";
import {initialBooks} from "../scripts/initialBooks.ts"
import {OUT_OF_STOCK_ALERT_MESSAGE} from '../scripts/constants.ts'

const books = ref<Book[]>(initialBooks);

const filteredBooks = ref<Book[]>(books.value);

let lastId = ref<number>(books.value.length);

function addBook(newBook : Book){
    lastId.value++
    newBook.id = lastId.value
    books.value.push(newBook)
}

function modifyBook(modifiedBook : Book){
    const index = books.value.findIndex(book => book.id === modifiedBook.id);
    books.value[index] = modifiedBook;

    const indexFiltered = filteredBooks.value.findIndex(book => book.id === modifiedBook.id);
    if(indexFiltered !== -1){
        filteredBooks.value[indexFiltered] = modifiedBook;
    }
}

function removeBook(bookId : number) {
    books.value = books.value.filter(book => book.id !== bookId)
    filteredBooks.value = filteredBooks.value.filter(book => book.id !== bookId)
}

function getBooksThatAreOutOfStock(): string {
    let booksOutOfStock = ''
    books.value.forEach((book : Book) => {
        if(book.stock === 0){
            booksOutOfStock += '<br> • ' + book.title
        }
    })
    console.log(booksOutOfStock)
    return booksOutOfStock
}

let showAddingForm = ref<boolean>(false);
let showModifyingForm = ref<boolean>(false);
let showBookDetailedView = ref<boolean>(false);

let currentBookToModify = ref<Book>(books.value[0])
let currentBookToShowDetails = ref<Book>(books.value[0])
let currentBookToDuplicate = ref<Book | null>(null)

const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Synopsis', 'Author', 'Cover Image', 'Release Date', 'Price', 'Stock'];
    const rows = books.value.map(book => [
        book.id,
        book.title,
        book.synopsis,
        book.author,
        book.coverImage,
        book.releaseDate,
        book.price,
        book.stock
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'books.csv';
    link.click();
};

</script>

<template>
    <header>
        <img class="img-fluid" src="../assets/images/book-banner.jpg" alt="">
    </header>
    <main class="container min-vh-100 mt-4">
      <div class="justify-content-center align-items-center">
          <div class="row mb-2">
              <div class="col-6">
                  <SearchBook :books="books" @filter-books="filteredBooks = $event"/>
              </div>
              <div class="col-3">
                  <button class="btn btn-success w-100" @click="showAddingForm = true, showModifyingForm = false"><i class="bi bi-plus-lg"></i> Ajouter</button>
              </div>
              <div class="col-3">
                  <button class="btn btn-secondary w-100 " @click="exportToCSV"><i class="bi bi-arrow-bar-up"></i> Exporter en csv</button>
              </div>
          </div>
          <div class="mb-2">
              <div v-if="showAddingForm">
                  <AddBookForm 
                    :bookToDuplicate="currentBookToDuplicate" 
                    @add-book="addBook($event), currentBookToDuplicate = null" 
                    @close-form="showAddingForm = false, currentBookToDuplicate = null"
                  />
              </div>
              <div v-if="showModifyingForm">
                  <ModifyBookForm :book="currentBookToModify" @modify-book="modifyBook($event)" @close-form="showModifyingForm = false"/>
              </div>
              <div class="row">
                  <div :class="showBookDetailedView ? 'col-md-8' : 'col-md-12'">
                      <BookList 
                      :books="filteredBooks" 
                      @open-modify-form="currentBookToModify = $event, showModifyingForm = true, showAddingForm = false"
                      @remove-book="removeBook($event)"
                      @show-details="currentBookToShowDetails = $event, showBookDetailedView = true"
                      @duplicate-book="currentBookToDuplicate = $event, showModifyingForm = false, showAddingForm = true"
                      />
                  </div>
                  <div v-if="showBookDetailedView" class="col-md-4">
                      <BookDetails :book="currentBookToShowDetails" @close-window="showBookDetailedView = false"/>
                  </div>
              </div>
          </div>
      </div>
    </main>
    <div v-if="getBooksThatAreOutOfStock() !== ''" class="alert alert-danger text-center alert-dismissible fade show position-fixed top-0 start-0 w-100 z-index-1030" role="alert">
        <p v-html="OUT_OF_STOCK_ALERT_MESSAGE + getBooksThatAreOutOfStock()"></p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
    </div>
    <footer class="text-center py-3">
        <div class="container">
            <p>&copy; 2025 Book Manager. All rights reserved.</p>
        </div>
    </footer>
</template>

<style scoped>
</style>