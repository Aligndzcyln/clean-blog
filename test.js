const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Connect db
mongoose.connect('mongodb://localhost/clean-blog-test-db', { useNewUrlParser: true, useUnifiedTopology: true })

//Create schema
const ArticleSchema = new Schema({
    name: String,
    message: String
})

const Article = mongoose.model('Article', ArticleSchema)

//Create article
// Article.create({
//     name: "Article name 2",
//     message: "Lorem 2",
// });

//Read article
// Article.find({}, (err, data) => {
//     console.log(data);
// })

//Update article
// const id = "614336e11297e1848c3d2565"

// Article.findByIdAndUpdate(
//     id, {
//     message: "Article paragraph updated"
// },
//     {
//         new: true
//     },
//     (err, data) => {
//         console.log(data)
//     }
// )

//Delete an article
const id = "614336e11297e1848c3d2565"

Article.findByIdAndDelete(id, (err, data) => {
    console.log("Article is removed")
})