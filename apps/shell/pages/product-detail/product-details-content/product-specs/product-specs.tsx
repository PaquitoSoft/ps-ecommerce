import styles from './product-specs.module.css';

type Props = {
	specs: string[];
};

function ProductSpecs({ specs }: Props) {
	return (
		<div className={styles.productSpecs}>
			<h5 className={styles.specsTitle}>SPECIFICATIONS</h5>
			<ul className={styles.specsList}>
				{specs.map((spec, index) => (
					<li key={index} className={styles.specText}>{spec}</li>
				))}
			</ul>
		</div>
	);
}

export default ProductSpecs;
