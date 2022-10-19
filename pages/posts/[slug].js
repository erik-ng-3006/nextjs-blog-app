import React from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getAllPosts, getPostData } from '../../lib/posts-api';
import Head from 'next/head';

function PostDetailPage({ post }) {
	const { title, excerpt } = post;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={excerpt} />
			</Head>
			<PostContent post={post} />
		</>
	);
}

export default PostDetailPage;

/* export function getServerSideProps(context) {
	const slug = context.query.slug;

	const fileName = slug + '.md';

	const post = getPostData(fileName);
	return {
		props: { post },
	};
} */

export function getStaticProps(context) {
	const post = getPostData(context.params.slug + '.md');

	return {
		props: { post },
	};
}

export function getStaticPaths() {
	const posts = getAllPosts();

	const paths = posts.map((post) => {
		return { params: { slug: post.slug } };
	});
	return {
		paths,
		fallback: false,
	};
}
