import { useEffect, useState } from 'react';

import { DateTime } from 'luxon';

type Props = {
	start: DateTime;
};

export const Timer: React.FC<Props> = ({ start }) => {
	const [hours, setHours] = useState<undefined | number>(0);
	const [minutes, setMinutes] = useState<undefined | number>(0);
	const [seconds, setSeconds] = useState<undefined | number>(0);
	const [milliseconds, setMilliseconds] = useState<undefined | number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const diff = DateTime.now().diff(start, [
				'hours',
				'minutes',
				'seconds',
				'milliseconds',
			]);

			setHours(diff.toObject().hours);
			setMinutes(diff.toObject().minutes);
			setSeconds(diff.toObject().seconds);
			setMilliseconds(diff.toObject().milliseconds);
		}, 1);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="font-mono text-5xl">
			<span className={`${hours === 0 ? 'text-neutral-500' : 'text-white'}`}>
				{String(hours).padStart(2, '0')}:
			</span>
			<span className={`${minutes === 0 ? 'text-neutral-500' : 'text-white'}`}>
				{String(minutes).padStart(2, '0')}:
			</span>
			<span>{String(seconds).padStart(2, '0')}</span>
			<span>.</span>
			<span>{String(milliseconds).padStart(3, '0')}</span>
		</div>
	);
};
