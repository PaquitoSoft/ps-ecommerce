type Props = {
	timestamp: number;
	type?: 'simple' | 'full';
	className?: string;
}

const DEFAULT_LOCALE = 'en-GB';

export function FormattedDate({ timestamp, type = 'simple', className }: Props) {
	const date = new Date(timestamp);
	return (
		<span className={className}>
			{type === 'simple' ? date.toLocaleDateString(DEFAULT_LOCALE) : date.toLocaleString(DEFAULT_LOCALE)}
		</span>
	);
}

export default FormattedDate;
