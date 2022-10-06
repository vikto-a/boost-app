import { Duration } from 'luxon';

type Props = {
	duration: Duration;
};

export const Time: React.FC<Props> = ({ duration }) => {
	const hourColor = duration.hours === 0 ? 'text-neutral-400' : 'text-inherit';
	const minColor =
		duration.hours === 0 && duration.minutes === 0
			? 'text-neutral-400'
			: 'text-inherit';

	return (
		<div className="font-mono">
			<span className={hourColor}>
				{String(duration.hours).padStart(2, '0')}:
			</span>
			<span className={minColor}>
				{String(duration.minutes).padStart(2, '0')}:
			</span>
			<span>{String(duration.seconds).padStart(2, '0')}</span>
			<span>.</span>
			<span>{String(duration.milliseconds).padStart(3, '0').charAt(0)}</span>
		</div>
	);
};
