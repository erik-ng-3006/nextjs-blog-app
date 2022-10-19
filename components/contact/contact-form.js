import React, { useEffect } from 'react';
import classes from './contact-form.module.css';
import { useState } from 'react';
import Notification from '../ui/notification';

function ContactForm() {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredName, setEnteredName] = useState('');
	const [enteredMessage, setEnteredMessage] = useState('');
	const [notification, setNotification] = useState(null);

	function notificationHandler() {
		setNotification(null);
	}
	useEffect(() => {
		if (notification) {
			if (
				notification.status === 'success' ||
				notification.status === 'error'
			) {
				const timer = setTimeout(() => {
					setNotification(null);
				}, 3000);

				return () => clearTimeout(timer);
			}
		}
	}, [notification]);

	const sendMessageHandler = (e) => {
		e.preventDefault();
		setNotification({
			title: 'Sending Message...',
			status: 'pending',
			message: 'Sending the message to server',
		});

		const isEmailValidate = enteredEmail.trim().includes('@');
		const isNameValidate = enteredName.trim().length !== 0;
		const isMessageValid = enteredMessage.trim().length !== 0;

		if (isEmailValidate && isNameValidate && isMessageValid) {
			fetch('/api/contact', {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					name: enteredName,
					message: enteredMessage,
				}),
				headers: { 'Content-Type': 'application/json' },
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error('Some went wrong!!');
					}
					return res.json();
				})
				.then((data) => {
					console.log(data);
					setNotification({
						title: 'Success',
						status: 'success',
						message: 'Successfully sent the message!',
					});
				})
				.catch((e) => {
					setNotification({
						title: 'Error',
						status: 'error',
						message: e.message,
					});
				});
		}
	};

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input
							type='email'
							id='email'
							required
							value={enteredEmail}
							onChange={(event) =>
								setEnteredEmail(event.target.value)
							}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input
							type='text'
							id='name'
							required
							value={enteredName}
							onChange={(event) =>
								setEnteredName(event.target.value)
							}
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						id='message'
						rows='5'
						required
						value={enteredMessage}
						onChange={(event) =>
							setEnteredMessage(event.target.value)
						}
					></textarea>
				</div>

				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
					onClick={notificationHandler}
				/>
			)}
		</section>
	);
}

export default ContactForm;
