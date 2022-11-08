import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

import defBooks from '../../books.json' assert {type: 'json'}

const BOOKS_KEY = 'booksDB'

export const bookService = {
  query,
  get,
  addReview,
  deleteReview,
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

function addReview(book, review) {
  // console.log('adding review to', book.title, review)
  review.id = utilService.makeId()
  book.reviews ? book.reviews.push(review) : book.reviews = [review]
  return storageService.put(BOOKS_KEY, book)
}

function deleteReview(book, reviewId) {
  // console.log('deleting', reviewId, 'from', book.title)
  book.reviews = book.reviews.filter(review => review.id !== reviewId)
  return storageService.put(BOOKS_KEY, book)
}