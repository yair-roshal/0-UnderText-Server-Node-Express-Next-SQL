const express = require('express')
const router = express.Router()
const WordController = require('../controllers/words.controller')

router.route('/').get(WordController.getWordsStartPage)




router
    .route('/:table')
    .get(WordController.getWords)
    .post(WordController.createWord)
    .post(WordController.updateTable)
    .delete(WordController.deleteTable)

router
    .route('/:table/:id')
    .get(WordController.getWord)
    .put(WordController.updateWord)
    .delete(WordController.deleteWord)

module.exports = router
