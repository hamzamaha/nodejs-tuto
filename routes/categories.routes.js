const express = require('express')
const { getAllCategories, saveCategorie, oneCategorie, putCategorie, patchCategorie, deleteCategorie } = require('../controllers/categories.controllers')

const router = express.Router()

router.get('/articles', getAllCategories)

router.post('/articles', saveCategorie)

router.get('/articles/:id', oneCategorie)

router.put('/articles/:id', putCategorie)

router.patch('/articles/:id', patchCategorie)

router.delete('/articles/:id', deleteCategorie)

module.exports = router