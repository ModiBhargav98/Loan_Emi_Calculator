const app = require("./app");
const config = require("./config/config");
const connectDatabase = require("./config/database");
connectDatabase(config.DB_URl);

app.listen(config.PORT || 4001, () => {
  console.log(`Server is Working On ${config.PORT || 4001}`);
});

//unhandled promise rejection
process.on("unhandleRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shuting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
