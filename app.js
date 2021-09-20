const express = require('express');
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const Article = require('./models/Article')
const methodOverride = require('method-override');
const { findOne } = require('./models/Article');

const app = express();

//Connect db
mongoose.connect('mongodb://localhost/clean-blog-test-db', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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
app.get('/', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'))
    const articles = await Article.find({}).sort('-dateCreated')
    res.render('index', {
        articles: articles
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})
app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/articles/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('post', {
        article
    })
})

app.post('/articles', async (req, res) => {
    await Article.create(req.body)
    res.redirect('/')
})

app.get('/articles/edit/:id', async (req, res) => {
    const article = await Article.findOne({ _id: req.params.id })
    res.render('edit', {
        article
    })
})
app.put('/articles/:id', async (req, res) => {
    const article = await Article.findOne({ _id: req.params.id });
    article.name = req.body.name;
    article.message = req.body.message;
    article.save();

    res.redirect(`/articles/${req.params.id}`)
})

app.delete('/articles/:id', async (req, res) => {
    await Article.findByIdAndRemove(req.params.id)
    res.redirect('/')
})


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});