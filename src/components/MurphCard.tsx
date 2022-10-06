import { Card, Loading, Time } from '@components';
import { GiBiceps, GiRun, GiStopwatch, GiTrashCan } from 'react-icons/gi';

import { DateTime } from 'luxon';
import { Murph } from '@prisma/client';
import { trpc } from 'utils/trpc';
import { useState } from 'react';

export const MurphCard: React.FC<Murph> = ({
	id,
	start,
	firstSprintEndTime,
	exerciseEndTime,
	lastSprintEndTime,
}) => {
	const [loading, setLoading] = useState(false);

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

	const utils = trpc.useContext();

	const mutation = trpc.useMutation('murph.delete', {
		onSuccess(input) {
			utils.invalidateQueries(['murph.getCount']);
			utils.invalidateQueries(['murph.getMurphs']);
			utils.invalidateQueries(['murph.getTimes']);
			setLoading(false);
		},
	});

	return (
		<Card color="purple">
			{loading && (
				<div className="absolute inset-0 z-50 flex items-center justify-center rounded-md bg-black bg-opacity-80">
					<Loading />
				</div>
			)}
			<div className="flex flex-col">
				<div className="flex flex-row items-center justify-between">
					{DateTime.fromJSDate(start).toFormat('dd LLL yyyy hh:mm:ss')}
					<button
						className="rounded-md border border-neutral-800 p-3 text-red-400 transition hover:bg-neutral-900"
						onClick={() => {
							setLoading(true);
							mutation.mutate(id);
						}}
					>
						<GiTrashCan size={20} />
					</button>
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
