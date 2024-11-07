const express = require('express')
const booksController = require('../controllers/books-controller')
const loanControllers = require('../controllers/loan-controllers')
const { ensureAuth } = require('../middleware/auth-middleware')

const apiRouter = express.Router()

apiRouter.get('/books', booksController.index)
apiRouter.get('/books/:id', booksController.show)

apiRouter.post('/books', booksController.save)
apiRouter.put('/books/:id', booksController.update)
apiRouter.delete('/books/:id', booksController.delete)

apiRouter.get('/loans', loanControllers.index)
apiRouter.get('/loans/:id', loanControllers.show)
apiRouter.post('/loans', ensureAuth, loanControllers.save)
apiRouter.post('/loans/:id/return', loanControllers.return)

module.exports = apiRouter