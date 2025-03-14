import { MongoClient, ServerApiVersion } from "mongodb";
import { ENVS } from "./environment";

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(ENVS.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function CONNECT_DB() {
  // Connect the client to the server	(optional starting in v4.7)
  await mongoClientInstance.connect();

  // Send a ping to confirm a successful connection
  trelloDatabaseInstance = mongoClientInstance.db(ENVS.DATABASE_NAME);
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first!");

  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
