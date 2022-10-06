import { Center, Page } from '@layouts';
import { signIn, useSession } from 'next-auth/react';

import { FaGoogle } from 'react-icons/fa';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push('/me');
		}
	}, [session]);

	if (session) return null;

	return (
		<Page title="Murph Login">
			<Center>
				<div className="flex flex-col gap-6">
					<button
						className="flex items-center gap-6 rounded-md border border-blue-400 bg-black py-3 px-6 text-blue-400 transition hover:bg-neutral-900"
						onClick={() => signIn('google')}
					>
						<FaGoogle size={30} />
						Continue with Google
					</button>
				</div>
			</Center>
		</Page>
	);
};

export default Login;
