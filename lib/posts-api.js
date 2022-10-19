import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostData(fileName) {
	const postPath = path.join(postsDirectory, fileName);
	const postFile = fs.readFileSync(postPath, 'utf-8');

	const { data, content } = matter(postFile);

	const postSlug = fileName.replace(/\.md$/, '');
	const postData = {
		...data,
		slug: postSlug,
		content,
	};

	return postData;
}

export function getAllPosts() {
	const allPostFiles = fs.readdirSync(postsDirectory);

	const allPosts = allPostFiles.map((post) => {
		return getPostData(post);
	});

	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1
	);

	return sortedPosts;
}

export function getFeaturedPosts() {
	const allPosts = getAllPosts();
	const featuredPosts = allPosts.filter((post) => post.isFeatured);

	return featuredPosts;
}
