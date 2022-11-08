import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

import defBooks from '../../books.json' assert {type: 'json'}
import googleBooks from '../../googleBooksDemo.json' assert {type: 'json'}

const BOOKS_KEY = 'booksDB'

export const bookService = {
  query,
  get,
  addReview,
  deleteReview,
  getPrevNextIds,
  getGoogleBooks,
  addGoogleBook,
  searchGoogleBooks,
  // save,
  // getEmptyCar,
}


function query() {
  return storageService.query(BOOKS_KEY)
    .then(res => {
      if (res.length > 0) return res
      utilService.saveToStorage(BOOKS_KEY, defBooks)
      return defBooks
    })
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function getPrevNextIds(bookId) {
  return storageService.query(BOOKS_KEY)
    .then(books => {
      const idx = books.findIndex(book => book.id === bookId)
      const prevIdx = idx - 1
      const nextIdx = idx + 1
      return {
        prev: books[prevIdx] ? books[prevIdx].id : null,
        next: books[nextIdx] ? books[nextIdx].id : null
      }
    })


}

function addReview(book, review) {
  review.id = utilService.makeId()
  book.reviews ? book.reviews.push(review) : book.reviews = [review]
  return storageService.put(BOOKS_KEY, book)
}

function deleteReview(book, reviewId) {
  book.reviews = book.reviews.filter(review => review.id !== reviewId)
  return storageService.put(BOOKS_KEY, book)
}

function getGoogleBooks(delay = 500) {
  return new Promise(resolve => setTimeout(() => resolve(googleBooks), delay))
}

function addGoogleBook(googleBook) {
  console.log('service adding')
  const book = formatNewBook(googleBook)
  console.log('formatted book:', book)
  return storageService.post(BOOKS_KEY, book)

}

function formatNewBook(googleBook) {
  return {
    id: googleBook.id,
    title: googleBook.volumeInfo.title,
    subtitle: googleBook.volumeInfo.subtitle,
    authors: googleBook.volumeInfo.authors,
    publishedDate: googleBook.volumeInfo.publishedDate,
    description: googleBook.searchInfo?.textSnippet || '',
    pageCount: googleBook.volumeInfo.pageCount,
    categories: googleBook.volumeInfo.categories,
    thumbnail: googleBook.volumeInfo.imageLinks?.thumbnail || null,
    language: googleBook.volumeInfo.language,
    listPrice: {
      amount: 100,
      currencyCode: 'USD',
      isOnSale: false
    }
  }

}


function searchGoogleBooks(searchStr) {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchStr}`)
      .then(res => res.data.items)
}