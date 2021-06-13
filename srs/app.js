// Requried Modules
require("./db/connection");
const weatherStructure = require("./modle/weatherStructure");

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 8000; // if hosted then user port num otherwise for local host 3000

// paths
const staticPath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// for Static website and mongoDb data
app.use(express.static(staticPath));
app.use(express.json());

//Set view engine and change views folder path
app.set("view engine", "hbs");
app.set("views", templatepath);

// partial register
hbs.registerPartials(partialPath);

// routing
app.get("", (req, res) => {
  // res.send("Welcome Home page");
  res.render("index");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("/history", async (req, res) => {
  res.render("history");
});
app.get("/about", (req, res) => {
  res.render("about");
});

// Created API
app.post("/weather", async (req, res) => {
  const info = new weatherStructure(req.body);
  console.log(info);
  res.send(info);
  try {
    await info.save().then(() => {
      console.log("Submited.");
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/historyInfo", async (req, res) => {
  try {
    const blog = await weatherStructure.find();
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedNode = await weatherStructure.findByIdAndDelete(req.params.id);
    console.log(deletedNode)
    if(!req.params.id){
      return res.status(400).send();
    }
    res.send(deletedNode);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/clear",async(req,res)=>{
  try {
    const deleteAll = await weatherStructure.remove();
    console.log(deleteAll)
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
})

// Express render top to bottum, if there are no any match above then render below for error
app.get("*", (req, res) => {
  res.render("404Error", {
    errorMsg: "Oops! Page not Foung, Go back!",
  });
});

app.listen(port, () =>
  console.log(`Listening to the port on ${"http://localhost:8000"}`)
);
