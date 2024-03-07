import express from "express";
import { createClient } from "@supabase/supabase-js";


// import morgan from "morgan";
import bodyParser from "body-parser";
import { route } from "./src/Router/route.js";

import { supabase } from "./config.js";

// import path from "path"

const app = express();
const port = process.env.PORT || 8080;
// Using morgan for logs
// app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(route);

app.get("/", (req, res) => {
  res.send("halo world")
});

app.listen(port, (err, res) => {
  if (err) {
      console.log(err)
      return res.status(500).send(err.message)
  } else {
      console.log('[INFO] Server Running on port:', port)
  }
})
