const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/local",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
  );
  console.log("Mongo connected");
}

main();