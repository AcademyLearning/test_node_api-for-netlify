const { MongoClient } = require("mongodb");

// const uri = "mongodb://0.0.0.0:27017";
// const dbName = "vtinCertificates";
const uri = process.env.MONGODB_URI;
const dbName = "stuDataDb";

// Create a MongoClient with connection pooling
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if no server is selected
  maxPoolSize: 10, // Set the size of the connection pool
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}

function getStuInfoCollection() {
  const db = client.db(dbName);
  return db.collection("studentInfo");
}

async function closeDB() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB connection", err);
  }
}

async function testDatabaseConnection() {
  try {
    const db = await connectToDB();

    if (db) {
      try {
        const StuInfoCollection = getStuInfoCollection();

        const randomDocument = await StuInfoCollection.aggregate([
          { $sample: { size: 1 } },
        ]).toArray();
        console.log(randomDocument);
        if (randomDocument.length > 0) {
          console.log("Database collection connection Succesfull");
          return(randomDocument);
        } else {
          console.log("Error during database's collection connection::");
        }
      } catch (error) {
        console.error("Error during database's collection connection:", error);
      } finally {
        // Close the database connection
        await closeDB();
      }
    } else {
      console.log("Unable to connect to the database.");
    }
  } catch (error) {
    console.error("Error during database connection:", error);
  }
}

module.exports = {
  connectToDB,
  getStuInfoCollection,
  closeDB,
  testDatabaseConnection,
};
