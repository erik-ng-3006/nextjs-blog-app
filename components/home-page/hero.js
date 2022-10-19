import React from 'react';
import styles from './hero.module.css';
import Image from 'next/image';

function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.image}>
				<Image
					src='/image/site/erik.jpeg'
					alt='An image showing Erik'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I&apos;m Erik</h1>
			<p>
				I blog about web development - especially about framework like
				React..
			</p>
		</section>
	);
}

export default Hero;
