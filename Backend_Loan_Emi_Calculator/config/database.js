const mongoose = require("mongoose");

const coonectDatabase = (url) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};
module.exports = coonectDatabase;
