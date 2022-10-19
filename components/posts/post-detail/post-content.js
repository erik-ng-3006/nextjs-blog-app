import React from 'react';
import styles from './post-content.module.css';
import PostHeader from './post-header';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function PostContent({ post }) {
	const { slug, image, content, title } = post;
	const imagePath = `/image/posts/${slug}/${image}`;

	const customRenderers = {
		p(paragraph) {
			const { node } = paragraph;

			if (node.children[0].tagName === 'img') {
				const image = node.children[0];

				return (
					<div className={styles.image}>
						<Image
							src={image.properties.src}
							width={600}
							height={300}
							alt={title}
						/>
					</div>
				);
			}
		},
		code(code) {
			const language = code.className.split('-')[1];
			return (
				<SyntaxHighlighter language={language}>
					{code.children}
				</SyntaxHighlighter>
			);
		},
	};
	return (
		<article className={styles.content}>
			<PostHeader title={title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>
				{content}
			</ReactMarkdown>
		</article>
	);
}

export default PostContent;
