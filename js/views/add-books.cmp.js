import { bookService } from "../services/book-service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import googleBooksList from "../cmps/googleBooksList.cmp.js"


export default {
    template: `
    <section class="add-books">
        <h1>add google books</h1>
        <input
        v-model="searchStr"
        @input="search"
        placeholder="Search for a book">
        <google-books-list :books="books" @selected="addBook" />
</section>`,
    data() {
        return {
            searchStr: '',
            books: []
        }
    },
    computed: {
        booksToShow() {
            // if (!this.searchStr) return this.books
            // const regexTitle = new RegExp(this.searchStr, 'i')
            // return this.books.filter(book => regexTitle.test(book.volumeInfo.title))
        }
    },
    methods: {
        search() {
            bookService.searchGoogleBooks(this.searchStr)
                .then(books => this.books = books)
        },
        addBook(book) {

            console.log('adding', book)
            bookService.addGoogleBook(book)
                .then(book => showSuccessMsg(`${book.title} was added successfully`))
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot add book`)
                })

        }
    },
    created() {
        // bookService.getGoogleBooks().then(books => this.books = books)
    },
    components: {
        googleBooksList,
    }
}