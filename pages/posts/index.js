import React from 'react';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-api';
import Head from 'next/head';
function AllPostsPage({ posts }) {
	return (
		<>
			<Head>
				<title>All posts</title>
				<meta
					name='description'
					content='a list of all programming tutorials and posts'
				/>
			</Head>
			<AllPosts posts={posts} />
		</>
	);
}

export default AllPostsPage;

export function getStaticProps() {
	const posts = getAllPosts();

	return {
		props: {
			posts,
		},
	};
}
