import { GiBiceps, GiCalendar, GiRun, GiStopwatch } from 'react-icons/gi';

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
		<div
			className={`grid grid-cols-5 gap-y-6 gap-x-12 rounded-md border-l-8 border-purple-400 bg-neutral-900 py-3 px-6 shadow-2xl shadow-purple-500`}
		>
			<div className="flex items-center gap-6">
				<div className={`text-purple-400`}>
					<GiStopwatch size={30} />
				</div>
				<div>
					<h2 className="font-mono text-lg font-bold">
						{totalTime.hours}:{totalTime.minutes}:{totalTime.seconds}.
						{totalTime.milliseconds}
					</h2>
					<h3 className="text-sm text-neutral-400">Total Time</h3>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-purple-400`}>
					<GiCalendar size={30} />
				</div>
				<div>
					<h2 className="font-mono text-lg font-bold">
						{DateTime.fromJSDate(start).toFormat('dd LLL yyyy')}
					</h2>
					<h3 className="text-sm text-neutral-400">Date</h3>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-green-400`}>
					<GiRun size={30} />
				</div>
				<div>
					<h2 className="font-mono text-lg font-bold">
						{firstSprintTime.hours}:{firstSprintTime.minutes}:
						{firstSprintTime.seconds}.{firstSprintTime.milliseconds}
					</h2>
					<h3 className="text-sm text-neutral-400">First Sprint Time</h3>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-red-400`}>
					<GiBiceps size={30} />
				</div>
				<div>
					<h2 className="font-mono text-lg font-bold">
						{exerciseTime.hours}:{exerciseTime.minutes}:{exerciseTime.seconds}.
						{exerciseTime.milliseconds}
					</h2>
					<h3 className="text-sm text-neutral-400">Exercise Time</h3>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-green-400`}>
					<GiRun size={30} />
				</div>
				<div>
					<h2 className="font-mono text-lg font-bold">
						{lastSprintTime.hours}:{lastSprintTime.minutes}:
						{lastSprintTime.seconds}.{lastSprintTime.milliseconds}
					</h2>
					<h3 className="text-sm text-neutral-400">Last Sprint Time</h3>
				</div>
			</div>
		</div>
	);
};
