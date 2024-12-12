// const app = require("./app");
// const connectDatabase = require("./db/Database");
// const cloudinary = require("cloudinary");
// require('newrelic');


// // Handling uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`shutting down the server for handling uncaught exception`);
// });

// // config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: "config/.env",
//   });
// }

// // connect db
// connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// // create server
// const server = app.listen(process.env.PORT, () => {
//   console.log(
//     `Server is running on http://localhost:${process.env.PORT}`
//   );
// });

// // unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Shutting down the server for ${err.message}`);
//   console.log(`shutting down the server for unhandle promise rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });


const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");
require("newrelic");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  console.error("Shutting down the server due to an uncaught exception.");
  process.exit(1);
});

// Load environment variables in non-production environments
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/.env" });
}

// Connect to the database
connectDatabase();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  console.error("Shutting down the server due to an unhandled promise rejection.");

  server.close(() => {
    process.exit(1);
  });
});
