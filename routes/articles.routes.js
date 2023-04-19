const express = require('express')
const multer  = require('multer')
const {ValidateAddArticle}=require('./../middleware/articles.middleware')
const { getAllArticles, saveArticle, oneArticle, putArticle, patchArticle, deleteArticle,createArticle,updateArticle } = require('../controllers/articles.controllers')
const path = require('path')
const router = express.Router()

router.get('/articles', getAllArticles)
router.get('/articles/create', createArticle)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../public/uploads`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })

  
const upload = multer({ storage })

router.post('/articles',[upload.single('url'),ValidateAddArticle], saveArticle)

router.get('/articles/:id', oneArticle)

// router.put('/articles/:id', putArticle)
router.post('/articles/:id', putArticle)
router.get('/edit/:id', updateArticle)

router.patch('/articles/:id', patchArticle)

router.delete('/articles/:id', deleteArticle)

module.exports = router