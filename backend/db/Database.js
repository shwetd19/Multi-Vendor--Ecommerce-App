// const mongoose = require("mongoose");

// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((data) => {
//       console.log(`mongod connected with server: ${data.connection.host}`);
//     });
// };

// module.exports = connectDatabase;


const mongoose = require("mongoose");

const connectDatabase = () => {
  const dbUrl = "mongodb+srv://trathi1703:trathi1703@cluster0.rpyor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  if (!dbUrl) {
    console.error("Error: DB_URL is not defined in environment variables.");
    process.exit(1); // Exit the process if the database URL is not provided
  }

  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1); // Exit the process if the connection fails
    });
};

module.exports = connectDatabase;
