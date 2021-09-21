const Article = require('../models/Article')

exports.getAboutPage = (req, res) => {
    res.render('about');
}

exports.getAddPage = (req, res) => {
    res.render('add_post');
}

exports.getEditPage = async (req, res) => {
    const article = await Article.findOne({ _id: req.params.id })
    res.render('edit', {
        article
    })
}

exports.getPostPage = (req, res) => {
    res.render('post');
}