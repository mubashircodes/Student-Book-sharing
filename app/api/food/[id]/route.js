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
    const foodsCollection = db.collection('foods');

    // If an ID is provided, fetch a specific food by ID
    const food = await foodsCollection.findOne({ _id: new ObjectId(id) });
    console.log(`Found documents filtered by { a: ${id} } =>`, food);

    if (!food) {
      return Response.json({ data: null }); // food not found
    }

    return Response.json({ data: food });
  } catch (error) {
    console.error('Error fetching foods:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


