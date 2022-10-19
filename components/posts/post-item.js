import React from 'react';
import Link from 'next/link';
import styles from './post-item.module.css';
import Image from 'next/image';

function PostItem({ post }) {
	const { title, date, image, slug, excerpt } = post;

	const convertedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const imagePath = `/image/posts/${slug}/${image}`;

	return (
		<li className={styles.post}>
			<Link href={`posts/${slug}`}>
				<a>
					<div className={styles.image}>
						<Image
							src={imagePath}
							width={300}
							height={300}
							alt={title}
							layout='responsive'
						/>
					</div>
					<div className={styles.content}>
						<h3>{title}</h3>
						<time>{convertedDate}</time>
						<p>{excerpt}</p>
					</div>
				</a>
			</Link>
		</li>
	);
}

export default PostItem;
