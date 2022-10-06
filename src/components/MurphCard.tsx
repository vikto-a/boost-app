import { Card, Time } from '@components';
import { GiBiceps, GiRun, GiStopwatch } from 'react-icons/gi';

import { DateTime } from 'luxon';
import { Murph } from '@prisma/client';

export const MurphCard: React.FC<Murph> = ({
	start,
	firstSprintEndTime,
	exerciseEndTime,
	lastSprintEndTime,
}) => {
	const totalTime = DateTime.fromJSDate(lastSprintEndTime).diff(
		DateTime.fromJSDate(start),
		['hours', 'minutes', 'seconds', 'milliseconds']
	);

	const firstSprintTime = DateTime.fromJSDate(firstSprintEndTime).diff(
		DateTime.fromJSDate(start),
		['hours', 'minutes', 'seconds', 'milliseconds']
	);

	const exerciseTime = DateTime.fromJSDate(exerciseEndTime).diff(
		DateTime.fromJSDate(firstSprintEndTime),
		['hours', 'minutes', 'seconds', 'milliseconds']
	);

	const lastSprintTime = DateTime.fromJSDate(lastSprintEndTime).diff(
		DateTime.fromJSDate(exerciseEndTime),
		['hours', 'minutes', 'seconds', 'milliseconds']
	);

	return (
		<Card color="purple">
			<div className="flex flex-col">
				<div className="flex flex-col items-center">
					{DateTime.fromJSDate(start).toFormat('dd LLL yyyy')}
				</div>

				<div className="grid flex-1 sm:grid-cols-2 lg:grid-cols-4">
					<Card icon={GiStopwatch} color="blue" shadow={false} border="none">
						<Time duration={totalTime} />
						<h3 className="text-sm text-neutral-400">Total Time</h3>
					</Card>
					<Card icon={GiRun} color="green" shadow={false} border="none">
						<Time duration={firstSprintTime} />
						<h4 className="text-sm text-neutral-400">First Sprint Time</h4>
					</Card>

					<Card icon={GiBiceps} color="red" shadow={false} border="none">
						<Time duration={exerciseTime} />
						<h4 className="text-sm text-neutral-400">Exercise Time</h4>
					</Card>

					<Card icon={GiRun} color="green" shadow={false} border="none">
						<Time duration={lastSprintTime} />
						<h4 className="text-sm text-neutral-400">Last Sprint Time</h4>
					</Card>
				</div>
			</div>
		</Card>
	);
};
