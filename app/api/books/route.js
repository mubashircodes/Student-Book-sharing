import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URI;
const client = new MongoClient(url);
const dbName = 'book-sharing-db';

export async function GET() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const booksCollection = db.collection('books');
  const books = await booksCollection.find({}).toArray();

  return Response.json({ data: books });
}
