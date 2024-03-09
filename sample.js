import express from "express"
import bodyParser from "body-parser";

const app = express();

const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.render("home.ejs");
})

app.post('/submit', (req,res) => {
  const { topic, content } = req.body;
  
 
  res.render("home.ejs",{topic, content} );

})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  