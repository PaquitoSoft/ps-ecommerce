export const ShippingIcon = ({ className = '' }) => (
	<svg className={className} width={19} height={19}>
		<g fill="none" stroke="currentColor" strokeMiterlimit="10">
			<path d="M13.42 13.5H9.5"></path>
			<path strokeLinecap="square" d="M4.5 5.5h10l4 3v5h-2m-10 0h-2m0-6h-4"></path>
			<circle cx="8" cy="13" r="1.5"></circle>
			<circle cx="15" cy="13" r="1.5"></circle>
			<path strokeLinecap="square" d="M1.5 9.5h3m-2 2h2"></path>
		</g>
	</svg>
);

export default ShippingIcon;
