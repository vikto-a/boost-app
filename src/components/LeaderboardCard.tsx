import { Card, Time } from '@components';
import { GiCalendar, GiStopwatch } from 'react-icons/gi';

import { DateTime } from 'luxon';
import Image from 'next/future/image';
import { MurphWithUser } from '@type';

type Props = {
	murph: MurphWithUser;
	rank: number;
};

export const LeaderboardCard: React.FC<Props> = ({ murph, rank }) => {
	const totalTime = DateTime.fromJSDate(murph.lastSprintEndTime).diff(
		DateTime.fromJSDate(murph.start),
		['hours', 'minutes', 'seconds', 'milliseconds']
	);

	return (
		<Card color="purple">
			<div>{rank}</div>
			<div className="grid flex-1 sm:grid-cols-2 md:grid-cols-3">
				<Card color="yellow" shadow={false} border="none">
					<div className="flex items-center gap-6">
						<div className="relative h-[30px] w-[30px] rounded-full bg-neutral-800">
							{murph.user?.image && (
								<Image
									src={murph.user?.image}
									fill
									alt="Profile picture"
									sizes="64px"
								/>
							)}
						</div>
						<div className="flex flex-col">
							<span className="text-lg font-bold">{murph.user?.name}</span>
							<h3 className="text-sm text-neutral-400">User</h3>
						</div>
					</div>
				</Card>
				<Card icon={GiCalendar} color="purple" shadow={false} border="none">
					<h2 className="font-mono text-lg font-bold">
						{DateTime.fromJSDate(murph.start).toFormat('dd LLL yy')}
					</h2>
					<h3 className="text-sm text-neutral-400">Date</h3>
				</Card>
				<Card icon={GiStopwatch} color="blue" shadow={false} border="none">
					<Time duration={totalTime} />
					<h3 className="text-sm text-neutral-400">Total Time</h3>
				</Card>
			</div>
		</Card>
	);
};
