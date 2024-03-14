import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://dog.ceo/api/breeds/list/all");
    const keyName = result.data.message;
    // for (const key in a) {
    //   console.log(key);
    // }
    res.render("index.ejs", {
      breed: keyName,
    });
  } catch (error) {
    console.log(error.response.data);
  }
});

app.get("/random", async (req, res) => {
  try {
    const result = await axios.get("https://dog.ceo/api/breeds/image/random");
    const result2 = await axios.get("https://dog.ceo/api/breeds/list/all");
    const keyName = result2.data.message;
    // console.log(result.data);
    res.render("index.ejs", {
      message: result.data.message,
      breed: keyName,
    });
  } catch (error) {
    console.log(error.response.data);
  }
});

app.get("/multipleRandom", async (req, res) => {
  try {
    const result = await axios.get("https://dog.ceo/api/breeds/image/random/3");
    // console.log(result.data);
    const result2 = await axios.get("https://dog.ceo/api/breeds/list/all");
    const keyName = result2.data.message;
    res.render("index.ejs", {
      messages: result.data.message,
      breed: keyName,
    });
  } catch (error) {
    console.log(error.response.data);
  }
});

app.post("/byBreed", async (req, res) => {
  try {
    const result = await axios.get("https://dog.ceo/api/breeds/list/all");
    const keyName = result.data.message;

    const key = req.body.example;
    console.log(key);

    const newResult = await axios.get(
      `https://dog.ceo/api/breed/${key}/images/random`
    );

    res.render("index.ejs", {
      breed: keyName,
      message2: newResult.data.message,
    });
  } catch (error) {
    console.log("error");
  }
});

app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});

// function uppercase(string) {
//   let str = string;
//   let a = str.split("")[0].toUpperCase();
//   let b = str.slice(1).toLowerCase();
//   return a.concat(b);
// }
