const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { findOne } = require('./models/Article');
const articleController = require('./controllers/articleController');
const pageController = require('./controllers/pageController');

const app = express();

//Connect db
mongoose.connect(`mongodb+srv://agc:${process.env.PASSWORD}@cluster0.2ou3y.mongodb.net/clean-blog-db?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('db connected');
    }).catch((err) => {
        console.log(err);
    })

//Template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

//Routes
app.get('/', articleController.getAllArticles);
app.get('/articles/:id', articleController.getArticle);
app.post('/articles', articleController.createArticle);
app.put('/articles/:id', articleController.updateArticle);
app.delete('/articles/:id', articleController.deleteArticle);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/post', pageController.getPostPage);
app.get('/articles/edit/:id', pageController.getEditPage);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
