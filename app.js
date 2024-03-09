// app.js
const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Body parser middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));

// In-memory posts data (for this version without a database)
let posts = [];

// Home route to display all posts
app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});

// Post creation form submission
app.post('/create-post', (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: Date.now().toString(),
        title,
        content,
    };
    posts.push(newPost);
    res.redirect('/');
});

// Edit post form
app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const postToEdit = posts.find(post => post.id === postId);
    res.render('edit', { post: postToEdit });
});

// Edit post form submission
app.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
        id: postId,
        title: req.body.title,
        content: req.body.content,
    };
    // Update the post in the posts array
    const index = posts.findIndex(post => post.id === postId);
    posts[index] = updatedPost;
    res.redirect('/');
});

// Delete post
app.get('/delete/:id', (req, res) => {
    const postId = req.params.id;
    // Remove the post from the posts array
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
