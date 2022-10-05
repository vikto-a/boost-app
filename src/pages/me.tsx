import { Center, Page } from '@layouts';

import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Me: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.push('/login');
		}
	}, [session]);

	if (!session) return null;

	return (
		<Page title="Murph Dashboard">
			<Center>
				<div className="flex flex-col gap-6">
					<h1>Welcome {session.user?.name}</h1>
				</div>
			</Center>
		</Page>
	);
};

export default Me;
