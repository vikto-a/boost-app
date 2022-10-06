import { Center, Page } from '@layouts';
import { LeaderboardCard, Loading } from '@components';
import { useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import { MurphWithUser } from '@type';
import type { NextPage } from 'next';
import { trpc } from 'utils/trpc';

const Leaderboard: NextPage = () => {
	const [top, setTop] = useState<
		{
			elapsed: number;
			murph: MurphWithUser;
		}[]
	>([]);

	const leader = trpc.useQuery(['leaderboard.getMonth']);
	console.log(typeof leader.data);

	useEffect(() => {
		if (leader.data) {
			const durations = leader.data.map((run) => {
				const start = DateTime.fromJSDate(run.start);
				const end = DateTime.fromJSDate(run.lastSprintEndTime);
				const diff = end?.diff(start);

				return { elapsed: diff.toMillis(), murph: run };
			});

			const sorted = durations.sort((a, b) => a.elapsed - b.elapsed);

			const topTen = sorted.slice(0, 10);

			setTop(topTen);
		}
	}, [leader.data]);

	return (
		<Page title="Murph Leaderboard">
			<Center>
				<h1 className="text-2xl font-bold">
					{DateTime.now().toFormat('MMMM')} Leaderboard
				</h1>
				{leader.data ? (
					<div className="grid w-full gap-6">
						{top.map((item, i) => (
							<LeaderboardCard murph={item.murph} rank={i + 1} key={i} />
						))}
					</div>
				) : (
					<Loading />
				)}
			</Center>
		</Page>
	);
};

export default Leaderboard;
