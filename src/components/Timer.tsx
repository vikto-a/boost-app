import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';

import { Time } from './Time';

type Props = {
	start: DateTime;
	running: boolean;
};

export const Timer: React.FC<Props> = ({ start, running }) => {
	const [duration, setDuration] = useState<Duration>(Duration.fromObject({}));

	const updateTimer = () => {
		const diff = DateTime.now().diff(start, [
			'hours',
			'minutes',
			'seconds',
			'milliseconds',
		]);

		setDuration(diff);
	};

	useEffect(() => {
		const interval = setInterval(updateTimer, 100);

		if (!running) {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [running]);

	return (
		<div className="mx-auto text-5xl">
			<Time duration={duration} />
		</div>
	);
};
