import { MongoClient } from 'mongodb';

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.cvfrysv.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDatabase() {
	const client = new MongoClient(
		//'mongodb+srv://admin123:PHqNbNmI9AhlrIIW@cluster0.cvfrysv.mongodb.net/?retryWrites=true&w=majority'
		connectionString
	);
	await client.connect();
	return client;
}

export async function insertData(client, collectionName, data) {
	const db = client.db('blog');
	await db.collection(collectionName).insertOne(data);
	client.close();
}
