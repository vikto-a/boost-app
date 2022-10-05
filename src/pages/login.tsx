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
						className="flex items-center gap-6 rounded-md border-l-8 border-blue-400 bg-neutral-900 py-3 px-6 font-bold text-blue-400 shadow-2xl shadow-blue-500"
						onClick={() => signIn('google')}
					>
						<FaGoogle size={30} />
						<span className="text-white">Continue with Google</span>
					</button>
				</div>
			</Center>
		</Page>
	);
};

export default Login;
