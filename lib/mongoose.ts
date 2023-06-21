import { MongoClient } from "mongodb";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = "mongodb://localhost:27017";
// "mongodb+srv://rudrasir123:ewosgvagqxiangpd@artblogcluster.rzv2ar6.mongodb.net/?appName=mongosh+1.8.0";

// if in development mode
// disable mongoclient from reloading by HMR by making is global variable
if (process.env.NODE_ENV === "development") {
  let globalWithMongoclientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };
  if (!globalWithMongoclientPromise._mongoClientPromise) {
    client = new MongoClient(uri, { appName: "ArtBlog" });
    client.db("ArtBlog");
    globalWithMongoclientPromise._mongoClientPromise = client.connect();
    // clientPromise = globalWithMongoclientPromise._mongoClientPromise;
  }
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}
async function run() {
  client = new MongoClient(uri);
  await client.db("ArtBlog").command({ ping: 1 });
  return await client.connect();
}

export default run();
