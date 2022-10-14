import { GetServerSideProps } from 'next';

import { graphqlSchemaExtensions as customerSchema } from '@ps-ecommerce/customer-backend';
import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { graphqlSchemaExtensions as checkoutSchema } from '@ps-ecommerce/checkout-backend';
import { createApolloClient } from '@ps-ecommerce/shared-server';

import { Product } from '@ps-ecommerce/types';

import { SectionTitle, TwoLayoutMainContent } from '@ps-ecommerce/design-system';
import {
	ProductSummary,
	HelpLinksList,
	useWishlist,
	WishlistQuery
} from '@ps-ecommerce/shared-ui-components';

import styles from './wishlist.module.css';

function WishlistPage() {
	const {
		state: { wishlist },
		actions: { handleProductSelection }
	} = useWishlist();

	if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
		return (
			<div>
				<SectionTitle as="h1">My Wishlist</SectionTitle>
				<p className={styles.wishlistPageEmptyMsg}>Your wishlist is currently empty.</p>
			</div>
		);
	}

	return (
		<section className={styles.wishlistPage}>
			<TwoLayoutMainContent>
				<div>
					<SectionTitle as="h1">My Wishlist</SectionTitle>
					<ul className={styles.wishlistItemsList}>
						{wishlist?.products.map(product =>
							<ProductSummary
								key={(product as Product).code}
								className={styles.wishlistItem}
								product={product as Product}
								showCategory={false}
								isWishlistedProduct={true}
								onWishlistSelectionUdpate={(product: Product) => handleProductSelection(product.id)}
							/>
						)}
					</ul>
				</div>
				<div>
					<HelpLinksList
						title="Need help?"
						titleSize='small'
						links={[
							{ href: '#', text: 'Products' },
							{ href: '#', text: 'Ordering & Payments' },
							{ href: '#', text: 'Delivery' },
							{ href: '#', text: 'Promotions & Vouchers' },
							{ href: '#', text: 'Returns & refunds' },
							{ href: '#', text: 'Accounts & Newsletter' },
							{ href: '#', text: 'Company information' }
						]}
					/>
				</div>
			</TwoLayoutMainContent>
		</section>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = context.query.userId as string;

	const apolloClient = createApolloClient({
		context: { userId },
		schemaExtensions: [customerSchema, catalogSchema, checkoutSchema]
	});
	await apolloClient.query({
		query: WishlistQuery
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract()
		}
	};
}

export default WishlistPage;
