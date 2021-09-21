const Article = require('../models/Article')


exports.getAllArticles = async (req, res) => {

    const page = req.query.page || 1;
    const photosPerpage = 3;
    const totalPhotos = await Article.find().countDocuments();

    const articles = await Article.find({})
        .sort('-dateCreated')
        .skip((page - 1) * photosPerpage)
        .limit(photosPerpage)

    res.render('index', {
        articles: articles,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerpage)
    })

    // res.sendFile(path.resolve(__dirname, 'temp/index.html'))
}

exports.getArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('post', {
        article
    })
}

exports.createArticle = async (req, res) => {
    await Article.create(req.body);
    res.redirect('/');
}

exports.updateArticle = async (req, res) => {
    const article = await Article.findOne({ _id: req.params.id });
    article.name = req.body.name;
    article.message = req.body.message;
    article.save();

    res.redirect(`/articles/${req.params.id}`);
}

exports.deleteArticle = async (req, res) => {
    await Article.findByIdAndRemove(req.params.id);
    res.redirect('/');
}