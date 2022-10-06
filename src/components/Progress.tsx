import { Color } from '@type';
import cn from 'variant-classnames';

type Props = {
	value: number;
	max: number;
	color: Color;
	mute?: boolean;
};

export const Progress: React.FC<Props> = ({ value, max, color, mute }) => {
	const percentage = (100 * value) / max;

	const variants = {
		$all: 'h-2 transition-all',
		color: {
			red: 'bg-red-400',
			green: 'bg-green-400',
			yellow: 'bg-yellow-400',
			blue: 'bg-blue-400',
			purple: 'bg-purple-400',
		},
		mute: {
			true: 'bg-neutral-700',
		},
	};

	const classes = cn(variants, { color, mute });

	return (
		<div className="h-2 w-full overflow-hidden rounded-md bg-neutral-800">
			<div
				style={{ width: String(percentage).concat('%') }}
				className={classes}
			></div>
		</div>
	);
};
