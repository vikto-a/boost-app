import { Center, Page } from '@layouts';

import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

	return (
		<Page title="Murph Leaderboard">
			<Center>
				<h1 className="text-2xl font-bold">Leaderboard</h1>
			</Center>
			{/* <h1>{hello.data ? hello.data.greeting : 'loading...'}</h1> */}
		</Page>
	);
};

export default Home;
