import { Btn, Card, Loading, MurphCard, Time, WelcomeUser } from '@components';
import { DateTime, Duration } from 'luxon';
import {
	GiCalculator,
	GiDatabase,
	GiPlayButton,
	GiSpeedometer,
} from 'react-icons/gi';
import { useEffect, useState } from 'react';

import { FaCaretDown } from 'react-icons/fa';
import { Listbox } from '@headlessui/react';
import { Murph } from '@prisma/client';
import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from 'utils/trpc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type Sorting = 'newest' | 'oldest' | 'fastest' | 'slowest';

const sortingOptions = ['newest', 'oldest', 'fastest', 'slowest'];

const Me: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [avg, setAvg] = useState<Duration>(DateTime.now().diffNow());
	const [fastest, setFastest] = useState<Duration>(DateTime.now().diffNow());
	const [selectedSort, setSelectedSort] = useState<Sorting>('newest');

	const murphs = trpc.useQuery(['murph.getMurphs']);
	const totalMurphs = trpc.useQuery(['murph.getCount']);
	const allTimes = trpc.useQuery(['murph.getTimes']);

	const sortingMethods = {
		newest: (a: Murph, b: Murph) => {
			return (
				DateTime.fromJSDate(b.start).toMillis() -
				DateTime.fromJSDate(a.start).toMillis()
			);
		},

		oldest: (a: Murph, b: Murph) => {
			return (
				DateTime.fromJSDate(a.start).toMillis() -
				DateTime.fromJSDate(b.start).toMillis()
			);
		},
		fastest: (a: Murph, b: Murph) => {
			return (
				DateTime.fromJSDate(a.lastSprintEndTime)
					.diff(DateTime.fromJSDate(a.start))
					.toMillis() -
				DateTime.fromJSDate(b.lastSprintEndTime)
					.diff(DateTime.fromJSDate(b.start))
					.toMillis()
			);
		},
		slowest: (a: Murph, b: Murph) => {
			return (
				DateTime.fromJSDate(b.lastSprintEndTime)
					.diff(DateTime.fromJSDate(b.start))
					.toMillis() -
				DateTime.fromJSDate(a.lastSprintEndTime)
					.diff(DateTime.fromJSDate(a.start))
					.toMillis()
			);
		},
	};

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
		} else {
			setAvg(DateTime.now().diffNow());
			setFastest(DateTime.now().diffNow());
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

						<Listbox
							value={selectedSort}
							onChange={setSelectedSort}
							as="div"
							className="relative"
						>
							<Listbox.Button className="flex w-64 items-center justify-between rounded-md border border-neutral-800 py-3 px-6 capitalize">
								{selectedSort}
								<FaCaretDown size={15} />
							</Listbox.Button>
							<Listbox.Options className="absolute left-0 right-0 z-50 mt-3 flex flex-col rounded-md border border-neutral-800 bg-black">
								{sortingOptions.map((option) => (
									<Listbox.Option
										key={option}
										value={option}
										className="cursor-pointer p-3 capitalize transition hover:bg-neutral-800"
									>
										{option}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Listbox>
					</div>
					{murphs.data ? (
						<>
							{murphs.data.length === 0 ? (
								<div className="flex h-64 flex-col items-center justify-center gap-6 rounded-md border border-neutral-800 p-6">
									<h6 className="font-bold text-neutral-500">No Murphs</h6>
									<Btn icon={GiPlayButton} to="/workout">
										Start Murph
									</Btn>
								</div>
							) : (
								<div className="grid gap-6">
									{murphs.data
										.sort(sortingMethods[selectedSort])
										.map((murph) => (
											<MurphCard key={murph.id} {...murph} />
										))}
								</div>
							)}
						</>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</Page>
	);
};

export default Me;
