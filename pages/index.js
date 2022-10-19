import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-api';
import Head from 'next/head';

export default function Home({ posts }) {
	return (
		<>
			<Head>
				<title>Erik&apos;s blog</title>
				<meta
					name='description'
					content='I post about programming and web development'
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	);
}

export function getStaticProps() {
	const posts = getFeaturedPosts();

	return {
		props: {
			posts,
		},
		revalidate: 1800,
	};
}
