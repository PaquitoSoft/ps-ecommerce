type Props = {
	timestamp: number;
	type?: 'simple' | 'full';
	className?: string;
}

export function FormattedDate({ timestamp, type = 'simple', className }: Props) {
	const date = new Date(timestamp);
	return (
		<span className={className}>
			{type === 'simple' ? date.toLocaleDateString() : date.toLocaleString()}
		</span>
	);
}

export default FormattedDate;
