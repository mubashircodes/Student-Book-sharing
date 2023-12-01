import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URI;
const client = new MongoClient(url);
const dbName = 'student-resources-db';

export async function GET() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const roomsCollection = db.collection('rooms');
  const rooms = await roomsCollection.find({}).sort({ createdAt: -1 }).toArray();

  return Response.json({ data: rooms });
}

export async function POST(request) {
  // Assuming the request body contains the food information in JSON format
  const {
    title,
    image,
    condition,
    price,
    contact,
    description,
    address,
  } = await request.json();

  // Validate required fields
  if (!title || !image || !condition || !price || !contact || !description || !address) {
    return new Response('Missing required fields', { status: 400 });
  }

  await client.connect();
  const db = client.db(dbName);
  const roomsCollection = db.collection('rooms');

  // Create a new room document
  const newRoom = {
    title,
    image,
    condition,
    price,
    contact,
    description,
    address,
    createdAt: new Date(),
  };

  // Insert the new food into the collection
  const result = await roomsCollection.insertOne(newRoom);

  // Check if the insertion was successful
  if (result.insertedId)  {
    // Return the new food as part of the response
    return new Response(JSON.stringify({ id: result.insertedId }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } else {
    return new Response('Failed to add food', { status: 500 });
  }
}

