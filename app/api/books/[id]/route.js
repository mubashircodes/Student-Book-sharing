import { MongoClient, ObjectId } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URI;
const client = new MongoClient(url);
const dbName = 'student-resources-db';

export async function GET(request, { params }) {
  const { id } = params;

  await client.connect();

  try {
    const db = client.db(dbName);
    const booksCollection = db.collection('books');

    // If an ID is provided, fetch a specific book by ID
    const book = await booksCollection.findOne({ _id: new ObjectId(id) });
    console.log(`Found documents filtered by { a: ${id} } =>`, book);

    if (!book) {
      return Response.json({ data: null }); // Book not found
    }

    return Response.json({ data: book });
  } catch (error) {
    console.error('Error fetching books:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


