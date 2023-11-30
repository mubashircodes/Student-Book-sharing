import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URI;
console.log(url);
const client = new MongoClient(url);
const dbName = 'student-resources-db';

export async function GET(request) {
  const { id } = request.params;

  await client.connect();

  try {
    const db = client.db(dbName);
    const booksCollection = db.collection('books');

    if (id) {
      // If an ID is provided, fetch a specific book by ID
      const book = await booksCollection.findOne({ _id: new ObjectId(id) });

      if (!book) {
        return Response.json({ data: null }); // Book not found
      }

      return Response.json({ data: book });
    } else {
      // If no ID is provided, fetch all books sorted by createdAt
      const books = await booksCollection.find({}).sort({ createdAt: -1 }).toArray();
      return Response.json({ data: books });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


