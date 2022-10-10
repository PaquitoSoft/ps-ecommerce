import { useCallback, useState } from "react";

type Props = {
	imageUrl: string;
	alt: string;
	imageFit?: 'cover' | 'contain';
}

const IMAGE_SIZES = [320, 420, 640, 840, 1024];
const URL_WIDTH_PATTERN = /(w_\d+,)/;
const URL_HEIGHT_PATTERN = /(h_\d+,)/;
const FALLBACK_IMAGE_URL = 'https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/4e51b32c2ca64c7aa4e3ac63015525ca_9366/adicolor-classics-firebird-primeblue-track-top.jpg';

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
	const [imageSrcSet, setImageSrcSet] = useState(buildSrcAttribute(imageUrl, IMAGE_SIZES));
	const [imageLoadError, setImageLoadError] = useState(false);

	const onError = useCallback(() => {
		setImageSrcSet(buildSrcAttribute(FALLBACK_IMAGE_URL, IMAGE_SIZES));
		setImageLoadError(true);
	}, [imageUrl]);

	return (
		<img
			style={{
				width: '100%',
				height: '100%',
				objectFit: imageFit,
				filter: `blur(${imageLoadError ? 15 : 0}px)`
			}}
			sizes={buildSizesAttribute(IMAGE_SIZES)}
			srcSet={imageSrcSet}
			onError={onError}
			alt={alt}
		/>
	);
}

export default ProductImage;
