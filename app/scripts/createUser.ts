import { createBook } from "../db.service"

import books from '../../../dataBooks.json'

export const addBook = async () => {
	for(const book of books) {
		await createBook(book)
	}
}