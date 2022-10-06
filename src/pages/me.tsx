import { Btn, Card, MurphCard, Time, WelcomeUser } from '@components';
import {
	GiCalculator,
	GiDatabase,
	GiPlayButton,
	GiSpeedometer,
} from 'react-icons/gi';

import { DateTime } from 'luxon';
import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from 'utils/trpc';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Me: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.push('/');
		}
	}, [session]);

	if (!session) return null;

	const murphs = trpc.useQuery(['murph.getMurphs']);

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
						<h2 className="font-mono text-lg font-bold">0</h2>
						<h3 className="text-sm text-neutral-400">Total Murphs</h3>
					</Card>
					<Card color="blue" icon={GiCalculator}>
						<span className="font-mono text-lg font-bold">
							<Time duration={DateTime.now().diffNow()} />
						</span>
						<h3 className="text-sm text-neutral-400">Average Time</h3>
					</Card>
					<Card color="green" icon={GiSpeedometer}>
						<span className="font-mono text-lg font-bold">
							<Time duration={DateTime.now().diffNow()} />
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
						'loading...'
					)}
				</div>
			</div>
		</Page>
	);
};

export default Me;
