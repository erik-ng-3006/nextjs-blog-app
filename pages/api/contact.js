import { connectDatabase, insertData } from '../../util/db-util';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input!' });
			return;
		}

		let client;

		try {
			client = await connectDatabase();
		} catch (e) {
			res.status(500).json({
				message: 'Failed trying connect to the database!',
			});
			return;
		}

		try {
			await insertData(client, 'contact', req.body);
		} catch (e) {
			res.status(500).json({
				message: 'Failed trying to send message!!',
			});
			client.close();
			return;
		}
	}

	res.status(201).json({ message: req.body });
}
