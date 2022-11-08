import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

import defBooks from '../../books.json' assert {type: 'json'}

const BOOKS_KEY = 'booksDB'

export const bookService = {
  query,
  get,
  addReview,
  deleteReview,
  getPrevNextIds,
  // remove,
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
        prev: books[prevIdx]? books[prevIdx].id : null,
        next: books[nextIdx]? books[nextIdx].id : null
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