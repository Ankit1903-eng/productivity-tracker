import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log("==============");
console.log("ENV CHECK");
console.log("==============");

console.log(
  "URI Loaded:",
  !!process.env.MONGO_URI
);

console.log(
  "Starts With mongodb+srv:",
  process.env.MONGO_URI?.startsWith(
    "mongodb+srv://"
  )
);

console.log(
  "URI Preview:",
  process.env.MONGO_URI?.substring(
    0,
    50
  ) + "..."
);

const client = new MongoClient(
  process.env.MONGO_URI,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

async function run() {
  try {
    console.log(
      "\n🔄 Connecting to MongoDB..."
    );

    await client.connect();

    console.log(
      "✅ MongoDB Connected"
    );

    await client
      .db("admin")
      .command({ ping: 1 });

    console.log(
      "✅ Ping Success"
    );
  } catch (err) {
    console.log(
      "\n❌ MongoDB Error"
    );

    console.log(
      "Error Name:",
      err.name
    );

    console.log(
      "Error Message:",
      err.message
    );

    console.log(err);
  } finally {
    await client.close();
  }
}

run();