const HttpError = require('../errors/HttpError')
const booksModel = require('../models/books-model')

const uuid= require('uuid').v4

const loans = [
    {
        id: '1',
        userId: '1',
        loanDate: new Date(),
        returnDate: null,
        isReturned: false,
        isLate: true
    },
]

module.exports = {
    getAllLoans: () => loans,

    getLoanById: (id) => loans.find(loan => loan.id === id),

    createLoan: (user, book) => {
        if (book.quantityAvailable < 1) throw new HttpError(400, 'Não há exemplares disponíveis.')
        
        const today = new Date()
        const returnDate = new Date()
        returnDate.setDate(today.getDate( + 14)) //2 semanas de emprestimo

        const newLoan = {
            id: uuid(),
            userId: user.id,
            bookId: book.id,
            loanDate: today,
            returnDate: today,
            isReturned: false,
            isLate: false
        }
        loans.push(newLoan)
        //booksModel.takeBook(book.id)
        booksModel.updateBook(book.id, {quantityAvailable: book.quantityAvailable - 1})

        return newLoan
    },

    returnLoan: (id) => {
        const loanIndex = loans.findIndex(loan => loan.id === id)
        if ( loanIndex === -1 ) throw new HttpError(404, 'Emprestimo não encontrado!')
            
        const loan = loans[loanIndex]
        if (loan.isReturned) return null

        loan.isReturned = true

        const today = new Date()
        const limitDate = new Date(loan.returnDate)
        loan.isLate = today > limitDate
        loan.returnDate = today

        booksModel.returnBook(loan.bookId)
        return loan
    }
    
}


