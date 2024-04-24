// import express from 'express'
// import * as dotenv from 'dotenv'
// import cors from 'cors'
// import Replicate from "replicate";


const express = require("express");
const cors = require("cors");
const app = express()
const Replicate  = require("replicate");
const path = require("path");

app.use(cors())
require("dotenv").config({path:"./config/.env"});
// dotenv.config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from BirbleAi!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const input = {
      top_p: 1,
      prompt: prompt,
      temperature: 0.5,
      system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
      max_new_tokens: 500
  };
      
      let response = ''; // Initialize an empty response string

      for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
        response += event.toString();
    }
  
      // Send the aggregated response back to the client
      res.status(200).json({ response });
  

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

//to serve the frontend
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      //res.status(500).send(err);
      res.status(500).json(err);
    }
  );
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))