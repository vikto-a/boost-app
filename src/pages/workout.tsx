import type { NextPage } from 'next';
import { Page } from '@layouts';
import { trpc } from '../utils/trpc';

const Workout: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

	return (
		<Page title="Murph Workout">
			<h1>{hello.data ? hello.data.greeting : 'loading...'}</h1>
		</Page>
	);
};

export default Workout;
