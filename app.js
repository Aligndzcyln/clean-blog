const express = require('express');
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const Article = require('./models/Article')

const app = express();

//Connect db
mongoose.connect('mongodb://localhost/clean-blog-test-db', { useNewUrlParser: true, useUnifiedTopology: true })

//Template engine
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.get('/', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'))
    const articles = await Article.find({})
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

app.post('/articles', async (req, res) => {
    await Article.create(req.body)
    res.redirect('/')
})


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});