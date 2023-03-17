import mongoose from "mongoose";

const connectMongo = () => {
  const dbURI = process.env.MONGO_DB_URL;

  if (!dbURI) {
    throw new Error("Could not connect to database as DB URL is not set.");
  }

  mongoose.set("strictQuery", false);

  try {
    const dbURI = `${process.env.MONGO_DB_URL}`;
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default connectMongo;
