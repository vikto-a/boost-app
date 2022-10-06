import { Btn, Card, Loading, MurphCard, Time, WelcomeUser } from '@components';
import { DateTime, Duration } from 'luxon';
import {
	GiCalculator,
	GiDatabase,
	GiPlayButton,
	GiSpeedometer,
} from 'react-icons/gi';
import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from 'utils/trpc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Me: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [avg, setAvg] = useState<Duration>(DateTime.now().diffNow());
	const [fastest, setFastest] = useState<Duration>(DateTime.now().diffNow());

	const murphs = trpc.useQuery(['murph.getMurphs']);
	const totalMurphs = trpc.useQuery(['murph.getCount']);
	const allTimes = trpc.useQuery(['murph.getTimes']);

	useEffect(() => {
		if (!session) {
			router.push('/');
		}
	}, [session]);

	useEffect(() => {
		if (allTimes.data && allTimes.data.length > 0) {
			const durations = allTimes.data.map((run) => {
				const start = DateTime.fromJSDate(run.start);
				const end = DateTime.fromJSDate(run.lastSprintEndTime);
				const diff = end?.diff(start);

				return diff.toMillis();
			});

			const sorted = durations.sort((a, b) => a - b);

			if (sorted[0]) {
				setFastest(
					Duration.fromMillis(sorted[0]).shiftTo(
						'hours',
						'minutes',
						'seconds',
						'milliseconds'
					)
				);
			}

			const sum = durations.reduce((a, b) => a + b, 0);
			const average = sum / durations.length;

			setAvg(
				Duration.fromMillis(average).shiftTo(
					'hours',
					'minutes',
					'seconds',
					'milliseconds'
				)
			);
		}
	}, [allTimes.data]);

	if (!session) return null;

	return (
		<Page title="Murph Profile">
			<div className="container mx-auto grid min-h-screen gap-12 py-36 px-6">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<WelcomeUser />

					<Btn to="/workout" icon={GiPlayButton}>
						Start
					</Btn>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					<Card color="yellow" icon={GiDatabase}>
						<h2 className="font-mono text-lg font-bold">
							{totalMurphs.data ? totalMurphs.data._count : <Loading />}
						</h2>
						<h3 className="text-sm text-neutral-400">Total Murphs</h3>
					</Card>
					<Card color="blue" icon={GiCalculator}>
						<span className="font-mono text-lg font-bold">
							<Time duration={avg} />
						</span>
						<h3 className="text-sm text-neutral-400">Average Time</h3>
					</Card>
					<Card color="green" icon={GiSpeedometer}>
						<span className="font-mono text-lg font-bold">
							<Time duration={fastest} />
						</span>
						<h3 className="text-sm text-neutral-400">Fastest Time</h3>
					</Card>
				</div>
				<div className="grid gap-6">
					<div className="flex items-end justify-between">
						<h2 className="text-2xl font-bold">My Murphs</h2>
						<p className="text-neutral-500">future sorting feature</p>
					</div>
					{murphs.data ? (
						<div className="grid gap-6">
							{murphs.data.map((murph) => (
								<MurphCard key={murph.id} {...murph} />
							))}
						</div>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</Page>
	);
};

export default Me;
