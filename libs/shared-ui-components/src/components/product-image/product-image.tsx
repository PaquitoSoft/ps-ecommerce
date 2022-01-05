type Props = {
	imageUrl: string;
	alt: string;
	imageFit?: 'cover' | 'contain';
}

const IMAGE_SIZES = [320, 420, 640, 840, 1024];
const URL_WIDTH_PATTERN = /(w_\d+,)/;
const URL_HEIGHT_PATTERN = /(h_\d+,)/;

const calculateImageUrl = (baseUrl: string, size: number) => {
	const calculatedSize = size;
	let imageUrl = baseUrl;

	if (URL_WIDTH_PATTERN.test(imageUrl)) {
		imageUrl = imageUrl.replace(URL_WIDTH_PATTERN, `w_${calculatedSize},`);
	}

	if (URL_HEIGHT_PATTERN.test(imageUrl)) {
		imageUrl = imageUrl.replace(URL_HEIGHT_PATTERN, `h_${calculatedSize},`);
	}

	return imageUrl;
}

const buildSizesAttribute = (sizes: number[]) =>
	sizes.map(size => `(max-width: ${size}px) ${size}px`).join(',');

const buildSrcAttribute = (baseImageUrl: string, sizes: number[]) =>
	sizes.map(size => `${calculateImageUrl(baseImageUrl, size)} ${size}w`).join(',');

function ProductImage({ imageUrl, alt, imageFit = 'contain' }: Props) {
	return (
		<img
			style={{ width: '100%', height: '100%', objectFit: imageFit }}
			sizes={buildSizesAttribute(IMAGE_SIZES)}
			srcSet={buildSrcAttribute(imageUrl, IMAGE_SIZES)}
			alt={alt}
		/>
	);
}

export default ProductImage;
