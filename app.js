const express = require('express');
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const Article = require('./models/Article')
const methodOverride = require('method-override');
const { findOne } = require('./models/Article');
const articleController = require('./controllers/articleController')

const app = express();

//Connect db
mongoose.connect('mongodb://localhost/clean-blog-test-db', { useNewUrlParser: true, useUnifiedTopology: true })

//Template engine
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

//Routes
app.get('/', articleController.getAllArticles)
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})
app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/articles/:id', articleController.getArticle)

app.post('/articles', articleController.createArticle)

app.get('/articles/edit/:id', async (req, res) => {
    const article = await Article.findOne({ _id: req.params.id })
    res.render('edit', {
        article
    })
})
app.put('/articles/:id', articleController.updateArticle)

app.delete('/articles/:id', articleController.deleteArticle)


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});