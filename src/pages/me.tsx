import { Btn, MurphCard, WelcomeUser } from '@components';
import { GiCrossedBones, GiPlayButton } from 'react-icons/gi';
import { signOut, useSession } from 'next-auth/react';

import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from 'utils/trpc';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
			<div className="container mx-auto flex min-h-screen gap-12 py-36 px-6">
				<div className="flex flex-1 flex-col gap-6">
					<WelcomeUser />
					<div className="flex-1">
						<h2>Total Murphs</h2>
						<h3>23</h3>
					</div>
					<div className="flex flex-col gap-6">
						<Btn to="/workout" icon={GiPlayButton}>
							Begin Murph
						</Btn>
						<button
							onClick={() => signOut()}
							className="flex items-center gap-3 rounded-md bg-red-400 px-6 py-3 text-black shadow-2xl shadow-red-500 transition hover:bg-red-300"
						>
							<span className="flex-1 text-left font-bold">Sign Out</span>
							<GiCrossedBones size={20} />
						</button>
					</div>
				</div>
				<div>
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
