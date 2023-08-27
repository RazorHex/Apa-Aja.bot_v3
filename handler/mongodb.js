// import { MongoClient } from "mongodb";
// import { config } from "dotenv";
const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
config();
const url = process.env.MONGODB;
const mongoClient = new MongoClient(url);

const connection = () => {
  return new Promise(async (resolve, reject) => {
    await mongoClient.connect((error, res) => {
      if (error) {
        reject(error);
      }

      console.log("[!] Successfully connected to MongoDB Database.");
      resolve(res.db("Discord").collection("servers"));
    });
  });
};

const database = new Promise(async (resolve, reject) => {
  resolve(mongoClient.db("discord").collection("server"));
});

module.exports = { connection, database };