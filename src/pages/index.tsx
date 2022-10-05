import { Hero } from '@components';
import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

	return (
		<Page title="Murph">
			<Hero />
			{/* <h1>{hello.data ? hello.data.greeting : 'loading...'}</h1> */}
		</Page>
	);
};

export default Home;
