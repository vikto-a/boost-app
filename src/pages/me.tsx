import { Btn, MurphCard } from '@components';
import { GiCrossedBones, GiPlayButton } from 'react-icons/gi';
import { signOut, useSession } from 'next-auth/react';

import Image from 'next/future/image';
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
			<div className="container mx-auto flex min-h-screen py-36 px-6">
				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-6">
						<div className="relative h-16 w-16 rounded-full bg-neutral-900">
							{session.user?.image && (
								<Image
									src={session.user?.image}
									fill
									alt="Profile picture"
									sizes="64px"
								/>
							)}
						</div>
						<h1 className="flex flex-col text-3xl font-bold">
							<span className="text-base font-normal text-neutral-500">
								Welcome
							</span>
							<span>{session.user?.name}</span>
						</h1>
					</div>
					<div className="flex flex-col gap-6">
						<Btn to="/workout" icon={GiPlayButton}>
							Begin Murph
						</Btn>
						<button
							className="flex items-center gap-6 rounded-md border-l-8 border-red-400 bg-neutral-900 py-3 px-6 font-bold text-red-400 shadow-2xl shadow-red-500 transition hover:bg-neutral-800"
							onClick={() => signOut()}
						>
							<GiCrossedBones size={30} />
							<span className="text-white">Sign Out</span>
						</button>
					</div>

					<div>
						<h2>Total Murphs</h2>
						<h3>23</h3>
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
