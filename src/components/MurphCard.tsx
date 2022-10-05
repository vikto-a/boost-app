import { DateTime, Duration } from 'luxon';
import { GiBiceps, GiRun, GiStopwatch } from 'react-icons/gi';

import { Murph } from '@prisma/client';

type Props = {
	duration: Duration;
};
const Time: React.FC<Props> = ({ duration }) => {
	return (
		<div className="font-mono">
			<span
				className={`${
					duration.hours === 0 ? 'text-neutral-400' : 'text-white'
				}`}
			>
				{String(duration.hours).padStart(2, '0')}:
			</span>
			<span
				className={`${
					duration.minutes === 0 && duration.hours === 0
						? 'text-neutral-400'
						: 'text-white'
				}`}
			>
				{String(duration.minutes).padStart(2, '0')}:
			</span>
			<span>{String(duration.seconds).padStart(2, '0')}</span>
			<span>.</span>
			<span>{String(duration.milliseconds).padStart(3, '0')}</span>
		</div>
	);
};

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
			className={`grid grid-cols-4 gap-y-6 gap-x-12 rounded-md border-l-8 border-purple-400 bg-black py-3 px-6 shadow-2xl shadow-purple-500`}
		>
			<div className="flex items-center gap-6">
				<div className={`text-purple-400`}>
					<GiStopwatch size={30} />
				</div>
				<div>
					<Time duration={totalTime} />
					<h3 className="text-sm text-neutral-400">Total Time</h3>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-green-400`}>
					<GiRun size={30} />
				</div>
				<div>
					<Time duration={firstSprintTime} />
					<h4 className="text-sm text-neutral-400">First Sprint Time</h4>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-red-400`}>
					<GiBiceps size={30} />
				</div>
				<div>
					<Time duration={exerciseTime} />
					<h4 className="text-sm text-neutral-400">Exercise Time</h4>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className={`text-green-400`}>
					<GiRun size={30} />
				</div>
				<div>
					<Time duration={lastSprintTime} />
					<h4 className="text-sm text-neutral-400">Last Sprint Time</h4>
				</div>
			</div>

			<div className="col-span-full">
				<h6 className="text-center font-mono text-sm text-neutral-400">
					{DateTime.fromJSDate(start).toFormat('dd LLL yyyy')}
				</h6>
			</div>
		</div>
	);
};
