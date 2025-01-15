import express from "express";
import methodOverride from "method-override";

const PORT = 3000;
const app = express();
let posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method")); // Enables the use of PUT/DELETE in forms

// Set EJS as the view engine
app.set("view engine", "ejs");

// Route to display all posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// Route to display the post creation form
app.get("/create", (req, res) => {
  res.render("create"); // Render the "create.ejs" file
});

// Route to display edit form
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  res.render("edit", { post });
});

// Route to handle post update
app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find((p) => p.id == req.params.id);

  if (post) {
    post.title = title;
    post.content = content;
    res.redirect("/"); // Redirect to home page after editing
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to handle post creation
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content, id: Date.now() }); // Add new post
  res.redirect("/"); // Redirect to home page
});

// Route to delete a post
app.delete("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id); // Remove post with matching ID
  res.redirect("/"); // Redirect to home page
});

// About page route
app.get("/about", (req, res) => {
  res.render("about");
});

// Contact page route
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}.`);
});
