import Image from 'next/image';
import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';

import { createApolloClient } from '@ps-ecommerce/shared-server';
import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';

import { Product } from '@ps-ecommerce/types'

import { ProductsCarousel } from '@ps-ecommerce/shared-ui-components';

import heroMainImage from '../images/hero-1_big.webp';
import heroTitleImage from '../images/hero-2.webp';

import { utilStyles } from '@ps-ecommerce/design-system';
import styles from './index.module.css';

type Props = {
	featuredProducts: {
		newArrivals: Product[];
		topSellers: Product[];
		trending: Product[];
	}
}

const FeaturedProductsQuery = gql`
	query FeaturedProductsQuery($count: Int) {
		featuredProducts(count: $count) {
			newArrivals {
				id
				code
				name
				altName
				gridImages
				price
			}
			topSellers {
				id
				code
				name
				altName
				gridImages
				price
			}
			trending {
				id
				code
				name
				altName
				gridImages
				price
			}
		}
	}
`;

function MarketingHero() {
	return (
		<div className={styles.marketingHero} data-test-id="marketing-hero">
			<Image
				src={heroMainImage}
				loading="eager"
				alt="Halls of Ivy creativity"
				layout="responsive"
				priority
				className={styles.marketingHeroMainImage}
			/>
			<div className={styles.marketingHeroTitleImage}>
				<Image
					src={heroTitleImage}
					alt="Ivy Park title"
					layout="responsive"
					priority
				/>
			</div>
		</div>
	)
}

function Home({ featuredProducts: { newArrivals, topSellers, trending } }: Props) {
	return (
		<section className={styles.homePage}>
			<MarketingHero />
			<ul>
				<li className={utilStyles.marginBottom_40}>
					<ProductsCarousel
						products={newArrivals}
						title="NEW ARRIVALS"
						imageSize={255}
					/>
				</li>
				<li className={utilStyles.marginBottom_40}>
					<ProductsCarousel
						products={topSellers}
						title="TOP SELLERS"
						imageSize={255}
					/>
				</li>
				<li className={utilStyles.marginBottom_40}>
					<ProductsCarousel
						products={trending}
						title="TRENDING"
						imageSize={255}
					/>
				</li>
			</ul>
		</section>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = createApolloClient({
		endpointUrl: process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL,
	});
	const apolloQueryData = await apolloClient.query({
		query: FeaturedProductsQuery
	});

	return {
		props: {
			featuredProducts: apolloQueryData.data.featuredProducts
		},
		revalidate: 60 * 60 * 24 // Cache this page for a day (in seconds)
	}
}

export default Home;
