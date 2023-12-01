import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URI;
const client = new MongoClient(url);
const dbName = 'student-resources-db';

export async function GET() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const foodsCollection = db.collection('foods');
  const foods = await foodsCollection.find({}).sort({ createdAt: -1 }).toArray();

  return Response.json({ data: foods });
}

export async function POST(request) {
  // Assuming the request body contains the book information in JSON format
  const {
    title,
    author,
    address,
    condition,
    price,
    image,
  } = await request.json();

  // Validate required fields
  if (!title || !author || !address || !condition || !price || !image) {
    return new Response('Missing required fields', { status: 400 });
  }

  await client.connect();
  const db = client.db(dbName);
  const booksCollection = db.collection('books');

  // Create a new book document
  const newBook = {
    title,
    author,
    address,
    condition,
    price,
    image,
    createdAt: new Date(),
  };

  // Insert the new book into the collection
  const result = await booksCollection.insertOne(newBook);

  // Check if the insertion was successful
  if (result.insertedId)  {
    // Return the new book as part of the response
    return new Response(JSON.stringify({ id: result.insertedId }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } else {
    return new Response('Failed to add book', { status: 500 });
  }
}

