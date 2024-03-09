import express from "express"
import bodyParser from "body-parser";

const app = express();

const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
let posts=[];
let post=0;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.render("home.ejs",{posts});
})

app.post('/submit', (req,res) => {
  const { topic, content } = req.body;
   const data = {
     topic: req.body["topic"],
    content: req.body["content"],
    
  };
  const newPost={
    id:post++,
    topic:data.topic,
    content:data.content,
  };
  posts.push(newPost);
 
  res.redirect("/");

})

app.get('/send', (req, res) => {
  const id = req.query.id;
  res.render("blog.ejs", { posts, id });
});
app.get('/home', (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  